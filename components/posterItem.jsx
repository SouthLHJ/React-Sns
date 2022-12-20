import { useContext } from "react";
import { Alert, Image, Modal, Pressable, StyleSheet, TouchableOpacity, View } from "react-native";
import { AppContext } from "../context/app-context";
import FontText from "../custom/fontText";


import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";

function PosterItem({item,onEdit,onDelete,onHeart}) {
    const [modal, setModal] = useState(false);
    const navigation  = useNavigation();

    const context  = useContext(AppContext);

    useEffect(()=>{
        if(!context.auth){
            navigation.navigate("account")
            return;
        }
    },[])

    const moveDetail = (item)=>{
        navigation.navigate("detailPoster", {item : item})
    }

    // 편집 아이콘
    let equ;
    let test=10;

    if(context.auth?.email){
        if(context.auth?.email == item.email){
            test= 0;
            equ = (
                <View style={styles.modalInner}>
                    <Pressable onPress={()=>{setModal(false);onEdit(item);}} style={styles.onEdit}>
                        <FontText style={styles.onEditText}>수정</FontText>
                    </Pressable>
                    <Pressable onPress={()=>{setModal(false);onDelete(item)}}  style={styles.onDelete}>
                        <FontText style={styles.onDeleteText}>삭제</FontText>
                    </Pressable>
                    <Pressable onPress={()=>setModal(false)}  style={styles.onCancel}>
                        <FontText style={styles.onCancelText}>취소</FontText>
                    </Pressable>
                </View>
            )
        }else{
            equ = (
            <View style={styles.modalInner}>
                <Pressable onPress={()=>console.log("아직 기능 없음")} style={styles.onEdit}>
                    <FontText style={styles.onEditText}>퐐로우 취소</FontText>
                </Pressable>
                <Pressable onPress={()=>setModal(false)}  style={styles.onCancel}>
                    <FontText style={styles.onCancelText}>취소</FontText>
                </Pressable>
            </View>)
        }
    }

    // 이미지랑 맵 아이콘
    let media=<></>;
    if(item.contents.image?.uri && item.contents.map?.uri){
        media = (
            <View style= {{height : 100, flexDirection : "row"}}>
                <Image style={{flex : 1,resizeMode : "contain"}} source={{uri : item.contents?.image.uri}}/>
                <Image style={{flex : 1,resizeMode : "contain"}} source={{uri : item.contents?.map.uri}}/>
            </View>
        )
    }else if(item.contents.image?.uri || item.contents.map?.uri){
        if(item.contents.image?.uri){
            media = (
                <View style= {{height : 100, flexDirection : "row"}}>
                    <Image style={{flex : 1,resizeMode : "contain"}} source={{uri : item.contents?.image.uri}}/>
                </View>
            )
        }else{
            media = (
                <View style= {{height : 100, flexDirection : "row"}}>
                    <Image style={{flex : 1,resizeMode : "contain"}} source={{uri : item.contents?.map.uri}}/>
                </View>
            )   
        }
    }

    return (  
        <View style={styles.container}>

            <View style={styles.titleContainer}>
                <FontText style={styles.titleText} bold="extra">{item.title}</FontText>
                <View style={{flexDirection: "row"}}>
                    <FontText style={styles.emailText}>{item.email}</FontText>
                    <Pressable onPress={()=>setModal(true)} style={{marginLeft : 10}}>
                        <Entypo name="dots-three-horizontal" size={13} color="black" />
                    </Pressable>
                </View>
            </View>

            <View style={styles.bodyContainer}>
                {media}
                <FontText style={styles.bodyText}>{item.contents.text}</FontText>
            </View>

            <View style={styles.bottomContainer}>
                <View style={{flexDirection :"row", alignItems : "center"}}>
                    {context.auth?.email == item.email ? null : 
                        <TouchableOpacity onPress={()=>onHeart(item)} style={{flexDirection : "row",alignItems :"center"}}>
                            <FontText><AntDesign name={item.heart.includes(context.auth?.email) ? "heart" : "hearto"} size={18} color="red" /></FontText>
                            <FontText style={{marginLeft : 2}}>{item.heart.length-1}</FontText>
                        </TouchableOpacity>
                    }
                    <Pressable onPress={()=>moveDetail(item)} style={{marginLeft : test ,paddingBottom : 3, flexDirection : "row", alignItems :"center"}} >
                        <FontText ><FontAwesome name="comment" size={18} color="#007969" /></FontText>
                        <FontText style={{marginLeft : 2}}>{item.comment?.length ?? "0"}</FontText>
                    </Pressable>
                </View>
                
                <FontText style={styles.bottomText}>{item.createdAt}</FontText>
            </View>

            
            <Modal
                animationType="slide"
                transparent={true}
                visible={modal}
            >
                 <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        { equ }
                    </View>
                 </View>
            </Modal>
        </View>
    );
}

export default PosterItem;

const styles = StyleSheet.create({
    container : {
        flex : 1,
        margin : 5,
        padding : 10,

        borderColor : "#00B9A0",
        borderWidth : 2,
        borderRadius : 8
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
        flex :1,
        padding : 5,
    },
    bodyText : {
        flex : 1,
        lineHeight : 21
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

    //모달
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 5,
        overflow : "hidden",
        // padding: 35,
        width : 250,
        paddingVertical : 5,

        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    modalInner :{
        flexDirection : "column",
        width : 250
    },
    onEdit :{
        alignItems : "center",

        width : "100%",

        padding : 10,

        borderColor : "white",
        borderBottomColor : "#00B9A0",
        borderWidth : 1,
    },
    onEditText : {
        color : "blue",
        fontSize : 16,

    },
    onDelete : {
        alignItems : "center",

        width : "100%",

        padding : 10,

        borderColor : "white",
        borderBottomColor : "#00B9A0",
        borderWidth : 1,
    },
    onDeleteText :{
        color : "red",
        fontSize : 16
    },
    onCancel :{
        alignItems : "center",

        width : "100%",

        padding : 10,
    },
    onCancelText : {
        color : "black",
        fontSize : 16
    }
});