import React, { Component } from 'react';
import { View, Text, Image, Switch, Touchable, TouchableOpacity } from 'react-native';
import Overlay from '../../views/Overlay';

export default class PhotosListItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: this.props.data,
            isSelected: false
        };
    }

    render() {
        return (
            <View style={this.props.photoStyle}>
                <TouchableOpacity
                    onPress={() => { this.props.onPress(this.props.data); }}
                    delayLongPress={200}
                    onLongPress={() => {
                        this.setState({ isSelected: !this.state.isSelected });
                        this.props.onLongPress(this.props.data);
                    }}>

                    <View style={{ flex: 1 }}>
                        <Image style={{ flex: 1, width: "100%", aspectRatio: 1, alignSelf: "center" }} source={{ uri: this.props.data.uri }} />
                    </View>
                    <Overlay>
                        <Text style={this.props.textStyle || {}}> {this.props.data.id} </Text>
                    </Overlay>
                    {this.state.isSelected ?
                        <Overlay style={{ backgroundColor: "#444444", opacity: 0.8, alignItems: "center", justifyContent: "center" }}>
                            <Text style={{ fontSize: 40, color: "red" }}>+</Text>
                        </Overlay>
                        :
                        null
                    }
                </TouchableOpacity>
            </View >
        );
    }
}
