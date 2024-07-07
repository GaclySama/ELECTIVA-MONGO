import React, {useEffect} from 'react';
import { View, Image, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';


function QR () {
    const navigation = useNavigation();
    return (
    <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
        <Text style={{margin:10, fontSize: 16, fontWeight:'800',}}>Compartelo sabiamente..</Text>
        <Image source={(require('../images/code.png'))} 
        style={{width:300, height:300}}
        />
    </View>
    );  
};

export default QR