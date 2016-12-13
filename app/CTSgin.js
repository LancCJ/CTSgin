import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    Alert,
    StatusBar
} from 'react-native';

//第三方
import {Actions, Scene, Router,Modal} from 'react-native-router-flux';
import Ionicons from 'react-native-vector-icons/Ionicons';
//定义组件
import AppLoginPage    from './AppLoginPage';
import SingMainPage    from './SingMainPage';
import SignInfoPage    from './SignInfoPage';
import ReasonPage    from './ReasonPage';

const styles = StyleSheet.create({
    navigationBarStyle:{
        backgroundColor:"#0584FE"
    },
    titleStyle:{
        color:"#FFFFFF"
    },
    backTextStyle:{
        marginLeft:5,
        color:"#FFFFFF",
        lineHeight:22
    }
});

//返回按钮的定义
const _renderExitButton=()=>{
    return (
        <TouchableOpacity onPress={Actions.pop}>
            <View style={[{flexDirection:"row"}]}>
                <Ionicons name="ios-arrow-back" size={25} color="#FFFFFF" />
                <Text style={styles.backTextStyle}>登出</Text>
            </View>
        </TouchableOpacity>
    );
}

const _renderBackButton=()=>{
    return (
        <TouchableOpacity onPress={Actions.pop}>
            <View style={[{flexDirection:"row"}]}>
                <Ionicons name="ios-arrow-back" size={25} color="#FFFFFF" />
                <Text style={styles.backTextStyle}>返回</Text>
            </View>
        </TouchableOpacity>
    );
}

const _renderRightButton=()=>{
    return (
        <TouchableOpacity onPress={Actions.SignInfoPage}>
            <View style={[{flexDirection:"row"}]}>
                <Text style={styles.backTextStyle}>考勤记录</Text>
            </View>
        </TouchableOpacity>
    );
}





//APP所有场景定义
const scenes = Actions.create(
        <Scene key="root">
            <Scene
                initial={true}
                key="AppLoginPage"
                component={AppLoginPage}
                title="考勤登录"
                navigationBarStyle={styles.navigationBarStyle}
                titleStyle={styles.titleStyle}
            />
            <Scene
                key="SingMainPage"
                component={SingMainPage}
                renderBackButton={_renderExitButton}
                renderRightButton={_renderRightButton}
                title="考勤"
                navigationBarStyle={styles.navigationBarStyle}
                titleStyle={styles.titleStyle}
            />
            <Scene
                key="SignInfoPage"
                component={SignInfoPage}
                renderBackButton={_renderBackButton}
                title="考勤记录"
                navigationBarStyle={styles.navigationBarStyle}
                titleStyle={styles.titleStyle}
            />
            <Scene
                key="ReasonPage"
                component={ReasonPage}
                renderBackButton={_renderBackButton}
                title="报告原因"
                navigationBarStyle={styles.navigationBarStyle}
                titleStyle={styles.titleStyle}
            />
        </Scene>
);

export default class RootITalk extends Component {
    render() {
        return (
            <View style={{ flex: 1 }}>
                <StatusBar
                    backgroundColor="#0584FE"
                    barStyle="light-content"
                />
                <Router
                    scenes={scenes}/>
            </View>
        );
    }
}



