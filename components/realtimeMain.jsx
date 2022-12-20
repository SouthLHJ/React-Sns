import { getCurrentPositionAsync } from "expo-location";
import { useContext, useEffect, useState } from "react";
import { Alert, FlatList, StyleSheet, TouchableOpacity, View } from "react-native";
import { deletePoster, editOnePoster, readAllPoster } from "../api/poster";
import PosterItem from "../components/posterItem";
import { AppContext } from "../context/app-context";
import { C2A } from "../custom/class2arr";
import FontText from "../custom/fontText";
import globalStyles from "../stylesheet";
import { AntDesign } from '@expo/vector-icons';
import { useRef } from "react";
import CutsomSpinner from "../custom/customSpinner";


function RealTimeMain({navigation,route}) {

    const [poster, setPoster] = useState();
    const [refresh, setRefresh] = useState(false);
    const [modal, setModal] = useState(false);


    const context = useContext(AppContext);

    const sortDateRef = useRef("extra");
    const sortLocationRef = useRef(undefined);

    useEffect(()=>{
        onRefresh();
        // console.log(route)
    },[route])

    const onEdit = (item)=>{
        // console.log(item)
        Alert.alert(
            "", "수정하시겠습니까?",
            [{
                text : "취소"
            },{
                text : "확인", onPress : ()=>{
                    navigation.navigate("writePosterMain",{item})
                }
            }
            ]
        )
        
    }

    const onDelete = (item)=>{
        Alert.alert(
            "", "삭제하시겠습니까?",
            [{
                text : "취소"
            },{
                text : "확인", onPress : ()=>{
                    deletePoster(item.id,context.auth.idToken)
                    .then((rcv)=>{
                        console.log(rcv)
                        onRefresh();
                    })
                }
            }]
        )
    }
    const onHeart = (item)=>{
        // console.log(item)
        let data;
        if(item.heart.includes(context.auth.email) ){
            const arr = item.heart.filter((one)=>{
                return one !== context.auth.email
            })
            data = {
                heart : arr
            }
        }else{
            data = {
                heart : [...item.heart,context.auth.email]
            }
        }
        editOnePoster(item.id,context.auth.idToken,data)
        .then((rcv)=>{
            // console.log(rcv);
            onRefresh();
        }).catch(err=>console.log(err))
    }

    const onFollower = ()=>{

        
    }

    // 거리순 정렬
    const addRangeFieldAndSort = async(arr)=>{
        setModal(true);
        const rcv =  await getCurrentPositionAsync();
        const pointLat = rcv.coords.latitude;
        const pointLng = rcv.coords.longitude;

        function deg2rad(deg) {
            return deg * (Math.PI/180)
        }

        const convert =  arr.map((one)=>{
            const targetLat = one.contents.map?.lat ?? 10000;
            const targetLng = one.contents.map?.lng ?? 10000;
    
            var R = 6371; // Radius of the earth in km
            var dLat = deg2rad(targetLat-pointLat);  // deg2rad below
            var dLon = deg2rad(targetLng-pointLng);
            var a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(deg2rad(pointLat)) * Math.cos(deg2rad(targetLat)) * Math.sin(dLon/2) * Math.sin(dLon/2);
            var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
            var d = R * c; // Distance in km

            return {...one,range : d }
        })
        
        convert.sort((a,b)=>{
            return (a.range - b.range)
        })
        sortLocationRef.current = "extra";
        sortDateRef.current = undefined;
        setModal(false);

        setPoster(convert)
    }

    const onRefresh = ()=>{
        setModal(true)
        readAllPoster()
        .then((rcv)=>{
            if(rcv){
                sortLocationRef.current =undefined;
                sortDateRef.current =  "extra";
                const save = C2A(rcv);
                setModal(false);
                setPoster(save.reverse());
            }
        })
    }


    return (  
        <View style={globalStyles.container}>
            <View style={{flexDirection : "row", justifyContent :"flex-end", alignItems :"center"}}>
                <TouchableOpacity onPress={()=>onRefresh()}>
                    <FontText bold ={sortDateRef.current}>최신순 <AntDesign name="arrowdown" size={15} color="black" /></FontText>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>addRangeFieldAndSort(poster)}>
                    <FontText bold ={sortLocationRef.current}>거리순 <AntDesign name="arrowdown" size={15} color="black" /></FontText>
                </TouchableOpacity>            
            </View>

            <FlatList 
                data={poster} keyExtractor={(one)=>one.id}
                refreshing={refresh} onRefresh={()=>{
                    setRefresh(true);
                    setTimeout(()=>{
                        setRefresh(false);
                        onRefresh
                    },2000)
                }}
                renderItem={({item})=>{
                    return (<PosterItem item={item} onEdit={onEdit} onDelete={onDelete} onHeart={onHeart}/>)
                }}
            />

            <CutsomSpinner modal={modal}/>
        </View>

    );
}

export default RealTimeMain;