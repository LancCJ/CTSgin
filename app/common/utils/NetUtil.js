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

//自定义
//import JsonUtil from './JsonUtil'
//JSON.stringify(NetUtil.strMapToObj(params))

/**
 *网络请求封装
 */
export default class NetUtil extends Component {
    /**
     *  get请求
     *  url:请求地址
     *  params:参数
     *  callback:回调函数
     * */
    static get(url,params,callback){
        if (params) {
            let paramsArray = [];
            //拼接参数
            Object.keys(params).forEach(key => paramsArray.push(key + '=' + params[key]))
            if (url.search(/\?/) === -1) {
                url += '?' + paramsArray.join('&')
            } else {
                url += '&' + paramsArray.join('&')
            }
        }
       // //console.log(url);

        //fetch请求
        fetch(url,{
            method: 'GET',
        })
            .then((response) => {
                callback(response)
            }).done();
    }


    static psot(url,params,callback){
        if (params) {
            let paramsArray = [];
            //拼接参数
            Object.keys(params).forEach(key => paramsArray.push(key + '=' + params[key]))
            if (url.search(/\?/) === -1) {
                url += '?' + paramsArray.join('&')
            } else {
                url += '&' + paramsArray.join('&')
            }
        }
        //console.log('url请求');
        //console.log(url);

        //fetch请求
        fetch(url,{
            method: 'POST',
        })
            .then((response) =>
            response.json())
            .then((responseJSON) => {
                callback(responseJSON)
            }) .done();
    }


    static postForm(url,params,callback){

        console.log(params);

        //console.log('url请求');
        console.log(url);

        //fetch请求
        fetch(url,{
            method: 'POST',
            body :JSON.stringify(params)
        })
            .then((response) =>
                response.json())
            .then((responseJSON) => {
                callback(responseJSON)
            }) .done();
    }





    static ptos(url,params,callback){
        if (params) {
            let paramsArray = [];
            //拼接参数
            Object.keys(params).forEach(key => paramsArray.push(key + '=' + params[key]))
            if (url.search(/\?/) === -1) {
                url += '?' + paramsArray.join('&')
            } else {
                url += '&' + paramsArray.join('&')
            }
        }
        //console.log('url请求');
       // console.log(url);

        //fetch请求
        fetch(url,{
            method: 'GET',
        })
            .then((response) =>
                response.json())
            .then((responseJSON) => {
                callback(responseJSON)
            }) .done();
    }


    /**
     *  post请求
     *  url:请求地址
     *  params:参数
     *  headers:请求头
     *  callback:回调函数
     * */
    static post(url,params,headers,callback){
        //fetch请求
        fetch(url,{
            method : 'POST',
            headers:headers,
            body:JSON.stringify(NetUtil.strMapToObj(params))
        })
            .then((response) => response.json())
            .then((responseJSON) => {
                callback(responseJSON)
            }) .done();
    }

    /**
     *  post请求
     *  url:请求地址
     *  params:参数
     *  callback:回调函数
     * */
    static post(url,params,callback){
            ////console.log('请求参数:'+JSON.stringify(NetUtil.strMapToObj(params)));
            //fetch请求
            fetch(url,{
                method : 'POST',
                body:JSON.stringify(NetUtil.strMapToObj(params))
            })
                .then((response) => response.json())
                .then((responseJSON) => {
                    callback(responseJSON)
                }) .done();

    }


    static post2(url,params,callback){
        ////console.log('请求参数:'+JSON.stringify(NetUtil.strMapToObj(params)));
        //fetch请求
        fetch(url,{
            method : 'POST',
            body:JSON.stringify(params)
        })
            .then((response) => response.json())
            .then((responseJSON) => {
                callback(responseJSON)
            }) .done();

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
}


