import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, ImageBackground, Pressable , TextInput} from 'react-native';
import {  } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { login } from '../services/user';
import regExp from '../services/regExp'
import { getProducts } from '../services/product';
import { notificaErrorIngreso, notificaSuccessIngreso } from './tabs/Notification';

const Login = () => {
    const { regEmail, regPassword } = regExp;
    const navigation = useNavigation();
    const [isValid, setIsValid] = useState(true)
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [badEmail, setBadEmail] = useState(null);
    const [badPass, setBadPass] = useState(null);

    //Desabilitar

    const [disabled, setDisabled] = useState(false);

    //DESACTIVA BOTON

    const handleClick = () => {
        setDisabled(true);
        setTimeout(() => {
            setDisabled(false);
        }, 6000);
    };

    //LIMPIA FORMULARIO

    const handleData = () => {
        setTimeout(() => {
            setEmail('');
            setPassword('');
        }, 4000);
    };

    // * Prueba de envio
    const cargarPantalla = async () => {
        let validar = false;
        handleClick();
        respuesta = await login(email.trim().toLowerCase(), password.trim());
        validar = respuesta[0]
        

        validar ?
            setTimeout(() => {
                getData();
                handleData();
                return notificaSuccessIngreso();//acceso valido
            }, 2000)
            :
            notificaErrorIngreso(respuesta[1], '');//acceso invalido
    };

    // * Validación de login con Regex
    const validarLogin = () => {
        if (!regEmail.test(email)) return notificaErrorIngreso('Email Inválido', 'Sigue intentando...', 3000);//bad email
        if (!regPassword.test(password)) return notificaErrorIngreso('Contraseña debe tener', '0 a 16 / Números / Caracter especial', 3000);//bad password

        (regEmail.test(email) && regPassword.test(password)) && cargarPantalla();
    }

    const getData = async () => {
        let res = false;
        res = await getProducts();
        res ? navigation.navigate('Main') : navigation.navigate('Login');

    }

    return (
        <View style={{ backgroundColor: 'white', width: '100%', height: '100%' }}>
            {/* <View style={styles.background}> */}
            <ImageBackground
                source={require('../images/yellow.png')}
                style={{ flex: 1, width: '100%', height: '120%' }}
            >
                <Image source={require('../images/Nemesis Store.png')}
                    style={{ width: 100, height: 100, borderRadius: 50, alignSelf: 'center', justifyContent: 'center', marginTop: 150 }}
                />
            </ImageBackground>
            {/* </View> */}
            <View style={styles.fondo2}>
                <Text style={{
                    marginTop: 10,
                    alignSelf: 'center',
                    fontSize: 24,
                    fontWeight: '600',
                    color: '#000',
                }}>
                    Login
                </Text>
                <TextInput 
                    style={styles.Input} 
                    placeholder='Correo@gmail.com'
                    value={email}
                    errorMessage={badEmail}
                    onChangeText={txt => setEmail(txt)} 
                />
                <TextInput 
                    style={styles.Input} 
                    secureTextEntry 
                    placeholder='Contraseña'
                    value={password}
                    errorMessage={badPass}
                    onChangeText={txt => setPassword(txt)} 
                />
                <Pressable style={[styles.Btn, { backgroundColor: disabled ? '#b2bec3' : '#00a8ff'}]} onPress={() => { validarLogin(); }} disabled={disabled}><Text style={styles.BtnText}>Iniciar</Text></Pressable>
                <Text style={styles.Create} onPress={() => navigation.navigate('Registro')}>¿Crear Nueva cuenta?</Text>
                {/* <Text style={styles.Create} onPress={() => navigation.navigate('Recuperar contraseña')}>¿Recuperar contraseña?</Text> */}
                <Pressable style={styles.BtnQR} onPress={() => navigation.navigate('QR')}><Text style={styles.BtnText}>QR</Text></Pressable>
            </View>
        </View>

    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#12CBC4'
    },
    fondo2: {
        borderTopRightRadius: 50,
        borderTopLeftRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        height: 320,
        marginBottom: 15
    },
    Input: {
        width: '85%',
        height: 50,
        borderWidth: 0.5,
        borderRadius: 10,
        alignSelf: 'center',
        padding: 10,
        marginTop: 30,
        flexDirection: 'row',
        alignItems: 'center'
    },
    Btn: {
        marginTop: 25,
        width: '30%',
        paddingVertical: 10,
        borderRadius: 10,
        backgroundColor: '#00a8ff',
    },
    BtnQR: {
        position: 'absolute',
        left: '79%',
        bottom:'10%',
        color: '#fff',
        marginTop: 25,
        width: '15%',
        paddingVertical: 10,
        borderRadius: 10,
        backgroundColor: '#00b894',
    },
    Create: {
        color: '#3498db',
        marginTop: 15,
        fontWeight: 'bold',
        fontStyle: 'italic',
        textDecorationLine: 'underline'
    },
    BtnText: {
        margin: 2,
        fontSize: 16,
        fontWeight:'800',
        textAlign: 'center',
        justifyContent: 'center',
        color: 'white'
    }
});

export default Login;
