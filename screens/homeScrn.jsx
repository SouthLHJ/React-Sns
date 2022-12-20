// 사이드 네비게이션 바
import { createDrawerNavigator } from '@react-navigation/drawer';
// 하단 탭 네비게이터
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
const BottomTab = createBottomTabNavigator();

import { useContext, useEffect, useState } from "react";
import { ImageBackground, StyleSheet, View } from "react-native";
import { AppContext } from "../context/app-context";

import {getCurrentPositionAsync,useForegroundPermissions} from 'expo-location';
import {launchCameraAsync,useCameraPermissions,PermissionStatus,launchImageLibraryAsync, useMediaLibraryPermissions} from "expo-image-picker";


// custom
import FontText from "../custom/fontText";
import SettingScreen from './settingScrn';

const Drawer = createDrawerNavigator();

function Main (){
    const context = useContext(AppContext);

    if(!context.auth){
        return (
            <View style={{flex : 1}}>
                <ImageBackground source={require("../assets/home.png")} style={{flex : 1, alignItems : "center",justifyContent :"flex-end"}}>
                    <FontText style={styles.text} title={true}>어서오세요</FontText>
                </ImageBackground>
            </View>
        )
    }else{
        return(
            <View style={{flex : 1}}>
                <ImageBackground source={require("../assets/home.png")} style={{flex : 1, alignItems : "center", justifyContent :"flex-end"}}>
                    <FontText style={styles.text} title={true}>어서오세요</FontText>
                    <FontText style={styles.text} title={true}>{context.auth.email} 님</FontText>
                </ImageBackground>
            </View>
        )
    }

}

function HomeScreen() {
   

    return (  
        <View style={{flex : 1}}>
            {/* <Drawer.Navigator>
                <Drawer.Screen name="main"   options={{title : "메인", headerShown : false}} component={Main} />
                <Drawer.Screen name="setting"   options={{title : "설정", headerShown : false}} component={SettingScreen} />
            </Drawer.Navigator>
             */}
        </View>
    );
}

export default HomeScreen;

const styles = StyleSheet.create({
    text :{
        fontSize : 20,
    }
});
