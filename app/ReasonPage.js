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
    TextInput
} from 'react-native';

import Button from 'apsl-react-native-button'
import Dimensions from 'Dimensions';

/**
 *报告原因
 */
export default class ReasonPage extends Component {
    render() {
        return (
            <View style={styles.container}>
                <TextInput
                    multiline={true}
                    placeholder="报告原因......"
                    style={{height: Dimensions.get('window').height/2, borderColor: 'gray', borderWidth: 1,margin:10}}
                />
                <Button style={{backgroundColor: '#EA7A00',borderWidth:0,margin:10}} textStyle={{fontSize: 18,color:'white'}}>
                    上传报告并完成打卡
                </Button>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop:70,
        backgroundColor: "#FFFFFF"
    }
});
