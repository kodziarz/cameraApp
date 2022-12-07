import React, { Component } from 'react';
import { View, Text } from 'react-native';

export default class Overlay extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <View style={{ position: "absolute", width: "100%", height: "100%" }}>
                <View style={[{ flex: 1 }, this.props.style]}>
                    {this.props.children}
                </View>
            </View>
        );
    }
}
