import axios from "axios";

const APP_KEY = process.env.REACT_APP_FIRBASE_AUTH_KEY;

/** 팔로우 관리 수정*/
export async function editFollow(data){
    try{
        const rcv = await axios.patch(`https://reactnative-with-default-rtdb.asia-southeast1.firebasedatabase.app/follower.json?auth=${idToken}`,data)
        return rcv.data
    }catch(e){
        return e
    }

}