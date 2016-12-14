/**
 * Created by lanccj on 16/12/12.
 */
import React, {Component} from 'react';

import NetUtil from '../../common/utils/NetUtil';
import Constant from '../../common/Constant';
import StateCode from '../../common/StateCode';
//ActionTpye
import * as ActionTypes from '../actions/ActionTypes';



/**
 *登录
 */
export function login(user){
    console.log('action-用户登录中');
    return (dispatch)=>{
        dispatch({'type':ActionTypes.LOGIN_ING});

        //处理参数
console.log(user);
        let params = {
            'username':user.userName,
            'password':user.userPwd,
            'os_ver': '23',
            'gsm_small': '11',
            'operator': 'ct',
            'versionCode': '31051',
            'imei': '869906023011073',
            'gps_wd': '31.226382614',
            'gps_jd': '120.625373533',
            'gsm_big': '37250',
            'imsi': '460031698651309',
            'model': 'HUAWEI NXT-AL10'
        };

        NetUtil.ptos(Constant.UserLoginUrl,params,function (result) {
            //下面是请求下来的数据
            // let testJson=require('./login.json');
            // console.log(testJson)
            console.log(result);

                    if(StateCode.SUCCESS===result.ret){
                        console.log('action-用户已经登录');
                        console.log('登录返回数据');
                        console.log(result.user);
                        dispatch({type:ActionTypes.LOGIN,user:result.user});
                    }else if(StateCode.USER_LOGIN_PARAMS_NO_USERNAME===result.ret){
                        console.log('action-用户不存在');
                        console.log('登录返回数据');
                        dispatch({type:ActionTypes.LOGIN_NO_USER,msg:result.msg});
                    }else if(StateCode.USER_LOGIN_PARAMS_USERNAMENOTMATCHPWD===result.ret){
                        console.log('action-账户密码不正确');
                        console.log('登录返回数据');
                        dispatch({type:ActionTypes.LOGIN_ERROR_PASSWORD,msg:result.msg});
                    }else{
                        console.log('action-error');
                        dispatch(error());
                    }

        })

    }
}


