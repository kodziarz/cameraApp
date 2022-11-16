import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

export default class Button extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <TouchableOpacity style={this.props.positionStyle || {}}
                onPress={() => { if (this.props.onPress != undefined) this.props.onPress(this); }}>
                <Text style={this.props.textStyle || {}}> {this.props.text || "Button"} </Text>
            </TouchableOpacity>
        );
    }
}
