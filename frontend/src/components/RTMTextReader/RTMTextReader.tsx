import { ReactNode, useEffect, useRef, useState } from 'react';
import styles from './RTMTextReader.module.scss';
import { Box, Stack } from '@mui/material';

import RTMSynthesis from '../../services/RTMSynthesis';
import { RTMReaderController } from '../RTMReaderController/RTMReaderController';

const temp =
    'Lorem Ipsum is simply dummy? text, of the printing and! typesetting industry. 3.2.1.3 Lorem Ipsum has been the industry.';

interface Reader {
    text: string;
    parts: any[];
}
interface RTMMarker {
    wordIndex: number;
    sentenceIndex: number;
}

const DEFAULT_MARKER = Object.freeze({ wordIndex: 0, sentenceIndex: 0 });

export const RTMTextReader = () => {
    // const textareaRef: any = useRef(null);
    const [reader, setReader] = useState<Reader>({ text: temp, parts: [] });
    const [activeMarker, setActiveMarker] = useState<RTMMarker>(DEFAULT_MARKER);
    const [isReading, setIsReading] = useState(false);

    useEffect(() => {
        setReading();

        return () => {
            RTMSynthesis.stopReading();
        };
    }, []);

    useEffect(() => {
        if (!isReading) {
            RTMSynthesis.stopReading();
        } else {
            playText(activeMarker);
        }
    }, [isReading]);

    const setReading = () => {
        const textToRead: string = reader.text.replace(/\s+/, ' ');
        const parts = parseTextParts(textToRead);
        setReader({ text: textToRead, parts });
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
        const textToRead = reader.text.substring(
            pausedIdxOffset,
            reader.text.length
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

    const handleVolumeChange = (event: Event, volumeLevel: number) => {
        RTMSynthesis.setUtteranceVolume(volumeLevel / 100);
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
                    preMarkersText = reader.text.substring(
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
                    postMarkersText = reader.text.substring(
                        lastPart.wordStartIndex + lastPart.text.length + 1,
                        reader.text.length
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
                onVolumeChange={handleVolumeChange}
            />
        </Stack>
    );
};
