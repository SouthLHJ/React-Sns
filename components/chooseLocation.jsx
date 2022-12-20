import { TouchableOpacity, View } from "react-native";
import FontText from "../custom/fontText";
import MapView ,{Marker} from "react-native-maps";
import { useRef, useState } from "react";
import { useEffect } from "react";

function ChooseLocation({lat,lng,onChooseUri}) {
    const [coordinate,setCoordinate] = useState({latitude : 37.5666, longitude : 126.9774});

    let init = {
        latitude : 37.5666,
        longitude : 126.9774 ,
        latitudeDelta : 0.01922, // 숫자가 작아질수록 확대감이 커진다. (아래랑 비슷하게 가야하나?)
        longitudeDelta : 0.01421
    };
    if(lat){
        init = {
            latitude : lat,
            longitude : lng,
            latitudeDelta : 0.01922, // 숫자가 작아질수록 확대감이 커진다. (아래랑 비슷하게 가야하나?)
            longitudeDelta : 0.01421
        };
    }

    useEffect(()=>{
        if(lat){
            setCoordinate({latitude : lat, longitude : lng})   
        }
        
    },[lat])

    const onMapPress = ({nativeEvent})=>{
        // console.log(nativeEvent.coordinate);
        setCoordinate( nativeEvent.coordinate)
    }

    // console.log(init);

    return (  
        <View style={{backgroundColor : "white", flex: 1}}>
            <MapView style={{flex :1}} region={init} onPress={onMapPress}>
                <Marker
                    coordinate={coordinate}
                />
            </MapView>
            <TouchableOpacity onPress={()=>{onChooseUri(coordinate)}}>
                <FontText style={{textAlign :"center", paddingVertical : 5}} bold="extra">위치 지정</FontText>
            </TouchableOpacity>
        </View>
    );
}

export default ChooseLocation;