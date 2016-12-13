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

import {
    MapView,
    MapTypes,
    Geolocation
} from 'react-native-baidu-map';

import Dimensions from 'Dimensions';

import { Icon,SocialIcon } from 'react-native-elements'
import Button from 'apsl-react-native-button'

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
export default class SingMainPage extends Component {

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
            sliderValue: 0.3
        };
    }

    componentDidMount() {
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
                    }
                });
            })
            .catch(e =>{
                Alert.alert('获取GPS错误,请检查是否开启定位服务!')
            })
    }

    _Sign(){
        //1.直接满足条件 直接打卡
        //Alert.alert('签到打卡');
        //超过时间 需要填写原因
        this.refs.modal3.open();
    }
    _choosePic(){
        //Alert.alert('选择照片或者直接拍摄')
        /**
         * The first arg is the options object for customization (it can also be null or omitted for default options),
         * The second arg is the callback which sends object: response (more info below in README)
         */
        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            }
            else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            }
            else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            }
            else {
                // You can display the image using either data...
                const source = {uri: 'data:image/jpeg;base64,' + response.data, isStatic: true};

                // or a reference to the platform specific asset location
                if (Platform.OS === 'ios') {
                    const source = {uri: response.uri.replace('file://', ''), isStatic: true};
                } else {
                    const source = {uri: response.uri, isStatic: true};
                }

                this.setState({
                    avatarSource: source
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

                    <View style={{flex:1,borderBottomWidth:1,borderBottomColor:'#0086F6',flexDirection:'row',marginTop:5,justifyContent:'flex-start',alignItems:'center'}}>
                        <TouchableOpacity onPress={this._choosePic}>
                            <View style={{height:(Dimensions.get('window').width-100)/3,width:(Dimensions.get('window').width-100)/3,borderWidth:1,borderStyle:'dashed',marginLeft:10,justifyContent:'center',alignItems:'center'}}>
                                <Icon
                                    name='ios-add'
                                    type='ionicon'
                                    size={(Dimensions.get('window').width-100)/3}
                                />
                            </View>
                        </TouchableOpacity>

                    </View>
                </View>

                <View style={styles.button}>
                    <Button onPress={this._Sign} style={{backgroundColor: '#32C739',borderWidth:0}} textStyle={{fontSize: 18,color:'white'}}>
                        上班打卡
                    </Button>
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
        marginTop:5,
        marginBottom:5,
        height: 115,
        width:115,
        resizeMode: 'contain',
        marginLeft:15,
        //borderWidth:1
    },
    modal: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    modal3:{

    }
});
