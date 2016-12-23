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
import SignInfoPage    from './PullListDemo';
import ReasonPage    from './ReasonPage';
import Dimensions from 'Dimensions';

const styles = StyleSheet.create({
    navigationBarStyle:{
        backgroundColor:"#0584FE"
    },
    titleStyle:{
        color:"#FFFFFF",
        fontSize:Dimensions.get('window').height/30,
    },
    backTextStyle:{

        color:"#FFFFFF",
        fontSize:Dimensions.get('window').height/35,
    }
});

//返回按钮的定义
const _renderExitButton=()=>{
    return (
        <TouchableOpacity onPress={Actions.pop}>
            <View style={[{flexDirection:"row"}]}>
                <Ionicons name="ios-arrow-back" size={Dimensions.get('window').height/35}  color="#FFFFFF" />
                <Text style={[styles.backTextStyle,{marginLeft:5}]}>登出</Text>
            </View>
        </TouchableOpacity>
    );
}

const _renderBackButton=()=>{
    return (
        <TouchableOpacity onPress={Actions.pop}>
            <View style={[{flexDirection:"row"}]}>
                <Ionicons name="ios-arrow-back" size={Dimensions.get('window').height/35} color="#FFFFFF" />
                <Text style={[styles.backTextStyle,{marginLeft:5}]}>返回</Text>
            </View>
        </TouchableOpacity>
    );
}

const _renderRightButton=()=>{
    return (
        <TouchableOpacity onPress={Actions.SignInfoPage}>
            <View style={[{flexDirection:"row"}]}>
                <Text style={[styles.backTextStyle,{marginRight:5}]}>考勤记录</Text>
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
                duration={1}

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



