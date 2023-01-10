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
import {
    Scene,
    Mesh,
    MeshBasicMaterial,
    PerspectiveCamera,
    BoxBufferGeometry,
} from "three";
import ExpoTHREE, { Renderer } from "expo-three";
import { ExpoWebGLRenderingContext, GLView } from "expo-gl";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';




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
                            <GLView
                                await onContextCreate={onContextCreate}
                                // set height and width of GLView
                                style={{ width: 400, height: 400 }}
                            />
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
                        <GLView
                            await onContextCreate={onContextCreate}
                            // set height and width of GLView
                            style={{ width: 400, height: 400 }}
                        />
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


const onContextCreate = async (gl) => {
    // three.js implementation.
    const scene = new Scene();
    const camera = new PerspectiveCamera(
        75,
        gl.drawingBufferWidth / gl.drawingBufferHeight,
        0.1,
        1000
    );
    gl.canvas = {
        width: gl.drawingBufferWidth,
        height: gl.drawingBufferHeight,
    };

    // set camera position away from cube
    camera.position.z = 2;

    const renderer = new Renderer({ gl });
    // set size of buffer to be equal to drawing buffer width
    renderer.setSize(gl.drawingBufferWidth, gl.drawingBufferHeight);

    // create cube
    // define geometry
    const geometry = new BoxBufferGeometry(1, 1, 1);
    const material = new MeshBasicMaterial({
        color: "cyan",
    });

    const cube = new Mesh(geometry, material);

    // add cube to scene
    scene.add(cube);


    const fbxLoader = new FBXLoader()
    fbxLoader.load(
        '../assets/girl.fbx',
        (object) => {
            // object.traverse(function (child) {
            //     if ((child as THREE.Mesh).isMesh) {
            //         // (child as THREE.Mesh).material = material
            //         if ((child as THREE.Mesh).material) {
            //             ((child as THREE.Mesh).material as THREE.MeshBasicMaterial).transparent = false
            //         }
            //     }
            // })
             object.scale.set(.01, .01, .01)
            scene.add(object)
        },
        (xhr) => {
            console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
        },
        (error) => {
            console.log(error)
        }
    )
    /*
              const loader = new GLTFLoader();
            loader.load(
              "../assets/scene.gltf",
              (gltf) => {
                scene.add(gltf);
              },
              (xhr) => {
                console.log(`${(xhr.loaded / xhr.total) * 100}% loaded`);
              },
              (error) => {
                console.error("An error happened", error);
              });
        
    
              const obj = await ExpoTHREE.loadAsync(
                [require('../assets/dinosaur.glb')],
                null,
                imageName => resources[imageName]
              );
    
                      */


    // create render function
    const render = () => {
        requestAnimationFrame(render);
        // create rotate functionality
        // rotate around x axis
        cube.rotation.x += 0.01;

        // rotate around y axis
        cube.rotation.y += 0.01;

        renderer.render(scene, camera);
        gl.endFrameEXP();
    };

    // call render
    render();
};







export { TutorialFrame }