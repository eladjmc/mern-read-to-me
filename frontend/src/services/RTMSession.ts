import { RTMStorage } from "./RTMStorage";

export class RTMSession {
    static readonly TOKEN_STORAGE_KEY = 'token';


    static set token(token: string | null) {
        RTMStorage.setItem(RTMSession.TOKEN_STORAGE_KEY, token)
    }

    static get token() {
        return RTMStorage.getItem(RTMSession.TOKEN_STORAGE_KEY);
    }
}