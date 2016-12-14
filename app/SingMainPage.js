/**
 * Created by lanccj on 16/12/13.
 */
import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    ListView,
    Alert,
    TouchableOpacity
} from 'react-native';

import {connect} from 'react-redux';//将我们的页面和action链接起来
import {bindActionCreators} from 'redux';//将要绑定的actions和dispatch绑定到一起
import * as actionCreators from './redux/actions/SignAction';//导入需要绑定的actions

import {
    MapView,
    MapTypes,
    Geolocation
} from 'react-native-baidu-map';

import Dimensions from 'Dimensions';

import { Icon,SocialIcon } from 'react-native-elements'
import Button from 'apsl-react-native-button'

import Ionicons from 'react-native-vector-icons/Ionicons';

var base64Icon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEsAAABLCAQAAACSR7JhAAADtUlEQVR4Ac3YA2Bj6QLH0XPT1Fzbtm29tW3btm3bfLZtv7e2ObZnms7d8Uw098tuetPzrxv8wiISrtVudrG2JXQZ4VOv+qUfmqCGGl1mqLhoA52oZlb0mrjsnhKpgeUNEs91Z0pd1kvihA3ULGVHiQO2narKSHKkEMulm9VgUyE60s1aWoMQUbpZOWE+kaqs4eLEjdIlZTcFZB0ndc1+lhB1lZrIuk5P2aib1NBpZaL+JaOGIt0ls47SKzLC7CqrlGF6RZ09HGoNy1lYl2aRSWL5GuzqWU1KafRdoRp0iOQEiDzgZPnG6DbldcomadViflnl/cL93tOoVbsOLVM2jylvdWjXolWX1hmfZbGR/wjypDjFLSZIRov09BgYmtUqPQPlQrPapecLgTIy0jMgPKtTeob2zWtrGH3xvjUkPCtNg/tm1rjwrMa+mdUkPd3hWbH0jArPGiU9ufCsNNWFZ40wpwn+62/66R2RUtoso1OB34tnLOcy7YB1fUdc9e0q3yru8PGM773vXsuZ5YIZX+5xmHwHGVvlrGPN6ZSiP1smOsMMde40wKv2VmwPPVXNut4sVpUreZiLBHi0qln/VQeI/LTMYXpsJtFiclUN+5HVZazim+Ky+7sAvxWnvjXrJFneVtLWLyPJu9K3cXLWeOlbMTlrIelbMDlrLenrjEQOtIF+fuI9xRp9ZBFp6+b6WT8RrxEpdK64BuvHgDk+vUy+b5hYk6zfyfs051gRoNO1usU12WWRWL73/MMEy9pMi9qIrR4ZpV16Rrvduxazmy1FSvuFXRkqTnE7m2kdb5U8xGjLw/spRr1uTov4uOgQE+0N/DvFrG/Jt7i/FzwxbA9kDanhf2w+t4V97G8lrT7wc08aA2QNUkuTfW/KimT01wdlfK4yEw030VfT0RtZbzjeMprNq8m8tnSTASrTLti64oBNdpmMQm0eEwvfPwRbUBywG5TzjPCsdwk3IeAXjQblLCoXnDVeoAz6SfJNk5TTzytCNZk/POtTSV40NwOFWzw86wNJRpubpXsn60NJFlHeqlYRbslqZm2jnEZ3qcSKgm0kTli3zZVS7y/iivZTweYXJ26Y+RTbV1zh3hYkgyFGSTKPfRVbRqWWVReaxYeSLarYv1Qqsmh1s95S7G+eEWK0f3jYKTbV6bOwepjfhtafsvUsqrQvrGC8YhmnO9cSCk3yuY984F1vesdHYhWJ5FvASlacshUsajFt2mUM9pqzvKGcyNJW0arTKN1GGGzQlH0tXwLDgQTurS8eIQAAAABJRU5ErkJggg==';

var Platform = require('react-native').Platform;
var ImagePicker = require('react-native-image-picker');
import {Actions} from 'react-native-router-flux';
var Modal = require('react-native-modalbox');

// More info on all the options is below in the README...just some common use cases shown here
var options = {
    title: '选取现场照片',
    cancelButtonTitle:'取消',
    takePhotoButtonTitle:'立即拍照',
    chooseFromLibraryButtonTitle:'从相册选取',
    storageOptions: {
        skipBackup: true,
        path: 'images'
    }
};

/**
 *签到主界面
 */
class SingMainPage extends Component {

    constructor() {
        super();

        this.state = {
            mayType: MapTypes.NORMAL,
            zoom: 20,
            trafficEnabled: false,
            baiduHeatMapEnabled: false,

            isOpen: false,
            isDisabled: false,
            swipeToClose: true,
            sliderValue: 0.3,

            justifyContentStyle:'space-between',
            buttonTitle:'正在加载...',
            buttonisDisabled:false,

            signState:null,

            longitude:null,
            latitude:null,
            avatarSource1:null,
            avatarSource2:null,
            avatarSource3:null,

            base64image1:null,
            base64image2:null,
            base64image3:null
        };

    }



    componentDidMount() {
       // console.log(this.props.user);

        //获取手机当前坐标
        Geolocation.getCurrentPosition()
            .then(data => {
                console.log(data);
                this.setState({
                    zoom: 20,
                    marker: {
                        latitude: data.latitude,
                        longitude: data.longitude,
                        title: '您的位置'
                    },
                    center: {
                        latitude: data.latitude,
                        longitude: data.longitude
                    },
                    latitude: data.latitude,
                    longitude: data.longitude
                });
            })
            .catch(e =>{
                Alert.alert('获取GPS错误,请检查是否开启定位服务!')
            });
        //获取图标
        Ionicons.getImageSource('ios-add', (Dimensions.get('window').width-200)/3,'#DEDEDE').then((source) => this.setState({ addIcon: source }));

        //获取登录用户的签到状态然后来加载按钮文字
        console.log(this.props.user);
        //console.log('查询'+this.props.user.realname+'的签到状态');
        this.props.actions.signState(this.props.user);//dispath 查询签到状态
    }


    //该方法首次不会执行，如果返回false，则reduer不会执行
    shouldComponentUpdate(nextProps,nextState){

        const {state}=nextProps;

        if(state!=null){
           console.log('我在界面 获取最新的state');
           console.log(state.data.STATUS);

           //按照状态来显示 按钮的文字
            if(state.data.STATUS==="-1"){
                console.log('111111');
                this.setState({
                    buttonTitle: "打卡上班咯！",
                    signState:'-1'
                });
            }else  if(state.data.STATUS==="0"){
                console.log('222222');
                this.setState({
                    buttonTitle: "打卡下班啦！",
                    signState:'0'
                });
            }else  if(state.data.STATUS==="1"){
                console.log('333333');
                this.setState({
                    buttonTitle: "全部完成！",
                    signState:'1',
                    buttonisDisabled:true
                });
            }

            console.log(this.state);

        }
        return true;
    }

    _Sign(){

        console.log(this.state);

        //1.直接满足条件 直接打卡
        //Alert.alert('你点击了');
        //判断是否超过时间 打卡上班要在8.30💰  前    打卡下班要5.30后

        let REMARKS='';
        let PHOTO_SIZE=0;

        if(this.state.avatarSource1!='undefined'){
            PHOTO_SIZE=1;
            if(this.state.avatarSource2!='undefined'){
                PHOTO_SIZE=2;
                if(this.state.avatarSource3!='undefined'){
                    PHOTO_SIZE=3;
                }
            }
        }


    //文本信息

        let infoParams={
            'COMMIT_TIME':	'2016-12-14 08:42:49',
            'ADDRESS':	'中国江苏省苏州市虎丘区新元街199号',
            'REMARKS':	REMARKS,
            'USER_ID':	this.props.user.username,
            'SEQ':	'7ae6f163-92ff-4981-9467-29340cc4cc80',
            'PHOTO_SIZE':	PHOTO_SIZE,
            'TYPE':this.state.signState,
            'DEPT_ID':	this.props.user.deptId,
            'LONGITUDE':	this.state.longitude,
            'LATITUDE':	this.state.latitude
        }

        //照片信息

        let PicParams=null;

        if(this.state.avatarSource1){
            PicParams={
                "pics":{
                    'COMMIT_TIME':(new Date()).valueOf().format("yyyy-MM-dd HH:mm:ss"),
                    'CRRELATION_ID':	'7ae6f163-92ff-4981-9467-29340cc4cc80',//对应的信息ID
                    'SEQ':	'd70732bd-43cf-4c0f-8fb9-83b3bc1700b2',
                    'ZP':this.state.base64image1,
                    'XH':'0'
                }
            }
            if(this.state.avatarSource2){
                PicParams={
                    "pics":[{
                        'COMMIT_TIME':(new Date()).valueOf(),
                        'CRRELATION_ID':	'7ae6f163-92ff-4981-9467-29340cc4cc80',//对应的信息ID
                        'SEQ':	'd70732bd-43cf-4c0f-8fb9-83b3bc1700b2',
                        'ZP':this.state.base64image1,
                        'XH':'0'
                    },
                    {
                        'COMMIT_TIME':(new Date()).valueOf(),
                        'CRRELATION_ID':	'7ae6f163-92ff-4981-9467-29340cc4cc80',//对应的信息ID
                        'SEQ':	'd70732bd-43cf-4c0f-8fb9-83b3bc1700b2',
                        'ZP':this.state.base64image2,
                        'XH':'1'
                    }]

                }
                if(this.state.avatarSource3){
                    PicParams={
                        "pics":[{
                            'COMMIT_TIME':(new Date()).valueOf(),
                            'CRRELATION_ID':	'7ae6f163-92ff-4981-9467-29340cc4cc80',//对应的信息ID
                            'SEQ':	'd70732bd-43cf-4c0f-8fb9-83b3bc1700b2',
                            'ZP':this.state.base64image1,
                            'XH':'0'
                        },
                        {
                            'COMMIT_TIME':(new Date()).valueOf(),
                            'CRRELATION_ID':	'7ae6f163-92ff-4981-9467-29340cc4cc80',//对应的信息ID
                            'SEQ':	'd70732bd-43cf-4c0f-8fb9-83b3bc1700b2',
                            'ZP':this.state.base64image2,
                            'XH':'1'
                        },
                        {
                            'COMMIT_TIME':(new Date()).valueOf(),
                            'CRRELATION_ID':	'7ae6f163-92ff-4981-9467-29340cc4cc80',//对应的信息ID
                            'SEQ':	'd70732bd-43cf-4c0f-8fb9-83b3bc1700b2',
                            'ZP':this.state.base64image3,
                            'XH':'2'
                        }
]
                    }
                }
            }
        }

        if(this.state.longitude==null || this.state.latitude==null){
            Alert.alert('GPS信息未获取无法完成本次操作');
        }else if(PHOTO_SIZE==0 || !this.state.avatarSource1){
            Alert.alert('现场照片至少一张');
        }else{

            console.log('打卡前参数准备如下....');
            console.log(PicParams);

            console.log(infoParams);




            //this.props.actions.sign(PicParams,infoParams);//dispath 签到签出

            //超过时间 需要填写原因
            //this.refs.modal3.open();
        }

    }


    selectPhotoTapped1() {
        const options = {
            quality: 1.0,
            maxWidth: 500,
            maxHeight: 500,
            storageOptions: {
                skipBackup: true
            }
        };

        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled photo picker');
            }
            else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            }
            else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            }
            else {
                var source;

                // You can display the image using either:
                //source = {uri: 'data:image/jpeg;base64,' + response.data, isStatic: true};

                //Or:
                if (Platform.OS === 'android') {
                    source = {uri: response.uri, isStatic: true};
                } else {
                    source = {uri: response.uri.replace('file://', ''), isStatic: true};
                }

                this.setState({
                    avatarSource1: source,
                    justifyContentStyle:'space-around',
                    base64image1:response.data
                });

                //console.log('获取到的图片base64');

                //console.log(source.data);
            }
        });
    }


    selectPhotoTapped2() {
        const options = {
            quality: 1.0,
            maxWidth: 500,
            maxHeight: 500,
            storageOptions: {
                skipBackup: true
            }
        };

        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled photo picker');
            }
            else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            }
            else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            }
            else {
                var source;

                // You can display the image using either:
                //source = {uri: 'data:image/jpeg;base64,' + response.data, isStatic: true};

                //Or:
                if (Platform.OS === 'android') {
                    source = {uri: response.uri, isStatic: true};
                } else {
                    source = {uri: response.uri.replace('file://', ''), isStatic: true};
                }

                this.setState({
                    avatarSource2: source,
                    justifyContentStyle:'space-between',
                    base64image2:response.data
                });
            }
        });
    }


    selectPhotoTapped3() {
        const options = {
            quality: 1.0,
            maxWidth: 500,
            maxHeight: 500,
            storageOptions: {
                skipBackup: true
            }
        };

        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled photo picker');
            }
            else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            }
            else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            }
            else {
                var source;

                // You can display the image using either:
                //source = {uri: 'data:image/jpeg;base64,' + response.data, isStatic: true};

                //Or:
                if (Platform.OS === 'android') {
                    source = {uri: response.uri, isStatic: true};
                } else {
                    source = {uri: response.uri.replace('file://', ''), isStatic: true};
                }

                this.setState({
                    avatarSource3: source,
                    base64image3:response.data
                });
            }
        });
    }

    toggleDisable() {
        this.setState({isDisabled: !this.state.isDisabled});
    }

    render() {
        return (
            <View style={styles.container}>
                <MapView
                    trafficEnabled={this.state.trafficEnabled}
                    baiduHeatMapEnabled={this.state.baiduHeatMapEnabled}
                    zoom={this.state.zoom}
                    mapType={this.state.mapType}
                    center={this.state.center}
                    marker={this.state.marker}
                    style={styles.map}
                    onMapClick={(e) => {
                    }}
                >
                </MapView>

                <View style={[styles.center,{borderWidth:0}]}>
                    <View style={{borderBottomWidth:1,borderBottomColor:'#0086F6',height:25}}>
                        <Text style={{marginLeft:50,fontSize:20}}>现场照片</Text>
                    </View>

                    <View style={{padding:15,flex:1,borderBottomWidth:1,borderBottomColor:'#0086F6',flexDirection:'row',marginTop:5,justifyContent:this.state.justifyContentStyle,alignItems:'center'}}>

                        <TouchableOpacity onPress={this.state.avatarSource1?null:this.selectPhotoTapped1.bind(this)}>
                            <View style={{height:(Dimensions.get('window').width-100)/3,width:(Dimensions.get('window').width-100)/3,borderWidth:1,borderStyle:'dashed',justifyContent:'center',alignItems:'center'}}>
                                <Image source={this.state.avatarSource1?this.state.avatarSource1:this.state.addIcon} style={styles.image} />
                            </View>
                        </TouchableOpacity>

                        {this.state.base64image1?(
                            <TouchableOpacity onPress={this.state.avatarSource2?null:this.selectPhotoTapped2.bind(this)}>
                                <View style={{height:(Dimensions.get('window').width-100)/3,width:(Dimensions.get('window').width-100)/3,borderWidth:1,borderStyle:'dashed',justifyContent:'center',alignItems:'center'}}>
                                    <Image source={this.state.avatarSource2?this.state.avatarSource2:this.state.addIcon} style={styles.image} />
                                </View>
                            </TouchableOpacity>
                        ):(null)}

                        {this.state.base64image2?(
                            <TouchableOpacity onPress={this.state.avatarSource3?null:this.selectPhotoTapped3.bind(this)}>
                                <View style={{height:(Dimensions.get('window').width-100)/3,width:(Dimensions.get('window').width-100)/3,borderWidth:1,borderStyle:'dashed',justifyContent:'center',alignItems:'center'}}>
                                    <Image source={this.state.avatarSource3?this.state.avatarSource3:this.state.addIcon} style={styles.image} />
                                </View>
                            </TouchableOpacity>
                        ):(null)}
                    </View>
                </View>

                <View style={styles.button}>

                    {/*<Button  isDisabled={this.state.buttonisDisabled} onPress={this._Sign.bind(this)} style={{ justifyContent:"center",alignItems:"center",width:Dimensions.get('window').height /3-100,height:Dimensions.get('window').height /3-100,borderRadius:(Dimensions.get('window').height /3-100)/2,backgroundColor: '#32C739',borderWidth:0}} textStyle={{fontSize: 18,color:'white'}}>*/}
                        {/*{this.state.buttonTitle}*/}
                    {/*</Button>*/}
                    <TouchableOpacity onPress={this._Sign.bind(this)} >
                        <View style={{ justifyContent:"center",alignItems:"center",width:Dimensions.get('window').height /3-100,height:Dimensions.get('window').height /3-100,borderRadius:(Dimensions.get('window').height /3-100)/2,backgroundColor: '#32C739',borderWidth:0}} textStyle={{fontSize: 18,color:'white'}}>
                            <Text style={[{color:'#FFFFFF',fontSize:16}]}>{this.state.signState?this.state.buttonTitle:this.state.buttonTitle}</Text>
                        </View>
                    </TouchableOpacity>


                    <Text style={[{marginTop:5}]}>登录用户:{this.props.user.realname}</Text>
                </View>

                <Modal style={[styles.modal, styles.modal3]} position={"center"} ref={"modal3"} isDisabled={this.state.isDisabled}>
                    <Text style={styles.text}>Modal centered</Text>
                    <Button onPress={this.toggleDisable} style={styles.btn}>Disable ({this.state.isDisabled ? "true" : "false"})</Button>
                </Modal>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFFFFF"
    },
    map: {
        marginTop:70,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height /3

    },
    button:{
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height /3-50,
        justifyContent:"center",
        alignItems:"center"
    },
    center:{
        marginTop:10,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height /3-50,
    },
    image:{
        height: (Dimensions.get('window').width-100)/3,
        width:(Dimensions.get('window').width-100)/3,
        //borderWidth:1
    },
    modal: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    modal3:{

    },
    uploadAvatar:{

    }
});




//根据全局state返回当前页面所需要的信息,（注意以props的形式传递给AppLoginPage）
function mapStateToProps(store){
    return{
        state:store.signState.state
    };
}
//返回可以操作store.state的actions,(其实就是我们可以通过actions来调用我们绑定好的一系列方法)
function mapDispatchToProps(dispatch){
    return {
        actions: bindActionCreators(actionCreators, dispatch)
    };
}

//链接起来
export default  connect(mapStateToProps,mapDispatchToProps)(SingMainPage);
