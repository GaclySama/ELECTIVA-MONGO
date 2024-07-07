import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, Image, Pressable, TextInput, Modal, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import Header from '../common/Header';
import { notificaErrorActualizar } from './tabs/Notification';

const Actualizar = () => {

    const [modalVisible, setModalVisible] = useState(false);
    const navigation = useNavigation();
    const [name, setName] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [buttonDisabled, setButtonDisabled ] = useState(false);
    const [user, setUser] = useState({ email: '', name: '', lastname: ''});

    useEffect(() => {
        const loadUser = async () => {
          try {
            const userData = await AsyncStorage.getItem('@user');
            if (userData) {
              const { email, name } = JSON.parse(userData);
              setUser({ email, name });
            }
          } catch (error) {
            console.error('Failed to load user from AsyncStorage:', error);
          }
        };
    
        loadUser();
      }, []);

    //Validacion de dataentry
    const handlesubmit = () => {
        if(name === '' && lastname === '' && email === ''){
            notificaErrorActualizar();
            setModalVisible(false);
        }else{
            //Si el usuario ingreso datos se mostrara la ventana modal
            setModalVisible(true);
        }  
    }

    return (
    <View style={{flex:1}}>
        <Header
        leftIcon={require('../images/back.png')}
        title={'Actualizar Datos'}
        onClickLeftIcon={() => {
        navigation.goBack();
        }}
        />
        <View style={{top:20, justifyContent:'center',alignItems:'center',backgroundColor:'#dfe6e9', borderRadius:20, margin:10, padding:10 }}>
            <Text style={styles.title}>Datos del usuario</Text>

            <Text style={{marginBottom:20,color:'#FD7272', justifyContent:'center', alignSelf:'center', fontWeight:'bold'}}>Solo se actualizarán los campos ingresados</Text>

            <Text style={{top:'2%', right:'32%',fontWeight:'bold'}}>Nombre: </Text>
            <TextInput style={styles.Input} placeholder={ user.name } value={name} onChangeText={txt => setName(txt)} />
            
            <Text style={{top:'2%', right:'32%',fontWeight:'bold'}}>Apellido:  </Text>
            <TextInput style={styles.Input} placeholder={ user.lastname } value={lastname} onChangeText={txt => setLastname(txt)} />
            
            <Text style={{top:'2%', right:'32%',fontWeight:'bold'}}>Correo:  </Text>
            <TextInput style={styles.Input} placeholder={ user.email } value={email} onChangeText={txt => setEmail(txt)} />
            
            <Pressable style={styles.Btn} onPress={() => {handlesubmit(); }} ><Text style={styles.BtnText}>Actualizar</Text></Pressable>
        </View>

        {/* VETANA PARA ACTUALIZAR DATOS USUARIO */}
        <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
                >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.ModaText}>¿Deseas Actualizar los datos ingresados?</Text>
                        <View style={{flexDirection:'row', top:'10%'}}>
                            <TouchableOpacity
                                style={styles.btnOpcion}
                                onPress={() => {
                                    //AL PRESIONAR SE CERRARA LA VENTANA MODAL 
                                    setModalVisible(false);
                                }}>
                                <Text style={{color:'black', fontSize: 20, fontWeight: '500'}}>Si</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.btnOpcion}
                                onPress={() => {
                                    //AL PRESIONAR SE CERRARA LA VENTANA MODAL
                                    setModalVisible(false);
                                }}>
                                <Text style={{color:'black', fontSize: 20, fontWeight: '500'}}>No</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
    </View>
    );
};

const styles = StyleSheet.create({
    title: {
        justifyContent:'center', 
        alignSelf:'center',
        fontSize: 23,
        color: '#000',
        fontWeight: '600',
        marginVertical: 20,
      },
    Input:{
        width:'85%', 
        height:50,
        borderWidth:0.5, 
        borderRadius:10,
        alignSelf:'center',
        padding:10,
        marginTop:10,
        flexDirection:'row',
        alignItems:'center',
        backgroundColor: '#ffeaa7'
    },
    Input2:{
        width:250, 
        height:50,
        borderWidth:0.5, 
        borderRadius:10,
        alignSelf:'center',
        padding:10,
        marginTop:10,
        flexDirection:'row',
        alignItems:'center'
    },
    user: {
        width: 100,
        height: 100,
        alignSelf: 'center',
        marginTop: 50,
    },
    Btn:{
        width:150,
        marginTop:20,
        paddingVertical:10,
        backgroundColor:'green',
        borderRadius:10
    },
    Create:{
        marginTop:15,
        fontWeight:'bold',
        fontStyle:'italic',
        textDecorationLine:'underline'
    }, 
    BtnText:{
        fontSize:16,
        fontWeight:'700',
        textAlign:'center',
        justifyContent:'center',
        color:'#fff'
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(52, 52, 52, 0.8)'
    },
    modalView: {
        width:250,
        height:200,
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
    },
    btnOpcion: {
        padding: 5,
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        margin: 10,
        marginHorizontal: 20,
        backgroundColor:'#bdc3c7'
      }
});

export default Actualizar;