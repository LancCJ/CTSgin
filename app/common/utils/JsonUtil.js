/**
 * Created by lanccj on 16/11/29.
 */
import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    ListView,
    Alert
} from 'react-native';
var DeviceInfo = require('react-native-device-info');
/**
 *Json处理工具类
 */
export default class JsonUtil extends Component {
    /**
     * Map params
     * 传入一个Object对象然后组装成Json字符串返回
     * 举例  登录过程 最后传入Json {userName:lanccj,userPwd:123456}
     * */
    static formatParams(params){
        return JSON.stringify(JsonUitl.strMapToObj(params));
    }


    /**
     *map转化为对象（map所有键都是字符串，可以将其转换为对象）
     */
    static strMapToObj(strMap){
        let obj= Object.create(null);
        for (let[k,v] of strMap) {
            obj[k] = v;
        }
        return obj;
    }

    static getHeaders(seq,accesstoken,latitude,longitude){
        var reqHeaders = new Headers();

        reqHeaders.append("cybertech-imei", "");
        reqHeaders.append("cybertech-seq", seq);
        reqHeaders.append("cybertech-gsm-cid", "");
        reqHeaders.append("cybertech-imsi", "");
        reqHeaders.append("cybertech-gsm-lac", "");
        reqHeaders.append("cybertech-gsm-lac", "");
        reqHeaders.append("cybertech-access-token", accesstoken);
        reqHeaders.append("cybertech-user-zjhm", "");

        reqHeaders.append("cybertech-gps-jd", latitude);
        reqHeaders.append("cybertech-gps-wd", longitude);

        reqHeaders.append("User-Agent", 'Dalvik/2.1.0 (Linux; U; Android 7.0; HUAWEI NXT-AL10 Build/HUAWEINXT-AL10)');
        reqHeaders.append("Accept-Encoding", 'gzip');





        // {
        //     //'cybertech-imei':DeviceInfo.getUniqueID(),
        //     'cybertech-imei':'',
        //     'cybertech-seq':seq,
        //     'cybertech-gsm-cid':'-1',
        //     'cybertech-imsi':'',
        //     'cybertech-gsm-lac':'-1',
        //     'cybertech-access-token':accesstoken,
        //     'cybertech-user-zjhm':''
        //
        // }
        return reqHeaders;
    }
}


