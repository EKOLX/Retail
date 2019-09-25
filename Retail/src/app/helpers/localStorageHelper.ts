export class LocalStorageHelper {
  static checkDataByKey(key: string): boolean {
    return localStorage.length > 0 && localStorage.getItem(key).length > 0;
  }

  static getDataByKey(key: string): any {
    const jsonData: string = localStorage.getItem(key);
    return JSON.parse(jsonData);
  }

  static setDataByKey(key: string, data: any) {
    const jsonData: string = JSON.stringify(data);
    localStorage.setItem(key, jsonData);
  }
}
