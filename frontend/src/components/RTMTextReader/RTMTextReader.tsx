import { ReactNode, useEffect, useRef, useState } from 'react';
import styles from './RTMTextReader.module.scss';
import { Box, Stack, Typography } from '@mui/material';

import RTMSynthesis from '../../services/RTMSynthesis';
import { RTMReaderController } from '../RTMReaderController/RTMReaderController';
import { useGlobalReader } from '../../context/ReaderContext';
import { useGlobalTheme } from '../../context/ThemeContext';

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
    const { currentText, fontSize, isRtl } = useGlobalReader();
    const { isLight } = useGlobalTheme();
    const [reader, setReader] = useState<Reader>({ text: '', parts: [] });
    const [activeMarker, setActiveMarker] = useState<RTMMarker>(DEFAULT_MARKER);
    const [isReading, setIsReading] = useState(false);

    useEffect(() => {

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
        const textToRead: string = currentText
            .replace(/( )+/g, ' ')
            .replace(/( )?\n+( )?/g, '\n');
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
            const isEndOfSentence = ['.', '?', '!'].includes(char);
            if (char === '\n') {
                sentenceStartIndex = charIdx + 1;
            }

            if (
                !isLastIndex &&
                isEndOfSentence &&
                [' '].includes(text[charIdx + 1])
            ) {
                // sentence
                sentenceStartIndex = charIdx + 2;
            } else if ([' ', '\n'].includes(char) || isLastIndex) {
                // word
                parts.push({
                    char,
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

    const handleVolumeChange = () => {
        RTMSynthesis.stopReading();
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
                style={{color: 'black'}}
                className={
                    needWordMarker ? styles.wordMarker : styles.sentenceMarker
                }>
                {part.text}
                &nbsp;
            </span>
        );
    };

    const getRenderFreeText = (text: string, postfix: string): ReactNode[] => {
        const result: ReactNode[] = [];
        const splitByEnters = text.split('\n');
        splitByEnters.forEach((slice, index) => {
            slice &&
                result.push(
                    slice,
                    splitByEnters.length === index && (
                        <br key={index + '-' + postfix} />
                    )
                );
        });
        return result;
    };

    const renderReader = () => {
        let preMarkersText: string | null = null;
        let postMarkersText: string | null = null;

        const renderParts: ReactNode[] = [];

        reader.parts.forEach((part, partIdx) => {
            if (part.sentenceStartIndex === activeMarker.sentenceIndex) {
                // Inside sentence
                if (preMarkersText === null) {
                    preMarkersText = reader.text.substring(
                        0,
                        activeMarker.sentenceIndex
                    );
                    renderParts.push(
                        ...getRenderFreeText(preMarkersText, 'pre')
                    );
                }
                renderParts.push(
                    getRenderMarker(
                        part,
                        partIdx,
                        part.wordStartIndex === activeMarker.wordIndex
                    )
                );
                if (part.char === '\n') {
                    renderParts.push(
                        <br key={partIdx + '-br'} id={partIdx + '-br'} />
                    );
                }
            } else {
                if (preMarkersText !== null && postMarkersText === null) {
                    const lastPart = reader.parts[partIdx - 1];
                    postMarkersText = reader.text.substring(
                        lastPart.wordStartIndex + lastPart.text.length + 1,
                        reader.text.length
                    );
                    renderParts.push(
                        ...getRenderFreeText(postMarkersText, 'post')
                    );
                }
            }
        });

        if (renderParts.length === 0) {
            debugger;
        }

        return renderParts;
    };

    return (
        <Stack direction='column' sx={{ width: 1, height: 1 }}>
            <Box flexGrow={1} height={0} overflow='auto'>
                <Box
                    sx={{ maxWidth:"1400px", margin:"auto",paddingTop:"30px", fontSize, direction: isRtl ? 'rtl' : 'ltr' }}
                    margin={2}
                    className={styles.readerContainer}
                    position='relative'>
                    {reader.text ? renderReader() : <NoTextPlace />}
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

const NoTextPlace = () => {
    return (
        <Stack margin={4} direction='row' justifyContent='center'>
            <Typography variant='h4'>No text to read</Typography>
        </Stack>
    );
};
