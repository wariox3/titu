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
      <View style={styles.right}>                                     
        <Text style={styles.guia}>{props.codigoGuiaPk}</Text>                
        <Text style={styles.destinatario}>{props.destinatario}</Text>
        <Text style={styles.destino}>{props.destino}</Text>
        
      </View>        
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  right: {
    paddingLeft: 10,
    justifyContent: 'space-between',
  },
  guia: {
    fontSize: 18,
    color: '#44546b',
    fontWeight: 'bold',
  },
  destinatario: {
    color: '#6b6b6b',
    fontSize: 14,
    
  },
  destino: {
    color: '#6b6b6b',
    fontSize: 14,
    fontWeight: 'bold',
  }

})

export default Guia
