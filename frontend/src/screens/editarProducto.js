import {
    View,
    Text,
    StyleSheet,
    Image,
    Pressable,
    TextInput,
    FlatList,
    Modal,
    TouchableOpacity
  } from 'react-native';
import React, {useState} from 'react';
import Header from '../common/Header';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { notificaErrorActualizar } from './tabs/Notification';
import { updateProduct } from "../services/admin"

  const EditarProducto = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const navigation = useNavigation();
    const route = useRoute();
    const product = route.params?.data
    const dispatch = useDispatch();
  
    //recolecta los datos
    const [disponible, setDisponible] = useState('');
    const [precio, setPrecio] = useState('');

    //Validacion de dataentry
    const handlesubmit = () => {
      console.log(product._id);
      if(disponible === '' && precio === ''){
          notificaErrorActualizar();
          setModalVisible(false);
      }else{
          //Si el usuario ingreso datos se mostrara la ventana modal
          setModalVisible(true);
      }
  }

    return (
      <View style={styles.container}>
        <Header
          leftIcon={require('../images/back.png')}
          title={'Editar Producto'}
          onClickLeftIcon={() => {
            navigation.goBack();
          }}
        />
        <FlatList
        data={[route.params.data]} // Assuming route.params.data is an object
        renderItem={({ item }) => (
          <View>
        
            <Image source={{ uri: route.params.data.imagen }} style={styles.banner} />

            <View style={styles.detalles}>
              <Text style={styles.title}>{route.params.data.title}</Text>
              <Text style={{marginBottom:20,color:'#FD7272', justifyContent:'center', alignSelf:'center', fontWeight:'bold'}}>Solo se actualizarán los campos ingresados</Text>
              <Text style={{top:'2%', left:'8%',fontWeight:'bold'}}>stock:  <Text style={{color:'green'}}>{route.params.data.stock}</Text><Text style={{color:'red'}}> - Disponibilidad actual</Text></Text>
              <TextInput style={styles.Input} placeholder='Ingresa nueva disponibilidad' value={disponible} onChangeText={txt => setDisponible(txt)} />
              <Text style={{top:'2%', left:'8%',fontWeight:'bold'}}>Precio:  <Text style={{color:'green'}}>{route.params.data.price}</Text><Text style={{color:'red'}}> - Precio actual</Text></Text>
              <TextInput style={styles.Input} placeholder='Ingresa nuevo precio' value={precio} onChangeText={txt => setPrecio(txt)} />
                <View style={{ padding: 5, borderRadius: 15, justifyContent: 'center', alignItems: 'center' }}>
                    <Pressable style={styles.Btn} onPress={() => {handlesubmit();}} ><Text style={styles.BtnText}>Actualizar Producto</Text></Pressable>
                </View>
            </View>
          </View>
        )} 
          />
          {/* VETANA PARA ACTUALIZAR DATOS DE PRODUCTOS */}
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
                                      // * SI
                                      //AL PRESIONAR SE CERRARA LA VENTANA MODAL 
                                      updateProduct({id: product._id, disponible: disponible, precio: precio});
                                      setModalVisible(false);
                                  }}>
                                  <Text style={{color:'black', fontSize: 20, fontWeight: '500'}}>Si</Text>
                              </TouchableOpacity>
                              <TouchableOpacity
                                  style={styles.btnOpcion}
                                  onPress={() => {
                                      // ! NO
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
  
  export default EditarProducto;
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f1f2f6',
    },
    detalles: {
      marginTop:10,
      margin:5,
      paddingBottom:10,
      backgroundColor:'#c7ecee',
      borderRadius:10
    },
    banner: {
      borderRadius: 15,
      width: '100%',
      height: 300,
      resizeMode: 'center',
    },
    title: {
      justifyContent:'center', 
      alignSelf:'center',
      fontSize: 23,
      color: '#000',
      fontWeight: '600',
      marginVertical: 20,
    },
    desc: {
      fontSize: 16,
  
      marginLeft: 20,
      marginRight: 20,
      marginTop: 10,
    },
    price: {
      color: 'green',
      marginLeft: 20,
      marginTop: 20,
      fontSize: 20,
      fontWeight: '800',
    },
    icon: {
      width: 24,
      height: 24,
    },
    qtyView: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 10,
      marginLeft: 20,
    },
    btnRed: {
      padding: 5,
      height: 40,
      width: 40,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 10,
      marginLeft: 10,
      backgroundColor: '#e74c3c'
    },
    btnGreen: {
      padding: 5,
      height: 40,
      width: 40,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 10,
      marginLeft: 10,
      backgroundColor: '#2ecc71'
    },
    qty: {
      marginLeft: 10,
      fontSize: 18,
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
      backgroundColor:'#F8EFBA'
    },
    Btn:{
      width:180,
      marginVertical:15,
      paddingVertical:10,
      backgroundColor:'green',
      borderRadius:10
    },
    BtnText: {
      margin: 2,
      fontSize: 16,
      fontWeight:'700',
      textAlign: 'center',
      justifyContent: 'center',
      color: 'white'
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
  