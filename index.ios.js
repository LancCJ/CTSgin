/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry
} from 'react-native';

import Root from './app/Root'
import SplashScreen from "rn-splash-screen";
// Hide the active splash screen
SplashScreen.hide();
AppRegistry.registerComponent('CTSgin', () => Root);
