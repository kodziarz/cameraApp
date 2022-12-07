import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, ToastAndroid, ActivityIndicator } from 'react-native';
import Button from '../views/Button';
import * as Sharing from 'expo-sharing';
import { SCREENS } from '../Consts';
import Overlay from '../views/Overlay';
import * as MediaLibrary from "expo-media-library";


export default class PhotoDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isWaiting: false
        };
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <View style={{ flex: 1, justifyContent: "space-around" }}>
                    <Text style={{ textAlign: "center", fontSize: 36 }}>Szczegóły zdjęcia</Text>
                </View>
                <View style={{ flex: 4 }}>
                    <Image style={{ flex: 1, width: "100%", aspectRatio: 1, alignSelf: "center" }} source={{ uri: this.props.route.params.data.uri }} />
                </View>
                <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-around", alignItems: "center" }}>
                    {Sharing.isAvailableAsync() ?
                        <Button text="Share"
                            positionStyle={styles.buttonPosition} textStyle={styles.buttonText}
                            onPress={() => { Sharing.shareAsync(this.props.route.params.data.uri); }} />
                        : null}
                    <Button text="Delete"
                        positionStyle={styles.buttonPosition} textStyle={styles.buttonText}
                        onPress={async () => {
                            try {
                                this.setState({ isWaiting: true });
                                await MediaLibrary.deleteAssetsAsync(this.props.route.params.data.id);
                                ToastAndroid.showWithGravity(
                                    "Usunięto zdjęcie",
                                    ToastAndroid.SHORT,
                                    ToastAndroid.BOTTOM
                                );
                                this.props.navigation.navigate(SCREENS.PHOTOS_LIST);
                            } catch (e) {
                                console.error("jakiś błąd przy usuwaniu zdjęć.");
                                console.log(e);
                                ToastAndroid.showWithGravity(
                                    "Niestety nie udało się usunąć zdjęcia",
                                    ToastAndroid.SHORT,
                                    ToastAndroid.BOTTOM
                                );
                            }
                        }} />
                </View>
                {this.state.isWaiting
                    ?
                    <Overlay>
                        <ActivityIndicator style={styles.activityIndicator} size="large" color="blue" />
                    </Overlay>
                    : null}
            </View >
        );
    }
}
const styles = StyleSheet.create({
    buttonPosition: {
        margin: 12,
        backgroundColor: "red",
        borderRadius: 16,
        padding: 5,
    },
    buttonText: {
        fontSize: 22,
        color: "white",
        textAlign: "center"
    },
    activityIndicator: {
        alignSelf: "center",
        flex: 1,
        marginTop: 10
    }
});
