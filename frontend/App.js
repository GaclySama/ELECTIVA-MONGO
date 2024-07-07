import {View, Text} from 'react-native';
import React from 'react';
import AppNavigator from './src/AppNavigator';
import {Provider} from 'react-redux';
import {store} from './src/redux/store';
import Toast,{BaseToast} from 'react-native-toast-message';

const App = () => {

  //Configuracion de alertas con Toast
  const toastConfig = {

    success: (props) => (
      <BaseToast
        {...props}
        style={{ borderLeftColor: '#6ab04c' }}
        contentContainerStyle={{ paddingHorizontal: 5 }}
        text1Style={{
          fontSize: 17
        }}
        text2Style={{
          fontSize: 15,
          color:'black'
        }}
      />
    ),
    
    error: (props) => (
      <BaseToast
      {...props}
      style={{ borderLeftColor: '#ff7979' }}
      contentContainerStyle={{ paddingHorizontal: 5 }}
      text1Style={{
        fontSize: 17
      }}
      text2Style={{
        fontSize: 15,
        color:'black'
      }}
      />
    ),

    info: (props) => (
      <BaseToast
      {...props}
      style={{ borderLeftColor: '#7ed6df' }}
      contentContainerStyle={{ paddingHorizontal: 5 }}
      text1Style={{
        fontSize: 17
      }}
      text2Style={{
        fontSize: 15,
        color:'black'
      }}
      />
    ),

  };

  return (
    <Provider store={store}>
      <AppNavigator />
      <Toast config={toastConfig} />
    </Provider>
  );
};

export default App;
