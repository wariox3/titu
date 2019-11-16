import React from 'react';
import {View, Text, Button} from 'native-base';
import {StyleSheet, TouchableOpacity} from 'react-native';

const Guia = props => (
  <TouchableOpacity onPress={props.onPress}>
    <View style={styles.right}>
      <Text style={styles.guia}>{props.codigoGuiaPk}</Text>
      <Text style={styles.destinatario}>{props.destinatario}</Text>
      <Text style={styles.destino}>{props.destino}</Text>
      <View style={styles.container_button_novedad}>
        <Button onPress={props.buttonNovedad} bordered style={styles.button}>
          <Text>Novedad</Text>
        </Button>
      </View>
    </View>
  </TouchableOpacity>
);

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
  },
  container_button_novedad: {
    width: '100%',
    display: 'flex',
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  button: {
    height: 30,
    display: 'flex',
    marginTop: 5,
    borderRadius: 100,
    justifyContent: 'center',
  },
});

export default Guia;
