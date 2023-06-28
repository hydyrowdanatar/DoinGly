export function saveData(data: any, key: string): void {
    window.localStorage.setItem(key, JSON.stringify(data));
}

export function getData(key: string){
    const data = window.localStorage.getItem(key);
    if(data){
        return JSON.parse(data);
    }
    return null;
}