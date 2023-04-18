import styles from './RTMVoicePicker.module.scss';
import {
    FormControl,
    MenuItem,
    Select,
    SelectChangeEvent,
} from '@mui/material';
import { useState } from 'react';
import RTMSynthesis from '../../services/RTMSynthesis';

const DEFAULT_VALUE = { name: 'Default' };

export const RTMVoicePicker = () => {
    const [pickerVoice, setPickerVoice] = useState<
        Partial<SpeechSynthesisVoice>
    >(() => RTMSynthesis.activeVoice || DEFAULT_VALUE);

    const handleChange = (event: SelectChangeEvent) => {
        console.log(event.target.value);

        const newVoice = RTMSynthesis.voices.find(
            sVoice => sVoice.name === event.target.value
        );
        RTMSynthesis.activeVoice = newVoice || null;
        setPickerVoice(newVoice || DEFAULT_VALUE);
    };

    return (
        <FormControl sx={{ m: 1, minWidth: 120 }} size='small'>
            <Select
                value={pickerVoice.name}
                onChange={handleChange}
                MenuProps={{ sx: { height: 300, width: 200 } }}>
                <MenuItem value={DEFAULT_VALUE.name}>
                    {DEFAULT_VALUE.name}
                </MenuItem>
                {RTMSynthesis.voices.map((voice, idx) => (
                    <MenuItem key={voice.name} value={voice.name} sx={{color: voice.localService ? 'green' : 'red'}}>
                        <div title={voice.name} className={styles.voiceName}>
                            {voice.name}
                        </div>
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};
