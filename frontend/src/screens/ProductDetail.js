import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import Header from '../common/Header';
import {useNavigation, useRoute} from '@react-navigation/native';
import CustomButton from '../common/CustomButton';
import {useDispatch, useSelector} from 'react-redux';
import {addItemToWishlist} from '../redux/slices/WishlistSlice';
import {addItemToCart} from '../redux/slices/CartSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AskForLoginModal from '../common/AskForLoginModal';
import { notificaInfo, notificaInfoWishList } from './tabs/Notification';

const ProductDetail = ({ isWishlistActive, toggleWishlist }) => {
  /* const [selectedTab, setSelectedTab] = useState(0); */
  const [selectedTab, setSelectedTab] = useState(0);
  const navigation = useNavigation();
  const route = useRoute();
  const dispatch = useDispatch();
  const [qty, setQty] = useState(1);
  const [modalVisible, setModalVisible] = useState(false);

  const checkUserStatus = async () => {
    let isUserLoggedIn = false;
    const status = await AsyncStorage.getItem('@user');
    /* console.log(status); si el usuario esta logeado */
    if (status == null) {
      isUserLoggedIn = false;
    } else {
      isUserLoggedIn = true;
    }
    /* console.log(isUserLoggedIn); si el usuario esta deslogeado*/
    return isUserLoggedIn;
  };
  return (
    <View style={styles.container}>
      <Header
        leftIcon={require('../images/back.png')}
        rightIcon={require('../images/cart.png')}
        title={'Detalles de Producto'}
        onClickLeftIcon={() => {
          navigation.goBack();
        }}
        isCart={true}
      />
      <ScrollView>
        
        <Image source={{uri: route.params.data.imagen}} style={styles.banner} />
        <TouchableOpacity
          style={styles.wishlistBtn}
          onPress={() => {
            if (checkUserStatus()) {
              notificaInfoWishList();
              dispatch(addItemToWishlist(route.params.data));
              
            } else {
              setModalVisible(true);
            }
          }}>
          <Image
            source={require('../images/favoriteFilled.png')/* selectedTab === 2
              ? require('../images/favoriteFilled.png')
              : require('../images/favorite.png') */}
            style={styles.icon}
          />
        </TouchableOpacity>
        <View style={styles.detalles}>
        <Text style={styles.title}>{route.params.data.title}</Text>
        <Text style={styles.desc}>Disponible: {route.params.data.stock}</Text>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={[styles.price, {color: '#000'}]}>{'Precio:'}</Text>
          <Text style={styles.price}>{' $' + route.params.data.price}</Text>
          <View style={styles.qtyView}>
            <TouchableOpacity
              style={styles.btnRed}
              onPress={() => {
                if (qty > 1) {
                  setQty(qty - 1);
                }
              }}>
              <Text style={{fontSize: 24, fontWeight: '800',color:'white'}}>-</Text>
            </TouchableOpacity>
            <Text style={styles.qty}>{qty}</Text>
            <TouchableOpacity
              style={styles.btnGreen}
              onPress={() => {
                if ( qty < route.params.data.stock )
                setQty(qty + 1);
              }}>
              <Text style={{fontSize: 24, fontWeight: '600',color:'white'}}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
        

        <CustomButton
          bg={'#00b894'}
          title={'Agregar al carrito'}
          color={'#fff'}
          onClick={() => {
            notificaInfo();
            if (checkUserStatus()) {
              dispatch(
                addItemToCart({
                  id: route.params.data._id,
                  imagen: route.params.data.imagen,
                  price: route.params.data.price,
                  qty: qty,
                  title: route.params.data.title,
                }),
              );
            } else {
              setModalVisible(true);
            }
          }}
        />
        </View>
      </ScrollView>
      <AskForLoginModal
        modalVisible={modalVisible}
        onClickLogin={() => {
          setModalVisible(false);
          navigation.navigate('Login');
        }}
        onClose={() => {
          setModalVisible(false);
        }}
        onClickSignup={() => {
          setModalVisible(false);
          navigation.navigate('Signup');
        }}
      />
    </View>
  );
};

export default ProductDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  detalles: {
    marginTop:10,
    margin:5,
    paddingBottom:10,
    backgroundColor:'#c7ecee',
    borderRadius:10
  },
  banner: {
    width: '100%',
    height: 300,
    resizeMode: 'contain',
    marginTop:20
  },
  title: {
    fontSize: 23,
    color: '#000',
    fontWeight: '600',
    marginLeft: 20,
    marginTop: 20,
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
  wishlistBtn: {
    position: 'absolute',
    right: 60,
    top: 20,
    backgroundColor: '#E2DFDF',
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor:'white',
    shadowColor: 'rgba(0, 0, 0, 0.6)',
    shadowOpacity: 0.8,
    elevation: 6,
    shadowRadius: 5 ,
    shadowOffset : { width: 1, height: 5},
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
});
