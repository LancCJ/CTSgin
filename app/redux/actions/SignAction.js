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
            dispatch({type:ActionTypes.SIGN_INFO,msg:'提交签到信息数据(0/1)'});
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


            NetUtil.ptos(Constant.SignPhotoUrl,pics.pics[0],function (result) {
                dispatch({type: ActionTypes.SIGN_PHOTO1, msg: '提交照片数据(0/3)'});
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


                if(result.ackCode==='200' && PHOTO_SIZE>1){

                    console.log('测试签到上传图片');

                    NetUtil.ptos(Constant.SignPhotoUrl,pics.pics[1],function (result) {
                        dispatch({type:ActionTypes.SIGN_PHOTO2,msg:'提交照片数据(1/3)'});
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



                        if(result.ackCode==='200' && PHOTO_SIZE>2){

                            console.log('测试签到上传图片');


                            NetUtil.ptos(Constant.SignPhotoUrl,pics.pics[2],function (result) {
                                dispatch({type:ActionTypes.SIGN_PHOTO3,msg:'提交照片数据(2/3)'});
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



                                let params = {
                                    'TYPE':info.TYPE,
                                    'USER_ID':info.USER_ID,
                                    'pageIndex': '0',
                                    'pageSzie': '6'

                                };

                                console.log('查询RANK');
                                console.log(params);
                                NetUtil.ptos(Constant.SignRankUrl,params,function (result) {
                                    console.log("正在查询提交完信息后的排名");
                                    /**
                                     *
                                     {
                                        "seq": "5dc9a340-d8e7-4793-a2d6-5b8e65951619",
                                        "type": "detail",
                                        "header": {
                                            "RANK": "排名"
                                        },
                                        "data": {
                                            "RANK": 2
                                        }
                                    }
                                     *
                                     */

                                    //console.log(result.data.RANK);

                                    dispatch({type:ActionTypes.SIGN_DONE,msg:'提交完毕',rank:result.data.RANK});


                                    //dispatch({type:ActionTypes.SIGN_DONE,msg:'提交完毕',rank:'1'});
                                })

                            })
                        }
                    })
                }


            })







        })


















    }




}

