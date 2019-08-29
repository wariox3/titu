import React from 'react';
import AppNavigator from './src/routing/app-navigator';
import { YellowBox, AppRegistry } from 'react-native';

YellowBox.ignoreWarnings([
   'Warning: componentWillMount is deprecated',
   'Warning: componentWillReceiveProps is deprecated',
]);

const App = () => <AppNavigator />;

AppRegistry.registerComponent('App', () => App)

export default App;
