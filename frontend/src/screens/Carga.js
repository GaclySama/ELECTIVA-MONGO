import React, {useEffect} from 'react';
import { StyleSheet, Text, View, Image, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';


function Carga ({modalVisible,setModalVisible}) {
    const navigation = useNavigation();
    useEffect(() => {
        setTimeout(() => {
            setModalVisible(false);
        },2000);
    },[]);
    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
            setModalVisible(!modalVisible);
            }}>
            <View style={styles.centeredView}>
            <View style={styles.modalView}>
                <Text style={styles.ModaText} >Iniciando sesion...</Text>
                <Image 
                source={require('../images/AvGh.gif')}  
                style={{width: 150, height: 150 }} 
                />
            </View>
            </View>
        </Modal>
        
    );  
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(52, 52, 52, 0.8)'
    },
    modalView: {
        width:250,
        height:250,
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
        width: 0,
        height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    ModaText:{
        fontSize:16,
        textAlign:'center',
        justifyContent:'center',
        color:'#000',
    }
});

export default Carga