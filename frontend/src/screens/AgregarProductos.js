import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    Pressable,
    TextInput,
    FlatList
  } from 'react-native';
  import React, {useState} from 'react';
  import Header from '../common/Header';
  import {useNavigation, useRoute} from '@react-navigation/native';
  import {useDispatch, useSelector} from 'react-redux';
  import AsyncStorage from '@react-native-async-storage/async-storage';
  import { notificaInfo, notificaInfoWishList } from './tabs/Notification';
  import * as ImagePicker from 'expo-image-picker'
  import { notificaErrorAgregar } from './tabs/Notification';


  const EditarProducto = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const navigation = useNavigation();
    const route = useRoute();
    const dispatch = useDispatch();
  
    //recolecta los datos
    const [image, setImage] = useState('');
    const [nombre, setNombre] = useState('');
    const [disponible, setDisponible] = useState('');
    const [precio, setPrecio] = useState('');
    const [selected, setSelected] = useState('hombre');
    const tags = ['hombre', 'mujer', 'niño', 'niña'];

    //Image Picker
    const handleImagePickerPress = async() => {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      })

      if (!result.canceled){
        setImage(result.assets[0].uri)
      }
    }

    //Validacion de dataentry
    const handlesubmit = () => {
      if(image === '' || nombre === '' || disponible === '' || precio === ''){
          notificaErrorAgregar();
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
          title={'Agregar Producto'}
          onClickLeftIcon={() => {
            navigation.goBack();
          }}
        />
        <FlatList
        data={[route.params.data]} // Assuming route.params.data is an object
        renderItem={({ item }) => (
          <View >
            
            <View style={{backgroundColor:'#dcdde1', justifyContent:'center', alignItems:'center'}}>
              
              {//sin imagen
              image === '' && (
              <Image source={require('../images/subir.png')} style={styles.banner}/>

              )}
              {//con imagen
               image && <Image source={{uri: image}} style={styles.banner}/>
               }

            </View>

            <View style={{ flexDirection:'row', padding: 5, borderRadius: 15, justifyContent: 'center', alignItems: 'center' }}>
                <TouchableOpacity style={styles.BtnImage} onPress={handleImagePickerPress} ><Text style={styles.BtnText}>Subir imagen</Text></TouchableOpacity>
                <TouchableOpacity style={styles.BtnImage} onPress={() => setImage('')} ><Text style={styles.BtnText}>Borrar imagen</Text></TouchableOpacity>
            </View>

            <View style={styles.detalles}>

              <Text style={{top:'2%', left:'8%',fontWeight:'bold'}}>Nombre del producto: <Text style={{color:'red'}}>* Requerido *</Text> </Text>
              <TextInput style={styles.Input} placeholder='Ingresa el nombre del producto' value={nombre} onChangeText={txt => setNombre(txt)} />
              
              <Text style={{top:'2%', left:'8%',fontWeight:'bold'}}>Genero del producto: <Text style={{color:'red'}}>* Requerido *</Text> </Text>
              <View style={{flexDirection:'row', width:'70%', left:'8%', marginVertical:10, }}>
               <FlatList
                  horizontal
                  showsHorizontalScrollIndicator = {false}
                  data={tags}
                  renderItem={({ item }) => {
                    return (
                      <View >
                      <TouchableOpacity 
                        style={{marginHorizontal:5}}
                        onPress={() => {
                        setSelected(item);
                        setSelected({ valor: item });
                      }}>
                        <Text
                          style={[
                            styles.tagText,
                            selected == item ? styles.isSelected : null,
                            selected.valor == item ? styles.isSelected : null,
                          ]}
                        >
                          {item}
                        </Text>
                      </TouchableOpacity>
                      </View>
                    );
                  }}
                />
              </View>
               
              
              <Text style={{top:'2%', left:'8%',fontWeight:'bold'}}>Disponibilidad: <Text style={{color:'red'}}>* Requerido *</Text> </Text>
              <TextInput style={styles.Input} placeholder='Ejemplo: 8' value={disponible} onChangeText={txt => setDisponible(txt)} />
              
              <Text style={{top:'2%', left:'8%',fontWeight:'bold'}}>Precio: <Text style={{color:'red'}}>* Requerido *</Text> </Text>
              <TextInput style={styles.Input} placeholder='Ejemplo: 13.80' value={precio} onChangeText={txt => setPrecio(txt)} />

                <View style={{ padding: 5, borderRadius: 15, justifyContent: 'center', alignItems: 'center' }}>
                    <Pressable style={styles.Btn} onPress={() => {handlesubmit();}} ><Text style={styles.BtnText}>Agregar Producto</Text></Pressable>
                </View>
            </View>
          </View>
        )} 
          />
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
      /* position: "relative",
      marginVertical: 15,
      borderRadius: 15,
      width: '40%',
      height: 250,
      justifyContent:'center',
      alignItems:'center',
      resizeMode: 'center',
      backgroundColor:'#bdc3c7' */
      marginVertical: 15,
      height: 200,
      width: 165,
      resizeMode:'center',
      borderRadius: 20,
      position: "relative"
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
      backgroundColor:'#ecf0f1'
    },
    Btn:{
      width:180,
      marginVertical:15,
      paddingVertical:10,
      backgroundColor:'green',
      borderRadius:10
    },
    BtnImage:{
      width:140,
      margin:5,
      paddingVertical:10,
      backgroundColor:'#3498db',
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
    tagText: {
      fontWeight:'700',
      borderRadius: 10,
      padding:10,
      backgroundColor: "#95afc0",
      color: "#000"
    },
    isSelected: {
      backgroundColor: "#f9ca24",
      color: "#000",
    }

  });
  