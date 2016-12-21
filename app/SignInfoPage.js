import React, { Component } from 'react';


import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    Alert,
    TouchableOpacity,
    Keyboard
} from 'react-native';


import {RefresherListView} from 'react-native-refresher' ;

//定义组件
import SignInfo from './SignInfo'

import Constant from './common/Constant'

import NetUtil from './common/utils/NetUtil'

/**
 * 签到历史界面
 * */
export default class SignInfoPage extends Component {
    constructor(props) {
        super(props);
        this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: this.ds.cloneWithRows(["Row 1", "Row 2"]),
        };
    }

    onRefresh() {
        // You can either return a promise or a callback
        this.setState({dataSource:this.fillRows(["Row 1", "Row 2", "Row 3", "Row 4"])});
    }

    render () {
        return (
            <View style={{flex:1}}>
                <RefresherListView
                    dataSource={this.state.dataSource}
                    onRefresh={this.onRefresh.bind(this)}
                    renderRow={(rowData) => <View style={{padding:10,borderBottomColor: '#CCCCCC', backgroundColor: 'white',borderBottomWidth: 1}}><Text>{rowData}</Text></View>}
                />
            </View>
        )
    }
}



const styles = StyleSheet.create({

});