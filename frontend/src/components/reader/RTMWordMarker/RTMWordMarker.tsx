import { Box } from '@mui/material';
import styles from './RTMWordMarker.module.scss';

export interface RTMMarker {
    startIndex: number; 
    length: number;
}

interface RTMWordMarkerProps {
    startOffset?: number;
    markerLength?: number;
    height?: number;
}

export const RTMWordMarker = ({ startOffset = 0, markerLength = 0 }: RTMWordMarkerProps) => {
    // useEffect(() => {
    //     console.log(startOffset, markerLength);
    // }, [startOffset, markerLength]);

    return (
        <Box
            className={styles.wordMarker}
            component='span'
            left={startOffset}
            width={markerLength}
            height={30}></Box>
    );
};
