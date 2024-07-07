import React, {useState, useEffect} from 'react';
import { FlatList, TouchableOpacity, StyleSheet, Text, View, Image, Modal, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import Header from '../common/Header';
import { addProducts } from '../redux/slices/ProductsSlice';
import { useDispatch } from 'react-redux';


const GestionarProductos = () => {
    const [modalVisible, setModalVisible] = useState(false);
    /* let isValid = true; */
    const navigation = useNavigation();
    const [products, setProducts] = useState([]);

    const dispatch = useDispatch();

    // * Esta función busca el JSON con los productos almacenado en async. Más Info services/product.js
  const fetchProducts = async () => {
    try {
      // * Busca en el async
      const storedProducts = await AsyncStorage.getItem('@products');
      if (storedProducts !== null) {
        const listProducts = JSON.parse(storedProducts);

        // * Setea en 'products'
        setProducts(listProducts)
      } else {
        console.log('No se cargaron los productos');
      }

    } catch (error) {
      console.error("Error fetching products: ", error);
    }
  };
  // * Fin fetchProducts
    
    // * Al renderizar la vista:
  useEffect(() => {
    // * Busca los productos en async
    fetchProducts();
    dispatch(addProducts(products));
  }, []);

    return (
    <View>
      <Header
        leftIcon={require('../images/back.png')}
        title={'Gestionar Productos'}
        onClickLeftIcon={() => {
          navigation.goBack();
        }}
      />
        <TouchableOpacity
            activeOpacity={1}
            style={styles.nuevoProductItem}
            onPress={() => {
                navigation.navigate('Agregar Producto', {data: ''});
            }}>
            <Text style={{backgroundColor:'#ecf0f1', padding:15, borderRadius:15, color:'black', fontSize: 18, fontWeight: '600'}}> + Agregar nuevo producto</Text>   
        </TouchableOpacity>
        <FlatList
        style={{marginTop: 30, marginBottom: 70}}
        data={products.data}
        renderItem={({item, index}) => {
          return (
            <View
              activeOpacity={1}
              style={styles.productItem}
              onPress={() => {
                //en {data: item} esta la informacion por separado de cada producto
                navigation.navigate('ProductDetail', {data: item});
              }}>
              <Image source={{uri: item.imagen}} style={styles.itemImage} />
              <View>
                <Text style={styles.name}>
                  {item.title/* .length > 25 */
                    ? item.title.substring(0, 25) + '...'
                    : item.title}
                </Text>

                <View style={styles.qtyview}>
                  <Text style={styles.price}>{'$' + item.price}</Text>
                  <TouchableOpacity
                    style={styles.btnEdit}
                    onPress={() => {
                      navigation.navigate('Editar Producto', {data: item})
                    }}>
                    <Text style={{color:'white', fontSize: 18, fontWeight: '400'}}>editar</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.btnElim}
                    onPress={() => 
                        
                        setModalVisible(true)}>
                    <Text style={{color:'white', fontSize: 24, fontWeight: '600'}}>X</Text>
                  </TouchableOpacity>
                  
            </View>
            </View>
            </View>
          );
        }}
      />
            {/* VETANA PARA ELIMINAR PRODUCTO */}
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
                >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.ModaText}>¿Desea eliminar este producto?</Text>
                        <View style={{flexDirection:'row', top:'10%'}}>
                            <TouchableOpacity
                                style={styles.btnOpcion}
                                onPress={() => {
                                    //AL PRESIONAR Si SE CERRARA LA VENTANA MODAL
                                    setModalVisible(false);
                                }}>
                                <Text style={{color:'black', fontSize: 20, fontWeight: '500'}}>Si</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.btnOpcion}
                                onPress={() => {
                                    //AL PRESIONAR NO SE CERRARA LA VENTANA MODAL
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
    Input:{
        width:'85%', 
        height:50,
        borderWidth:0.5, 
        borderRadius:10,
        alignSelf:'center',
        padding:10,
        marginTop:10,
        flexDirection:'row',
        alignItems:'center'
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
    Create:{
        marginTop:15,
        fontWeight:'bold',
        fontStyle:'italic',
        textDecorationLine:'underline'
    }, 
    BtnText: {
        margin: 2,
        fontSize: 16,
        fontWeight:'700',
        textAlign: 'center',
        justifyContent: 'center',
        color: 'white'
    },
    nuevoProductItem: {
        justifyContent:'center', 
        alignItems:'center',
        width: '100%',
        height: 75,
        backgroundColor: '#fff',
        alignItems: 'center',
        flexDirection: 'row',
        marginTop: 10,
        marginHorizontal: 10,
        borderRadius: 15,
        shadowColor: 'rgba(0, 0, 0, 0.6)',
        shadowOpacity: 0.8,
        elevation: 6,
        shadowRadius: 5 ,
        shadowOffset : { width: 1, height: 2},
      },
    productItem: {
        width: '100%',
        height: 75,
        backgroundColor: '#fff',
        alignItems: 'center',
        flexDirection: 'row',
        marginTop:10,
        marginHorizontal:10,
        borderRadius:15,
        shadowColor: 'rgba(0, 0, 0, 0.6)',
        shadowOpacity: 0.8,
        elevation: 6,
        shadowRadius: 5 ,
        shadowOffset : { width: 1, height: 2},
      },
      itemImage: {
        width:'15%',
        height: '94%',
        left: 5,
        borderRadius:10
      },
      name: {
        top:'20%',
        fontSize: 18,
        fontWeight: '600',
        marginLeft: 20,
      },
      desc: {
        marginLeft: 20,
      },
      price: {
        color: 'green',
        fontSize: 18,
        fontWeight: '600',
        marginLeft: 20,
        marginTop: 5,
      },
      btnEdit: {
        padding: 5,
        width: 60,
        height: 40,
        left:100,
        bottom:20,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        marginLeft: 10,
        backgroundColor:'green'
    },
      btnElim: {
        padding: 5,
        width: 40,
        height: 40,
        left:100,
        bottom:20,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        marginLeft: 10,
        backgroundColor:'red'
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
      },
      qtyview: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
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
    }
});

export default GestionarProductos;