import { useEffect, useRef, useState } from 'react';
import { RTMTextarea } from '../textarea/Textarea';
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
    const textareaRef: any = useRef(null);
    const [reader, setReader] = useState<Reader>({ text: '', parts: [] });
    const [marker, setMarker] = useState<RTMMarker>(DEFAULT_MARKER);
    const [isReading, setIsReading] = useState(false);

    useEffect(() => {
        return () => {
            RTMSynthesis.stopReading();
        };
    }, []);

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
        const textToRead: string = (textareaRef.current?.value || '').replace(
            /\s+/,
            ' '
        );
        const parts = parseTextParts(textToRead);
        setReader({ text: textToRead, parts });
        setIsReading(true);

        setTimeout(() => {
            RTMSynthesis.readText(textToRead, (event: Event) => {
                const { type, name, charIndex } = event as SpeechSynthesisEvent;

                if (type === 'stop') {
                    setMarker(DEFAULT_MARKER);
                    setIsReading(false);
                } else if (name === 'word') {
                    setMarker(markerState => ({
                        ...markerState,
                        wordIndex: charIndex,
                    }));
                } else if (name === 'sentence') {
                    setMarker(markerState => ({
                        ...markerState,
                        sentenceIndex: charIndex,
                    }));
                }
            });
        });
    };

    const handleStopClick = () => {
        RTMSynthesis.stopReading();
        setIsReading(false);
    };

    const renderReader = () => {
        return reader.parts.map((part, partIdx) => {
            const needWordMarker = part.wordStartIndex === marker.wordIndex;
            const wordMarkerClass = needWordMarker ? styles.wordMarker : '';

            const needSentenceMarker =
                part.sentenceStartIndex === marker.sentenceIndex;
            const sentenceMarkerClass = needSentenceMarker
                ? styles.sentenceMarker
                : '';

            const renderMarker = () => (
                <span className={sentenceMarkerClass}>
                    <span key={partIdx} className={wordMarkerClass}>
                        {part.text}
                    </span>
                    &nbsp;
                </span>
            );
            const render =
                needSentenceMarker || needWordMarker
                    ? renderMarker()
                    : `${part.text} `;
            return render;
        });
    };

    return (
        <Stack direction='column' sx={{ width: 1, height: 1 }}>
            <Box flexGrow={1} height={0} overflow="auto">
                <div className={styles.textReader}>
                    <RTMTextarea
                        initialValue={temp}
                        ref={textareaRef}></RTMTextarea>
                </div>
                <Box margin={2} className={styles.readerContainer} position='relative'>
                    {renderReader()}
                </Box>
            </Box>

            <RTMReaderController
                isPlaying={isReading}
                onPlayPauseClick={isReading ? handleStopClick : handlePlayClick}
            />
        </Stack>
    );
};
