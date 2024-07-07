import React, {useState} from "react";
import {StyleSheet, Text, View} from 'react-native';
import {Button, Icon, Input} from 'react-native-elements';
import { recover } from "../services/user";
import {  notificaInfoNoRecover, notificaInfoRecover} from './tabs/Notification';

export default function RecuperarContraseña({navigation}) {
    const [email, setEmail] = useState('');
    const [errorEmail, setErrorEmail] = useState(null);
    

    //Solicitud de resetPassword
    const sendEmailResetPassword = async (email) => {
        let validar = false;
        validar = await recover(email.trim().toLowerCase());

        validar ?
            setTimeout(() => {
                getData();
                return console.log(email);//acceso valido
            }, 2000)
            :
            console.log(email);//acceso invalido
    };

    const getData = async () => {
        await getProducts();
        navigation.navigate('Login');
    }

    //Validar correo
    const validateEmail= () =>{
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email)
    }

    const validateData = () => {
        setErrorEmail(null);
        let valid= true;
        console.log('email', email);

        if(!validateEmail(email)){
            setErrorEmail('debes ingresar un email valido');
            valid = false;
        }
        return valid;
    }

    const onSubmit = () =>{
        if(!validateData()){
            return
        }
        console.log('hola');
    }

    /* const onSubmit = async() => {
        if (!validateData()) {
            return
        }

        
        const result = await sendEmailResetPassword(email);
        

        if (!result.statusResponse) {
            console.log("Error", "Este correo no está relacionado a ningún usuario.");
            return
        }

        console.log("Confirmación", "Se le ha enviado un email con las instrucciones para cambiar la contraseña.");
        navigation.navigate('Login');
    } */

    return (
        <View styles={styles.formContainer}>
            <Input
                placeholder='Ingresa tu email...'
                containerStyle={styles.inputForm}
                onChange={(e) => setEmail(e.nativeEvent.text)}
                defaultValue={email}
                errorMessage={errorEmail}
                keyboardType='email-address'
                rightIcon={
                    <Icon
                        type='material-community'
                        name='at'
                    />
                }
            />
            <Button
                title='Recuperar Contraseña'
                containerStyle={styles.bntContainer}
                buttonStyle={styles.bntRecover}
                onPress={onSubmit}
            />

        </View>
    );
}

const styles = StyleSheet.create({
    formContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 30
    },
    inputForm: {
        width: "90%"
    },
    bntContainer: {
        marginTop: 20,
        width: "85%",
        alignSelf: "center"
    },
    btnRecover: {
        backgroundColor: "#442484"
    },
    icon: {
        color: "#c1c1c1"
    }
})