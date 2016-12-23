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
    TouchableOpacity,
NativeModules
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

import JSUtil from './common/utils/JSUtil';

import moment from './common/utils/moment';


var Spinner = require('react-native-spinkit');
import { Icon,SocialIcon } from 'react-native-elements'
import Button from 'apsl-react-native-button'

import Ionicons from 'react-native-vector-icons/Ionicons';
var DeviceInfo = require('react-native-device-info');

var Platform = require('react-native').Platform;
var ImagePicker = require('react-native-image-picker');
import {Actions} from 'react-native-router-flux';
import Modal from 'react-native-root-modal';


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
            buttonTitle:'正在\n加载',
            buttonisDisabled:false,

            signState:null,

            longitude:null,
            latitude:null,
            avatarSource1:null,
            avatarSource2:null,
            avatarSource3:null,

            base64image1:null,
            base64image2:null,
            base64image3:null,

            btnbackground:'#32C739',

            spinnerisDisabled:false,
            spinnersize:100,
            spinnercolor:'#32C739',

            openModal:false,


            doingMsg:'提交数据中...',

            rank:"",
            locationName:'数据读取中',

            commitPic1time:null,
            commitPic2time:null,
            commitPic3time:null

        };

    }

    componentWillMount(){


        //获取登录用户的签到状态然后来加载按钮文字
        //console.log(this.props.user);
        ////console.log('查询'+this.props.user.realname+'的签到状态');
       // this.props.actions.signState(this.props.user);//dispath 查询签到状态

        // //console.log(this.props.user);
        //获取手机当前坐标
        Geolocation.getCurrentPosition()
            .then(data => {
                //console.log(data);

                this.setState({
                    zoom: 20,
                    marker: {
                        latitude: data.latitude,
                        longitude: data.longitude,
                        title: this.state.locationName
                    },
                    center: {
                        latitude: data.latitude,
                        longitude: data.longitude
                    },
                    latitude: data.latitude,
                    longitude: data.longitude
                });

                Geolocation.reverseGeoCode(data.latitude,data.longitude).then(data =>{
                    //console.log('获取地址名称');
                    //console.log(data);

                    this.setState({
                        marker: {
                            latitude: this.state.latitude,
                            longitude: this.state.longitude,
                            title: data.province+data.city+data.address+data.streetName+data.streetNumber
                        },
                        locationName:data.province+data.city+data.address+data.streetName+data.streetNumber
                    });

                })

            })
            .catch(e =>{
                Alert.alert('获取GPS错误,请检查是否开启定位服务!')
            });

        //console.log('获取名称');



        //获取图标
        Ionicons.getImageSource('ios-add', (Dimensions.get('window').width-200)/3,'#DEDEDE').then((source) => this.setState({ addIcon: source }));

        Ionicons.getImageSource('ios-close-circle', 50,'#FF0000').then((source) => this.setState({ deleteIcon: source }));

    }

    componentDidMount() {
        //console.log('获取名称');






    }


    //该方法首次不会执行，如果返回false，则reduer不会执行
    shouldComponentUpdate(nextProps,nextState){

        const {state,msg,rank}=nextProps;

        if(rank!=null){
            this.setState({
                rank:rank
            });
        }

        if(msg!=null){
            this.setState({
                doingMsg:msg
            });
        }

        if(state!=null){
           //console.log('我在界面 获取最新的state');
           //console.log(state.data.STATUS);

           //按照状态来显示 按钮的文字
            if(state.data.STATUS==="-1"){
                //console.log('111111');
                this.setState({
                    buttonTitle: "上班打卡",
                    signState:-1
                });
            }else  if(state.data.STATUS==="0"){
                //console.log('222222');
                this.setState({
                    buttonTitle: "下班打卡",
                    signState:0,
                    btnbackground:'#EA7A00'
                });
            }else  if(state.data.STATUS==="1"){
                //console.log('333333');
                this.setState({
                    buttonTitle: "全部完成",
                    signState:1,
                    buttonisDisabled:true
                });
            }

            //console.log(this.state);

        }
        return true;
    }

    _Sign(){


        //console.log(this.state);

        //1.直接满足条件 直接打卡
        //Alert.alert('你点击了');
        //判断是否超过时间 打卡上班要在8.30💰  前    打卡下班要5.30后

        let REMARKS='测试';
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

        let infoUUID=JSUtil.uuid();

//        let infoUUID='25cc84c6-a5af-4ca3-aad1-d73cb9ed642a'

    //文本信息

        let time=moment().format('YYYY-MM-DD hh:mm:ss');

        // let infoParams = new FormData();
        // infoParams.append('COMMIT_TIME', time);
        // infoParams.append( 'ADDRESS',	this.state.locationName);
        // infoParams.append('REMARKS',	REMARKS);
        // infoParams.append( 'USER_ID',	this.props.user.username);
        // infoParams.append('SEQ',	infoUUID);
        // infoParams.append( 'PHOTO_SIZE',	PHOTO_SIZE);
        // infoParams.append( 'TYPE',this.state.signState+1);
        // infoParams.append( 'DEPT_ID',	this.props.user.deptId);
        // infoParams.append( 'LONGITUDE',	this.state.longitude);
        // infoParams.append( 'LATITUDE',	this.state.latitude);

        let infoParams={
            'COMMIT_TIME':	time,
            'ADDRESS':	this.state.locationName,
            'REMARKS':	REMARKS,
            'USER_ID':	this.props.user.username,
            'SEQ':	infoUUID,
            'PHOTO_SIZE':	PHOTO_SIZE,
            'TYPE':this.state.signState+1,
            'DEPT_ID':	this.props.user.deptId,
            'LONGITUDE':	this.state.longitude,
            'LATITUDE':	this.state.latitude,
            'IMEI':	''
        }

        this.setState({
            infoCommitTime:time
        });
        //infoCommitTime

        //照片信息

        let PicParams=null;

        if(this.state.avatarSource1){
            PicParams={

                "pics":{
                    'COMMIT_TIME':this.state.commitPic1time,
                    'CRRELATION_ID':	infoUUID,//对应的信息ID
                    'SEQ':	JSUtil.uuid(),
                    'ZP':this.state.base64image1,
                    'XH':'0'
                }


            }
            if(this.state.avatarSource2){
                PicParams={
                    "pics":[{
                        'COMMIT_TIME':this.state.commitPic1time,
                        'CRRELATION_ID':	infoUUID,//对应的信息ID
                        'SEQ':	JSUtil.uuid(),
                        'ZP':this.state.base64image1,
                        'XH':'0'
                    },
                    {
                        'COMMIT_TIME':this.state.commitPic2time,
                        'CRRELATION_ID':	infoUUID,//对应的信息ID
                        'SEQ':	JSUtil.uuid(),
                        'ZP':this.state.base64image2,
                        'XH':'1'
                    }]

                }
                if(this.state.avatarSource3){
                    PicParams={
                        "pics":[{
                            'COMMIT_TIME':this.state.commitPic1time,
                            'CRRELATION_ID':	infoUUID,//对应的信息ID
                            'SEQ':	JSUtil.uuid(),
                            'ZP':this.state.base64image1,
                            'XH':'0'
                        },
                        {
                            'COMMIT_TIME':this.state.commitPic2time,
                            'CRRELATION_ID':	infoUUID,//对应的信息ID
                            'SEQ':	JSUtil.uuid(),
                            'ZP':this.state.base64image2,
                            'XH':'1'
                        },
                        {
                            'COMMIT_TIME':this.state.commitPic3time,
                            'CRRELATION_ID':	infoUUID,//对应的信息ID
                            'SEQ':	JSUtil.uuid(),
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

            this.setState({openModal:true});

            //console.log('打卡前参数准备如下....');
            //console.log(PicParams);

            //console.log(infoParams);

            this.props.actions.Sign(PicParams,infoParams);//dispath 签到签出

            //超过时间 需要填写原因
            //this.refs.modal3.open();
        }

    }
    deletePhotoTapped1(){

        //假如有2，3张图片  那么需要将图片设置到  1，2

        this.setState({
            justifyContentStyle:'space-around',

            avatarSource1: this.state.avatarSource2,
            base64image1:this.state.base64image2,
            commitPic1time:this.state.commitPic2time,

            avatarSource2: this.state.avatarSource3,
            base64image2:this.state.base64image3,
            commitPic2time:this.state.commitPic3time,

            avatarSource3: null,
            base64image3:"",
            commitPic3time:"",

        });




        this.setState({

        });

    }

    selectPhotoTapped1() {
        const options = {
            quality: 1.0,
            title:'选择现场照片',
            takePhotoButtonTitle:'立即拍照',
            chooseFromLibraryButtonTitle:'从相册选择',
            cancelButtonTitle:'取消',
            maxWidth: 500,
            maxHeight: 500,
            storageOptions: {
                skipBackup: true
            }
        };

        ImagePicker.showImagePicker(options, (response) => {
            //console.log('Response = ', response);

            if (response.didCancel) {
                //console.log('User cancelled photo picker');
            }
            else if (response.error) {
                //console.log('ImagePicker Error: ', response.error);
            }
            else if (response.customButton) {
                //console.log('User tapped custom button: ', response.customButton);
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

                //console.log('添加水印')

                //添加水印
                ////console.log(response.data);
                var Utils = NativeModules.Utils;


                let time=moment().format('YYYY-MM-DD hh:mm:ss');


                Utils.addWaterMark(response.data, this.props.user.realname,this.state.locationName,this.state.longitude+','+this.state.latitude,time).then(response=>{
                    //console.log('添加水印返回===')
                    //console.log(response.data);

                    //console.log(source)

                    this.setState({
                        avatarSource1: source,
                        justifyContentStyle:'space-around',
                        base64image1:response.data,
                        commitPic1time:time
                    });

                });



                ////console.log('获取到的图片base64');

                ////console.log(source.data);
            }
        });
    }

    deletePhotoTapped2(){

        //假如有3张图片  那么需要将图片设置到  3设置到2，清空3

        this.setState({
            avatarSource2: this.state.avatarSource3,
            justifyContentStyle:'space-around',
            base64image2:this.state.base64image3,
            commitPic2time:this.state.commitPic3time,

            avatarSource3: null,
            base64image3:"",
            commitPic3time:"",

        });

    }


    selectPhotoTapped2() {
        const options = {
            quality: 1.0,
            title:'选择现场照片',
            takePhotoButtonTitle:'立即拍照',
            chooseFromLibraryButtonTitle:'从相册选择',
            cancelButtonTitle:'取消',
            maxWidth: 500,
            maxHeight: 500,
            storageOptions: {
                skipBackup: true
            }
        };

        ImagePicker.showImagePicker(options, (response) => {
            //console.log('Response = ', response);

            if (response.didCancel) {
                //console.log('User cancelled photo picker');
            }
            else if (response.error) {
                //console.log('ImagePicker Error: ', response.error);
            }
            else if (response.customButton) {
                //console.log('User tapped custom button: ', response.customButton);
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


                //console.log('添加水印')

                //添加水印
                var Utils = NativeModules.Utils;

                let time=moment().format('YYYY-MM-DD hh:mm:ss');


                Utils.addWaterMark(response.data, this.props.user.username,this.state.locationName,this.state.longitude+','+this.state.latitude,time).then(response=>{
                    //console.log('添加水印返回===')
                    //console.log(response.data);

                    this.setState({
                        avatarSource2: source,
                        justifyContentStyle:'space-between',
                        base64image2:response.data,
                        commitPic2time:time
                    });

                });




            }
        });
    }

    deletePhotoTapped3(){
        this.setState({
            avatarSource3: null,
            justifyContentStyle:'space-around',
            base64image3:"",
            commitPic3time:""
        });
    }


    selectPhotoTapped3() {
        const options = {
            quality: 1.0,
            title:'选择现场照片',
            takePhotoButtonTitle:'立即拍照',
            chooseFromLibraryButtonTitle:'从相册选择',
            cancelButtonTitle:'取消',
            maxWidth: 500,
            maxHeight: 500,
            storageOptions: {
                skipBackup: true
            }
        };

        ImagePicker.showImagePicker(options, (response) => {
            //console.log('Response = ', response);

            if (response.didCancel) {
                //console.log('User cancelled photo picker');
            }
            else if (response.error) {
                //console.log('ImagePicker Error: ', response.error);
            }
            else if (response.customButton) {
                //console.log('User tapped custom button: ', response.customButton);
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


                //console.log('添加水印')

                //添加水印

                var Utils = NativeModules.Utils;

                let time=moment().format('YYYY-MM-DD hh:mm:ss');


                Utils.addWaterMark(response.data, this.props.user.username,this.state.locationName,this.state.longitude+','+this.state.latitude,time).then(response=>{
                    //console.log('添加水印返回===')
                    //console.log(response.data);

                    this.setState({
                        avatarSource3: source,
                        base64image3:response.data,
                        commitPic3time:time
                    });

                });






            }
        });
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
                    <View style={{borderBottomWidth:1,borderBottomColor:'#DEDEDE',height:25}}>
                        <Text style={{marginLeft:50,fontSize:Dimensions.get('window').height/40}}>现场照片</Text>
                    </View>

                    <View style={{padding:15,flex:1,borderBottomWidth:1,borderBottomColor:'#DEDEDE',flexDirection:'row',marginTop:5,justifyContent:this.state.justifyContentStyle,alignItems:'center'}}>

                        <TouchableOpacity onPress={this.state.avatarSource1?null:this.selectPhotoTapped1.bind(this)}>
                            <View style={{height:(Dimensions.get('window').width-100)/3,width:(Dimensions.get('window').width-100)/3,borderWidth:0,borderStyle:'dashed',justifyContent:'center',alignItems:'center'}}>

                                <Image source={this.state.avatarSource1?this.state.avatarSource1:require('../images/btn_add_photo_normal.png')} style={styles.image} >

                                    {this.state.avatarSource1?(
                                        <TouchableOpacity onPress={this.deletePhotoTapped1.bind(this)}>
                                            <Image source={this.state.deleteIcon} style={[{alignSelf:'flex-end',width:(Dimensions.get('window').width-100)/12,height:(Dimensions.get('window').width-100)/12}]} />
                                        </TouchableOpacity>
                                    ):(null)
                                    }
                                </Image>


                            </View>
                        </TouchableOpacity>

                        {this.state.base64image1?(
                            <TouchableOpacity onPress={this.state.avatarSource2?null:this.selectPhotoTapped2.bind(this)}>
                                <View style={{height:(Dimensions.get('window').width-100)/3,width:(Dimensions.get('window').width-100)/3,borderWidth:0,borderStyle:'dashed',justifyContent:'center',alignItems:'center'}}>
                                    <Image source={this.state.avatarSource2?this.state.avatarSource2:require('../images/btn_add_photo_normal.png')} style={styles.image} >
                                        {this.state.avatarSource2?(
                                            <TouchableOpacity onPress={this.deletePhotoTapped2.bind(this)}>
                                                <Image source={this.state.deleteIcon} style={[{alignSelf:'flex-end',width:(Dimensions.get('window').width-100)/12,height:(Dimensions.get('window').width-100)/12}]} />
                                            </TouchableOpacity>
                                        ):(null)
                                        }
                                    </Image>
                                </View>
                            </TouchableOpacity>
                        ):(null)}

                        {this.state.base64image2?(
                            <TouchableOpacity onPress={this.state.avatarSource3?null:this.selectPhotoTapped3.bind(this)}>
                                <View style={{height:(Dimensions.get('window').width-100)/3,width:(Dimensions.get('window').width-100)/3,borderWidth:0,borderStyle:'dashed',justifyContent:'center',alignItems:'center'}}>
                                    <Image source={this.state.avatarSource3?this.state.avatarSource3:require('../images/btn_add_photo_normal.png')} style={styles.image} >
                                        {this.state.avatarSource3?(
                                            <TouchableOpacity onPress={this.deletePhotoTapped3.bind(this)}>
                                                <Image source={this.state.deleteIcon} style={[{alignSelf:'flex-end',width:(Dimensions.get('window').width-100)/12,height:(Dimensions.get('window').width-100)/12}]} />
                                            </TouchableOpacity>
                                        ):(null)
                                        }
                                    </Image>
                                </View>
                            </TouchableOpacity>
                        ):(null)}
                    </View>
                </View>

                <View style={styles.button}>

                        {this.state.buttonTitle==='上班打卡'?(
                        <TouchableOpacity onPress={this._Sign.bind(this)} >
                            <Image
                                style={{ justifyContent:"center",alignItems:"center",width:Dimensions.get('window').height /3-60,height:Dimensions.get('window').height /3-60}}
                                source={require('../images/btn_checkin_normal.png')}
                            />
                        </TouchableOpacity>
                        ):
                            (

                                this.state.buttonTitle==='下班打卡'?(
                                <TouchableOpacity onPress={this._Sign.bind(this)} >
                                    <Image
                                        style={{ justifyContent:"center",alignItems:"center",width:Dimensions.get('window').height /3-60,height:Dimensions.get('window').height /3-60}}
                                        source={require('../images/btn_checkout_normal.png')}
                                    />
                                </TouchableOpacity>
                                ):(
                                <TouchableOpacity onPress={this._Sign.bind(this)} disabled={true}>
                                    <Image
                                        style={{ justifyContent:"center",alignItems:"center",width:Dimensions.get('window').height /3-60,height:Dimensions.get('window').height /3-60}}
                                        source={require('../images/btn_check_done.png')}
                                    />
                                </TouchableOpacity>
                                )
                            )
                        }

                </View>

                <View style={[{backgroundColor:'#0584FE',height:Dimensions.get('window').height/50,flex:1,justifyContent:'center',alignItems:'center'}]}>
                    <Text style={[{color:'#FFFFFF',textAlign:'center',fontSize:Dimensions.get('window').height/50}]}>登录用户:{this.props.user.realname}</Text>
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

                                        visible={this.state.openModal}
                                    >

                    {this.state.doingMsg==='提交完毕'?(
                        <View style={styles.signDone}>
                            {
                                this.state.signState===1?(
                                    <Image
                                        style={styles.signDonePic}
                                        source={require('../images/ic_checkin_green.png')}
                                    />
                                ):(
                                    <Image
                                        style={styles.signDonePic}
                                        source={require('../images/ic_checkin_green.png')}
                                    />
                                )
                            }

                            <View style={styles.signDoneText}>
                                <Text style={{fontSize:20}}>第{this.state.rank}个{this.state.signState===1?'上班':'下班'}上班打卡成功</Text>
                                <Text style={{marginTop:10,fontSize:20}}>{this.state.infoCommitTime}</Text>
                                <Text style={{marginTop:10,fontSize:20,color:'#DEDEDE'}}>{this.state.locationName}</Text>
                            </View>

                        </View>
                    ):(<View>
                        <Spinner style={styles.spinner} isVisible={this.state.openModal} size={this.state.spinnersize} type='Bounce' color={this.state.spinnercolor}/>
                        <Text style={styles.doingMsg}>{this.state.doingMsg}</Text>
                    </View>)}

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
        alignSelf:'center'//自身中间对齐
        //borderWidth:1
    },
    modal: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    modal3:{

    },
    uploadAvatar:{

    },
    spinner:{

    },
    doingMsg:{
        color:'#FFFFFF',fontSize:15
    },
    signDone:{
        height:Dimensions.get('window').height/2,
        width:(Dimensions.get('window').width-50),
        backgroundColor:'#FFFFFF',
        justifyContent:'center',
        alignItems:'center'
    },signDonePic:{
        marginTop:10,
        width:155,
        height:180,
        flex:3
    },signDoneText:{
        flex:2,
        justifyContent:'center',
        alignItems:'center'

    }
});




//根据全局state返回当前页面所需要的信息,（注意以props的形式传递给AppLoginPage）
function mapStateToProps(store){
    return{
        state:store.signState.state,
        msg:store.signState.msg,
        rank:store.signState.rank
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
