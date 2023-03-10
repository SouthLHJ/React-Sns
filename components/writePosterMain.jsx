import { Alert, Image, KeyboardAvoidingView, Pressable,SafeAreaView,ScrollView,StyleSheet, View ,TextInput, Modal, ActivityIndicator} from "react-native";
import { useContext, useEffect, useRef, useState } from "react";
import { useNavigation } from "@react-navigation/native";

import FontText from "../custom/fontText";
import globalStyles from "../stylesheet";

import { Entypo } from '@expo/vector-icons';

import CustomButton from "../custom/custButton";
import { editPoster, writePoster } from "../api/poster";
import { AppContext } from "../context/app-context";
import { saveStorageImage } from "../api/storage";
import { getCurrentPositionAsync } from "expo-location";
import CutsomSpinner from "../custom/customSpinner";

function WritePostetMain({route}) {
    const context = useContext(AppContext);
    const navigation = useNavigation();
    const [modal, setModal] = useState(false);

    const [titleText, setTitleText] = useState();
    const [inputText, setInputText] = useState("");
    const [image, setImage] = useState();
    const [map, setMap] = useState();
    const base64Ref = useRef();
    const itemRef = useRef();

    const [edit, setEdit] = useState(false);

    useEffect(()=>{
        if(route.params){
            if(route.params.item){
                setEdit(true);
                setTitleText(route.params.item.title);
                setInputText(route.params.item.contents.text);
                setImage({uri : route.params.item.contents.image?.uri, text : route.params.item.contents.image?.text})
                setMap({uri : route.params.item.contents.map?.uri, text : route.params.item.contents.map?.text, lat : route.params.item.contents.map?.lat, lng : route.params.item.contents.map?.lng})
                itemRef.current = route.params.item;
            }else if(route.params.image){
                setImage({uri : route.params.image, text : route.params.text})
                base64Ref.current  = route.params.imageBase64;
                if(route.params.map){
                    setMap({uri : route.params.map, text : route.params.address, lat : route.params.lat, lng : route.params.lng})
                }
            }else if(route.params.map){
                setMap({uri : route.params.map, text : route.params.text, lat : route.params.lat, lng : route.params.lng})
            }

        }


    },[route])

    /**????????????*/
    const onRegister = async()=>{
        
        const title = titleText  ? titleText: inputText.slice(0,8) 
        let data = {
            title : title,
            email : context.auth.email,
            contents : {
                text : inputText,
                image : image ?? "none",
                map : map ?? "none"
            },
            heart : [context.auth.email],
            createdAt : edit ? itemRef.current.createdAt : new Date()
        }

        const point = await takePointLatLng();
        console.log(point)
        // ??? ????????? ?????? ?????????... lat, lng ??? ??????????????????...
        if(!map){
            Alert.alert(
                "???????????? ?????? ??????", "?????? ????????? ????????????. ?????? ????????? ????????????????????????? ????????? ?????? ?????? ????????? ???????????? ??????????????? ???????????????.",[{
                    text : "??????" , onPress : ()=>{setModal(true); registerFunc(data);}
                },{
                    text : "??????" , onPress : ()=> {setModal(true);data.contents.map = point ; registerFunc(data);}
                }]
            )
        }else{
            registerFunc(data);
        }
        
    }
    
    const registerFunc = (data)=>{
        if(edit){
            editPoster(itemRef.current.id,context.auth.idToken,data)
            .then((rcv)=>{
                console.log(rcv)
                setTitleText("");setInputText("");setImage(null);setMap(null);base64Ref.current= null;
                setModal(false);
                setEdit(false);
                navigation.navigate("realTimeMain", {load : "loading"})
                
            }).catch((err)=>console.log(err))
        }else{
            if(base64Ref.current){
                saveStorageImage({uri : image.uri},base64Ref?.current)
                    .then((rcv)=>{  
                        let imageUrl = rcv;
                        data.contents.image.uri = imageUrl;
                        // console.log(data);
                        writePoster(context.auth.idToken, data)
                        .then((rcv)=>{
                            // console.log(rcv);
                            setTitleText("");setInputText("");setImage(null);setMap(null);base64Ref.current= null;
                            setModal(false);

                            navigation.navigate("realTimeMain", {load : "loading"})
                        }).catch((err)=>console.log(err))
                }).catch(err=>console.log("writePosterMain_saveStorageImage => ", err))
            }else{
                writePoster(context.auth.idToken, data)
                .then((rcv)=>{
                    console.log(rcv);
                    setTitleText("");setInputText("");setImage(null);setMap(null);base64Ref.current= null;
                    setModal(false);
                    navigation.navigate("realTimeMain", {load : "loading"})
                }).catch((err)=>console.log(err))
            }
        }
    }

    const takePointLatLng = async()=>{
        const rcv = await getCurrentPositionAsync();
        const lat = rcv.coords.latitude;
        const lng = rcv.coords.longitude;

        return {lat, lng}
    }

    const onImage = ()=>{
        if(image){
            Alert.alert(
                "","??????????????? ????????????. ?????????????????????????",[{
                    text : "??????"
                },{
                    text : "??????", onPress : ()=> navigation.navigate("imageAddScreen")
                }]
            )
        }else{
        navigation.navigate("imageAddScreen")
        }
    }

    const onPlaceAdd = ()=>{
        if(map){
            Alert.alert(
                "","??????????????? ????????????. ?????????????????????????",[{
                    text : "??????"
                },{
                    text : "??????", onPress : ()=> navigation.navigate("placeAddScreen",{map})
                }]
            )
        }else{
            navigation.navigate("placeAddScreen")
        }
    }

    let imgText =<></>
    if(image){
        imgText  = <FontText>?????? : {image.text}</FontText>
    }
    let mapText = <></>
    if(map){
        mapText  = <FontText>?????? : {map.text}</FontText>
    }
    
    return (  
        <View style={globalStyles.container}>
        <ScrollView>
            <View style={styles.topContainer}>
                <View style={styles.titleContainer}>
                    <FontText style={{fontSize : 17}}>?????? : </FontText>
                    <TextInput style={[globalStyles.inputText,styles.inputBox, {textAlignVertical: 'center'}]} multiline={false}  maxLength={20}
                            keyboardType="default" autoCapitalize="none" placeholder="????????? ???????????????"
                            onChangeText={(txt)=>setTitleText(txt)} value={titleText}
                        />
                </View>
            </View>
            
            <View style={styles.middleContainer}>
                <KeyboardAvoidingView style={{height : 300}}>
                    <View style={styles.textContainer}>
                            <TextInput style={[globalStyles.inputText,styles.inputBox]} multiline={true}  maxLength={1800}
                                keyboardType="default" autoCapitalize="none" placeholder="????????? ???????????????"
                                onChangeText={(txt)=>setInputText(txt)} value={inputText}
                            />
                    </View>
                    <View style={styles.textLength}> 
                        <FontText>{inputText.length}/1800</FontText>
                    </View>
                </KeyboardAvoidingView>

                <SafeAreaView>
                    <View style={styles.freeViewContainer}>
                        <View  style={{flex :1}}>
                            {image ? <><Image style={{flex:1}} source={{uri : image.uri}} /></> : 
                            <View style={{flex : 1, justifyContent : "center", alignItems : "center"}}><FontText bold="extra">No image</FontText></View>}
                        </View>
                        <View style={{flex :1}}>
                            {map ? <><Image style={{flex:1}} source={{uri : map.uri}} /></> : 
                            <View style={{flex : 1, justifyContent : "center", alignItems : "center"}}><FontText bold="extra">No map</FontText></View>}
                        </View>
                    </View>
                    {imgText}
                    {mapText}
                    <View style={styles.addContainer}>
                        <Pressable onPress={onImage}>
                            <FontText><Entypo name="images" size={24} color="black" /></FontText>
                        </Pressable>
                        
                        <Pressable onPress={onPlaceAdd}>
                            <FontText><Entypo name="map" size={24} color="black" /></FontText>
                        </Pressable>
                    </View>
                </SafeAreaView>
            </View>

            <View style={styles.bottomContainer}>
                <CustomButton onPress={onRegister} styleBtn={[globalStyles.button,styles.button]} styleText={[globalStyles.buttonText,styles.buttonText]}>{edit ? "????????????": "??????"}</CustomButton>
            </View>
        </ScrollView>
           <CutsomSpinner modal={modal} />
        </View>
    );
}

export default WritePostetMain;

const styles = StyleSheet.create({
    topContainer: {
        padding : 5,
    },
    middleContainer: {
        flex :1,

        padding : 5,

        // borderColor : "#007969",
        // borderWidth : 1,
    },
    titleContainer :{
        flexDirection : "row",
        alignItems : "center",

        width : "100%",

        borderColor : "#F2FFFF",
        borderWidth : 1
    },
    textContainer :{
        flex : 1,

        padding : 5,

        borderColor : "#007969",
        borderWidth : 1,
    },
    addContainer:{
        flexDirection : "row",
        alignItems : "flex-end",
        justifyContent : "space-evenly",

        padding : 10
    },
    inputBox :{
        lineHeight : 21,
        width : "100%",

    },


    bottomContainer : {
    },

    button : {
        
    },
    buttonText : {
        fontSize : 20
    },

    
    freeViewContainer :{
        flexDirection: "row",

        height : 100,
        backgroundColor : "white",
        marginBottom : 5,
    },


    textLength : {
        alignItems : "flex-end"
    }
});