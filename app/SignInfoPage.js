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
import { List } from 'react-native-elements'
import SignInfo from './SignInfo'

const list = [
    {
        rank:'12',
        signState: '签到',
        signTime: '2016年12月14日19:33:58',
        signAddress:'中国江苏省苏州市虎丘区新元界199号'
    },
    {
        rank:'1',
        signState: '签退',
        signTime: '2016年12月14日19:33:58',
        signAddress:'中国江苏省苏州市虎丘区新元界199号'
    }
]


/**
 * 登录用户会话主界面
 * */
export default class ReasonPageSignInfoPage extends Component {
    componentDidMount() {
        //
    }
    render () {
        return (
            <List containerStyle={{marginTop:65}}>
                {
                    list.map((item, i) => (
                        <SignInfo
                            key={i}
                            rank={item.rank}
                            signState={item.signState}
                            signTime={item.signTime}
                            signAddress={item.signAddress}
                        />
                    ))
                }
            </List>
        )
    }
}



const styles = StyleSheet.create({

});