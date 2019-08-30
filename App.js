import React from 'react';
import AppNavigator from './src/routing/app-navigator';
import {YellowBox, AppRegistry} from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor} from './store';
import AppLayout from './src/app';
YellowBox.ignoreWarnings([
  'Warning: componentWillMount is deprecated',
  'Warning: componentWillReceiveProps is deprecated',
]);

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
