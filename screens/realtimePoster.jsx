// Stack 네비게이션
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();

import { Alert, FlatList, StyleSheet, View } from "react-native";
import DetailPoster from '../components/detailPoster';
import RealTimeMain from '../components/realtimeMain';
import { C2A } from '../custom/class2arr';
import globalStyles from "../stylesheet";


function RealtimePoster({navigation,route}) {


    return (  
        <View style={{flex:1}}>
            <Stack.Navigator screenOptions={{statusBarStyle : "dark"}}>
                <Stack.Screen  name="realTimeMain" component={RealTimeMain} options={{headerShown : false}}/>
                <Stack.Screen  name="detailPoster" component={DetailPoster} options={{title : "댓글"}}/>
            </Stack.Navigator>
        </View>
    );
}

export default RealtimePoster;

const styles = StyleSheet.create({
    
});