export class RTMStorage {
  static setItem = (key: string, value: any) => {
    if (!value) {
      this.removeItem(key);
    }
    value = JSON.stringify(value);
    localStorage.setItem(key, value);
  };

  static getItem = (key: string): any => {
    return JSON.parse(localStorage.getItem(key) as string);
  };

  static removeItem = (key: string) => {
    localStorage.removeItem(key);
  };
}
