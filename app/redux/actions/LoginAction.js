/**
 * Created by lanccj on 16/12/12.
 */
import React, {Component} from 'react';

import NetUtil from '../../common/utils/NetUtil';
import Constant from '../../common/Constant';
import StateCode from '../../common/StateCode';
//ActionTpye
import * as ActionTypes from '../actions/ActionTypes';
var DeviceInfo = require('react-native-device-info');
import {
    Geolocation
} from 'react-native-baidu-map';

/**
 *登录
 */
export function login(user){
    //console.log('action-用户登录中');
    return (dispatch)=>{
        dispatch({'type':ActionTypes.LOGIN_ING});

        let latitude='';
        let longitude='';

        //获取手机当前坐标
        Geolocation.getCurrentPosition()
            .then(data => {
                latitude=data.latitude,
                longitude=data.longitude
            })
            .catch(e =>{
               //console.log('登录前获取GPS,latitude:'+latitude+',longitude:'+longitude);
            });


        //处理参数
//console.log(user);
        let params = {
            'username':user.userName,
            'password':user.userPwd,
            'os_ver': DeviceInfo.getSystemVersion(),
            'gsm_small': '11',
            'operator': 'ct',
            'versionCode': '31051',
            'imei': '869906023011073',
            'gps_wd':longitude ,
            'gps_jd': latitude,
            'gsm_big': '37250',
            'imsi': '460031698651309',
            'model': DeviceInfo.getDeviceName()
        };

let result={
    "ret": 0,
    "msg": "",
    "user": {
        "name": "yanlm",
        "allPrivileges": null,
        "id": 14154,
        "description": null,
        "username": "yanlm",
        "deptName": "产品二部",
        "realname": "严利明",
        "imei": null,
        "realDeptId": 1267,
        "phone": null,
        "deptId": "88880005",
        "create_time": null,
        "fid": null
    },
    "token": "785D69F90D53AB7F750E3114FA31C1F7"
};
        //dispatch({type:ActionTypes.LOGIN,user:result.user});


        NetUtil.ptos(Constant.UserLoginUrl,params,function (result) {
            //下面是请求下来的数据
            // let testJson=require('./login.json');
            // //console.log(testJson)
            //console.log(result);

                    if(StateCode.SUCCESS===result.ret){
                        //console.log('action-用户已经登录');
                        //console.log('登录返回数据');
                        //console.log(result.user);
                        dispatch({type:ActionTypes.LOGIN,user:result.user});
                    }else if(StateCode.USER_LOGIN_PARAMS_NO_USERNAME===result.ret){
                        //console.log('action-用户不存在');
                        //console.log('登录返回数据');
                        dispatch({type:ActionTypes.LOGIN_NO_USER,msg:result.msg});
                    }else if(StateCode.USER_LOGIN_PARAMS_USERNAMENOTMATCHPWD===result.ret){
                        //console.log('action-账户密码不正确');
                        //console.log('登录返回数据');
                        dispatch({type:ActionTypes.LOGIN_ERROR_PASSWORD,msg:result.msg});
                    }else{
                        //console.log('action-error');
                        dispatch(error());
                    }

        })

    }
}


