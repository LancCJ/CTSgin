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
var Lightbox = require('react-native-lightbox');
import Constant from './common/Constant';

import Dimensions from 'Dimensions';



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

                    {
                        (this.props.signState==='0')?(
                            <Image
                                defaultSource={require('../images/ic_img_loading.png')}
                                source={require('../images/ic_checkin_tag.png')}
                                style={styles.donepic}
                            />
                        ):(
                            <Image
                                defaultSource={require('../images/ic_img_loading.png')}
                                source={require('../images/ic_checkout_tag.png')}
                                style={styles.donepic}
                            />
                        )
                    }

                </View>
                <View style={{flex:1}}>
                    <View style={[{flexDirection:'row',justifyContent:'flex-start'}]}>
                        <Lightbox
                        >
                            <Image defaultSource={require('../images/ic_img_loading.png')} source={{uri: Constant.SignHistoryPhotoUrl+'?XH=0&SEQ='+this.props.seq+'&pageIndex=0&pageSize=6'}} style={styles.image} />
                        </Lightbox>
                        {
                            this.props.photoSize>1?(<Image defaultSource={require('../images/ic_img_loading.png')} source={{uri: Constant.SignHistoryPhotoUrl+'?XH=1&SEQ='+this.props.seq+'&pageIndex=0&pageSize=6'}} style={[styles.image,{marginLeft:10}]} />):null
                        }

                        {
                            this.props.photoSize>2?(<Image  defaultSource={require('../images/ic_img_loading.png')} source={{uri: Constant.SignHistoryPhotoUrl+'?XH=2&SEQ='+this.props.seq+'&pageIndex=0&pageSize=6'}} style={[styles.image,{marginLeft:10}]} />):null
                        }
                    </View>
                    <View style={[{marginTop:10,flexDirection:'row',justifyContent:'flex-start'}]}>

                        <Image
                            source={require('../images/ic_history_location.png')}
                            style={styles.icon}
                        />

                        <Text numberOfLines={1} style={[{justifyContent:'flex-start',alignItems:'center',textAlign:'center',fontSize:Dimensions.get('window').height/100}]}> {this.props.signAddress}</Text>
                    </View>
                    <View style={[{marginTop:10,flexDirection:'row',justifyContent:'space-between'}]}>
                        <Text style={[{marginLeft:(Dimensions.get('window').width)/25+5,textAlign:'center',fontSize:Dimensions.get('window').height/100}]}>{this.props.signTime}</Text>
                        <View style={{flexDirection:'row'}}>



                            <Image
                                source={require('../images/ic_rank_s.png')}
                                style={styles.icon}
                            />


                            <Text style={[{justifyContent:'flex-start',alignItems:'center',textAlign:'center',fontSize:Dimensions.get('window').height/100}]}> 排名{this.props.rank}</Text>
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
        height:Dimensions.get('window').height /3-40,
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
        height: (Dimensions.get('window').width)/25,
        width:(Dimensions.get('window').width)/25
    },
    donepic:{
        alignSelf:'flex-end',
        marginRight:5,
        width:(Dimensions.get('window').width-150)/3,
        height:(Dimensions.get('window').width-150)/6,
        marginTop:-15
    },
    col: {
        flex: 1,
    },
});
