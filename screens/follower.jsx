import { useNavigation } from "@react-navigation/native";
import { useContext } from "react";
import { StyleSheet, View } from "react-native";
import { AppContext } from "../context/app-context";
import FontText from "../custom/fontText";

function Follower() {
    const context = useContext(AppContext);

    const navigation = useNavigation();
    if(!context.auth){
        navigation.navigate("account")
    }

    return (  
        <View>
            <FontText>팔로워 리스트</FontText>
        </View>
    );
}

export default Follower;

const styles = StyleSheet.create({
    
});