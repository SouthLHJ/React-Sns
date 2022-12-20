// 상단 탭 네비게이터
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
const TopTab = createMaterialTopTabNavigator();

import RealtimePoster from './realtimePoster';
import SimpleChat from '../components/simpleChat';
import WritePoster from './writePoster';

import { settingStyles } from "../stylesheet";


function ChatScreen() {


    return (  
        <TopTab.Navigator screenOptions={{tabBarLabelStyle : {fontFamily : "GothicA1-Bold", fontSize : 15}, tabBarStyle : {paddingTop:  20},statusBarStyle : "dark"}}>
            <TopTab.Screen name='simpleChat' component={SimpleChat} options={{title : "간단대화"}}/>
            <TopTab.Screen name='realtimePoster' component={RealtimePoster} options={{title : "실시간게시글"}}/>
            <TopTab.Screen name='writePoster' component={WritePoster} options={{title : "게시글작성"}}/>

        </TopTab.Navigator>
    );
}

export default ChatScreen;