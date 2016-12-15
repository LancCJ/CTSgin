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

var base64Icon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEsAAABLCAQAAACSR7JhAAADtUlEQVR4Ac3YA2Bj6QLH0XPT1Fzbtm29tW3btm3bfLZtv7e2ObZnms7d8Uw098tuetPzrxv8wiISrtVudrG2JXQZ4VOv+qUfmqCGGl1mqLhoA52oZlb0mrjsnhKpgeUNEs91Z0pd1kvihA3ULGVHiQO2narKSHKkEMulm9VgUyE60s1aWoMQUbpZOWE+kaqs4eLEjdIlZTcFZB0ndc1+lhB1lZrIuk5P2aib1NBpZaL+JaOGIt0ls47SKzLC7CqrlGF6RZ09HGoNy1lYl2aRSWL5GuzqWU1KafRdoRp0iOQEiDzgZPnG6DbldcomadViflnl/cL93tOoVbsOLVM2jylvdWjXolWX1hmfZbGR/wjypDjFLSZIRov09BgYmtUqPQPlQrPapecLgTIy0jMgPKtTeob2zWtrGH3xvjUkPCtNg/tm1rjwrMa+mdUkPd3hWbH0jArPGiU9ufCsNNWFZ40wpwn+62/66R2RUtoso1OB34tnLOcy7YB1fUdc9e0q3yru8PGM773vXsuZ5YIZX+5xmHwHGVvlrGPN6ZSiP1smOsMMde40wKv2VmwPPVXNut4sVpUreZiLBHi0qln/VQeI/LTMYXpsJtFiclUN+5HVZazim+Ky+7sAvxWnvjXrJFneVtLWLyPJu9K3cXLWeOlbMTlrIelbMDlrLenrjEQOtIF+fuI9xRp9ZBFp6+b6WT8RrxEpdK64BuvHgDk+vUy+b5hYk6zfyfs051gRoNO1usU12WWRWL73/MMEy9pMi9qIrR4ZpV16Rrvduxazmy1FSvuFXRkqTnE7m2kdb5U8xGjLw/spRr1uTov4uOgQE+0N/DvFrG/Jt7i/FzwxbA9kDanhf2w+t4V97G8lrT7wc08aA2QNUkuTfW/KimT01wdlfK4yEw030VfT0RtZbzjeMprNq8m8tnSTASrTLti64oBNdpmMQm0eEwvfPwRbUBywG5TzjPCsdwk3IeAXjQblLCoXnDVeoAz6SfJNk5TTzytCNZk/POtTSV40NwOFWzw86wNJRpubpXsn60NJFlHeqlYRbslqZm2jnEZ3qcSKgm0kTli3zZVS7y/iivZTweYXJ26Y+RTbV1zh3hYkgyFGSTKPfRVbRqWWVReaxYeSLarYv1Qqsmh1s95S7G+eEWK0f3jYKTbV6bOwepjfhtafsvUsqrQvrGC8YhmnO9cSCk3yuY984F1vesdHYhWJ5FvASlacshUsajFt2mUM9pqzvKGcyNJW0arTKN1GGGzQlH0tXwLDgQTurS8eIQAAAABJRU5ErkJggg==';
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
                <View>
                    <View style={[{flexDirection:'row',justifyContent:'flex-start'}]}>
                        <Image source={{uri: Constant.SignHistoryPhotoUrl+'?XH=0&SEQ='+this.props.seq+'&pageIndex=0&pageSize=6'}} style={styles.image} />

                        {
                            this.props.photoSize>1?(<Image source={{uri: Constant.SignHistoryPhotoUrl+'?XH=1&SEQ='+this.props.seq+'&pageIndex=0&pageSize=6'}} style={[styles.image,{marginLeft:10}]} />):null
                        }

                        {
                            this.props.photoSize>2?(<Image source={{uri: Constant.SignHistoryPhotoUrl+'?XH=2&SEQ='+this.props.seq+'&pageIndex=0&pageSize=6'}} style={[styles.image,{marginLeft:10}]} />):null
                        }


                    </View>
                    <View style={[{marginTop:10,flexDirection:'row',justifyContent:'space-between'}]}>
                        <Text style={[{justifyContent:'flex-start',alignItems:'center',textAlign:'center'}]}><Ionicons name="ios-navigate" size={25} color="#DEDEDE" />{this.props.signAddress}</Text>
                        <Text style={[{width:50,textAlign:'center',backgroundColor:(this.props.signState==='1')?'#0584FE':'#EA7A00',lineHeight:30,color:'#FFFFFF'}]}>{this.props.signState==1?'签到':'签退'}</Text>
                    </View>
                    <View style={[{marginTop:20,flexDirection:'row',justifyContent:'space-between'}]}>
                        <Text style={[{textAlign:'center'}]}>{this.props.signTime}</Text>
                        <Text style={[{justifyContent:'flex-start',alignItems:'center',textAlign:'center'}]}><Ionicons name="ios-medal" size={25} color="#DEDEDE" />排名{this.props.rank}</Text>
                    </View>
                </View>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container:{
        marginTop:10,
        height:Dimensions.get('window').height /3-50,
        width:Dimensions.get('window').width,
        padding:10,
        borderColor:'#DEDEDE',
        borderWidth:1
    },
    image:{
        height: (Dimensions.get('window').width-200)/3,
        width:(Dimensions.get('window').width-200)/3
    },
});
