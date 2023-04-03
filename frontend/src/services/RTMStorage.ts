
export class RTMStorage {

    static setItem = (key: string, value: any) => {
        value = typeof value === 'string' ? JSON.stringify(value) : value;
        localStorage.setItem(key, value);
    }

    static getItem = (key: string): any => {
        return JSON.parse(localStorage.getItem(key) as string);
    }

    static removeItem = (key: string) => {
        localStorage.removeItem(key);
    }
}