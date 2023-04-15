import { PropsWithChildren, useEffect, useState } from 'react';
import { AppBar, Box, IconButton, Slider, Stack, Toolbar } from '@mui/material';

import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import StopRoundedIcon from '@mui/icons-material/StopRounded';
import PauseRoundedIcon from '@mui/icons-material/PauseRounded';
import SkipNextRoundedIcon from '@mui/icons-material/SkipNextRounded';
import SkipPreviousRoundedIcon from '@mui/icons-material/SkipPreviousRounded';
import VolumeDownRoundedIcon from '@mui/icons-material/VolumeDownRounded';
import VolumeUpRoundedIcon from '@mui/icons-material/VolumeUpRounded';
import RTMSynthesis from '../../services/RTMSynthesis';

interface RTMReaderControllerProps {
    isPlaying: boolean;
    volumeDisabled?: boolean;
    prevDisabled?: boolean;
    nextDisabled?: boolean;
    onVolumeChange?: (...args: any[]) => void;
    onPlayPauseClick?: (...args: any[]) => void;
    onStopClick?: (...args: any[]) => void;
    onPrevClick?: (...args: any[]) => void;
    onNextClick?: (...args: any[]) => void;
}

export const RTMReaderController = ({
    isPlaying,
    ...props
}: PropsWithChildren<RTMReaderControllerProps>) => {
    const [volume, setVolume] = useState<number>(80);

    const renderPlayStateIcon = () => {
        const Icon = isPlaying ? PauseRoundedIcon : PlayArrowRoundedIcon;
        return <Icon fontSize='large'></Icon>;
    };

    const handleVolumeChange = (event: Event, newValue: number | number[]) => {
        setVolume(newValue as number);
        props.onVolumeChange?.(event, newValue as number);
    };

    return (
        <AppBar position='static' color='inherit'>
            <Toolbar sx={{ justifyContent: 'space-between' }}>
                <Box>
                    <IconButton
                        color='inherit'
                        size='small'
                        disabled={props.prevDisabled}
                        onClick={props.onPrevClick}>
                        <SkipPreviousRoundedIcon />
                    </IconButton>

                    <IconButton
                        color='inherit'
                        size='small'
                        onClick={props.onStopClick}>
                        <StopRoundedIcon />
                    </IconButton>

                    <IconButton
                        color='inherit'
                        size='small'
                        onClick={props.onPlayPauseClick}>
                        {renderPlayStateIcon()}
                    </IconButton>

                    <IconButton
                        color='inherit'
                        size='small'
                        disabled={props.nextDisabled}
                        onClick={props.onNextClick}>
                        <SkipNextRoundedIcon />
                    </IconButton>
                </Box>

                <Stack
                    minWidth={200}
                    spacing={2}
                    direction='row'
                    alignItems='center'
                    justifySelf='flex-end'>
                    <VolumeDownRoundedIcon />
                    <Slider
                        aria-label='Volume'
                        value={volume}
                        disabled={props.volumeDisabled}
                        onChange={handleVolumeChange}
                    />
                    <VolumeUpRoundedIcon />
                </Stack>
            </Toolbar>
        </AppBar>
    );
};
