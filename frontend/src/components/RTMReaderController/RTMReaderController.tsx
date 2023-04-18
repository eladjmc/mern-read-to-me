import { PropsWithChildren } from 'react';
import {
    AppBar,
    Box,
    Divider,
    IconButton, Stack,
    Theme,
    Toolbar,
    useMediaQuery
} from '@mui/material';

import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import StopRoundedIcon from '@mui/icons-material/StopRounded';
import PauseRoundedIcon from '@mui/icons-material/PauseRounded';
import SkipNextRoundedIcon from '@mui/icons-material/SkipNextRounded';
import SkipPreviousRoundedIcon from '@mui/icons-material/SkipPreviousRounded';
import RTMDrawer from '../RTMDrawer/RTMDrawer';
import { RTMUtteranceSettings } from '../RTMUtteranceSettings/RTMUtteranceSettings';
import { RTMReaderVolume } from '../RTMReaderVolume/RTMReaderVolume';

interface RTMReaderControllerProps {
    isPlaying: boolean;
    volumeDisabled?: boolean;
    prevDisabled?: boolean;
    nextDisabled?: boolean;
    onSettingChange?: (...args: any[]) => void;
    onSettingsClick?: (...args: any[]) => void;
    onPlayPauseClick?: (...args: any[]) => void;
    onStopClick?: (...args: any[]) => void;
    onPrevClick?: (...args: any[]) => void;
    onNextClick?: (...args: any[]) => void;
}

export const RTMReaderController = ({
    isPlaying,
    ...props
}: PropsWithChildren<RTMReaderControllerProps>) => {
    const matches = useMediaQuery((theme: Theme) => theme.breakpoints.up('sm'));

    const renderPlayStateIcon = () => {
        const Icon = isPlaying ? PauseRoundedIcon : PlayArrowRoundedIcon;
        return <Icon fontSize='large'></Icon>;
    };

    return (
        <AppBar component='div' position='static' color='inherit'>
            <Toolbar sx={{ justifyContent: 'space-between', overflow: 'auto' }}>
                <Box whiteSpace='nowrap'>
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
                    flexDirection='row'
                    alignItems='center'
                    justifySelf='flex-end'
                    gap={1}>
                    {matches && (
                        <>
                            <RTMReaderVolume
                                onVolumeChange={props.onSettingChange}
                            />
                            <Divider
                                orientation='vertical'
                                variant='middle'
                                flexItem
                            />
                        </>
                    )}

                    <RTMDrawer onDrawerOpenState={props.onSettingsClick}/>

                    <RTMUtteranceSettings onDrawerOpenState={props.onSettingsClick}/>
                </Stack>
            </Toolbar>
        </AppBar>
    );
};
