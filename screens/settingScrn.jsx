import { useContext, useEffect, useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { AppContext } from "../context/app-context";
import FontText from "../custom/fontText";

import {settingStyles} from "../stylesheet/index.js";

function SettingScreen() {
    const context = useContext(AppContext);

    useEffect(()=>{
        context.setRefresh(false);
    },[context.refresh])

    const onFontSize = (size)=>{
        context.setRefresh(true);
        settingStyles.fontSize = size;
    }   

    return (  
        <View>
            <FontText style={{fontSize : settingStyles.fontSize}}>{settingStyles.fontSize} 폰트 크키 설정</FontText>

            <View style={styles.container}>
                <Pressable onPress={()=>onFontSize(15)} >
                    <FontText style={{fontSize : 15}}>15</FontText>
                </Pressable>

                <Pressable onPress={()=>onFontSize(20)}>
                    <FontText style={{fontSize : 20}}>20</FontText>
                </Pressable>

                <Pressable onPress={()=>onFontSize(25)}>
                <FontText style={{fontSize : 25}}>25</FontText>
                </Pressable>

                <Pressable onPress={()=>onFontSize(30)}>
                <FontText style={{fontSize : 30}}>30</FontText>
                </Pressable>

                <Pressable onPress={()=>onFontSize(35)}>
                <FontText style={{fontSize : 35}}>35</FontText>
                </Pressable>

                <Pressable onPress={()=>onFontSize(40)}>
                    <FontText style={{fontSize : 40}}>40</FontText>
                </Pressable>
            </View>

        </View>
    );
}

export default SettingScreen;

const styles = StyleSheet.create({
    container : {
        flexDirection : "row",
        alignItems : "center",
        justifyContent : "space-between",


        borderColor :"black",borderWidth :1,
    }
});