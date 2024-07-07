import { 
Image, 
StyleSheet, 
Text, 
TouchableOpacity, 
View } from "react-native";

const ProductCard = ({ item, handleProductClick, toggleFavorite }) => {

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        handleProductClick(item);
      }}
    >
      <View style={{width:170}}>      
        <Image source={{ uri: item.imagen }} style={styles.coverImage}  />
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.price}>${item.price}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default ProductCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 10,
    marginVertical: 10,
    justifyContent:'center', 
    alignItems:'center'
  },
  coverImage: {
    position: "relative",
    height: 250,
    width:'100%',
    borderRadius: 20
  },
  contentContainer: {
    justifyContent:'center',
    alignItems: 'center',
    padding: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: "#444444",
  },
  price: {
    fontSize: 18
  },
  likeContainer: {
    position: "absolute",
    padding: 5,
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    right: 10,
    top: 10,
  },
  faviorate: {
    height: 20,
    width: 20,
  },
});


{/* <View style={styles.likeContainer}>
        <TouchableOpacity
          onPress={() => {
            if (checkUserStatus()) {
              setSelectedTab(2);
              dispatch(addItemToWishList(route.params.data));
              
            } else {
              setModalVisible(true);
            }
          }}>
        
          {item.isFavorite ? (
            <Image
              source={require("../images/favoriteFilled.png")}
              style={styles.faviorate}
            />
          ) : (
            <Image
              source={require("../images/favorite.png")}
              style={styles.faviorate}
            />
          )}
        </TouchableOpacity>
      </View> */}