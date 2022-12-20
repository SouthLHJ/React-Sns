import { FlatList, StyleSheet, View } from "react-native";
import FontText from "../custom/fontText";

import { FontAwesome } from '@expo/vector-icons';
import { useState } from "react";

function PosterComment({item,onRefresh}) {

    const [refresh, setRefresh] = useState(false)

    return (  <>
        <FlatList data={item.comment}
            refreshing={refresh} onRefresh={()=>{
                setRefresh(true);
                setTimeout(()=>{
                    setRefresh(false);
                    onRefresh
                },2000)
            }}
            renderItem={ (({item,index})=>{
                return (
                    <View style={styles.comment}>
                        <FontAwesome name="user" size={24} color="black" />
                        <View style = {styles.commentText}>
                            <FontText style={{fontSize : 10}}>{item.email}</FontText>
                            <FontText>{item.text}</FontText>
                        </View>

                    </View>
                )
            })}

        />
    </>);
}

export default  PosterComment;

const styles = StyleSheet.create({
    comment : {
        flexDirection : "row",

        paddingVertical : 10,
         
        borderColor : "#F2FFFF",
        borderBottomColor : "#00B9A0",
        borderWidth : 1
    },

    commentText: {
        marginLeft : 10,
    }
});