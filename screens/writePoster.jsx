// Stack 네비게이션
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();


import { Pressable, StyleSheet, View } from "react-native";
import globalStyles from "../stylesheet";

import WritePostetMain from '../components/writePosterMain';
import PlaceAddScreen from './placeAddScrn';
import ImageAddScreen from './imageAddScrn.jsx';

function WritePoster({route}) {
    // options={{headerShown : false}}
    //, headerTransparent : true => 헤더 투명하게
    return (  
        <Stack.Navigator screenOptions={{statusBarStyle : "dark"}} >
            <Stack.Screen  name="writePosterMain" component={WritePostetMain} options={{headerShown : false}}/>
            <Stack.Screen  name="placeAddScreen" component={PlaceAddScreen} options={{title : "장소 추가"}}/>
            <Stack.Screen  name="imageAddScreen" component={ImageAddScreen} options={{title : "이미지 추가"}} />
        </Stack.Navigator>
    );
}

export default WritePoster;

const styles = StyleSheet.create({
    
});