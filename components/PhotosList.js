import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, Switch } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Button from './Button';
import { ActivityIndicator } from 'react-native'; // okrągła animacja ładowania
import { Dimensions } from "react-native";

import LocationsListItem from './LocationsListItem';
import * as MediaLibrary from "expo-media-library";

export default class PhotosList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            locations: [],
            switchStatuses: [],
            mainSwitchValue: false,
            isWaiting: false
        };
        this.readPhotos();
    }
    componentDidMount = async () => {
        let { status } = await MediaLibrary.requestPermissionsAsync();
        if (status !== 'granted') {
            alert('brak uprawnień do czytania image-ów z galerii')
        }
    };

    readPhotos = async () => {
        let obj = await MediaLibrary.getAssetsAsync({
            first: 100,           // ilość pobranych assetów
            mediaType: 'photo'    // typ pobieranych danych, photo jest domyślne
        })

        alert(JSON.stringify(obj.assets, null, 4))
        this.adjustMainSwitch();
        this.setState({});
    };

    saveLocation = async () => {
        if (!this.state.isWaiting) {
            this.setState({ isWaiting: true })
            let pos = await Location.getCurrentPositionAsync({});
            pos.timestamp = Date.now()
            AsyncStorage.setItem(pos.timestamp + "", JSON.stringify(pos));
            this.state.locations.push(pos);
            this.state.switchStatuses.push(true);
            this.adjustMainSwitch();
            this.setState({ isWaiting: false });
        }
    };

    adjustMainSwitch() {
        if (this.state.switchStatuses.every((status) => { return status; })) this.state.mainSwitchValue = true;
        else this.state.mainSwitchValue = false;
    }

    removeLocations = async () => {
        try {
            await AsyncStorage.multiRemove(this.state.locations.map((v) => { return v.timestamp + ""; }));
            this.state.locations = [];
            this.state.switchStatuses = [];
            this.state.mainSwitchValue = false;
            this.setState({});
        } catch (e) {
            console.error("jakiś błąd przy usuwaniu danych.");
            console.log(e);
            this.readPhotos();
        }
    };

    displayMap = () => {
        let markersToDisplay = this.state.locations.filter((data, index) => {
            return this.state.switchStatuses[index];
        })
        if (markersToDisplay.length > 0) {
            this.props.navigation.navigate("map", {
                data: markersToDisplay
            });
        } else {
            alert("Nie ma pinezek do wyświetlenia")
        }
    }

    render() {
        return (
            <View >
                <View style={{ flexDirection: "row" }}>
                    <Button text="Layout"
                        positionStyle={styles.buttonPosition} textStyle={styles.buttonText}
                        onPress={() => { throw new Error("not implemented") }} />
                    <Button text="Camera"
                        positionStyle={styles.buttonPosition} textStyle={styles.buttonText}
                        onPress={() => { throw new Error("not implemented") }} />
                    <Button text="Delete"
                        positionStyle={styles.buttonPosition} textStyle={styles.buttonText}
                        onPress={() => { throw new Error("not implemented") }} />
                </View>
                <View>
                    <FlatList data={this.state.locations}
                        renderItem={({ item }) => {
                            let index = this.state.locations.indexOf(item);
                            return <LocationsListItem id={index} data={item} value={this.state.switchStatuses[index]}
                                headerStyle={styles.locationHeaderText} coordinatesStyle={styles.locationInfoText}
                                onChange={(id, value) => {
                                    this.state.switchStatuses[id] = value;
                                    this.adjustMainSwitch();
                                    this.setState({});
                                }} />;
                        }} />
                </View>

                {this.state.isWaiting
                    ?
                    <View style={styles.activityIndicatorOverlay}>
                        <ActivityIndicator style={styles.activityIndicator} size="large" color="blue" />
                    </View>
                    : null}

            </View>
        );
    }
}

const styles = StyleSheet.create({
    buttonPosition: {
        margin: 12,
        flex: 1,
        backgroundColor: "red",
        borderRadius: 16,
        padding: 5,
    },
    buttonText: {
        fontSize: 22,
        color: "white",
        textAlign: "center"
    },
    locationHeaderText: {
        fontSize: 18,
        color: "blue",
        fontWeight: "bold"
    },
    locationInfoText: {
        fontSize: 16,
        color: "black"
    },
    activityIndicatorOverlay: {
        backgroundColor: "grey",
        opacity: 0.5,
        height: Dimensions.get("window").height,
        width: Dimensions.get("window").width,
        position: "absolute"
    },
    activityIndicator: {
        alignSelf: "center",
        flex: 1,
        marginTop: 10
    }
});
