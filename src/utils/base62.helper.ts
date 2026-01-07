
const BASE62_CHARS='0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

export function toBase62(num:number):string{
   
    if(num === 0) return '0';
   
    let result = '';
   
    let n = num;
    
    while(n){
        result += BASE62_CHARS[n % 62];
        n = Math.floor(n / 62);
    }
    return result;
}

export function fromBase62(str:string):number{
    let result = 0;

    for(let i = 0;i<str.length;i++){
        const char = str[i];
        let value = BASE62_CHARS.indexOf(char);
        result = result*62 + value;
    }
    
    return result;
}
