import { Camera, CameraType } from 'expo-camera';
import { useState } from 'react';
import {
    StyleSheet, Button,
    SafeAreaView,
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    ImageBackground,
} from 'react-native';
import { Switch } from 'react-native-switch';
import { React, useEffect } from "react";
import { colors, styles } from "../styles.js";
import { MontSerratText } from "../App.js";
import { color } from '@rneui/base';


function TutorialFrame() {
    const [type, setType] = useState(CameraType.back);
    const [permission, requestPermission] = Camera.useCameraPermissions();
    const [isAR, setAR] = useState(true)


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

    function switchAR() {
        setAR(current => (current === true ? false : true));
    }

    function exitFromThisScreen() {
        //add logic to change screen

        //wait 1 second to let the green screen be visible than change screen
    }

    return (
        <View style={styles.container3}>

            {


                isAR ?

                    <Camera style={styles.camera} type={type}>
                        <View style={{ flex: 1 }}>
                            <View style={styles.rectangleFrameYourSelfTitle}>
                                <MontSerratText style={styles.textFrameYouself} text={"Rotate to see whole body"} />
                            </View>
                            <ImageBackground
                                source={require("../assets/tutorial_gif.gif")}
                                resizeMode="contain"
                                style={{ flex: 3 }}
                            ></ImageBackground>
                            <View style={styles.bottomView}>
                                <View style={styles.horizontalFlex}>
                                    <MyButton style={[styles.exitButton]} title="Exit" ></MyButton>
                                    <View style={styles.switchButton}>
                                        <Switch
                                            value={isAR}
                                            onValueChange={switchAR}
                                            activeText={'AR'}
                                            inActiveText={'OBJ'}
                                            backgroundActive={'green'}
                                            backgroundInactive={'gray'}
                                            circleActiveColor={'#30a566'}
                                            circleInActiveColor={'#000000'} />
                                    </View>
                                </View>
                            </View>
                        </View>
                    </Camera>
                    :
                    <View style={{ flex: 1 }}>
                        <View style={styles.rectangleRotateToSee}>
                            <MontSerratText style={styles.textRotateToSee} text={"Rotate to see whole body"} />
                        </View>
                        <ImageBackground
                            source={require("../assets/tutorial_gif.gif")}
                            resizeMode="contain"
                            style={{ flex: 3 }}
                        ></ImageBackground>
                        <View style={styles.bottomView}>
                            <View style={styles.horizontalFlex}>
                                <MyButton style={[styles.exitButton]} title="Exit" ></MyButton>
                                <View style={styles.switchButton}>
                                <Switch
                                            value={isAR}
                                            onValueChange={switchAR}
                                            activeText={'AR'}
                                            inActiveText={'OBJ'}
                                            backgroundActive={'green'}
                                            backgroundInactive={'gray'}
                                            circleActiveColor={'#30a566'}
                                            circleInActiveColor={'#000000'} />
                                </View>
                            </View>
                        </View>
                    </View>

            }
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




export { TutorialFrame }