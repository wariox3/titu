import React from 'react';
import AppNavigator from './src/routing/app-navigator';
import {YellowBox, AppRegistry} from 'react-native';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {store, persistor} from './store';
import * as firebase from 'firebase';

YellowBox.ignoreWarnings([
  'Warning: componentWillMount is deprecated',
  'Warning: componentWillReceiveProps is deprecated',
]);

const config = {
  apiKey: 'AIzaSyB824zxHKLpljJ-0SzwJQTJerDhwujAVnA',
  authDomain: 'titu-17557.firebaseapp.com',
  databaseURL: 'https://titu-17557.firebaseio.com',
  projectId: 'titu-17557',
  storageBucket: 'titu-17557.appspot.com',
  messagingSenderId: '281760663061',
  appId: '1:281760663061:web:3f49c1302dba88693f301c',
  measurementId: 'G-JYJ7XSY2B8',
};

firebase.initializeApp(config);

const App = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <AppNavigator />
    </PersistGate>
  </Provider>
  //<AppNavigator />
  //<AppLayout />
);

AppRegistry.registerComponent('App', () => App);

export default App;
