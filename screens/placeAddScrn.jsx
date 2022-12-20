import { useState } from "react";
import { Image, Pressable, StyleSheet, TextInput, TouchableHighlight, TouchableOpacity, View } from "react-native";
import {getCurrentPositionAsync,useForegroundPermissions,PermissionStatus} from 'expo-location';
import FontText from "../custom/fontText";
import globalStyles from "../stylesheet";

import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

import { createStaticMap, getAddresses } from "../api/maps";
import CustomButton from "../custom/custButton";
import { useNavigation } from "@react-navigation/native";
import ChooseLocation from "../components/chooseLocation";
import { useRef } from "react";
import { useEffect } from "react";

function PlaceAddScreen({route}) {
    const [inputText,setInputText]= useState();
    const [mapUri, setMapUri] = useState();
    const [choose, setChoose] =useState(true);
    const [address, setAddress] = useState();

    const latRef = useRef();
    const lngRef = useRef();

    const navigation  = useNavigation();
    // Permission 허용받기
    const [locationPermission, requestLocationPermission] = useForegroundPermissions();

    useEffect(()=>{
        !async function(){
            await takeLatLng();
        }
        if(route.params){
            latRef.current= route.params.map.lat;
            lngRef.current= route.params.map.lng;

            setMapUri(route.params.map.uri);
            setAddress(route.params.map.text);
        }
    },[route])

    const takeFromLocation = async()=>{
        if(locationPermission.status === PermissionStatus.UNDETERMINED ||
            locationPermission.status === PermissionStatus.DENIED){
                const permission = await requestLocationPermission();
                if(!permission.granted){
                    return ;
                }
        }
        await takeLatLng();
        const mapUri = createStaticMap(latRef.current,lngRef.current);
        setMapUri(mapUri);
        getAddresses(latRef.current,lngRef.current).then((res)=>{
            inputText ?? setInputText(res?.formatted_address)
            setAddress(res?.formatted_address)
        })
    }

    const takeLatLng = async() =>{
        try{
            const rcv =  await getCurrentPositionAsync();
            latRef.current = rcv.coords.latitude;
            lngRef.current = rcv.coords.longitude;
        }catch(e){
            console.log(e);
        }
    }

    const onChooseUri = (coordinate)=>{
        const mapUri = createStaticMap(coordinate.latitude, coordinate.longitude,18);
        latRef.current = coordinate.latitude;
        lngRef.current = coordinate.longitude;
        setMapUri(mapUri);
        getAddresses(coordinate.latitude,coordinate.longitude).then((res)=>{
            setInputText(res?.formatted_address)
            setAddress(res?.formatted_address)
        })
        setChoose(false);
        // console.log("place",latRef.current,lngRef.current)
    }



    const onRegister = ()=>{
        navigation.navigate("writePosterMain",{map : mapUri, text : inputText, lat : latRef.current, lng : lngRef.current})
    }


    return (  
        <View style={globalStyles.container}>
            <View style={styles.inputContainer}>
                <TextInput style={[globalStyles.inputText,styles.inputBox]} multiline={false}  maxLength={30}
                        keyboardType="default" autoCapitalize="none" placeholder="장소에 대해 설명해주세요"
                        onChangeText={(txt)=>setInputText(txt)} value={inputText}
                />
            </View>

            <View style={styles.freeViewContainer}>
                {choose ? <View style={{flex: 1}}><ChooseLocation lat={latRef.current} lng={lngRef.current} onChooseUri={onChooseUri}/></View>
                    : 
                    <Image style={{flex:1}} source={{uri : mapUri}} />
                }
                
            </View>

            <View style={styles.iconContainer}>
                <TouchableOpacity onPress={async()=>{await takeLatLng(); setChoose(true); setInputText(""); }}>
                    <Entypo name="location" size={24} color="black" />
                </TouchableOpacity>

                <TouchableOpacity onPress={()=>{takeFromLocation(); setChoose(false);}}>
                    <MaterialIcons name="gps-fixed" size={24} color="black" />
                </TouchableOpacity>
            </View>


            <View>
                <CustomButton onPress={onRegister}>첨부</CustomButton>
            </View>
        </View>
    );
}

export default PlaceAddScreen;

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
        height : 400,

        backgroundColor : "white",
        marginBottom : 5,


    },

    iconContainer  :{
        flex : 1,
        flexDirection : "row",
        justifyContent : "space-evenly",
    },
});