import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

function GuiaListaPresentacion(props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{props.title}, Usuario : {props.usuario}</Text>
      {props.children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    color: '#4c4c4c',
    fontSize: 20,
    marginBottom: 10,
    fontWeight: 'bold',
    marginLeft: 8,
  },
});

export default GuiaListaPresentacion;
