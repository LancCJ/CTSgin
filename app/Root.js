import React, { Component } from 'react';
import {Provider} from 'react-redux';
import CTSgin from './CTSgin';
import configureStore from './redux/store/ConfigureStore';
const store=configureStore();//获取store

import storage from './common/Storage';


export default class Root extends Component{
    render(){
        return(
            <Provider store={store}>
                <CTSgin/>
            </Provider>
        );
    }
}