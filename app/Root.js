import React, { Component } from 'react';
import {Provider} from 'react-redux';
import CTSgin from './CTSgin';
import configureStore from './redux/store/ConfigureStore';
const store=configureStore();//获取store

import storage from './common/Storage';
import SplashScreen from 'react-native-splash-screen'


export default class Root extends Component{
    componentDidMount() {
        // do anything while splash screen keeps, use await to wait for an async task.
        SplashScreen.hide();
    }
    render(){
        return(
            <Provider store={store}>
                <CTSgin/>
            </Provider>
        );
    }
}