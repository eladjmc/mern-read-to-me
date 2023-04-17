import { ReactNode, useEffect, useRef, useState } from 'react';
import styles from './RTMTextReader.module.scss';
import { Box, Stack } from '@mui/material';

import RTMSynthesis from '../../services/RTMSynthesis';
import { RTMReaderController } from '../RTMReaderController/RTMReaderController';
import { useGlobalReader } from '../../context/ReaderContext';

interface Reader {
    parts: any[];
}
interface RTMMarker {
    wordIndex: number;
    sentenceIndex: number;
}

const DEFAULT_MARKER = Object.freeze({ wordIndex: 0, sentenceIndex: 0 });

export const RTMTextReader = () => {
    const {currentText} = useGlobalReader();
    const [reader, setReader] = useState<Reader>({ parts: [] });
    const [activeMarker, setActiveMarker] = useState<RTMMarker>(DEFAULT_MARKER);
    const [isReading, setIsReading] = useState(false);

    useEffect(() => {
        console.log(RTMSynthesis.activeVoice?.lang);
        
        setReading();

        return () => {
            RTMSynthesis.stopReading();
        };
    }, [currentText]);

    useEffect(() => {
        if (!isReading) {
            RTMSynthesis.stopReading();
        } else {
            playText(activeMarker);
        }
    }, [isReading]);

    const setReading = () => {
        const textToRead: string = currentText.replace(/\s+/, ' ');
        const parts = parseTextParts(textToRead);
        setReader({ parts });
    };

    const parseTextParts = (text: string): any[] => {
        const parts = [];
        let wordStartIndex = 0;
        let prevSentenceStartIndex = 0;
        let sentenceStartIndex = 0;

        for (let charIdx = 0; charIdx <= text.length; charIdx++) {
            const char = text[charIdx];
            const isLastIndex = charIdx === text.length;
            if (
                '.?!'.includes(char) &&
                !isLastIndex &&
                text[charIdx + 1] === ' '
            ) {
                // sentence
                sentenceStartIndex = charIdx + 2;
            } else if (char === ' ' || isLastIndex) {
                // word
                parts.push({
                    text: text.substring(wordStartIndex, charIdx),
                    sentenceStartIndex: prevSentenceStartIndex,
                    wordStartIndex,
                });

                prevSentenceStartIndex = sentenceStartIndex;
                wordStartIndex = charIdx + 1;
            }
        }

        return parts;
    };

    const handlePlayClick = () => {
        setIsReading(true);
    };

    const playText = (marker: RTMMarker) => {
        const pausedIdxOffset = Math.max(
            marker.sentenceIndex,
            marker.wordIndex
        );
        let sentenceBuffer = marker.wordIndex - marker.sentenceIndex;
        const textToRead = currentText.substring(
            pausedIdxOffset,
            currentText.length
        );

        RTMSynthesis.readText(textToRead, (event: Event) => {
            const { type, name, charIndex } = event as SpeechSynthesisEvent;

            if (type === 'end') {
                setActiveMarker(DEFAULT_MARKER);
                setIsReading(false);
            } else if (name === 'word') {
                const wordIndex = pausedIdxOffset + charIndex;
                setActiveMarker(markerState => ({
                    ...markerState,
                    wordIndex,
                }));
            } else if (name === 'sentence') {
                const sentenceIndex =
                    pausedIdxOffset - sentenceBuffer + charIndex;

                setActiveMarker(markerState => ({
                    ...markerState,
                    sentenceIndex,
                }));
                sentenceBuffer = 0;
            }
        });
    };

    const handleVolumeChange = () => {
        RTMSynthesis.stopReading()
        isReading && playText(activeMarker);
    };

    const handlePrevClick = () => {
        if (activeMarker.sentenceIndex === 0) {
            return;
        }

        const partSentenceStartIndex = reader.parts.findIndex(
            part => part.sentenceStartIndex === activeMarker.sentenceIndex
        );
        const prevSentencePart =
            reader.parts[partSentenceStartIndex - 1].sentenceStartIndex;

        RTMSynthesis.stopReading();
        const newMarker = {
            wordIndex: prevSentencePart,
            sentenceIndex: prevSentencePart,
        };
        setActiveMarker(newMarker);

        isReading && playText(newMarker);
    };

    const handleNextClick = () => {
        const nextSentencePart = reader.parts.find(
            part => part.sentenceStartIndex > activeMarker.sentenceIndex
        );
        if (!nextSentencePart) {
            return;
        }

        RTMSynthesis.stopReading();
        const newMarker = {
            wordIndex: nextSentencePart.wordStartIndex,
            sentenceIndex: nextSentencePart.sentenceStartIndex,
        };

        setActiveMarker(newMarker);
        isReading && playText(newMarker);
    };

    const handlePauseClick = () => {
        setIsReading(false);
    };

    const handleStopClick = () => {
        setActiveMarker(DEFAULT_MARKER);
        setIsReading(false);
    };

    const getRenderMarker = (
        part: any,
        partIdx: number,
        needWordMarker: boolean
    ): ReactNode => {
        return (
            <span
                key={`s-${part.sentenceStartIndex}:p-${partIdx}`}
                className={
                    needWordMarker ? styles.wordMarker : styles.sentenceMarker
                }>
                {part.text}
                &nbsp;
            </span>
        );
    };

    const renderReader = () => {
        let preMarkersText: string | null = null;
        let postMarkersText: string | null = null;

        const renderParts: ReactNode[] = [];

        reader.parts.forEach((part, partIdx) => {
            if (part.sentenceStartIndex === activeMarker.sentenceIndex) {
                if (preMarkersText === null) {
                    preMarkersText = currentText.substring(
                        0,
                        activeMarker.sentenceIndex
                    );
                    renderParts.push(preMarkersText);
                }
                renderParts.push(
                    getRenderMarker(
                        part,
                        partIdx,
                        part.wordStartIndex === activeMarker.wordIndex
                    )
                );
            } else {
                if (preMarkersText !== null && postMarkersText === null) {
                    const lastPart = reader.parts[partIdx - 1];
                    postMarkersText = currentText.substring(
                        lastPart.wordStartIndex + lastPart.text.length + 1,
                        currentText.length
                    );
                    renderParts.push(postMarkersText);
                }
            }
        });

        return renderParts;
    };

    return (
        <Stack direction='column' sx={{ width: 1, height: 1 }}>
            <Box flexGrow={1} height={0} overflow='auto'>
                {/* <div className={styles.textReader}>
                    <RTMTextarea
                        initialValue={temp}
                        ref={textareaRef}></RTMTextarea>
                </div> */}
                <Box
                    margin={2}
                    className={styles.readerContainer}
                    position='relative'>
                    {renderReader()}
                </Box>
            </Box>

            <RTMReaderController
                isPlaying={isReading}
                onPlayPauseClick={
                    isReading ? handlePauseClick : handlePlayClick
                }
                onPrevClick={handlePrevClick}
                onNextClick={handleNextClick}
                onStopClick={handleStopClick}
                onSettingsClick={() => setIsReading(false)}
                onSettingChange={handleVolumeChange}
            />
        </Stack>
    );
};
