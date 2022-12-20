import { Image, ImageBackground, ScrollView, TouchableOpacity, View } from "react-native";
import FontText from "../custom/fontText";

function PosterMedia({item,onViewImageText,viewImage,viewMap,onViewMapText}) {
    let media=<></>;
     if(item.contents.image?.uri && item.contents.map?.uri){
         media = (
            <ScrollView horizontal={true} style= {{height : 300, backgroundColor : "white"}}>
                <TouchableOpacity onPress={onViewImageText}>
                    {
                        viewImage ? 
                        <ImageBackground style={{height : 300,width : 300 , resizeMode : "contain", justifyContent:"center", position: 'relative'}} source={{uri : item.contents?.image.uri}}>
                            <FontText style={{backgroundColor:"rgba(255,255,255,0.7)",textAlign : "center", paddingVertical : 8, paddingHorizontal: 14, borderRadius: 8, position: 'absolute', bottom: 14, right:14}} bold="extra">{item.contents?.image.text}</FontText>
                        </ImageBackground>
                        :
                        <Image style={{height : 300,width : 300 , resizeMode : "contain"}} source={{uri : item.contents?.image.uri}}/>
                    }
                </TouchableOpacity>
                <TouchableOpacity onPress={onViewMapText}>
                    {
                        viewMap ? 
                        <ImageBackground style={{height : 300,width : 300 , resizeMode : "contain", justifyContent:"center"}} source={{uri : item.contents?.map.uri}}>
                            <FontText style={{backgroundColor:"rgba(255,255,255,0.7)",textAlign : "center", paddingVertical : 10}} bold="extra">{item.contents?.map.text}</FontText>
                        </ImageBackground>
                        :
                        <Image style={{height : 300,width : 300 ,resizeMode : "contain"}} source={{uri : item.contents?.map.uri}}/>
                    }
                </TouchableOpacity>
            </ScrollView>
         )
     }else if(item.contents.image?.uri || item.contents.map?.uri){
         if(item.contents.image?.uri){
             media = (
                <TouchableOpacity onPress={onViewImageText}>
                    {
                        viewImage ? 
                        <ImageBackground style={{height : 300,width : 300 , resizeMode : "contain", justifyContent:"center", position: 'relative'}} source={{uri : item.contents?.image.uri}}>
                            <FontText style={{backgroundColor:"rgba(255,255,255,0.7)",textAlign : "center", paddingVertical : 8, paddingHorizontal: 14, borderRadius: 8, position: 'absolute', bottom: 14, right:14}} bold="extra">{item.contents?.image.text}</FontText>
                        </ImageBackground>
                        :
                        <Image style={{height : 300,width : 300 , resizeMode : "contain"}} source={{uri : item.contents?.image.uri}}/>
                    }
                </TouchableOpacity>
             )
         }else{
             media = (
                <TouchableOpacity onPress={onViewMapText}>
                    {
                        viewMap ? 
                        <ImageBackground style={{height : 300,width : 300 , resizeMode : "contain", justifyContent:"center"}} source={{uri : item.contents?.map.uri}}>
                            <FontText style={{backgroundColor:"rgba(255,255,255,0.7)",textAlign : "center", paddingVertical : 10}} bold="extra">{item.contents?.map.text}</FontText>
                        </ImageBackground>
                        :
                        <Image style={{height : 300,width : 300 ,resizeMode : "contain"}} source={{uri : item.contents?.map.uri}}/>
                    }
                </TouchableOpacity>
             )   
         }
     }

    return (  
        <>
            {media}
        </>
    );
}

export default PosterMedia;