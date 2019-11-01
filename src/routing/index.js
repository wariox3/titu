import React from 'react';
import Login from '../components/login';
import Aplicacion from '../app';
import Perfil from '../components/perfil/perfil';
import {Icon} from 'native-base';

export const Sesion = {
  InisioSesion: {
    screen: Login,
  },
};

export const Tabs = {
  Home: {
    screen: Aplicacion,
    navigationOptions: {
      tabBarLabel: 'Inicio',
      tabBarIcon: ({focused, tintColor}) => (
        <Icon
          name="home"
          style={{color: tintColor, fontSize: focused ? 30 : 20}}
        />
      ),
    },
  },

  CerrarSesion: {
    screen: Perfil,
    navigationOptions: {
      tabBarLabel: 'Perfil',
      tabBarIcon: ({focused, tintColor}) => (
        <Icon
          name="person"
          style={{color: tintColor, fontSize: focused ? 30 : 20}}
        />
      ),
    },
  },
};
