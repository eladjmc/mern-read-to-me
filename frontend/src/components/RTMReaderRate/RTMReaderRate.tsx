import { Slider, SliderProps, Stack } from "@mui/material";


import { useState } from "react";
import KeyboardDoubleArrowDownRoundedIcon from '@mui/icons-material/KeyboardDoubleArrowDownRounded';
import KeyboardDoubleArrowUpRoundedIcon from '@mui/icons-material/KeyboardDoubleArrowUpRounded';
import RTMSynthesis from '../../services/RTMSynthesis';

interface RTMReaderRateProps extends SliderProps {
    onRateChange?: (...args: any[]) => void;
}

export const RTMReaderRate = ({onRateChange, disabled}: RTMReaderRateProps) => {
    const [rate, setRate] = useState<number>(() => (RTMSynthesis.getUtteranceRate() - RTMSynthesis.MIN_RATE) * 25);

    const handleRateChange = (event: Event, newValue: number | number[]) => {
        setRate(newValue as number);
        RTMSynthesis.setUtteranceRate(newValue as number / 25);
        onRateChange?.(event, newValue as number);
    };

    return (<Stack
        direction='row'
        alignItems='center'
        gap={1}
        paddingX={1}
        minWidth={150}>
        <KeyboardDoubleArrowDownRoundedIcon fontSize='inherit' />
        <Slider
            size='small'
            aria-label='Volume'
            value={rate}
            disabled={disabled}
            onChange={handleRateChange}
        />
        <KeyboardDoubleArrowUpRoundedIcon fontSize='inherit' />
    </Stack>);
}