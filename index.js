/**
 * @format
 */
import React from 'react';
import {AppRegistry} from 'react-native';
import Routes from './src/services/routes'
import {name as appName} from './app.json';
import { initializeFirebaseApi } from './src/services/firebaseApi'

const wrappedRoutes = () => { 
  return (
    <Routes /> 
  );
};

AppRegistry.registerComponent(appName, () => {
  initializeFirebaseApi();
  return wrappedRoutes
});
