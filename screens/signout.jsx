import { useNavigation } from "@react-navigation/native";
import { useContext} from "react";
import { Alert, Image, StyleSheet, View } from "react-native";
import { AppContext } from "../context/app-context";
import CustomButton from "../custom/custButton";
import globalStyles from "../stylesheet";

function SignOut() {
    const {auth,dispatch} = useContext(AppContext);
    const navigation = useNavigation();

    const handleSignOut = ()=>{
        Alert.alert(
            "","로그아웃 하시겠습니까?",[
                {
                    text : "취소"
                },
                {
                    text : "확인",onPress : ()=>{dispatch({type:"signOut"}); navigation.navigate("home")}
                }
            ]
        )
    }

    return (
        <View style={[globalStyles.container,styles.container]}>
            <View style={{alignItems:"center", flex:1}}>
                <Image source={require("../assets/signout.png")} style={{width : "80%", height:"100%", resizeMode : "contain"}}/>
            </View>
            <View style={{flex : 2 ,marginTop : 5}}>
                <CustomButton onPress={handleSignOut} styleBtn={[globalStyles.button,styles.button]} styleText={[globalStyles.buttonText,styles.buttonText]}>로그아웃</CustomButton>
            </View>
        </View>
    );
}

export default SignOut;

const styles = StyleSheet.create({
    container : {

    },

    button : {

    },
    buttonText : {
        fontSize : 20
    }

});