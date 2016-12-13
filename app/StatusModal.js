/**
 * Created by lanccj on 2016/12/13.
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
    TouchableHighlight
} from 'react-native';


export default  class StatusModal extends Component {

    constructor(props) {
        super(props)
        // set state with passed in props
        this.state = {
            message: props.error,
            hide: props.hide,
        }
        // bind functions
        this.dismissModal = this.dismissModal.bind(this)
    }

    dismissModal() {
        this.setState({hide: true})
    }

    // show or hide Modal based on 'hide' prop
    render() {
        if(this.state.hide){
            return (
                <View>
                </View>
            )
        } else {
            return (
                <TouchableHighlight style={styles.mainContainer} onPress={this.dismissModal}>
                    <Text style={styles.text}>{this.state.message}</Text>
                </TouchableHighlight>
            )
        }
    }
}

const styles = StyleSheet.create({
    mainContainer:{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F5FCFF"
    },
    text:{

    }
});