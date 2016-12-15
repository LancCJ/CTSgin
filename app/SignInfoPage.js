import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    ListView,
    Image,
    Alert,
    ScrollView
} from 'react-native';

//定义组件
import { List } from 'react-native-elements'
import SignInfo from './SignInfo'

import Constant from './common/Constant'

import NetUtil from './common/utils/NetUtil'



// const list = [
//     {
//         rank:'12',
//         signState: '签到',
//         signTime: '2016年12月14日19:33:58',
//         signAddress:'中国江苏省苏州市虎丘区新元界199号'
//     },
//     {
//         rank:'1',
//         signState: '签退',
//         signTime: '2016年12月14日19:33:58',
//         signAddress:'中国江苏省苏州市虎丘区新元界199号'
//     }
// ]

/**
 * 签到历史界面
 * */
export default class SignInfoPage extends Component {
    constructor(props) {
        super(props);
        this.state={
            list:[]
        }
    }
    componentDidMount() {

        let params = {
            'USER_ID':'chenj',
            'pageIndex':'0',
            'pageSize': '6'
        };

        //查询数据
        NetUtil.ptos(Constant.SignHistoryInfoUrl,params,function (result) {
            console.log('签到历史');
            console.log(result);

            this.setState({
                list:result.data
            });

        }.bind(this));
    }
    render () {
        return (
            <ScrollView >
                <List containerStyle={{marginTop:65}}>
                    {
                        (this.state.list).map((item, i) => (
                            <SignInfo
                                key={i}
                                rank={item.RANK}
                                signState={item.TYPE}
                                signTime={item.INSERT_TIME}
                                signAddress={item.ADDRESS}
                                photoSize={item.PHOTO_SIZE}
                                seq={item.SEQ}
                            />
                        ))
                    }
                </List>
            </ScrollView>
        )
    }
}



const styles = StyleSheet.create({

});