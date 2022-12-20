import { useCallback, useRef, useState } from "react";
import { ActivityIndicator, Alert, Image, Keyboard, StyleSheet, TextInput, TouchableWithoutFeedback, View } from "react-native";
import { sendAccountRegister, setAccountUserData } from "../api/accounts";
import CustomButton from "../custom/custButton";
import FontText from "../custom/fontText";
import globalStyles from "../stylesheet";

// import {Picker} from '@react-native-picker/picker'

function RegisterScreen() {
    const [email, setEmail] = useState();
    const [emailForm, setEmailForm] = useState("gmail.com");
    const [password, setPassword] = useState();
    const [repassword, setRePassword] = useState();

    const inputEmailRef = useRef();
    const inputPasswordRef = useRef();
    const inputRePasswordRef = useRef();


    const [load, setLoad] = useState(false);

    const handleRegister = useCallback(()=>{
        if(!email){
            Alert.alert(
                "실패", `이메일을 입력해주세요`,[
                  {
                    text : "확인", onPress : ()=>{setEmail("");setPassword("");setRePassword("");inputEmailRef.current.focus();}
                  }
                ]
            );
        }else if(password.length < 6){
            Alert.alert(
                "실패", `비밀번호는 6자리 이상입니다.`,[
                  {
                    text : "확인", onPress : ()=>{setPassword("");setRePassword("");inputPasswordRef.current.focus();}
                  }
                ]
            );
        }else if(password === repassword){
            setLoad(true);
            // const sendEamil = `${email}@${emailForm}`;
            const sendEamil = `${email}@gmail.com`;
            // console.log(sendEamil);
            sendAccountRegister(sendEamil,password)
             .then((rcv)=>{
                // console.log("성공",rcv)
                
                const user = {
                    follower : ["none"],
                    profileImage : "none",
                }
                setAccountUserData(rcv.idToken,`user:${email}`,user)
                 .then((rcv)=>{
                    //  console.log(rcv)
                 }).catch(err=>console.log("setAccountUserData : ",err))
                setLoad(false)
                Alert.alert(
                    "성공", `가입 이메일 : ${rcv.email}`,[
                        {
                        text : "확인", onPress : ()=>{setEmail(""); setPassword(""); setRePassword("");}
                        }
                    ]
                )
             })
             .catch(err=>{
                console.log("sendAccountRegister : ",err)
                Alert.alert(
                "실패", `이미 가입되어있는 이메일입니다.`,[
                  {
                    text : "확인", onPress : ()=>{setEmail(""); setPassword(""); setRePassword("");inputEmailRef.current.focus();}
                  }
                ]
                );
                setLoad(false)
                }
              )
        }else{
            Alert.alert(
                "실패", `비밀번호를 다시 확인해주세요`,[
                  {
                    text : "확인", onPress : ()=>{setRePassword("");inputPasswordRef.current.focus();}
                  }
                ]
            );
        }
    })

    let spinner;
    if(load){
        spinner = (
        <View>
            <ActivityIndicator size={48} />
        </View>
        )
    }

    return (  
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={[globalStyles.container,styles.container]}>
            
            <View style={styles.emailCont}>
                <FontText style={styles.inputTitle}  title={true}>이메일</FontText>
                <View style={styles.emailFormCont}>
                    <TextInput style={[globalStyles.inputText,styles.inputBox, {width : "50%"}]} onChangeText={(txt)=>setEmail(txt)} value={email} autoCapitalize="none" keyboardType="email-address" ref={inputEmailRef}/>
                    <FontText style={{color : "#007969", fontFamily : 'GothicA1-Bold',}}>@</FontText>
                    {/* <Picker
                        selectedValue={emailForm}
                        style={{ height: 50, width: 150, color : "#007969", fontFamily : 'GothicA1-Bold',}}
                        onValueChange={(itemValue) =>{setEmailForm(itemValue)}}
                    >
                        <Picker.Item label="gmail.com" value="gmail.com" />
                        <Picker.Item label="naver.com" value="naver.com" />
                    </Picker> */}
                </View>
            </View>

            <View style={styles.passwordCont}>
                <FontText style={styles.inputTitle} title={true}>비밀번호</FontText>
                <TextInput style={[globalStyles.inputText,styles.inputBox]} onChangeText={(txt)=>setPassword(txt)} value={password} autoCapitalize="none" keyboardType="default" ref={inputPasswordRef}/>
            </View>

            <View style={styles.passwordCont}>
                <FontText style={styles.inputTitle} title={true}>비밀번호 재확인</FontText>
                <TextInput style={[globalStyles.inputText,styles.inputBox]} onChangeText={(txt)=>setRePassword(txt)} value={repassword} keyboardType="default" ref={inputRePasswordRef}/>
            </View>

            {load ? spinner : null}
            <Image source={require("../assets/신난모코코.png")} style={{width : "30%", height:"30%"}}/>
            <View style={styles.buttonCont}>
                <CustomButton onPress={handleRegister} styleBtn={[globalStyles.button,styles.button]} styleText={[globalStyles.buttonText,styles.buttonText]}>회원가입</CustomButton>
            </View>


        </View>
        </TouchableWithoutFeedback>
    );
}

export default RegisterScreen;

const styles = StyleSheet.create({
    container : {
        paddingTop : 50,
        alignItems : "center"
    },  

    emailCont:{
        width : "80%",
    },
    emailFormCont :{
        flexDirection :"row",
        justifyContent : "space-between",
        alignItems : "center"
    },
    passwordCont:{
        width : "80%"

    },
    nickCont:{
        width : "80%"

    },
    buttonCont:{
        flex : 3,
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
