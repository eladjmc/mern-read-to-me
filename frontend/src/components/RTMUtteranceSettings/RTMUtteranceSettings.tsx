import { useEffect, useState } from 'react';
import {
    Divider,
    IconButton,
    Stack,
    Switch,
    Typography,
} from '@mui/material';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import { DocumentDrawer } from '../RTMDrawer/DocumentDrawer';
import { RTMReaderVolume } from '../RTMReaderVolume/RTMReaderVolume';
import { RTMReaderRate } from '../RTMReaderRate/RTMReaderRate';
import { RTMVoicePicker } from '../RTMVoicePicker/RTMVoicePicker';

import RemoveRoundedIcon from '@mui/icons-material/RemoveRounded';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import { useGlobalReader } from '../../context/ReaderContext';


interface RTMUtteranceSettingsProps {
    onDrawerOpenState?: (...args: any[]) => void;
}

export const RTMUtteranceSettings = ({
    onDrawerOpenState,
}: RTMUtteranceSettingsProps) => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const {isRtl, toggleRtl, fontSize, handleFontSizeUp, handleFontSizeDown} = useGlobalReader();

    useEffect(() => {
        onDrawerOpenState?.(drawerOpen);
    }, [drawerOpen]);

    return (
        <>
            <IconButton
                color='inherit'
                onClick={() =>
                    setDrawerOpen(drawerOpenState => !drawerOpenState)
                }>
                <SettingsRoundedIcon fontSize='inherit' />
            </IconButton>
            <DocumentDrawer
                title='Utterance Settings'
                drawerOpen={drawerOpen}
                setDrawerOpen={setDrawerOpen}>
                <Typography gutterBottom>Volume</Typography>
                <RTMReaderVolume />

                <Divider sx={{ my: 2 }} variant='middle' flexItem />

                <Typography gutterBottom>Speed</Typography>
                <RTMReaderRate />

                <Divider sx={{ my: 2 }} variant='middle' flexItem />

                <Typography gutterBottom>Voice</Typography>
                <RTMVoicePicker />

                <Divider sx={{ my: 2 }} variant='middle' flexItem />

                <Typography gutterBottom>Text Direction</Typography>
                <Stack direction='row' alignItems='center'>
                    <Typography flexGrow={1}>Right To Left</Typography>
                    <Switch checked={isRtl} onChange={toggleRtl}/>
                </Stack>

                <Divider sx={{ my: 2 }} variant='middle' flexItem />

                <Typography gutterBottom>Text Size</Typography>
                <Stack direction='row' alignItems='center' gap={2}>
                    <IconButton color='inherit' onClick={handleFontSizeDown}>
                        <RemoveRoundedIcon/>
                    </IconButton>
                    <Typography>{fontSize}</Typography>
                    <IconButton color='inherit' onClick={handleFontSizeUp}>
                        <AddRoundedIcon/>
                    </IconButton>    
                </Stack>
            </DocumentDrawer>
        </>
    );
};
