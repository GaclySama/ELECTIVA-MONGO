import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Dimensions,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Header from '../../common/Header';
import {useNavigation} from '@react-navigation/native';
import {
  reduceItemFromWishlist,
  removeItemFromWishlist
} from '../../redux/slices/WishlistSlice';


const Wishlist = () => {
  const items = useSelector(state => state.wishlist);
  const [WishListItems, setWishListItems] = useState([]);

  const navigation = useNavigation();
  const dispatch = useDispatch();
  useEffect(() => {
    setWishListItems(items.data);
  }, [items]);
  return (
    <View style={styles.container}>
      <Header
        title={'Productos deseados'}
      />
      <FlatList
        style={{marginBottom: 70}}
        data={WishListItems}
        renderItem={({item, index}) => {
          return (
            <TouchableOpacity
              activeOpacity={1}
              style={styles.productItem}
              onPress={() => {
                navigation.navigate('ProductDetail', {data: item});
              }}>
              <Image source={{uri: item.imagen}} style={styles.itemImage} />
              <View style={{width: '100%',flexDirection:'row'}}>
              <View style={{width:'55%',}}>
                <Text style={styles.name}>
                  {item.title/* .length > 25 */
                    ? item.title.substring(0, 25) + '...'
                    : item.title}
                </Text>
                <View style={styles.qtyview}>
                  <Text style={styles.price}>{'$' + item.price}</Text>
                  <TouchableOpacity
                    style={styles.btn}
                    onPress={() => {
                      if (item.qty > 1) {
                        dispatch(reduceItemFromWishlist(item));
                      } else {
                        dispatch(removeItemFromWishlist(index));
                      }
                    }}>
                    <Text style={{color:'white', fontSize: 24, fontWeight: '600'}}>X</Text>
                  </TouchableOpacity>
                  <Text style={styles.qty}>{item.qty}</Text>
                  
                </View>
              </View>
              </View>
            </TouchableOpacity>
          );
        }}
      />
      {WishListItems.length < 1 && (
        <View style={styles.noItems}>
          <Text style={{fontSize:20}}>No hay productos deseados</Text>
        </View>
      )}
    </View>
  );
};

export default Wishlist;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ff',
  },
  productItem: {
    width: Dimensions.get('window').width,
    height: 100,
    marginTop: 10,
    backgroundColor: '#fff',
    alignItems: 'center',
    flexDirection: 'row',
  },
  itemImage: {
    width: 100,
    height: 100,
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
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
    alignItems: 'center'
  },
  btn: {
    padding: 5,
    width: 50,
    height: 50,
    left:120,
    bottom:20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    marginLeft: 10,
    backgroundColor:'#E96E6E'
  },
  qty: {
    marginLeft: 10,
    fontSize: 18,
  },
  noItems: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
