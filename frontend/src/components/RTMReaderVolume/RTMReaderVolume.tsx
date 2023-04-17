import { Slider, SliderProps, Stack } from "@mui/material";


import { useState } from "react";
import VolumeDownRoundedIcon from '@mui/icons-material/VolumeDownRounded';
import VolumeUpRoundedIcon from '@mui/icons-material/VolumeUpRounded';
import RTMSynthesis from '../../services/RTMSynthesis';

interface RTMReaderVolumeProps extends SliderProps {
    onVolumeChange?: (...args: any[]) => void;
}

export const RTMReaderVolume = ({onVolumeChange, disabled}: RTMReaderVolumeProps) => {
    const [volume, setVolume] = useState<number>(80);

    const handleVolumeChange = (event: Event, newValue: number | number[]) => {
        setVolume(newValue as number);
        RTMSynthesis.setUtteranceVolume(newValue as number / 100);
        onVolumeChange?.(event, newValue as number);
    };

    return (<Stack
        direction='row'
        alignItems='center'
        gap={1}
        paddingX={1}
        minWidth={150}>
        <VolumeDownRoundedIcon fontSize='inherit' />
        <Slider
            size='small'
            aria-label='Volume'
            value={volume}
            disabled={disabled}
            onChange={handleVolumeChange}
        />
        <VolumeUpRoundedIcon fontSize='inherit' />
    </Stack>);
}