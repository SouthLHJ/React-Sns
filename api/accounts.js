import axios from "axios";

const APP_KEY = process.env.REACT_APP_FIRBASE_AUTH_KEY;

export const sendAccountRegister = async (email, password) => {

    const data = {
        email: email,
        password: password,
        returnSecureToken: true
    }

    // console.log(data)
        const rcv = await axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${APP_KEY}`, data)

        return rcv.data

}

export const sendAccountSignIn = async (email, password) => {

    const data = {
        email: email,
        password: password,
        returnSecureToken: true
    }

    // console.log(data)
    try {
        const rcv = await axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${APP_KEY}`, data)

        return {result : true , data : rcv.data}
        
    } catch (e) {
        return {result : false , data : e}
    }


}

/** 유저 개인 내용 */
export async function setAccountUserData (idToken,folder,data){

        const rcv = await axios.post(`https://reactnative-with-default-rtdb.asia-southeast1.firebasedatabase.app/${folder}.json?auth=${idToken}`,data)
        return rcv.data

}
// 