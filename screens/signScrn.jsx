import { useNavigation } from "@react-navigation/native";
import { useContext, useEffect, useRef, useState } from "react";
import { ActivityIndicator, Alert, StyleSheet, TextInput, View } from "react-native";
import { sendAccountSignIn } from "../api/accounts";
import { AppContext } from "../context/app-context";
import CustomButton from "../custom/custButton";
import FontText from "../custom/fontText";
import globalStyles from "../stylesheet";



function SignScreen() {
    const context = useContext(AppContext);
    const navigation =useNavigation();

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    
    const [load, setLoad] = useState(false);
    
    const inputRef = useRef();
    

    const handleSignin = ()=>{
        // console.log(email, password);
        setLoad(true);
        if(email && password){
            sendAccountSignIn(email,password)
             .then((rcv)=>{
                // console.log(rcv);
                setLoad(false)
                if(rcv.result){
                    Alert.alert(
                        "성공", `어서오세요! ${rcv.data.email} 님`,[
                            {
                            text : "확인", onPress : ()=>{setEmail(""); setPassword(""); context.dispatch({type : "signIn", payload : rcv.data}); navigation.navigate("home");}
                            ,style : "destructive"
                            }
                        ]
                    )
                }else{
                    Alert.alert(
                        "실패", `이메일이나 비밀번호가 틀렸습니다.`,[
                        {
                        text : "확인", onPress : ()=>{setEmail(""); setPassword("");inputRef.current.focus();}
                        ,style : "destructive"
                        }
                    ]);
                }
            })
            .catch(err=>{
                // console.log(err)
                Alert.alert(
                    "실패", `이메일이나 비밀번호를 확인해주시길 바랍니다.`,[
                    {
                    text : "확인", onPress : ()=>{setEmail(""); setPassword("");inputRef.current.focus();}
                    ,style : "destructive"
                    }
                ]
            );
            setLoad(false)
            }
            )
        }else{
            Alert.alert(
                "실패", `이메일이나 비밀번호를 확인해주시길 바랍니다.`,[
                {
                text : "확인", onPress : ()=>{setEmail(""); setPassword("");inputRef.current.focus();}
                ,style : "destructive"
                }
            ])
            setLoad(false)
        }
    }


    
    let spinner;
    if(load){
        spinner = (
        <View>
            <ActivityIndicator size={48} />
        </View>
        )
    }

    return (  
        <View style={[globalStyles.container,styles.container]}>
            <View style={styles.emailCont}>
                <FontText style={styles.inputTitle}  title={true}>이메일</FontText>
                <TextInput style={[globalStyles.inputText,styles.inputBox]} onChangeText={(txt)=>setEmail(txt)} value={email} keyboardType="email-address" autoCapitalize="none" ref={inputRef} />
            </View>

            <View style={styles.passwordCont}>
                <FontText style={styles.inputTitle} title={true}>비밀번호</FontText>
                <TextInput style={[globalStyles.inputText,styles.inputBox]} onChangeText={(txt)=>setPassword(txt)} value={password} autoCapitalize="none" keyboardType="default"/>
            </View>

            {load ? spinner : null}

            <View style={styles.buttonCont}>
                <CustomButton onPress={handleSignin} styleBtn={[globalStyles.button,styles.button]} styleText={[globalStyles.buttonText,styles.buttonText]}>로그인</CustomButton>
            </View>

        </View>
    );
}

export default SignScreen;

const styles = StyleSheet.create({
    container : {
        paddingTop : 50,
        alignItems : "center"
    },  
    emailCont:{
        width : "80%"

    },
    passwordCont:{
        width : "80%"

    },
    buttonCont:{
        flex : 2,
        width : "100%",

        justifyContent : "flex-end"
    },
    inputTitle:{
        fontSize : 20,
        textAlign : "center",
        color : "#007969"

    },

    inputBox : {
        color : "#007969", 
        fontFamily : 'GothicA1-Bold',

        borderColor  : "#F2FFFF",
        borderBottomColor : "#007969",
        borderWidth : 1,

        padding : 5,
        marginBottom : 20

    },
    button : {
        
    },
    buttonText : {
        fontSize : 20
    }

});
