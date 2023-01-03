import React, { useState } from "react";
import {
  Button,
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
} from "react-native";
import { colors, styles } from "../styles.js";
import { MontSerratText } from "../App.js";
import { LinearGradient } from "expo-linear-gradient";

function FrameYourself() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ImageBackground
        source={require("../assets/background-training.png")}
        resizeMode="cover"
        style={{ flex: 1 }}
      >
        <View style={{flex:1}}>
          <View style={styles.externalRectangleFrame}>
          <View style={styles.rectangleFrameYourSelfTitle}>
            <MontSerratText
              style={{
                margin: 10,
                color: colors.white,
                fontSize: 20,
                fontWeight: "bold",
                textAlign: "center",
              }}
              text={"Frame yourself in the camera!"}
            />
          </View>
          <View style={styles.containerMain}>
            <Text> Main Content Here</Text>
          </View>
        </View>

        <View style={styles.bottomView}>
              <View style={styles.horizontalFlex}>
                <MyButton style={[styles.exitButton]} title="Exit"></MyButton>
              </View>
            </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

function MyButton(props) {
  return (
    <View>
      <TouchableOpacity style={props.style}>
        <MontSerratText
          style={styles.buttonText}
          color={colors.white}
          text={props.title}
        ></MontSerratText>
      </TouchableOpacity>
    </View>
  );
}

export { FrameYourself };
