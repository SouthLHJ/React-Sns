import axios from "axios";
import {Buffer} from "buffer";

const endPoint = "https://firebasestorage.googleapis.com/v0/b/reactnative-with.appspot.com/o"

export async function saveStorageImage(data,fileData){
    //1. 파일 업로드 (스토리지에 전송)
    const fileName = data.uri.substring(data.uri.lastIndexOf("/")+1);
    const ex  = data.uri.substring(data.uri.lastIndexOf(".")+1);

    const uploadResult = await axios({url : `${endPoint}/${fileName}`,
        method : "post",
        headers : {
            "content-type" : `image/${ex}`
        },
        data :Buffer.from(fileData,"base64")
    })

    const imageUrl = `${endPoint}/${uploadResult.data.name}?alt=media`
    return imageUrl;
    //2. 데이터 저장 (realtime DB에 저장[토큰 같은거])
} 