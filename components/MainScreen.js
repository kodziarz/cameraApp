import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import * as Font from "expo-font";
import { SCREENS } from '../App';
// import { SCREENS } from '../App';

export default class MainScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isFontLoaded: false
        };
    }

    componentDidMount = async () => {
        await Font.loadAsync({
            'crazy': require('../assets/font.ttf'), // Uwaga: proszę w nazwie fonta nie używać dużych liter
        });
        this.setState({ isFontLoaded: true });
    };

    render() {
        return (
            this.state.isFontLoaded
                ?
                <TouchableOpacity style={{ flex: 1 }}
                    onPress={() => { this.props.navigation.navigate(SCREENS.PHOTOS_LIST); }}>
                    <View style={{ flex: 1, backgroundColor: "red" }} >
                        <View style={{ flex: 1, flexDirection: "column-reverse", alignItems: "center" }}>
                            <Text style={styles.title}> Camera App </Text>
                        </View>
                        <View style={{ flex: 1, alignItems: "center" }}>
                            <Text style={styles.subTitle}>show gallery pictures</Text>
                            <Text style={styles.subTitle}>take picture from camera</Text>
                            <Text style={styles.subTitle}>save photo to device</Text>
                            <Text style={styles.subTitle}>delete photos from device</Text>
                            <Text style={styles.subTitle}>share photo</Text>
                        </View>
                    </View >
                </TouchableOpacity>
                :
                null
        );
    }
}

const styles = StyleSheet.create({
    title: {
        fontFamily: "crazy",
        fontSize: 72,
        textAlign: "center",
        color: "white"
    },
    subTitle: {
        fontSize: 24,
        color: "white"
    }
});
