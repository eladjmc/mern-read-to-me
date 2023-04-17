import { useEffect, useState } from 'react';
import { Divider, IconButton, Typography } from '@mui/material';
import SettingsVoiceRoundedIcon from '@mui/icons-material/SettingsVoiceRounded';
import { DocumentDrawer } from '../RTMDrawer/DocumentDrawer';
import { RTMReaderVolume } from '../RTMReaderVolume/RTMReaderVolume';
import { RTMReaderRate } from '../RTMReaderRate/RTMReaderRate';
import { RTMVoicePicker } from '../RTMVoicePicker/RTMVoicePicker';

interface RTMUtteranceSettingsProps {
    onDrawerOpenState?: (...args: any[]) => void;
}

export const RTMUtteranceSettings = ({onDrawerOpenState}: RTMUtteranceSettingsProps) => {
    const [drawerOpen, setDrawerOpen] = useState(false);


    useEffect(() => {
        onDrawerOpenState?.(drawerOpen);
    }, [drawerOpen])

    return (
        <>
            <IconButton
                color='inherit'
                onClick={() =>
                    setDrawerOpen(drawerOpenState => !drawerOpenState)
                }>
                <SettingsVoiceRoundedIcon fontSize='inherit' />
            </IconButton>
            <DocumentDrawer
                title='Utterance Settings'
                drawerOpen={drawerOpen}
                setDrawerOpen={setDrawerOpen}>

                <Typography gutterBottom>Volume</Typography>
                <RTMReaderVolume />

                <Divider sx={{my: 2}} variant='middle' flexItem/>

                <Typography gutterBottom>Rate</Typography>
                <RTMReaderRate/>

                <Divider sx={{my: 2}} variant='middle' flexItem/>

                <Typography gutterBottom>Voice</Typography>
                <RTMVoicePicker/>
                
            </DocumentDrawer>
        </>
    );
};
