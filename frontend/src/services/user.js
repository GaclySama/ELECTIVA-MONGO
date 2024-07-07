import api from "./api";
import AsyncStorage from "@react-native-async-storage/async-storage";

// * Ruta para loguearse

export const newUser = async (pName, pLastname, pEmail, pPassword) => {

    const data = {
        name: pName,
        lastname: pLastname,
        email: pEmail,
        password: pPassword
    }

    try {
        const res = await api.post('/user/new', data);
        if (res.status === 201) {
          return [true];
      }
    } catch (error) {
      let err;
      if (error.response) {
          err = error.response.data.detail || 'Error desconocido';
      } else if (error.request) {
          err = 'No se recibió respuesta del servidor';
      } else {
          err = 'Error en la configuración de la solicitud';
      }

        return [
          false,
          err
        ];
    }
}

export const login = async (pEmail, pPassword) => {

    const data = {
        email: pEmail,
        password: pPassword
    }

    try {
        const res = await api.post('/user/login', data);

        if (res.status === 200) {
            const token = res.data.authenticated;
            const user = res.data.user;
            await AsyncStorage.setItem('@accessToken', token);
            await AsyncStorage.setItem('@user', JSON.stringify(user));
            return [true];
        }
    } catch (error) {
      let err;
      if (error.response) {
          err = error.response.data.detail || 'Error desconocido';
      } else if (error.request) {
          err = 'No se recibió respuesta del servidor';
      } else {
          err = 'Error en la configuración de la solicitud';
      }

        return [
          false,
          err
        ];
    }
}


export const loadUser = async () => {
  try {
    const userData = await AsyncStorage.getItem('@user');
    if (userData) {
      return JSON.parse(userData);
    }
  } catch (error) {
    console.error('Failed to load user from AsyncStorage:', error);
  }
}