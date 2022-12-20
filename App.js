// 하단 탭 네비게이터
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
const BottomTab = createBottomTabNavigator();
// 상단 스택 네비게이터
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();
// 상단 탭 네비게이터
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
const TopTab = createMaterialTopTabNavigator();

import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {useFonts} from "expo-font";

import ChatScreen from './screens/chatScrn';
import Follower from './screens/follower';

//icons
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import SignScreen from './screens/signScrn';
import RegisterScreen from './screens/registerScrn';
import HomeScreen from './screens/homeScrn';
import { AppContext, AppContextProvider } from './context/app-context';
import { useContext, useEffect, useState } from 'react';
import SignOut from './screens/signout';

//로그인 화면 결정
function AccountStackNav(){ 
  const {auth} = useContext(AppContext);

  return (
    <>
    { auth ? <SignOut />:
      <TopTab.Navigator screenOptions={{tabBarLabelStyle : {fontFamily : "GothicA1-Bold", fontSize : 15} ,tabBarStyle : {paddingTop:  20,}}}>
        <TopTab.Screen name='signin' component={SignScreen} options={{title : "로그인"}}/>
        <TopTab.Screen name='register' component={RegisterScreen} options={{title : "회원가입"}}/>
      </TopTab.Navigator> 
      
    }
    </>
  )
}

function BottomTabNav (){
  const context = useContext(AppContext);




  return (
    <BottomTab.Navigator screenOptions={{tabBarLabelStyle :{fontFamily : "BlackHanSans-Regular", paddingBottom : 5}, tabBarActiveTintColor:"#007969"} } initialRouteName={context.auth ? "home" : "account"}>
      <BottomTab.Screen name="home" component={HomeScreen} options={{title: "홈", headerShown : false,
        tabBarIcon :({color})=>{return <Ionicons name="home" size={24} color={color} />}           }} />
    { context.auth ? 
      <>
        <BottomTab.Screen name="chat"  options={{title : "채팅", headerShown : false,
        tabBarIcon :({color})=>{return <Entypo name="chat" size={24} color={color} />} }} component={ChatScreen} 
        />
        <BottomTab.Screen name="follower"  options={{title : "팔로워", headerShown : false, 
        tabBarIcon :({color})=>{return  <MaterialCommunityIcons name="hand-heart" size={24} color={color} />}
        }} component={Follower}
        />
      </>
      :
      null
    }
      

      <BottomTab.Screen name="account" component={AccountStackNav} options={{title: context.auth ? "로그아웃" : "로그인", headerShown : false,
      tabBarIcon :({color})=><FontAwesome name="user-circle" size={24} color={color} />           }}/>

    </BottomTab.Navigator>
  )
}


export default function App() {
  //폰트
  const [fontsLoaded] = useFonts({
    'GothicA1-Black': require('./assets/fonts/GothicA1-Black.ttf'),
    'GothicA1-Bold': require('./assets/fonts/GothicA1-Bold.ttf'),
    'GothicA1-ExtraBold': require('./assets/fonts/GothicA1-ExtraBold.ttf'),
    'GothicA1-SemiBold': require('./assets/fonts/GothicA1-SemiBold.ttf'),
    'GothicA1-Light': require('./assets/fonts/GothicA1-Light.ttf'),
    'GothicA1-Medium': require('./assets/fonts/GothicA1-Medium.ttf'),
    'GothicA1-Regular': require('./assets/fonts/GothicA1-Regular.ttf'),
    'GothicA1-Thin': require('./assets/fonts/GothicA1-Thin.ttf'),
    "BlackHanSans-Regular"  : require('./assets/fonts/BlackHanSans-Regular.ttf'),
    "Jua-Regular" :  require('./assets/fonts/Jua-Regular.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <AppContextProvider >
      <NavigationContainer>
        <BottomTabNav />
      </NavigationContainer>
      </AppContextProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container : {
    flex : 1,
  }
});
