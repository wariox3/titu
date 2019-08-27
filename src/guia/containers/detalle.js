import React, { Component } from 'react';
import {
    View,
    Text,
    Button    
  } from 'react-native';

class Detalle extends Component {   
    handlePress = () => {
        fetch('http://192.168.0.102/cesio/public/index.php/api/conductor/guia/prueba/en/1', {
            method: 'GET'            
        })
        .then( res => res.json())
        .then( (responseJson) => {
            console.log(responseJson)
            this.props.navigation.navigate('Home')            
        })
        .catch((error) => {
            console.error(error);
        });               
    }      
    render() {
        const { navigation } = this.props;
        const itemId = navigation.getParam('itemId', 'NO-ID');
        const otherParam = navigation.getParam('otherParam', 'some default value');        
        return (                          
            <View>
            <Text>Detalle </Text> 
            <Text>itemId: {JSON.stringify(itemId)}</Text>  
            <Text>otherParam: {JSON.stringify(otherParam)}</Text> 
            <Button
                onPress={this.handlePress}
                title="Entregar"
            />
            </View>                                                                                                                                   
        )      
    }
}

export default Detalle;