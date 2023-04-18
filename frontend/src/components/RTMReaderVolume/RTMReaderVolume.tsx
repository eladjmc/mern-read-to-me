import { Slider, SliderProps, Stack } from "@mui/material";


import { useEffect, useState } from "react";
import VolumeDownRoundedIcon from '@mui/icons-material/VolumeDownRounded';
import VolumeUpRoundedIcon from '@mui/icons-material/VolumeUpRounded';
import RTMSynthesis from '../../services/RTMSynthesis';
import { RTMStorage } from "../../services/RTMStorage";
import { useGlobalReader } from "../../context/ReaderContext";

interface RTMReaderVolumeProps extends SliderProps {
    onVolumeChange?: (...args: any[]) => void;
}

export const RTMReaderVolume = ({onVolumeChange, disabled}: RTMReaderVolumeProps) => {
    const {volume, setVolumeLevel} = useGlobalReader();

    const handleVolumeChange = (event: Event, newValue: number | number[]) => {
        setVolumeLevel(newValue as number);
        onVolumeChange?.(volume);
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