import { useContext, useEffect, useState } from "react";
import { Alert, FlatList, ImageBackground, Platform, Pressable, ScrollView, StyleSheet, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { reqChatAllList, sendRegister } from "../api/chat";
import { AppContext } from "../context/app-context";
import CustomButton from "../custom/custButton";
import FontText from "../custom/fontText";
import globalStyles, { settingStyles } from "../stylesheet";

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { C2A } from "../custom/class2arr";
import ChatItem from "./chatItem";
import { useNavigation } from "@react-navigation/native";

function SimpleChat() {
    const context = useContext(AppContext);
    const [inputTxt, setInputTxt] = useState("");
    const [chatBox, setChatBox] = useState(false);

    const [chats, setChats] = useState();

    const navigation = useNavigation();
    
    useEffect(()=>{
        // console.log(context.auth.idToken)
        if(!context.auth){
            navigation.navigate("account")
            return;
        }
        reqChatAllList(context.auth.idToken)
        .then((rcv)=>{
            onRefresh();
        }).catch(err=>{
            console.log(err)
        })
    },[])

    const onPlus = ()=>{
        setChatBox(current=>setChatBox(!current))
    }

    const onRefresh = ()=>{
        reqChatAllList(context.auth.idToken)
        .then((rcv)=>{
            return C2A(rcv)
        }).then((rst)=>{
            setChats(rst.reverse());
        }).catch(err=>{
            console.log(err)
        })
    }

    const handleRegisterChat = ()=>{
        // console.log(new Date().toLocaleDateString());
        let date = new Date().toLocaleDateString()
        let sliceDate;
        if(Platform.OS === "ios"){
            sliceDate = `${date.split(".")[0]}년 ${date.split(".")[1]}월 ${date.split(".")[2]}일`
        }else{
            sliceDate = `${date.split("/")[2]}년 ${date.split("/")[0]}월 ${date.split("/")[1]}일`
        }
        const data = {
            text : inputTxt,
            email : context.auth.email,
            createdAt : sliceDate
        }
        sendRegister(context.auth.idToken, data)
        .then((rcv)=>{
            console.log(rcv);
            setInputTxt("");
            onRefresh();
        }).catch(err=>{
            Alert.alert(
                "실패", `등록에 실패하였습니다.`,[
                {
                text : "확인"
                ,style : "destructive"
                }
            ]
        );
        })
    }

    // console.log(settingStyles.fontSize - styles.inputTitle.fontSize)

    return (  
        <View style= {globalStyles.container}>
            <View style={styles.inputContainer}>


                <View style={styles.iconContainer}>
                    <Pressable onPress={onRefresh}>
                        <FontText style={styles.inputTitle} title={true}><MaterialCommunityIcons name="refresh" size={28} color="black" /></FontText>
                    </Pressable>
                    <Pressable onPress={onPlus}>
                        <FontText style={styles.inputTitle} title={true}><MaterialCommunityIcons name={chatBox ?"pencil-minus" :"pencil-plus"} size={24} color="black" /></FontText>
                    </Pressable>
                    
                </View>
                {
                    chatBox ? 
                    <>
                    <TextInput style={[globalStyles.inputText,styles.inputBox,{fontSize : styles.inputBox.fontSize ?? settingStyles.fontSize}]} multiline={true} onChangeText={(txt)=>setInputTxt(txt)} value={inputTxt} keyboardType="default" autoCapitalize="none" placeholder="톡을 남겨주세요" maxLength={400}/>
                    <View style={styles.textLength}> 
                        <FontText>{inputTxt.length}/400</FontText>
                    </View>
                    <CustomButton onPress={handleRegisterChat} styleBtn={[globalStyles.button,styles.button]} styleText={[globalStyles.buttonText,styles.buttonText]}>등록</CustomButton>
                    </>
                    :
                    null
                }
            </View>

            <View style={styles.chatsContainer}>
                <FlatList 
                    data={chats} keyExtractor={(one)=>{return one.id}}
                    renderItem={(({index,item}) =>{
                        return (<ChatItem item={item} />)
                    })}
                />
            </View>
        </View>
    );
}

export default SimpleChat;

const styles = StyleSheet.create({
    inputContainer:{
        width : "100%",
    },
    inputBox : {
        color : "#007969", 
        fontFamily : 'GothicA1-Bold',

        borderColor  : "#F2FFFF",
        borderBottomColor : "#007969",
        borderWidth : 1,

        padding : 5,
        // marginBottom : 20,

        lineHeight : 25
    },
    inputTitle : {
        fontSize : 20
    },

    iconContainer :{
        flexDirection : "row",
        justifyContent : "space-between",
        alignItems : "center",
        paddingVertical : 5
    },

    button :{

    },
    buttonText : {
        fontSize : 20
    },

    chatsContainer : {
        flex : 3
    },


    textLength : {
        alignItems : "flex-end"
    }
});