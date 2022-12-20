import axios from "axios";

const APP_KEY = process.env.REACT_APP_FIRBASE_AUTH_KEY;

export  const reqChatAllList = async(idToken)=>{
    
    // console.log(data)
        const rcv = await axios.get(`https://reactnative-with-default-rtdb.asia-southeast1.firebasedatabase.app/msg.json?auth=${idToken}`)
        return rcv.data

}

export const sendRegister = async(idToken,data)=>{

        const rcv = await axios.post(`https://reactnative-with-default-rtdb.asia-southeast1.firebasedatabase.app/msg.json?auth=${idToken}`,data)
        return rcv.data
}
