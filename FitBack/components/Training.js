import { Camera, CameraType } from 'expo-camera';
import { useState } from 'react';
import {StyleSheet,   Button,
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ImageBackground, } from 'react-native';
import {React, useEffect} from "react";
import { colors, styles } from "../styles.js";
import { MontSerratText } from "../App.js";


function FrameYourself() {
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [frameFinished, setFrameFinished] = useState(false)

  
  useEffect(() => {
    //simulates the fact that the user has framed his self inside the rectancle
    setTimeout(exitFromThisScreen, 10000);
  }), [];

  if (!permission) {
    // Camera permissions are still loading
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center' }}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  function toggleCameraType() {
    setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
  }

  function exitFromThisScreen(){
    setFrameFinished(true)
    //add logic to change screen

    //wait 1 second to let the green screen be visible than change screen
  }

  return (
    <View style={styles.container3}>
      <Camera style={styles.camera} type={type}>
        <View style={{ flex: 1 }}>
          {
            frameFinished?
            <View style={styles.externalRectangleFrameGreen} >
              <View style={styles.rectangleFrameYourSelfTitle}>
                <MontSerratText style={styles.textFrameYouself} text={"Frame yourself in the camera!"}/>
              </View>
            </View>
            :
            <View style={styles.externalRectangleFrameRed} >
              <View style={styles.rectangleFrameYourSelfTitle}>
                <MontSerratText style={styles.textFrameYouself} text={"Frame yourself in the camera!"}/>
              </View>
            </View>
        }
            
            <View style={styles.bottomView}>
              <View style={styles.horizontalFlex}>
                <MyButton style={[styles.exitButton]} title="Exit" ></MyButton>
                <MyButton style={[styles.reverseButton]} title="Reverse camera" onPress={toggleCameraType}></MyButton>
              </View>
            </View>
          </View>
      </Camera>
    </View>
  );
}

function MyButton(props) {
  return (
    <View>
      <TouchableOpacity style={props.style} onPress={props.onPress}>
        <MontSerratText
          style={styles.buttonText}
          color={colors.white}
          text={props.title}
        ></MontSerratText>
      </TouchableOpacity>
    </View>
  );
}


export {FrameYourself}