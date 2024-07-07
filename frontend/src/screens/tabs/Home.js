import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { addProducts } from '../../redux/slices/ProductsSlice';
import Header from '../../common/Header';
import ProductCard from '../../common/ProductCard';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Home = () => {

  const navigation = useNavigation();
  const [selected, setSelected] = useState('Todo');
  const tags = ['Todo', 'Hombre', 'Mujer', 'Niño', 'Niña'];
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

  const handleProductDetails = (item) => {
    navigation.navigate('ProductDetail', { data: item });
  };

  const toggleFavorite = (item) => {
    setProducts(
      products.map((prod) => {
        if (prod.id === item.id) {
          // console.log("prod: ", prod);
          return {
            ...prod,
            isFavorite: !prod.isFavorite,
          };
        }
        return prod;
      })
    );
  };

  // * Al renderizar la vista:
  useEffect(() => {
    // * Busca los productos en async
    fetchProducts();
    dispatch(addProducts(products));
  }, []);

  return ( // TODO: recorrer los 'products.data' para mostrar en pantalla
    <View style={styles.container}>
      <Header
        rightIcon={require('../../images/cart.png')}
        title={'Nemesis Store'}
        /* onClickLeftIcon={() => {
          navigation.openDrawer();
        }} */
        isCart={true}
      />

      <FlatList
        style={{ marginBottom: 60 }}
        ListHeaderComponent={
          <View style={styles.containerSelect}>
            <Image source={require('../../images/banner.png')}
              style={{ width: '97%', height: 200, alignItems: 'center', margin: 5, borderRadius: 15 }}
            />
            <FlatList
              horizontal
              showsHorizontalScrollIndicator = {false}
              data={tags}
              renderItem={({ item }) => {
                return (
                  <View style={{marginHorizontal:12}}>
                    <TouchableOpacity 
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
        }
        data={
          selected.valor == null && selected.valor == undefined
            ? products.data
            : selected.valor === 'Todo'
              ? products.data
              : selected.valor === 'Mujer'
                ? products.data.filter(item => item.category === 'mujer')
                : selected.valor === 'Hombre'
                  ? products.data.filter(item => item.category === 'hombre')
                  : selected.valor === 'Niño'
                    ? products.data.filter(item => item.category === 'niño')
                      : selected.valor === 'Niña'
                      ? products.data.filter(item => item.category === 'niña')
                      : []

        }
        numColumns={2}
        renderItem={({ item }) => (
          <ProductCard
            item={item}
            handleProductClick={handleProductDetails}
            toggleFavorite={toggleFavorite}
          />
        )}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default Home;
const styles = StyleSheet.create({
  containerTags: {
    marginVertical: 5,
  },
  container: {
    flex: 1
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
  tagText: {
    fontSize: 18,
    fontWeight:'700',
    borderRadius: 10,
    paddingVertical:15,
    paddingHorizontal:20,
    backgroundColor: "#95afc0",
    color: "#000"
  },
  isSelected: {
    backgroundColor: "#f9ca24",
    color: "#000",
  },
  containerSelect: {
    marginVertical: 5
  },
});
