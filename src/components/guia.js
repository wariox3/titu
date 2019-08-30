import React from 'react';

import {
  View,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity
} from 'react-native';

function Guia(props) {
  return (
    <TouchableOpacity
      onPress={props.onPress}
    >
      <View>
        <View>                    
            <Text>{props.codigoGuiaPk}</Text>          
        </View>
      </View>        
    </TouchableOpacity>
  )
}


export default Guia
