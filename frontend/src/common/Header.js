import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
} from 'react-native';
import React from 'react';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
const {height, width} = Dimensions.get('window');
import { FontAwesome6 } from '@expo/vector-icons';
const Header = ({
  title,
  leftIcon,
  onClickLeftIcon,
  isCart,
}) => {
  const cartItems = useSelector(state => state.cart);
  const navigation = useNavigation();
  return (
    <View style={styles.header}>
      <TouchableOpacity
        style={styles.btn}
        onPress={() => {
          onClickLeftIcon();
        }}>
        <Image source={leftIcon} style={styles.icon} /> 
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
      {/* {isCart && (<View><Text style={styles.title}>{title}</Text></View>)} */}
      {!isCart && (
        <TouchableOpacity
          style={styles.btn}
          onPress={() => {
          }}>
          <FontAwesome6 name="" size={28} />
        </TouchableOpacity>)}
      {isCart && (
        <TouchableOpacity
          style={styles.btn}
          onPress={() => {
            navigation.navigate('Cart');
          }}>
          <FontAwesome6 name="cart-shopping" size={28} color="white" />
          <View
            style={{
              width: 20,
              height: 20,
              borderRadius: 10,
              backgroundColor: 'red',
              position: 'absolute',
              right: 0,
              top: 0,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{color: '#fff'}}>{cartItems.data.length}</Text>
          </View>
        </TouchableOpacity>
      )} 
    </View>
  );
};

export default Header;
const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: 65,

    backgroundColor: '#182C61',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 15,
    paddingRight: 15,
  },
  btn: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 30,
    height: 30,
    tintColor: '#fff',
  },
  title: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '700'
  }
});
