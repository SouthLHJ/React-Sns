import { StyleSheet, View } from "react-native";
import FontText from "../custom/fontText";
import { settingStyles } from "../stylesheet";

function ChatItem({item}) {
    return (  
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <FontText style={[{fontSize : settingStyles.fontSize}]}>{item.email}</FontText>
                <FontText style={[{fontSize : settingStyles.fontSize}]}>{item.createdAt}</FontText>
            </View>
            <FontText style={[styles.text,{fontSize : settingStyles.fontSize}]}>{item.text}</FontText>
        </View>
    );
}

export default ChatItem;

const styles = StyleSheet.create({
    container : {
        flex : 1,
        margin : 5,
        padding : 10,

        borderColor : "#00B9A0",
        borderWidth : 2,
        borderRadius : 8
    },  
    titleContainer : {
        flexDirection:"row",
        justifyContent : "space-between",
        marginBottom : 5
    },
    text :{
        lineHeight : 22
    }   
});