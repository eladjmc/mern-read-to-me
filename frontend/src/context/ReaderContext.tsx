import React, { SetStateAction, createContext, useContext, useEffect, useState } from 'react';
import { RTMStorage } from '../services/RTMStorage';
import RTMSynthesis from '../services/RTMSynthesis';

export const READER_STORAGE_KEY = 'reader_state';

interface ReaderProviderProps {
    children: React.ReactNode;
}

interface ReaderContextProps {
    volume: number;
    setVolumeLevel: (volumeLevel: number) => void;
    isRtl: boolean;
    toggleRtl: () => void;
    fontSize: number;
    handleFontSizeUp: () => void; //SetStateAction<number>;
    handleFontSizeDown: () => void; //SetStateAction<number>;
    currentText: string;
    setCurrentText: (text: string) => void;
}

const ReaderContext = createContext<ReaderContextProps>({
    volume: 80,
    setVolumeLevel: () => null,
    isRtl: false,
    toggleRtl: () => null,
    fontSize: 16,
    handleFontSizeUp: () => null,
    handleFontSizeDown: () => null,
    currentText: '',
    setCurrentText: () => {},
});

const getDefaultVolume = () => RTMStorage.getItem('reader_state')?.volume || 80;
const getDefaultCurrentText = () => RTMStorage.getItem('reader_state')?.currentText || '';
const getDefaultIsRTL = () => RTMStorage.getItem('reader_state')?.isRtl || false;
const getDefaultFontSize = () => RTMStorage.getItem('reader_state')?.fontSize || 16;

const ReaderProvider: React.FC<ReaderProviderProps> = ({ children }) => {
    const [volume, setVolume] = useState<number>(getDefaultVolume);
    const [currentText, setCurrentText] = useState<string>(getDefaultCurrentText);
    const [isRtl, setIsRtl] = useState<boolean>(getDefaultIsRTL);
    const [fontSize, setFontSize] = useState<number>(getDefaultFontSize);

    useEffect(() => {
        setVolumeLevel(volume);
    }, [])
    

    useEffect(() => {

        RTMStorage.setItem(READER_STORAGE_KEY, {
            volume,
            isRtl,
            fontSize,
            currentText,
        });
    }, [volume, isRtl, fontSize, currentText]);

    const handleFontSizeUp = () => setFontSize(state => Math.min(42, state + 2));
    const handleFontSizeDown = () => setFontSize(state => Math.max(10, state - 2));
    const toggleRtl = () => setIsRtl(state => !state);

    const setVolumeLevel = (volumeLevel: number) => {
        RTMSynthesis.setUtteranceVolume(volumeLevel / 100);
        setVolume(volumeLevel);
    }

    return (
        <ReaderContext.Provider
            value={{
                volume,
                setVolumeLevel,
                isRtl,
                toggleRtl,
                fontSize,
                handleFontSizeUp,
                handleFontSizeDown,
                currentText,
                setCurrentText,
            }}>
            {children}
        </ReaderContext.Provider>
    );
};

export const useGlobalReader = () => {
    return useContext(ReaderContext);
};

export { ReaderContext, ReaderProvider };
