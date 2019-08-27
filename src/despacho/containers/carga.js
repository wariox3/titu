import React, { Component } from 'react';
import {
    View,
    Text,
    TextInput,
    Button    
  } from 'react-native';

class Carga extends Component {  
    handlePress = () => {
        alert('Hola mundo');              
    }           
    render() {
        return (                          
            <View>
            <Text>Despacho:</Text>
            <TextInput            
                placeholder="Ingrese numero despacho"                
            /> 
            <Button                
                title="Cargar"
                onPress={this.handlePress}
            />
            </View>                                                                                                                                   
        )      
    }
}

export default Carga;