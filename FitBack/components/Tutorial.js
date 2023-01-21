import { Camera, CameraType } from 'expo-camera';
import { useState } from 'react';
import {
    StyleSheet, Button,
    View,
    Text,
    TouchableOpacity,
} from 'react-native';
import * as React from 'react';
import { colors, styles } from "../styles.js";
import { MontSerratText } from "../components/Utility.js";

import { useNavigation } from "@react-navigation/native";
import { WebView } from 'react-native-webview';

//import ha from 'https://raw.githubusercontent.com/Lorediel/prova_ar/main/mbappe.obj'

function TutorialFrame(props) {
    const [type, setType] = useState(CameraType.back);
    const [permission, requestPermission] = Camera.useCameraPermissions();
    const exercise = props.route.params.exercise
    
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

    function exitFromThisScreen() {
        //add logic to change screen

        //wait 1 second to let the green screen be visible than change screen
    }
    const navigation = useNavigation();


    return (
        <View style={styles.container3}>
            <View style={{
                marginTop: 32,
                marginBottom: 10,
                marginLeft: 20,
                marginRight: 20,
                alignItems: "center",
                borderWidth: 3,
                borderColor: colors.black,
                borderRadius: 10
            }}>
                <MontSerratText style={styles.textRotateToSee} text={"Move around the personal trainer to see whole body"} />
            </View>
            <WebView
                style={{ marginBottom: 80 }}
                allowsInlineMediaPlayback
                source={{ uri: 'https://mywebar.com/p/Project_0_oli5sfzewq' }}
                //source={{ uri: 'https://reactnative.dev/docs/0.63/webview' }}
            >
            </WebView>
            <View style={styles.bottomView}>
                <View style={styles.horizontalFlex}>
                    <MyButton style={[styles.exitButton]} title="Exit" navigation={navigation} onPressAction={() => navigation.navigate("ExerciseDetails", { exercise: exercise })}></MyButton>
                    <View style={{
                        marginTop: 32,
                        marginBottom: 10,
                        alignItems: "center",
                    }}>
                        <MontSerratText style={{
                            margin: 0,
                            color: colors.black,
                            fontSize: 18,
                            fontWeight: "bold",
                            textAlign: "center",
                            marginRight:50
                        }} text={"Squat AR tutorial"} />
                    </View>
                </View>

            </View>
        </View>
    );
}

function MyButton(props) {
    return (
        <View>
            <TouchableOpacity style={props.style} onPress={props.onPressAction}>
                <MontSerratText style={styles.buttonText} color={colors.white} text={props.title}></MontSerratText>
            </TouchableOpacity>
        </View>

    )
}


export { TutorialFrame }