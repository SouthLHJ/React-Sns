import { useRef, useState } from "react";
import { useEffect } from "react";
import { FlatList, Image, Pressable, ScrollView, StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import { editOnePoster, readOnePoster } from "../api/poster";
import FontText from "../custom/fontText";

import { AntDesign } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import globalStyles from "../stylesheet";
import { useContext } from "react";
import { AppContext } from "../context/app-context";
import PosterComment from "./posterComment.jsx";
import PosterMedia from "./posterMedia";

function DetailPoster({navigation,route}) {
    const [item, setItem] = useState();
    const [viewImage,setViewImage] = useState(false);
    const [viewMap,setViewMap] = useState(false);
    const [focus, setFocus] = useState(false);

    // const [inputText, setInputText] = useState();
    const inuptTextRef = useRef();

    const context = useContext(AppContext);

    useEffect(()=>{
        const data = route.params.item;
        readOnePoster(data.id)
        .then((rcv)=>{
            rcv.id = data.id;
            setItem(rcv)
        }).catch(err=>console.log(err))
    },[])


    const onRegister = ()=>{
        if(!inuptTextRef.current){
            return;
        }
        
        console.log(inuptTextRef.current);
        const newComment = {email : context.auth.email, text : inuptTextRef.current}
        const data = item.comment ? {comment :[...item.comment,newComment]} : {comment : [newComment]}
        editOnePoster(item.id,context.auth.idToken,data)
        .then((rcv)=>{
            inuptTextRef.current = null;
            onRefresh();
            
        }).catch(err=>console.log(err))  
    }

    const onRefresh = ()=>{
        console.log("?")
        readOnePoster(item.id)
        .then((rcv)=>{
            rcv.id = item.id;
            // console.log(rcv);
            setItem(rcv)
        }).catch(err=>console.log(err))
    }

    const onViewImageText = ()=>{
        setViewImage(!viewImage);
    }

    const onViewMapText = ()=>{
        setViewMap(!viewMap);
    }


    if(!item){
        return(
            null
        )
    }

    
     

    // console.log(item)

    return (
        <View style={globalStyles.container}>
            {focus ? 
            <></>
            :
            <>
                <View style={styles.titleContainer}>
                    <FontText style={styles.titleText} bold="extra">{item.title}</FontText>
                    <View style={{flexDirection: "row"}}>
                        <FontText style={styles.emailText}>{item.email}</FontText>
                    </View>
                </View>

                <View style={styles.bodyContainer}>
                    <PosterMedia item={item} onViewImageText={onViewImageText} viewImage={viewImage} onViewMapText={onViewMapText} viewMap={viewMap}/>
                    <FontText style={styles.bodyText}>{item.contents.text}</FontText>
                </View>

                <View style={styles.bottomContainer}>
                    <View style={{flexDirection :"row", alignItems : "center"}}>
                        {context.auth?.email == item.email ? null : 
                            <TouchableOpacity onPress={()=>onHeart(item)}>
                                <FontText><AntDesign name={item.heart.includes(context.auth?.email) ? "heart" : "hearto"} size={18} color="red" /></FontText>
                            </TouchableOpacity>
                        }
                    </View>
                    
                    <FontText style={styles.bottomText}>{item.createdAt}</FontText>
                </View>
            </>
            } 
            <View >
                <View style = {styles.inputCmtContainer}>
                    <TextInput style={[globalStyles.inputText,styles.inputBox]} multiline={true}  maxLength={400}
                        keyboardType="default" autoCapitalize="none" placeholder="댓글을 입력하세요"
                        onChangeText={(txt)=>inuptTextRef.current = txt} value={inuptTextRef.current}
                        onFocus={()=>setFocus(true)}
                       
                    />
                    <TouchableOpacity onPress={onRegister}>
                        <FontText>게시</FontText>
                    </TouchableOpacity>
                </View>
            </View>
            {
                focus ? 
                    <View style={styles.commentContainer}>
                        <TouchableOpacity style={{alignItems :"flex-end"}} onPress={()=>setFocus(false)}> 
                            <FontText>댓글창 내리기</FontText>
                        </TouchableOpacity>
                        <PosterComment item={item} onRefresh={onRefresh}/>
                    </View>
                :
                    <View style={{flexDirection : "row"}}>
                        <TouchableOpacity  onPress={()=>setFocus(true)}>
                            <FontAwesome name="comment" size={18} color="#007969" />  
                        </TouchableOpacity>
                        <FontText>{item.comment?.length}</FontText>
                    </View>

            }
        </View>
    );
}

export default DetailPoster;

const styles = StyleSheet.create({
    container : {
        flex : 1,
        margin : 5,
        padding : 10,
        
        borderColor : "#007969",
        borderWidth : 2,
        borderRadius : 8,

    },
    titleContainer : {
        flexDirection:"row",
        justifyContent : "space-between",
        alignItems : "flex-end",

        paddingBottom : 5,
        marginBottom : 5,

        borderColor : "#F2FFFF",
        borderBottomColor : "#00B9A0",
        borderWidth : 1
    },
    titleText:{
        fontSize : 16,
    },
    emailText:{
        fontSize : 12
    },

    bodyContainer :{
        padding : 5
    },
    bodyText : {
        lineHeight : 21,
        marginTop : 20,
    },
    bottomContainer :{
        flexDirection  : "row",
        justifyContent : "space-between",
        alignItems  : "flex-end",

        paddingTop : 5,

        borderColor : "#F2FFFF",
        borderTopColor : "#00B9A0",
        borderWidth : 1
    },
    bottomText: {
        fontSize : 12,
        color : "#00B9A0",
    },




    commentContainer :{
        flex: 1,
        padding : 5,
    },  

    inputCmtContainer :{
        flexDirection  : "row",
        justifyContent : "center",
        alignItems : "center",

        padding : 5,

        borderColor : "#00B9A0",
        borderWidth : 1,
        borderRadius : 12,

        
    },
    inputBox :{
        width : "85%",      

    },
    

});