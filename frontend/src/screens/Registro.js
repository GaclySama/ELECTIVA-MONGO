import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, Pressable, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import regExp from '../services/regExp'
import { newUser } from '../services/user';
import {notificaErrorRegistro, notificaSuccessRegistro} from './tabs/Notification';

const Registro = () => {

    let isValid = true;
    const { regEmail, regPassword, regName } = regExp;
    const navigation = useNavigation();
    const [name, setName] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmpass, setConfirmpass] = useState('');
    const [buttonDisabled, setButtonDisabled] = useState(false);

    const [disabled, setDisabled] = useState(false);

    const handleClick = () => {
        setDisabled(true);
        setTimeout(() => {
            setDisabled(false);
        }, 6000);
    };

    const cargarPantalla = async () => {
        let validar = false;
        handleClick();
        respuesta = await newUser(name, lastname, email.trim().toLowerCase(), password.trim());
        validar= respuesta[0];

        validar ?
            setTimeout(() => {
                navigation.goBack();
                return notificaSuccessRegistro();//Registo valido
            }, 2000)
            :
            notificaErrorRegistro(respuesta[1], '');//registro invalido
    };

    

    // * Validación de login con Regex
    const validateUser = () => {

        if (!regName.test(name)) return notificaErrorRegistro('Nombre Inválido', 'Ej: Pepe Grillo', 3000);//bad email
        if (!regName.test(lastname)) return notificaErrorRegistro('Apellido Inválido', 'Ej: Montes Verdes', 3000);//bad email
        if (!regEmail.test(email)) return notificaErrorRegistro('Email debe tener', '10 a 30 Caracteres', 3000);//bad email
        if (!regPassword.test(password)) return notificaErrorRegistro('Contraseña debe tener', '6 a 16 / Números / Caracter especial', 3000);//bad password
        if (password != confirmpass) return notificaErrorRegistro('Verifica las contraseñas', 'Deben ser iguales', 3000);//bad confirm password

        cargarPantalla();
    }

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Image source={require('../images/Nemesis Store.png')}
                style={{ width: 100, height: 100, borderRadius: 50, alignSelf: 'center', marginTop: 20 }}
            />
            <Text style={{
                marginTop: 20,
                alignSelf: 'center',
                fontSize: 24, fontWeight: '600',
                color: '#000',
            }}>
                Registro
            </Text>
            <TextInput style={styles.Input} placeholder='Nombres' value={name} onChangeText={txt => setName(txt)} />
            <TextInput style={styles.Input} placeholder='Apellidos' value={lastname} onChangeText={txt => setLastname(txt)} />
            <TextInput style={styles.Input} placeholder='Correo@gmail.com' value={email} onChangeText={txt => setEmail(txt)} />
            <TextInput style={styles.Input} secureTextEntry placeholder='Contraseña' value={password} onChangeText={txt => setPassword(txt)} />
            <TextInput style={styles.Input} secureTextEntry placeholder='Confirmar contraseña' value={confirmpass} onChangeText={txt => setConfirmpass(txt)} />
            <Pressable style={[styles.Btn, { backgroundColor: disabled ? '#b2bec3' : '#00a8ff'}]} onPress={() => { validateUser(); }} disabled={buttonDisabled} ><Text style={styles.BtnText}>Crear Cuenta</Text></Pressable>
            <Text style={styles.Create} onPress={() => navigation.navigate('Login')}>¿Ya tienes cuenta?</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    Input: {
        width: '85%',
        height: 50,
        borderWidth: 0.5,
        borderRadius: 10,
        alignSelf: 'center',
        padding: 10,
        marginTop: 10,
        flexDirection: 'row',
        alignItems: 'center'
    },
    Btn: {
        width: '40%',
        marginTop: 20,
        paddingVertical: 10,
        backgroundColor: '#F79F1F',
        borderRadius: 10
    },
    Create: {
        marginTop: 35,
        fontWeight: 'bold',
        fontStyle: 'italic',
        textDecorationLine: 'underline'
    },
    BtnText: {
        margin: 5,
        fontSize: 16,
        fontWeight: '800',
        textAlign: 'center',
        justifyContent: 'center',
        color: '#fff'
    }
});

export default Registro;