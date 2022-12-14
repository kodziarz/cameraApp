import React, { Component } from 'react';
import { View, Text, ToastAndroid, StyleSheet, Image } from 'react-native';
import { Camera } from "expo-camera";
import { SCREENS } from '../Consts';
import { BackHandler } from "react-native";
import Button from '../views/Button';
import * as MediaLibrary from "expo-media-library";
import Overlay from '../views/Overlay';
import Options from './Options';

export default class CameraScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasCameraPermission: null,         // przydzielone uprawnienia do używania kamery
      type: Camera.Constants.Type.back,  // typ kamery
      takenPhotoData: null,
      areOptionsHidden: false
    };
  }

  takePicture = async () => {

    if (this.camera) {
      let foto = await this.camera.takePictureAsync();
      let asset = await MediaLibrary.createAssetAsync(foto.uri); // domyślnie zapisuje w folderze DCIM
      //alert(JSON.stringify(asset, null, 4));
      this.setState({ takenPhotoData: foto });
    }
  };

  handleBackPress = () => {

    this.props.navigation.navigate(SCREENS.PHOTOS_LIST);
    return true;
  };

  componentDidMount = async () => {
    BackHandler.addEventListener("hardwareBackPress", this.handleBackPress);
    let { status } = await Camera.requestCameraPermissionsAsync();
    if (status != "granted") {
      ToastAndroid.showWithGravity(
        "To uprawnienie jest konieczne do wykonania zdjęcia.",
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM
      );
      this.props.navigation.navigate(SCREENS.PHOTOS_LIST);
      return;
    }
    this.setState({ hasCameraPermission: true });
  };

  componentWillUnmount = () => {
    BackHandler.removeEventListener("hardwareBackPress", this.handleBackPress);
  };

  handleToggleOptions = () => {
    this.setState({ areOptionsHidden: !(this.state.areOptionsHidden) })
    console.log("this.state.areOptionsHidden: ", this.state.areOptionsHidden);
  }

  render() {
    if (this.state.hasCameraPermission)
      return (
        this.state.takenPhotoData == null ?
          <View style={{ flex: 1 }}>
            <Camera
              ref={ref => {
                this.camera = ref; // Uwaga: referencja do kamery używana później
              }}
              style={{ flex: 1 }}
              type={this.state.type}>
              <View style={{ flex: 1, justifyContent: "flex-end" }}>
                <View style={{ flexDirection: "row", justifyContent: "center" }}>
                  <Button text="<->"
                    positionStyle={styles.buttonPosition} textStyle={styles.buttonText}
                    onPress={() => { throw Error("not yet implemented"); }} />
                  <Button text="+"
                    positionStyle={styles.buttonPosition} textStyle={styles.buttonText}
                    onPress={() => { this.takePicture(); }} />
                  <Button text="Opcje"
                    positionStyle={styles.buttonPosition} textStyle={styles.buttonText}
                    onPress={() => { this.handleToggleOptions() }} />
                </View>
              </View>
            </Camera>
            <Overlay>
              <Options isHidden={this.state.areOptionsHidden} />
            </Overlay>
          </View>
          :
          <View style={{ flex: 1 }}>
            <Image style={{ flex: 1, width: "100%", aspectRatio: 1, alignSelf: "center" }} source={{ uri: this.state.takenPhotoData.uri }} />
            <Overlay>
              <View style={{ flex: 1, justifyContent: "flex-end" }}>
                <View style={{ flexDirection: "row", justifyContent: "center" }}>
                  <Button text="<->"
                    positionStyle={styles.buttonPosition} textStyle={styles.buttonText}
                    onPress={() => { this.setState({ takenPhotoData: null }); }} />
                </View>
              </View>
            </Overlay>
          </View>
      );
    else return null;
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
});