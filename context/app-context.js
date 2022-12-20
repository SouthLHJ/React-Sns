// 로그인 성공시 데이터 저장 (복잡한 앱이 아니므로 redux 사용안함)

import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useEffect, useReducer, useState } from "react";
import { ActivityIndicator } from "react-native";

export const AppContext = createContext({
    auth : {},
    dispatch : authReducer,
    refresh  : {},
    setRefresh : {}
})

// 
const authReducer = (state={}, action) => {
    switch (action.type) {
        case "signIn":
            AsyncStorage.setItem("token",JSON.stringify(action.payload));

            return action.payload;
        case "signOut":
            AsyncStorage.removeItem("token");
            return null;

    }
    return null;
}



// Provider 함수
export function AppContextProvider({ children }) {
    const [auth, dispatch] = useReducer(authReducer,null);
    const [refresh, setRefresh] = useState(false);


    useEffect(()=>{
        async function load(){
            try{
                const data = await AsyncStorage.getItem("token");
                if(data){
                    dispatch({type: "signIn" , payload : JSON.parse(data)})
                }
                setDone(true);

            }catch(e){
                console.log(e)
            }
        }
        load();
        // async function tokenUpdate(){
        //     const data= await AsyncStorage.getItem("token");
        //     if(data){
        //         const recoveryData = JSON.parse(data);
        //         const refreshData = sendRefreshToken(recoveryData.refreshToken);
        //         const combinedData= {
        //             ...recoveryData,
        //             idToken : refreshData.id_Token,
        //             refreshToken : refreshData.refresh_Token
        //         }
        //         context.dispatch({type : "signIn",payload : combinedData});
        //         AsyncStorage.setItem("token",JSON.stringify(combinedData))
        //     }
        // }
        // tokenUpdate();
    },[])

    const [done,setDone] = useState(false);
    if(!done){
        return (<ActivityIndicator size={60}/>)
    }

    return (
        <AppContext.Provider value={{ auth, dispatch ,refresh, setRefresh}}>
            {children}
        </AppContext.Provider>
    )


}