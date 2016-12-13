import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    ListView,
    Image,
    Alert
} from 'react-native';

//定义组件
import SignInfoList from './SignInfoList';

/**
 * 登录用户会话主界面
 * */
export default class ReasonPageSignInfoPage extends Component {
    render () {
        return (
            <SignInfoList/>
        )
    }
}



const styles = StyleSheet.create({

});