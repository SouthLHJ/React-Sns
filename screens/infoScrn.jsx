import { useContext, useEffect } from "react";
import { ImageBackground, StyleSheet, View } from "react-native";
import { AppContext } from "../context/app-context";
import FontText from "../custom/fontText";

function InfoScreen() {
    const context = useContext(AppContext);

    return (  
        <View style={{flex : 1}}>
            <ImageBackground source={require("../assets/home.png")} style={{flex : 1, alignItems : "center", justifyContent :"flex-end"}}>
                <FontText style={styles.text} title={true}>어서오세요</FontText>
                <FontText style={styles.text} title={true}>{context.auth.email} 님</FontText>

            </ImageBackground>


        </View>
    );
}

export default InfoScreen;

const styles = StyleSheet.create({
    text : {
        fontSize : 20
    }
});
