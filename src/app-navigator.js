import React from 'react';
import { Text, View } from 'react-native';
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';
import Home from './pantallas/containers/home';
import Detalle from './guia/containers/detalle';
import Carga from './despacho/containers/carga';
class Perfil extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Este es el perfil!</Text>
      </View>
    );
  }
}

const TabNavigator = createBottomTabNavigator({
  Home,
  Perfil,
  Detalle,
  Carga
});

export default createAppContainer(TabNavigator);