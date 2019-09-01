import React from 'react';
import { createBottomTabNavigator, createAppContainer, createSwitchNavigator, createStackNavigator } from 'react-navigation';
import { Sesion, Tabs } from './index'

const SesionNavigation = createSwitchNavigator(Sesion,{
   initialRouteName : "InisioSesion",
   headerMode       : "none",
});

const TabNavigator = createBottomTabNavigator( 
   Tabs,
   {
      initialRouteName : "Home",
      headerMode       : "none",
   });

const AppNavigation = createStackNavigator(
   {
      Sesion       : SesionNavigation,
      TabNavigator : TabNavigator
   },
   {
      initialRouteName  : "Sesion",
      headerMode        : "none"
   }
);

export default createAppContainer(AppNavigation);
