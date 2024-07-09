import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import React, {useState, useEffect} from 'react';
import Header from '../../common/Header';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import { loadUser } from '../../services/user';
import { getOrders } from '../../services/order';
import * as ImagePicker from 'expo-image-picker'


const User = () => {
  const [user, setUser] = useState({_id: '' , email: '', name: ''});
  const [image, setImage] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    const User = async () => {
      try {
          const { _id, email, name  } = await loadUser();
          setUser( { _id, email, name } );
      } catch (error) {
        console.error('Failed to load user from AsyncStorage:', error);
      }
    };

    User();
  }, []);

  const renderOrder = async () => {
    try {
      const res = await getOrders(user._id);
      if (res.success) {
        navigation.navigate('Imprime', { orders: res.data });
      } else {
        console.error(res.message || 'Error retrieving orders');
        // Aquí puedes mostrar un mensaje de error en la interfaz de usuario, si es necesario
      }
    } catch (error) {
      console.error('Unexpected error:', error);
      // Aquí puedes mostrar un mensaje de error en la interfaz de usuario, si es necesario
    }
  };

  const logout = async () => {
    try {
      const keys = ['@accessToken', '@user', '@products']
      await AsyncStorage.multiRemove(keys);
      navigation.navigate('Login');
    } catch (error) {
      console.error('Failed to logout:', error);
    }
  };

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

  return (
    <View style={styles.container}>
      <Header title={'Perfil de usuario'} />

        
{/*         <TouchableOpacity style={styles.BtnImage} onPress={handleImagePickerPress} ><Text style={styles.BtnText}>+</Text></TouchableOpacity>
 */}

        {/* {//sin imagen
          image === '' && ( */}
            <Image source={require('../../images/profile.png')} style={styles.user}/>
            
        {/* )} */}
        {/* {//con imagen
          image && <Image source={{uri: image}} style={styles.user}/>
          } */}

        {/* <Image  style={styles.userFondo}/> */}

      <Text style={styles.name}>{ user.name }</Text>
      <Text style={[styles.email, {fontSize: 16, marginTop: 0}]}>
        {  user.email }
      </Text>
      {/* //VALOR DE IMAGEN <Text>{image}</Text> */}
      <TouchableOpacity style={[styles.tab, {marginTop: 30}]}
        onPress={() => {
          navigation.navigate('Actualizar');
        }}>
        <Text style={styles.txt}>Editar Perfil</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.tab, {marginTop: 10}]}
        onPress={() => {
          renderOrder();
        }}>
        <Text style={styles.txt}>Movimientos</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.tab, {marginTop: 10}]}
        onPress={() => {
          navigation.navigate('Gestionar Productos');
        }}>
        <Text style={styles.txt}>Gestionar productos</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.tab, {marginTop: 10}]}
        onPress={logout}>
        <Text style={styles.txt}>Cerrar sesión</Text>
      </TouchableOpacity>
    </View>
  );
};

export default User;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  BtnImage:{
    position:'absolute',
    top:'24%',
    left:'55%',
    justifyContent:'center',
    alignItems:'center',
    borderRadius:50,
    width:30,
    height:30,
    backgroundColor:'#70a1ff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    zIndex: 50
  },
  BtnText:{
    position:'absolute',
    color:'white',
    fontSize:24,
    fontWeight:'600'
  },
  user: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    marginTop: 50,
    borderRadius: 50,
    zIndex: 25
  },
  userFondo: {
    position:'absolute',
    top:'6.7%',
    width: 120,
    height: 120,
    alignSelf: 'center',
    marginTop: 50,
    backgroundColor:'#dcdde1',
    borderRadius: 100,
  },
  name: {
    alignSelf: 'center',
    marginTop: 10,
    fontSize: 23,
    fontWeight: '600',
    color: '#000',
  },
  email: {
    alignSelf: 'center',
    marginTop: 10,
    fontSize: 23,
    fontWeight: '600',
    color: '#95a5a6',
  },
  tab: {
    width: '90%',
    height: 50,
    borderBottomWidth: 0.3,
    alignSelf: 'center',
    borderBottomColor: '#DBDBDB',
    paddingLeft: 20,
    justifyContent: 'center',
  },
  txt: {
    fontSize: 16,
    color: '#000',
  }
});
