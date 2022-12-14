import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Overlay from './Overlay';

export default class RadioButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (

            <TouchableOpacity style={{ flex: 1 }} onPress={() => { if (this.props.onClick instanceof Function) this.props.onClick() }}>
                <Overlay>
                    <View style={styles.outerCircle} />
                </Overlay>
                {this.props.isChecked ?
                    <Overlay>
                        <View style={styles.innerCircle} />
                    </Overlay>
                    : null}
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({

    outerCircle: {
        width: 50,
        height: 50,
        borderColor: "red",
        borderWidth: 2,
        borderRadius: 25

    },
    innerCircle: {
        width: 40,
        height: 40,
        borderColor: "red",
        borderRadius: 25,
        backgroundColor: "red"
    }
});