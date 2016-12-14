import React, {Component} from 'react';

import NetUtil from '../../common/utils/NetUtil';
import Constant from '../../common/Constant';
import StateCode from '../../common/StateCode';
//ActionTpye
import * as ActionTypes from '../actions/ActionTypes';

export function signState(user){
    console.log('action-查询用户签到状态');
    return (dispatch)=>{
        //处理参数
        let params = {
            'USER_ID':user.username,
            //'USER_ID':'chenj',
            'pageIndex':'0',
            'pageSize': '6'
        };

        // let testJson=require('./state.json');
        //  console.log(testJson)

        NetUtil.ptos(Constant.SignStateUrl,params,function (result) {

             console.log(result);
            //
             dispatch({type:ActionTypes.SIGN_STATE,state:result});

        })

    }
}