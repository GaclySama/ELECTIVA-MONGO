import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  Dimensions
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from '../common/Header';
import {
  CommonActions,
  useIsFocused,
  useNavigation,
} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {
  emptyCart
} from '../redux/slices/CartSlice';
import CustomButton from '../common/CustomButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {orderItem} from '../redux/slices/OrderSlice';
import Pagado from './OrdenPagado';
import { loadUser } from '../services/user';
import { createOrder } from '../services/order';

const Checkout = () => {
  const navigation = useNavigation();
  const items = useSelector(state => state.cart);
  const [cartItems, setCartItems] = useState([]);
  const [selectedMethod, setSelectedMethod] = useState(0);
  const isFocused = useIsFocused();
  const [modalVisible, setModalVisible] = useState(true);
  const [ user,  setUser ] = useState({_id: '', email : ''});
  const dispatch = useDispatch();

  //almacenando en set cartItems
  useEffect(() => {
    const User = async () => {
      try {
          const { _id, email } = await loadUser();
          setUser({_id, email});
      } catch (error) {
        console.error('Failed to load user from AsyncStorage:', error);
      }
    };

    User();
    setCartItems(items.data);
  }, [items]);

  const porcentajeIVA = 16;

  //total de carrito
  const getTotal = () => {
    let total = 0;
    cartItems.map(item => {
      total = total + item.qty * item.price;
    });
    return total.toFixed(0);
  };

  const TotalProdu = getTotal(); 
  const IVA = getTotal() * (porcentajeIVA / 100);
  const TotalIVA = parseInt(getTotal()) + IVA;

  const orderPlace = () => {
    const day = new Date().getDate();
    const month = new Date().getMonth() + 1;
    const year = new Date().getFullYear();
    const hours = new Date().getHours();
    const minutes = new Date().getMinutes();
    const seconds = new Date().getMinutes();
    let ampm = '';
    if (hours > 12) {
      ampm = 'pm';
    } else {
      ampm = 'am';
    }

    //Generador de numeros random
    let numb = Math.floor(Math.random() * 90000) + 10000;


    const data = {
      userId: user._id,
      email: user.email,
      order: cartItems,
      amount: '$' + TotalProdu,
      orderId: numb.toString(),
      orderStatus: selectedMethod == 3 ? 'Pendiente' : 'Aprobado',
      createdAt: day +'/' +month +'/' +year +' ' +hours +':' +minutes +' ' +ampm,
    };
    dispatch(orderItem(data));

    setTimeout(() => {
      createOrder(data);
    }, 1000);

    dispatch(emptyCart([]));
    navigation.navigate('OrderSuccess');
  };
  return (
    <View style={styles.container}>
      <Header
        leftIcon={require('../images/back.png')}
        title={'Compras'}
        onClickLeftIcon={() => {
          navigation.goBack();
        }}
      />
        <Text style={styles.title}>Lista de productos</Text>
        <View style={styles.containerList}>
          <FlatList
            data={cartItems}
            renderItem={({item, index}) => {
              return (
                <TouchableOpacity
                  activeOpacity={1}
                  style={styles.productItem}
                  onPress={() => {
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
                      <Text style={styles.qty}>Cantidad: {item.qty}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            }}
          />
        </View>
        <View style={styles.IVAView}>
          {/* <Text style={styles.title}>IVA (16%)</Text>
          <Text style={[styles.title, {marginRight: 20}]}>
            {'$' + IVA}
          </Text> */}
        </View>
        <View style={styles.totalView}>
          <Text style={styles.title}>Total</Text>
          {/* <Text style={[styles.title, {marginRight: 20}]}>
            {'$' + TotalIVA}
          </Text> */}
          <Text style={[styles.title, {marginRight: 20}]}>
            {'$' + TotalProdu}
          </Text>
        </View>

        {/* <Button 
          style={ styles.buttonCompra }
          title={ 'Solicitar Compra' }
          color={'green'}
          onPress={() => {
            orderPlace();
            <Pagado modalVisible={modalVisible} setModalVisible={setModalVisible}/>
          }}
        /> */}

        <View style={styles.container2}>
          <View style={styles.tab}>
            <TouchableOpacity
              style={styles.checkout}
              onPress={() => {
                  orderPlace();
                  <Pagado modalVisible={modalVisible} setModalVisible={setModalVisible}/>
                
              }}>
              <Text style={{color: '#fff',fontWeight:'800'}}>Solicitar Compra</Text>
            </TouchableOpacity>
          </View>
        </View>


        {/* <TouchableOpacity
          style={styles.buttonCompra}
          bg={'green'}
          title={'Solicitar Compra'}
          color={'#fff'}
          onClick={() => {
            orderPlace();
            <Pagado modalVisible={modalVisible} setModalVisible={setModalVisible}/>
          }}
          /> */}
    </View>
  );
};

export default Checkout;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  containerList: {
    margin:10,
    borderRadius:15,
    backgroundColor: '#c7ecee',
    padding:10
  },
  title: {
    fontSize: 18,
    marginLeft: 20,
    marginTop: 30,
    color: '#000',
  },
  productItem: {
    width: /* Dimensions.get('window').width */'100%',
    height: 65,
    marginTop: 10,
    backgroundColor: '#fff',
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius:15,

  },
  itemImage: {
    width: 50,
    height: 50,
    left: 10
  },
  name: {
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
  qtyview: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  buttonCompra: {
    bottom: 100,
    width: Dimensions.get('window').width,
    height: 53,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginVertical: 20,
    borderRadius: 10,
  },
  btn: {
    padding: 5,
    width: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.5,
    borderRadius: 10,
    marginLeft: 10,
  },
  qty: {
    marginLeft: 10,
    fontSize: 18,
  },
  noItems: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  IVAView: {
    width: '100%',
    justifyContent: 'space-between',
    Color: '#95afc0',
    flexDirection: 'row',
    height: 70,
    alignItems: 'center',
  },
  totalView: {
    bottom: 100,
    width: '100%',
    justifyContent: 'space-between',

    flexDirection: 'row',
    height: 70,
    alignItems: 'center',
    borderBottomWidth: 0.3,
    borderBottomColor: '#B7B7B7',
  },
  img: {
    width: 24,
    height: 24,
  },
  container2: {
    position: 'absolute',
    bottom: 0,
    height: 70,
    width: /* Dimensions.get('window').width */'100%',
    backgroundColor: '#fff',
    flexDirection: 'row',
  },
  tab: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: ''
  },
  checkout: {
    width: '80%',
    height: '60%',
    backgroundColor: 'green',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
