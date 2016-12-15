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

export function Sign(pics,info){
    console.log('=====action-用户签到签退动作=======');
    return (dispatch)=>{
        console.log(pics);
        console.log(info);

        //得出图片张数
        console.log(info.PHOTO_SIZE);

        let PHOTO_SIZE=info.PHOTO_SIZE;


        NetUtil.ptos(Constant.SignInfoUrl,info,function (result) {
            console.log("正在提交照片");
            /**
             *
             {
                 "seq": "c39e7a8f-b1ea-4212-b578-9d9429e3292f",
                 "type": "ack",
                 "ackCode": 200,
                 "ackMsg": "提交成功"
             }
             *
             */
            console.log(result.ackCode);

            if(result.ackCode==='200'){
                NetUtil.ptos(Constant.SignPhotoUrl,pics.pics[0],function (result) {
                    console.log("正在提交照片");
                    /**
                     *
                     {
                         "seq": "c39e7a8f-b1ea-4212-b578-9d9429e3292f",
                         "type": "ack",
                         "ackCode": 200,
                         "ackMsg": "提交成功"
                     }
                     *
                     */
                    console.log(result.ackCode);
                })
            }
        })




    }
}

