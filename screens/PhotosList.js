import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, Switch, ToastAndroid } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Button from '../views/Button';
import { ActivityIndicator } from 'react-native'; // okrągła animacja ładowania
import { Dimensions } from "react-native";

import PhotosListItem from './photosList/PhotosListItem';
import * as MediaLibrary from "expo-media-library";
import { GALLERY_LAYOUTS_COLUMNS_NUMBER, SCREENS } from '../Consts';

export default class PhotosList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            photos: [],
            selectedPhotosData: [],
            isList: false,
            isWaiting: false
        };
    }
    componentDidMount = async () => {
        let { status } = await MediaLibrary.requestPermissionsAsync();
        if (status !== 'granted') {
            alert('brak uprawnień do czytania image-ów z galerii');
        } else this.readPhotos();
        this.props.navigation.addListener('focus', () => {
            this.readPhotos()
        });
    };

    readPhotos = async () => {

        this.setState({ isWaiting: true });
        let obj = await MediaLibrary.getAssetsAsync({
            first: 100,           // ilość pobranych assetów
            mediaType: 'photo'    // typ pobieranych danych, photo jest domyślne
        });

        //alert(JSON.stringify(obj.assets[0], null, 4));
        obj.assets.sort((a, b) => {
            return b.id - a.id;
        })
        this.setState({ photos: obj.assets, isWaiting: false });
    };

    saveLocation = async () => {
        if (!this.state.isWaiting) {
            this.setState({ isWaiting: true });
            let pos = await Location.getCurrentPositionAsync({});
            pos.timestamp = Date.now();
            AsyncStorage.setItem(pos.timestamp + "", JSON.stringify(pos));
            this.state.locations.push(pos);
            this.state.switchStatuses.push(true);
            this.adjustMainSwitch();
            this.setState({ isWaiting: false });
        }
    };


    deleteSelectedPhotos = async () => {
        try {
            this.setState({ isWaiting: true });
            await MediaLibrary.deleteAssetsAsync(this.state.selectedPhotosData.map((data) => { return data.id + ""; }));
            this.state.selectedPhotosData = [];
            this.setState({ isWaiting: false, photos: [] });
            this.readPhotos(); // przeładowanie listy zdjęć
            ToastAndroid.showWithGravity(
                'Usunięto zdjęcia z galerii',
                ToastAndroid.SHORT,
                ToastAndroid.CENTER
            );
        } catch (e) {
            console.error("jakiś błąd przy usuwaniu zdjęć.");
            console.log(e);
            this.readPhotos();
        }
    };

    render() {
        return (
            <View >
                <View style={{ flexDirection: "row" }}>
                    <Button text="Layout"
                        positionStyle={styles.buttonPosition} textStyle={styles.buttonText}
                        onPress={() => { this.setState({ isList: !this.state.isList }); }} />
                    <Button text="Camera"
                        positionStyle={styles.buttonPosition} textStyle={styles.buttonText}
                        onPress={() => { this.props.navigation.navigate(SCREENS.CAMERA); }} />
                    <Button text="Delete"
                        positionStyle={styles.buttonPosition} textStyle={styles.buttonText}
                        onPress={() => {
                            this.deleteSelectedPhotos();
                        }} />
                </View>
                <View>
                    <FlatList
                        numColumns={this.state.isList ? GALLERY_LAYOUTS_COLUMNS_NUMBER.LIST : GALLERY_LAYOUTS_COLUMNS_NUMBER.GALLERY}
                        key={this.state.isList ? GALLERY_LAYOUTS_COLUMNS_NUMBER.LIST : GALLERY_LAYOUTS_COLUMNS_NUMBER.GALLERY}
                        data={this.state.photos}
                        renderItem={({ item, index }) => {
                            return <PhotosListItem id={index} data={item}
                                photoStyle={styles.photoStyle} textStyle={styles.photoText}
                                onPress={(data) => {
                                    this.props.navigation.navigate(SCREENS.PHOTO_DETAILS, { data: data });
                                }}
                                onLongPress={(data) => {
                                    this.state.selectedPhotosData.push(data);
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
    photoStyle: {
        flex: 1,
        borderWidth: 1,
    },
    photoText: {
        position: "absolute",
        right: 0,
        bottom: 0,
        fontSize: 18,
        color: "blue",
        fontWeight: "bold"
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
