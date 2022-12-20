import axios from "axios";

const APP_KEY = process.env.REACT_APP_FIRBASE_AUTH_KEY;

/** 작성*/
export  const writePoster = async(idToken ,data)=>{
        const rcv = await axios.post(`https://reactnative-with-default-rtdb.asia-southeast1.firebasedatabase.app/poster.json?auth=${idToken}`,data)
        return rcv.data

}

/** 전체가져오기*/ 
export  const readAllPoster = async()=>{
        const rcv = await axios.get(`https://reactnative-with-default-rtdb.asia-southeast1.firebasedatabase.app/poster.json`)
        return rcv.data
}

/** 하나가져오기 */ 
export  const readOnePoster = async(id)=>{

    const rcv = await axios.get(`https://reactnative-with-default-rtdb.asia-southeast1.firebasedatabase.app/poster/${id}.json`)
    return rcv.data

}

/**특정데이터 수정 (put : 덮어쓰기) */ 
export  const editPoster = async(id,idToken,data)=>{

    const rcv = await axios.put(`https://reactnative-with-default-rtdb.asia-southeast1.firebasedatabase.app/poster/${id}.json?auth=${idToken}`,data)
    return rcv.data

}

/**특정데이터 수정 (patch : 일부만 수정) */ 
export const editOnePoster = async(id,idToken,data)=>{
    // console.log("댓글입력",id,idToken,data)
    const rcv = await axios.patch(`https://reactnative-with-default-rtdb.asia-southeast1.firebasedatabase.app/poster/${id}.json?auth=${idToken}`,data)
    return rcv.data

}

/**하나 삭제하기 */ 
export  const deletePoster = async(id,idToken)=>{
    const rcv = await axios.delete(`https://reactnative-with-default-rtdb.asia-southeast1.firebasedatabase.app/poster/${id}.json?auth=${idToken}`)
    return rcv.data

}