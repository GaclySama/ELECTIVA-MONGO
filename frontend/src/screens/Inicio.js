import React, {useEffect} from 'react';
import { View, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';


function Inicio () {
    const navigation = useNavigation();
    useEffect(() => {
        setTimeout(() => {
            navigation.navigate('Login');
        },3000);
    },[]);
    return (
    <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
        <Image source={(require('../images/Nemesis Store.png'))} 
        style={{width:100, height:100, borderRadius:50}}
        />
    </View>
    );  
};

export default Inicio