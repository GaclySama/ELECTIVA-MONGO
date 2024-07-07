import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  FlatList,
  Dimensions,
  VirtualizedList
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import Header from '../../common/Header';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Search = () => {
  /* const products = useSelector(state => state); */
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const navigation = useNavigation();/* 
  const [oldData, setOldData] = useState([]); */
  const [searchedList, setSearchedList] = useState([]);



  const filterData = txt => {
    let newData = products.data.filter(item => {
      return item.title.toLowerCase().match(txt.toLowerCase());
    });
    setSearchedList(newData);
  };


  //DE BRAYAN

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
  }, []);
//

  return (
    <View style={styles.container}>
      <Header title={'Búsqueda'} />
      <View style={styles.searchView}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Image
            source={require('../../images/search.png')}
            style={styles.icon}
          />
          <TextInput
            value={search}
            onChangeText={txt => {
              setSearch(txt);
              filterData(txt);
            }}
            placeholder="Busca producto aquí..."
            style={styles.input}
          />
        </View>
        {search !== '' && (
          <TouchableOpacity
            style={[
              styles.icon,
              {justifyContent: 'center', alignItems: 'center'},
            ]}
            onPress={() => {
              setSearch('');
              filterData('');
            }}>
            <Image
              source={require('../../images/clear.png')}
              style={[styles.icon, {width: 16, height: 16}]}
            />
          </TouchableOpacity>
        )}
      </View>
        <FlatList
          style={{marginTop: 30, marginBottom: 70}}
          data={searchedList}
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
                  <Text style={styles.desc}>
                    {item.description/* .length > 30 */
                      ? item.description.substring(0, 30) + '...'
                      : item.description}
                  </Text>
                  <Text style={styles.price}>{'$' + item.price}</Text>
                </View>
              </TouchableOpacity>
            );
          }}
        />
        {searchedList.length < 1 && (
        <View style={styles.noItems}>
          <Text style={{fontSize:20}}>No hay búsqueda</Text>
        </View>
      )}
        {/* {searchedList.length < 1 && (
        <View style={styles.noItems}>
          <Image
              source={require('../../images/NotFound.jpg')}
              style={{width:'100%', height:300, bottom:250}}
            />
        </View>
      )} */}
    </View>
  );
};

export default Search;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    
  },
  noItems: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image2: {
    width:'90%',
    height: '90%'
  },
  searchView: {
    width: '90%',
    height: 50,
    borderRadius: 20,
    borderWidth: 0.5,
    alignSelf: 'center',
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 20,
    paddingRight: 20,
    alignItems: 'center',
  },
  icon: {
    width: 24,
    height: 24,
    resizeMode: 'center',
  },
  input: {
    width: '80%', 
    marginLeft: 10
  },
  productItem: {
    width: Dimensions.get('window').width,
    height: 100,
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
    width: 100,
    height: 100,
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
});
