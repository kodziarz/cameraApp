import React, { Component } from 'react';
import { View, Text, Animated, StyleSheet } from 'react-native';
import Button from "../components/Button";
import { Dimensions } from 'react-native';

export default class Options extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pos: (!this.props.isHidden ?
                new Animated.Value(Dimensions.get("window").height - 55)
                : new Animated.Value(0)),  //startowa pozycja y wysuwanego View
        };
    }

    toggle() {


        let toPos;
        if (this.props.isHidden) toPos = 0; else toPos = Dimensions.get("window").height - 55

        //animacja

        Animated.spring(
            this.state.pos,
            {
                toValue: toPos,
                velocity: 1,
                tension: 0,
                friction: 10,
                useNativeDriver: true
            }
        ).start();

        this.isHidden = !this.isHidden;
    }

    render() {
        return (
            <View style={{ flex: 1 }}>

                <Animated.View
                    style={[
                        styles.animatedView,
                        {
                            transform: [
                                { translateY: this.state.pos }
                            ]
                        }]} >
                    <Text>ANIMATE ME!</Text>

                </Animated.View>
                {this.toggle()}
            </View>
        );
    }
}

const styles = StyleSheet.create({

    animatedView: {
        position: "absolute",
        bottom: 0,
        left: 0,
        backgroundColor: "#00ff00",
        height: Dimensions.get("window").height - 55,
        width: Dimensions.get("window").width / 2
    }
});