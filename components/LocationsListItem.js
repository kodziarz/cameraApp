import React, { Component } from 'react';
import { View, Text, Image, Switch } from 'react-native';

export default class LocationsListItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: this.props.data,
        };
    }

    render() {
        return (
            <View style={{ flexDirection: "row" }}>
                <View style={{ flex: 1 }}>
                    <Image style={{ width: 40, height: 45, flex: 1, alignSelf: "center" }} source={require('../assets/marker.png')} />
                </View>
                <View style={{ flex: 3 }}>
                    <Text style={this.props.headerStyle || {}}> timestamp: {this.props.data.timestamp} </Text>
                    <Text style={this.props.latitudeStyle || this.props.coordinatesStyle || {}}> latitude: {this.props.data.coords.latitude} </Text>
                    <Text style={this.props.longitudeStyle || this.props.coordinatesStyle || {}}> longitude: {this.props.data.coords.longitude} </Text>
                </View>
                <Switch style={{ flex: 1 }} value={this.props.value} onChange={() => {
                    if (this.props.onChange != undefined) this.props.onChange(this.props.id, !this.props.value);
                }} />
            </View>
        );
    }
}
