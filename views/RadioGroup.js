import React, { Component } from 'react';
import { View, Text } from 'react-native';
import RadioButton from './RadioButton';

export default class RadioGroup extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    handleRadioClicked = () => {

    }

    render() {
        return (
            <View>
                {
                    this.props.data.map((name, index) => {
                        return <RadioButton name={name} key={index} id={index} onClick={this.handleRadioClicked} />
                    })
                }
            </View>
        );
    }
}

var styles = StyleSheet.create({

    animatedView: {
        position: "absolute",
        bottom: 0,
        left: 0,
        backgroundColor: "#00ff00",
        height: Dimensions.get("window").height - 55,
        width: Dimensions.get("window").width / 2
    }
});
