export function C2A (data){
    if(data){
        const keys = Object.keys(data);
        let arr = [];
        keys.forEach((one)=>{
            let save = data[one];
            save.id = one;
            arr.push(save)
        })
        return arr;
    }else{
        return;
    }
}