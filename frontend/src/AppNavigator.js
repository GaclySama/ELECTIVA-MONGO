import { View, Text } from 'react-native';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Main from './screens/Main';
import ProductDetail from './screens/ProductDetail';
import Cart from './screens/Cart';
import Login from './screens/Login';
import Registro from './screens/Registro';
import OrderSuccess from './screens/OrdenPagado';
import Inicio from './screens/Inicio';
import Checkout from './screens/Checkout';
import Actualizar from './screens/Actualizar';
import Imprime from './screens/Imprime';
import QR from './screens/QR';
import AgregarProductos from './screens/AgregarProductos';
import GestionarProductos from './screens/GestionarProducto';
import EditarProducto from './screens/editarProducto';
/* import RecuperarContraseña from './screens/RecoverPassword'; */

const Stack = createNativeStackNavigator();
const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Inicio"
          component={Inicio}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Registro"
          component={Registro}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Main"
          component={Main}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ProductDetail"
          component={ProductDetail}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Cart"
          component={Cart}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Checkout"
          component={Checkout}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="OrderSuccess"
          component={OrderSuccess}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Actualizar"
          component={Actualizar}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Imprime"
          component={Imprime}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Agregar Producto"
          component={AgregarProductos}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Gestionar Productos"
          component={GestionarProductos}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Editar Producto"
          component={EditarProducto}
          options={{ headerShown: false }}
        />
        {/* <Stack.Screen
          name="Recuperar contraseña"
          component={RecuperarContraseña}
        /> */}
        <Stack.Screen
          name="QR"
          component={QR}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
