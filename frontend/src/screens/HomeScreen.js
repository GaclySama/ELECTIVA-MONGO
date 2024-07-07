import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Keyboard
} from 'react-native';
import React, { useEffect, useState } from 'react';
import Header from '../common/Header';
import Home from './tabs/Home';
import Search from './tabs/Search';
import Wishlist from './tabs/Wishlist';
import User from './tabs/User';
import { useSelector } from 'react-redux';
import Carga from './Carga'

const HomeScreen = () => {
  const [modalVisible, setModalVisible] = useState(true);
  const items = useSelector(state => state.wishlist);
  const [selectedTab, setSelectedTab] = useState(0);
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setIsKeyboardVisible(true);
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setIsKeyboardVisible(false);
      },
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);
  return (
    <View style={styles.container}>
      <Carga modalVisible={modalVisible} setModalVisible={setModalVisible} />
      {selectedTab == 0 ? (
        <Home />
      ) : selectedTab == 1 ? (
        <Search />
      ) : selectedTab == 2 ? (
        <Wishlist />
      ) : (
        <User />
      )}
      {!isKeyboardVisible && (
        <View style={styles.bottomView}>
          <TouchableOpacity
            style={styles.bottomTab}
            onPress={() => {
              setSelectedTab(0);
            }}>
            <Image
              source={
                selectedTab == 0
                  ? require('../images/home_fill.png')
                  : require('../images/home.png')
              }
              style={styles.bottomTabIcon}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.bottomTab}
            onPress={() => {
              setSelectedTab(1);
            }}>
            <Image
              source={require('../images/search.png')}
              style={styles.bottomTabIcon}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.bottomTab}
            onPress={() => {
              setSelectedTab(2);
            }}>
            <Image
              source={
                selectedTab == 2
                  ? require('../images/wishlist_fill.png')
                  : require('../images/wishlist.png')
              }
              style={styles.bottomTabIcon}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.bottomTab}
            onPress={() => {
              setSelectedTab(3);
            }}>

            <Image
              source={
                selectedTab == 3
                  ? require('../images/user_fill.png')
                  : require('../images/user.png')
              }
              style={styles.bottomTabIcon}
            />
            <View
              style={{
                width: 20,
                height: 20,
                borderRadius: 10,
                backgroundColor: 'red',
                position: 'absolute',
                right:'140%',
                bottom:'45%',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={{ color: '#fff' }}>{items.data.length}</Text>
            </View>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default HomeScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bottomView: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 70,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: '#dcdde1',
    boxShadow: {
      shadowColor: "black",
      shadowOffset: {
        width: 6,
        height: 6,
      },
      shadowOpacity: 0.5,
      shadowRadius: 4,
      elevation: 16, // Android
    },
  },
  bottomTab: {
    width: '20%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomTabIcon: {
    width: 24,
    height: 24,
  },
});
