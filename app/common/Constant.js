/**
 * Created by lanccj on 16/11/29.
 */
import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    ListView,
    Image,
    TouchableOpacity,
    Platform,
    AsyncStorage
} from 'react-native';

/**
 *静态常量
 */
export default class Constants extends Component {

    //登录服务器IP地址
    static LoginHostUrl='http://112.124.1.34:18081/pstore/service/';
    //签到服务器IP地址
    static SignHostUrl='http://58.211.187.150:48888/common-app/api/MID_WORKATTENDANCE/';
    //登录服务的请求路径
    static UserLoginUrl=Constants.LoginHostUrl+'user/login';


    //签到状态服务的请求路径
    static SignStateUrl=Constants.SignHostUrl+'QID_WORKATTENDANCE_GET_STATUS_DETAIL';
    //签到照片服务的请求路径
    static SignPhotoUrl=Constants.SignHostUrl+'SID_WORKATTENDANCE_PHOTO_INFO';
    //签到信息服务的请求路径
    static SignInfoUrl=Constants.SignHostUrl+'SID_WORKATTENDANCE_BASE_INFO';


    //签到排名服务的请求路径
    static SignRankUrl=Constants.SignHostUrl+'QID_WORKATTENDANCE_GET_RANK_DETAIL';
    //签到历史信息服务的请求路径
    static SignHistoryInfoUrl=Constants.SignHostUrl+'QID_WORKATTENDANCE_HISTORY_INFO_BRIEF';
    //签到历史照片服务的请求路径
    static SignHistoryPhotoUrl=Constants.SignHostUrl+'DID_WORKATTENDANCE_HISTORY_PHOTO_INFO_DETAIL';
}



