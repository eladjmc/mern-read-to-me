import { AppBar, IconButton, Toolbar } from "@mui/material";

import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import StopRoundedIcon from '@mui/icons-material/StopRounded';
import { PropsWithChildren } from "react";

interface RTMReaderControllerProps {
    isPlaying: boolean;
    onPlayPauseClick: (...args: any[]) => void;
}

export const RTMReaderController = ({isPlaying, onPlayPauseClick}: PropsWithChildren<RTMReaderControllerProps>) => {

    const renderPlayStateIcon = () => {
        const Icon = isPlaying ? StopRoundedIcon : PlayArrowRoundedIcon;
        return <Icon fontSize='inherit'></Icon>
    }

    return (
        <AppBar position='static'>
            <Toolbar>
                <IconButton
                    color='inherit'
                    size='large'
                    onClick={onPlayPauseClick}>
                    {renderPlayStateIcon()}
                </IconButton>
            </Toolbar>
        </AppBar>
    );
};
