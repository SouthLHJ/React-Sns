import { useState } from "react";
import { Alert, Image, Modal, Pressable, StyleSheet, TextInput, TouchableHighlight, TouchableOpacity, View } from "react-native";
import FontText from "../custom/fontText";
import globalStyles from "../stylesheet";
import {launchCameraAsync,useCameraPermissions,PermissionStatus,launchImageLibraryAsync, useMediaLibraryPermissions} from "expo-image-picker";

import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import CustomButton from "../custom/custButton";
import { useNavigation } from "@react-navigation/native";
import { createStaticMap, getAddresses } from "../api/maps";
import { useRef } from "react";
import { useEffect } from "react";

function ImageAddScreen() {
    const [inputText,setInputText]= useState();
    const [imageUri,setIamgeUri] = useState(null);
    const [mapUri,setMapUri] = useState(null);
    const [modal,setModal]=useState(false);

    const imageBase64Ref = useRef();
    const mapRef = useRef();
    const addressRef = useRef();

    const navigation = useNavigation();

    // 허용 확인
    const [cameraStatus, requestCameraPermission] = useCameraPermissions();
    const [libaryStatus, requestLibaryPermission] = useMediaLibraryPermissions();

    const takeFromCamera = async()=>{
        setIamgeUri(null); setMapUri(null); mapRef.current = null; addressRef.current = null;
        // console.log("카메라", cameraStatus , PermissionStatus.DENIED);
        // 첫 상태 : "granted": false, "status": "denied" /  부여 받은 상태 : granted : true, status : grante
        // 권한 허용 물어보기
        if(cameraStatus.status === PermissionStatus.DENIED ||
            cameraStatus.status === PermissionStatus.UNDETERMINED){
            try{
                const resp = await requestCameraPermission();
                if(!resp.granted){
                    Alert.alert("With","이 기능은 카메라 접근권한이 필요합니다.");
                    return ; // 접근 권한 거절할 때 함수 종료
                }
            }catch(e){
                console.log(e)
                return ; // 접근 권한 거절할 때 함수 종료
            }
        }

        // 카메라 띄우기
        try{
            const result = await launchCameraAsync({
                quality : 0.5,
                allowsEditing : true,
                // aspect : [16, 9],
                exif : true, // 사진 데이터가 불러와진다.
                base64 : true, // 인코딩 byte 값을 문자열로 만들어준다.
            })
            // 취소한게 아니라면,
            if(!result.cancelled){
                // console.log(result.base64)
                imageBase64Ref.current  = result.base64;
                //불러온 파일의 정보에서 GPS 값이 있다면!!!
                if(result.exif.GPSLatitude){
                    takeGpsData(result);
                }
                setIamgeUri(result.uri);
            }
        }catch(e){
            console.log(e)
        }
    }

    const takeFromAlbum = async()=>{
        setIamgeUri(null); setMapUri(null); mapRef.current = null; addressRef.current = null;
        // console.log("앨범",libaryStatus);
        if(libaryStatus.status === PermissionStatus.DENIED ||
            libaryStatus.status === PermissionStatus.UNDETERMINED){
            try{
                const resp = await requestLibaryPermission();
                if(!resp.granted){
                    Alert.alert("With","이 기능은 미디어파일 접근권한이 필요합니다.");
                    return ; // 접근 권한 거절할 때 함수 종료
                }
            }catch(e){
                console.log(e)
                return ; // 접근 권한 거절할 때 함수 종료
            }

        }

        try{
            const result = await launchImageLibraryAsync({
                quality : 0.5,
                allowsEditing : true,
                aspect : [16, 9],
                exif : true, // 사진 데이터가 불러와진다.
                base64 : true, // 인코딩 byte 값을 문자열로 만들어준다.
            })
            if(!result.cancelled){
                // console.log("???",result.exif);
                imageBase64Ref.current  = result.base64;
                if(result.exif.GPSLatitude){
                    takeGpsData(result);
                }
            
                setIamgeUri(result.uri);
            }
        }catch(e){
            console.log(e)
        }
    }

    // console.log(mapRef.current)
    const takeGpsData = (result)=>{
        const lat = result.exif.GPSLatitude;
        const lng = result.exif.GPSLongitude;
        // console.log(lat,lng)
        mapRef.current = {uri : createStaticMap(lat,lng,18), lat, lng};

        getAddresses(lat,lng).then((res)=>{
            addressRef.current = res?.formatted_address
        })

        Alert.alert(
            "", "사진에 있는 정보를 기반으로 위치 사진을 받아오시겠습니까?", [{
                text : "취소"
            },{
                text : "확인", onPress : ()=>setModal(true),
            }]
        )
    }

    const onRegister = ()=>{
        let data;
        if(mapUri){
            data = {
                image : imageUri,
                text : inputText,
                imageBase64 : imageBase64Ref.current,
                map : mapUri,
                address : addressRef.current,
                lat : mapRef.current.lat,
                lng : mapRef.current.lng,

            }
        }else {
            data = {
                image : imageUri,
                text : inputText,
                imageBase64 : imageBase64Ref.current,
            }
        }
        navigation.navigate("writePosterMain",data)
    }

    return (  
        <View style={globalStyles.container}>
            <View style={styles.inputContainer}>
                <TextInput style={[globalStyles.inputText,styles.inputBox]} multiline={true}  maxLength={30}
                        keyboardType="default" autoCapitalize="none" placeholder="이미지에 대해 설명해주세요 (30자 제한)"
                        onChangeText={(txt)=>setInputText(txt)} value={inputText}
                />
            </View>

            <View style={styles.freeViewContainer}>
                {imageUri ? <Image style={{flex:1}} source={{uri : imageUri}} /> : 
                <View style={{flex : 1, justifyContent : "center", alignItems : "center"}}><FontText bold="extra">No image</FontText></View>}
            </View>

            { mapUri ? <FontText>{addressRef.current}</FontText> : null }

            <View style={styles.iconContainer}>
                <TouchableOpacity onPress={takeFromCamera}>
                    <AntDesign name="camera" size={24} color="black" />
                </TouchableOpacity>

                <TouchableOpacity onPress={takeFromAlbum}>
                    <Entypo name="folder-images" size={24} color="black" />
                </TouchableOpacity>
            </View>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modal}
            >
                 <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Image style={{flex:1}} source={{uri : mapRef.current?.uri}} />
                        <TextInput style={styles.modalAddressText} multiline={true} onChangeText={(txt)=>addressRef.current = txt} defaultValue={addressRef.current}/>
                        <TouchableOpacity style={styles.modalButton} onPress={()=>{setMapUri(mapRef.current?.uri); setModal(false);}}>
                            <FontText style={{textAlign : "center"}} bold="extra">첨부</FontText>
                        </TouchableOpacity>
                    </View>
                 </View>
            </Modal>

            <View style={styles.buttonContainer}>
                <CustomButton onPress={onRegister} >첨부</CustomButton>
            </View>
        </View>
    );
}

export default ImageAddScreen;

const styles = StyleSheet.create({
    inputContainer :{
        marginBottom : 5,
    },
    inputBox :{
        width : "100%",

        paddingBottom : 5,

        borderColor : "#F2FFFF",
        borderBottomColor : "#007969",
        borderWidth : 2
    },

    freeViewContainer :{
        height : 200,

        backgroundColor : "white",
        marginBottom : 5,


    },

    iconContainer  :{
        flex : 1,
        flexDirection : "row",
        justifyContent : "space-evenly",
    },

    buttonContainer :{

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
        paddingHorizontal: 5,
        paddingVertical : 5,

        backgroundColor: "white",
        backgroundColor : "#007969",
        borderRadius: 5,
        borderWidth : 1,

        width : 250,
        height : 300,
        
        overflow : "hidden",
        // alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    modalAddressText :{
        height : 40,

        backgroundColor : "white",
        
    },

    modalButton  :{
        paddingVertical : 8,
        backgroundColor : "white",
        borderColor : "white",
        borderTopColor : "#007969",
        borderWidth : 1
    },
});