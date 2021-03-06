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
import Modal from 'react-native-root-modal';
import {connect} from 'react-redux';//将我们的页面和action链接起来
import {bindActionCreators} from 'redux';//将要绑定的actions和dispatch绑定到一起
import * as actionCreators from './redux/actions/LoginAction';//导入需要绑定的actions



import Dimensions from 'Dimensions';

var ScreenWidth = Dimensions.get('window').width;
var ScreenHeight = Dimensions.get('window').height;
var ScreenScale = Dimensions.get('window').scale;
var Spinner = require('react-native-spinkit');






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
            this.props.actions.login({'userName':this.state.userName,'userPwd':this.state.userPwd});//dispath 登陆
        }
    }

    //该方法首次不会执行，如果返回false，则reduer不会执行
    shouldComponentUpdate(nextProps,nextState){

        const {isLoggedIn,user,status,msg}=nextProps;

        if(isLoggedIn){
            ////console.log('登录成功进行跳转')
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
        return true;
    }

 //   {/*componentDidMount(){*/}
//         this._AESEncryptByPromise();
//
//     }
//
//     async _AESEncryptByPromise(){
//         var EncryptionModule=NativeModules.EncryptionModule
// //待加密的信息
//         var PASSWORD='745r#x3g';
//         var KEY='1QAZXSW23EDCVFR4';  //16位AES加密私钥
//
//         try{
//             var result=await EncryptionModule.AESEncryptByPromise(PASSWORD,KEY);
//             this.setState({AES_Result:result});
//         }catch(e){
//             this.setState({AES_Result:'AES加密失败-通过Promise回调'});
//         }
//     }

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


                <Modal
                    style={{
                            top: 0,
                            right: 0,
                            bottom: 0,
                            left: 0,
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: 'rgba(0, 0, 0, 0.2)',
                        }}

                    visible={this.props.status=='doing'?true:false}
                >
                    <View style={{width:(Dimensions.get('window').width)/2,height:(Dimensions.get('window').width)/2,borderRadius:5,backgroundColor:'#FFFFFF',justifyContent:'center',alignItems:'center'}}>
                        <Spinner style={styles.spinner} type='Wave' color="#007AFF"/>
                        <Text>正在登陆</Text>
                    </View>


                </Modal>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
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
        height:ScreenHeight/3,
        width:ScreenWidth-1,
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






