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

var GiftedListView = require('react-native-gifted-listview');
var GiftedSpinner = require('react-native-gifted-spinner');
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
            //console.log('签到历史');
            //console.log(result);

            this.setState({
                list:result.data
            });

        }.bind(this));
    }
    /**
     * Render the refreshable view when fetching
     */
    _renderRefreshableFetchingView() {
        return (
            <View style={customStyles.refreshableView}>
                <GiftedSpinner />
            </View>
        );
    }
    /**
     * Will be called when refreshing
     * Should be replaced by your own logic
     * @param {number} page Requested page to fetch
     * @param {function} callback Should pass the rows
     * @param {object} options Inform if first load
     */
    _onFetch(page = 1, callback, options) {
        setTimeout(() => {
            var rows = ['row '+((page - 1) * 3 + 1), 'row '+((page - 1) * 3 + 2), 'row '+((page - 1) * 3 + 3)];
            if (page === 3) {
                callback(rows, {
                    allLoaded: true, // the end of the list is reached
                });
            } else {
                callback(rows);
            }
        }, 1000); // simulating network fetching
    }

    /**
     * Render a row
     * @param {object} rowData Row data
     */
    _renderRowView(rowData) {
        return (
            <TouchableHighlight
                style={styles.row}
                underlayColor='#c8c7cc'
                onPress={() => this._onPress(rowData)}
            >
                <Text>{rowData}</Text>
            </TouchableHighlight>
        );
    }

    render () {
        return (
            <ScrollView >

                <GiftedListView
                    rowView={this._renderRowView}
                    onFetch={this._onFetch}
                    initialListSize={6} // the maximum number of rows displayable without scrolling (height of the listview / height of row)
                    firstLoader={true} // display a loader for the first fetching
                    pagination={true} // enable infinite scrolling using touch to load more
                    refreshable={true} // enable pull-to-refresh for iOS and touch-to-refresh for Android
                    withSections={false} // enable sections
                    refreshableFetchingView={this._renderRefreshableFetchingView}
                    customStyles={{
                    paginationView: {
                      backgroundColor: '#eee',
                    },
                  }}
                    refreshableTintColor="blue"
                />

            </ScrollView>
        )
    }
}



const styles = StyleSheet.create({

});