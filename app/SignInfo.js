/**
 * Created by lanccj on 2016/12/14.
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

import Ionicons from 'react-native-vector-icons/Ionicons';


import Dimensions from 'Dimensions';

import Constant from './common/Constant';


export default class SignInfo extends Component {
    constructor() {
        super();
        this.state = {}
    }
    componentDidMount() {
        Ionicons.getImageSource('ios-add', (Dimensions.get('window').width-200)/3,'#DEDEDE').then((source) => this.setState({ addIcon: source }));
    }
    render () {
        return (
            <View style={styles.container}>
                <View style={{flexDirection:'row-reverse', width:Dimensions.get('window').width-40,borderWidth:0}}>
                    <Image
                        style={styles.donepic}
                        source={(this.props.signState==='1')?require('../images/ic_checkin_tag.png'):require('../images/ic_checkout_tag.png')}
                    />
                </View>
                <View style={{flex:1}}>
                    <View style={[{flexDirection:'row',justifyContent:'flex-start'}]}>
                        <Image source={{uri: Constant.SignHistoryPhotoUrl+'?XH=0&SEQ='+this.props.seq+'&pageIndex=0&pageSize=6'}} style={styles.image} />

                        {
                            this.props.photoSize>1?(<Image source={{uri: Constant.SignHistoryPhotoUrl+'?XH=1&SEQ='+this.props.seq+'&pageIndex=0&pageSize=6'}} style={[styles.image,{marginLeft:10}]} />):null
                        }

                        {
                            this.props.photoSize>2?(<Image source={{uri: Constant.SignHistoryPhotoUrl+'?XH=2&SEQ='+this.props.seq+'&pageIndex=0&pageSize=6'}} style={[styles.image,{marginLeft:10}]} />):null
                        }


                    </View>
                    <View style={[{marginTop:10,flexDirection:'row',justifyContent:'flex-start'}]}>
                        <Image
                            style={styles.icon}
                            source={require('../images/ic_history_location.png')}
                        />
                        <Text numberOfLines={1} style={[{justifyContent:'flex-start',alignItems:'center',textAlign:'center',lineHeight:20}]}> {this.props.signAddress}</Text>
                        {/*<Text style={[{width:50,textAlign:'center',backgroundColor:(this.props.signState==='1')?'#0584FE':'#EA7A00',lineHeight:30,color:'#FFFFFF'}]}>{this.props.signState==1?'签到':'签退'}</Text>*/}
                    </View>
                    <View style={[{marginTop:10,flexDirection:'row',justifyContent:'space-between'}]}>
                        <Text style={[{textAlign:'center'}]}>{this.props.signTime}</Text>
                        <View style={{flexDirection:'row'}}>
                            <Image
                                style={styles.icon}
                                source={require('../images/ic_rank_s.png')}
                            />
                            <Text style={[{justifyContent:'flex-start',alignItems:'center',textAlign:'center',lineHeight:20}]}> 排名{this.props.rank}</Text>
                        </View>

                    </View>

                </View>


            </View>
        );
    }
}


const styles = StyleSheet.create({
    container:{
        margin:10,
        height:Dimensions.get('window').height /3-60,
        width:Dimensions.get('window').width-20,
        padding:10,
        borderColor:'#DEDEDE',
        borderWidth:1
    },
    image:{
        height: (Dimensions.get('window').width-150)/3,
        width:(Dimensions.get('window').width-150)/3
    },
    icon:{
        width:20,
        height:20
    },
    donepic:{
        alignSelf:'flex-end',
        marginRight:5,
        width:90,
        height:30,
        marginTop:-15
    }
});
