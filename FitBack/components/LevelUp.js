import { View, Text, Image, TouchableWithoutFeedback } from 'react-native';
import { React, Component } from "react";
import { colors } from "../styles.js";


class Touchables extends Component {
    _onPressButton() {
        alert('You tapped the button!')
    }
}

function LevelUp() {
    return (
        <TouchableWithoutFeedback onPress={()=>console.log("cambia schermata")}>
            <View>
                <Text style={{ fontSize: 80, margin: 40, textAlign: "center", fontWeight: "bold", fontFamily: "BebasNeue" }}>LEVEL UP!</Text>
                <View style={{ justifyContent: 'center', alignItems: 'center', fontFamily: "BebasNeue" }}>
                    <Image style={{ height: 350, width: 300 }} source={require("../assets/level-up.png")}></Image>
                    <Text style={{ fontSize: 35, marginTop: 40, textAlign: "center", fontWeight: "bold", fontFamily: "BebasNeue" }}>CONGRATULATIONS!</Text>
                    <View style={{ flexDirection: 'row', margin: 3 }}>
                        <Text style={{ fontSize: 35, textAlign: "center", fontFamily: "BebasNeue" }}>You’re now</Text>
                        <Text style={{ fontSize: 35, textAlign: "center", fontWeight: "bold", color: colors.red, fontFamily: "BebasNeue" }}> intermediate </Text>
                        <Text style={{ fontSize: 35, textAlign: "center", fontFamily: "BebasNeue" }}>level</Text>
                    </View>
                    <Text style={{ fontSize: 27, textAlign: "center", fontFamily: "BebasNeue" }}>New exciting exercises are waiting for you!</Text>
                </View>
                <Text style={{ fontSize: 15, textAlign: "center", marginTop: 70 }}>Click anywhere on the screen to continue</Text>
            </View>
        </TouchableWithoutFeedback>
    )
}

export default LevelUp;