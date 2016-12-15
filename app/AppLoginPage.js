/**
 * Created by lanccj on 16/11/22.
 */
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

//第三方
import { FormLabel, FormInput ,Button,SocialIcon} from 'react-native-elements'
import {Actions} from 'react-native-router-flux'
var Modal = require('react-native-modalbox');
import {connect} from 'react-redux';//将我们的页面和action链接起来
import {bindActionCreators} from 'redux';//将要绑定的actions和dispatch绑定到一起
import * as actionCreators from './redux/actions/LoginAction';//导入需要绑定的actions

class AppLoginPage extends Component {
    constructor(props) {
        super(props);
        this.state={
        }

        this.login=this._login.bind(this);
        this.onChangeUserName=this._onChangeUserName.bind(this);
        this.onChangePswd=this._onChangePswd.bind(this);
    }

    _onChangeUserName(text){
        this.setState({'userName':text});
    }

    _onChangePswd(text){
        this.setState({'userPwd':text});
    }

    _login(){
        Keyboard.dismiss();
        if(!this.state.userName||!this.state.userPwd){
            Alert.alert('用户名或密码不能为空！');
        }else{
            this.refs.modal.open();//loading 状态
            this.props.actions.login({'userName':this.state.userName,'userPwd':this.state.userPwd});//dispath 登陆
        }
    }

    //该方法首次不会执行，如果返回false，则reduer不会执行
    shouldComponentUpdate(nextProps,nextState){

        const {isLoggedIn,user,status,msg}=nextProps;

        if(isLoggedIn){
            //console.log('登录成功进行跳转')
            this.setState({userName:'',userPwd:''});

            // 使用key来保存数据。这些数据一般是全局独有的，常常需要调用的。
            // 除非你手动移除，这些数据会被永久保存，而且默认不会过期。
            storage.save({
                key: 'user',  // 注意:请不要在key中使用_下划线符号!
                rawData: {
                    user: user
                },
                // 如果不指定过期时间，则会使用defaultExpires参数
                // 如果设为null，则永不过期
                expires: 1000 * 3600
            });

            Actions.SingMainPage({"user":user});
        }else if(status==='error'){
            Alert.alert(msg);
        }
        this.refs.modal.close();//loading 状态
        return true;
    }

    render () {
        return (
            <View style={styles.container}>
                <View style={styles.loginform}>
                    <FormLabel>用户名:</FormLabel>
                    <FormInput
                        style={[styles.textInput,{marginTop:2}]}
                        placeholder='    在此输入用户名'
                        //value='lanccj'
                        onChangeText={this.onChangeUserName}
                    />
                    <FormLabel>密  码:</FormLabel>
                    <FormInput
                        style={[styles.textInput,{marginTop:2}]}
                        secureTextEntry={true}
                        //value='123456'
                        placeholder='    在此输入密码'
                        onChangeText={this.onChangePswd}
                    />
                    <Button
                        buttonStyle={{marginTop:10,height:40}}
                        title='登    录'
                        backgroundColor="#007AFF"
                        onPress={this.login}
                        //onPress={Actions.SingMainPage}
                    />
                    {/*<Button*/}
                        {/*buttonStyle={{marginTop:10,height:40}}*/}
                        {/*title='注    册'*/}
                        {/*backgroundColor="#32C739"*/}
                        {/*onPress={Actions.RegisterPage}*/}
                    {/*/>*/}
                </View>

                <Modal animationduration={0} isopen={this.props.status=='doing'?true:false} position="center" ref='modal' style={styles.modal}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        marginTop:55,
        backgroundColor:"#FFFFFF",
        justifyContent:"center",
        alignItems:"center"
    },
    logo:{
        marginTop:10,
        justifyContent:"center",
        alignItems:"center"
    },
    loginform:{
        flex:1,
        height:300,
        width:400,
        marginTop:200
    },
    copyRight:{
        marginBottom:5
    },
    textInput:{

    },
    progress: {
        margin: 10,
    },
    modal: {
        justifyContent: 'center',
        alignItems: 'center',
        width:150,
        height:150,
        borderRadius:10,
    },
    text:{

    },
    btn:{

    },
    thirdLogin:{

    },
    thirdLoginText:{
        justifyContent: 'center',
        alignItems: 'center'
    }
});

//根据全局state返回当前页面所需要的信息,（注意以props的形式传递给AppLoginPage）
function mapStateToProps(store){
    return{
        isLoggedIn:store.login.isLoggedIn,
        user:store.login.user,
        status:store.login.status,
        msg:store.login.msg
    };
}
//返回可以操作store.state的actions,(其实就是我们可以通过actions来调用我们绑定好的一系列方法)
function mapDispatchToProps(dispatch){
    return {
        actions: bindActionCreators(actionCreators, dispatch)
    };
}

//链接起来
export default  connect(mapStateToProps,mapDispatchToProps)(AppLoginPage);






