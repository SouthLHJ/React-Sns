import { ActivityIndicator, Modal, View } from "react-native";

function CutsomSpinner({modal}) {
    return (  
        <>
            <Modal
                animationType="fade"
                transparent ={true}
                visible={modal}
            >
                <View style={{flex : 1,backgroundColor : "rgba(255,255,255,0.5)", justifyContent : "center", alignItems :"center"}}>
                    <ActivityIndicator size={100} color="#00ff00"/>
                </View>
            </Modal>

        </>
    );
}

export default CutsomSpinner;