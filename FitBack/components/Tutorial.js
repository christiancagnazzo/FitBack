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
import { MontSerratText } from "../components/Utility.js";
import {
    Scene,
    Mesh,
    MeshBasicMaterial,
    PerspectiveCamera,
    BoxBufferGeometry,
    BoxGeometry,
    Math
} from "three";
import ExpoTHREE, { Renderer, loadAsync } from "expo-three";
import { useNavigation } from "@react-navigation/native";
import { ExpoWebGLRenderingContext, GLView } from "expo-gl";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { Canvas } from "@react-three/fiber";
import { useLoader } from "@react-three/fiber";
import { Asset } from 'expo-asset';


function TutorialFrame(props) {
    const [type, setType] = useState(CameraType.back);
    const [permission, requestPermission] = Camera.useCameraPermissions();
    const [isAR, setAR] = useState(true)

   

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
    const navigation = useNavigation();

    return (
        <View style={styles.container3}>

            {


                isAR ?

                    <Camera style={styles.camera} type={type}>
                        <View style={{ flex: 1 }}>
                            <View style={styles.rectangleRotateToSee1}>
                                <MontSerratText style={styles.textFrameYouself} text={"Rotate to see whole body"} />
                            </View>
                            <GLView
                                onContextCreate={onContextCreate}
                                style={{ width: 400, height: 400 }}
                            />
                            <View style={styles.bottomView}>
                                <View style={styles.horizontalFlex}>
                                    <MyButton style={[styles.exitButton]} title="Exit" navigation={navigation} onPressAction={() => navigation.navigate("ExerciseDetails", { text: props.text })}></MyButton>
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
                            onContextCreate={onContextCreate}
                            style={{ width: 400, height: 400 }}
                        />
                        <View style={styles.bottomView}>
                            <View style={styles.horizontalFlex}>
                                <MyButton style={[styles.exitButton]} title="Exit" navigation={navigation} onPressAction={() => navigation.navigate("ExerciseDetails", { text: props.text })}></MyButton>
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
            <TouchableOpacity style={props.style} onPress={props.onPressAction}>
                <MontSerratText style={styles.buttonText} color={colors.white} text={props.title}></MontSerratText>
            </TouchableOpacity>
        </View>

    )
}



const Model = async () => {
    const asset = Asset.fromModule(require('../assets/mbappe/source/mbappe/mbappe.obj'));
    //const asset = Asset.fromModule(require('../assets/girl.fbx'));

    await asset.downloadAsync();

    // This is the local URI
    const uri = asset.localUri;
    const obj = useLoader(OBJLoader, uri);

    return <primitive object={obj} scale={0.005} />;
};

function degToRad(deg){
    return deg * (3.1423 / 180);
}



const onContextCreate = async (gl) => {
    // three.js implementation.
    const scene = new THREE.Scene();


    const camera = new PerspectiveCamera(
        75,
        gl.drawingBufferWidth / gl.drawingBufferHeight,
        1,
        1000
    );


    camera.position.set(0, 0,0 );

    camera.lookAt(0, 0, 0);

    scene.add(new THREE.AmbientLight(0xffffff));

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
    const geometry = new BoxGeometry(1, 1, 1);
    const material = new MeshBasicMaterial({
        color: "cyan",
    });

    const cube = new Mesh(geometry, material);

    // add cube to scene
    scene.add(cube);

    //camera.lookAt(cube.position);

    /*
        // Load and add an obj model
        const model = {
            '3d.obj': 'https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/models/obj/walt/WaltHead.obj',
            '3d.mtl': 'https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/models/obj/walt/WaltHead.mtl'
          };
  
          const object = await loadAsync([model['3d.obj'], model['3d.mtl']], null, name => model[name]);
  
          object.position.y += 0;
          object.position.z -= -0;
          object.scale.set(.02, .02, .02);
  
          scene.add(object);
*/
    /*
        const fbxLoader = new FBXLoader()
        fbxLoader.load(
            '../assets/girl.fbx',
            (object) => {
               
                const geometry= new BufferGeometry(object.children.BufferGeometry);
                const material = new MeshBasicMaterial({
                    color: "red",
                });
    
                const girl = new Mesh(geometry, material);
    
    
                scene.add(girl)
            },
            (xhr) => {
                console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
            },
            (error) => {
                console.log(error)
            }
        )*/


    /*
            const loader = new GLTFLoader();
          loader.load(
            "../assets/dinosaur.glb",
            (gltf) => {
              scene.add(gltf);
            },
            (xhr) => {
              console.log(`${(xhr.loaded / xhr.total) * 100}% loaded`);
            },
            (error) => {
              console.error("An error happened", error);
            });
      */

    /*
 
          const obj = await ExpoTHREE.loadAsync(
            require('../assets/mbappe3d/source/mbappe.obj'),
            null,
            imageName => "pippo"
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



/*

//ON CONTEXT CREATE FOR OBJ FILE, PROBLEM WITH THREE.Math.degToRad(degreeX)
const onContextCreate = async (gl) => {
    // three.js implementation.
    const { drawingBufferWidth: width, drawingBufferHeight: height } = gl;
        const sceneColor = 668096;

        // Create a WebGLRenderer without a DOM element
        const renderer = new Renderer({ gl });
        renderer.setSize(width, height);
        renderer.setClearColor(0x668096);

        const camera = new PerspectiveCamera(70, width / height, 0.01, 1000);
        camera.position.set(2, 5, 5);

        const scene = new Scene();

    
        const asset = Asset.fromModule(require("../assets/mbappe/source/mbappe/mbappe.obj"));
        await asset.downloadAsync();

        // instantiate a loader
        const loader = new OBJLoader();

        // load a resource
        loader.load(
            // resource URL
            asset.localUri,
            // called when resource is loaded
            function ( object ) {
                object.scale.set(0.065, 0.065, 0.065)
                scene.add( object );
                camera.lookAt(object.position)
            //rotate my obj file
                function rotateObject(object, degreeX=0, degreeY=0, degreeZ=0) {
                    object.rotateX( degToRad(degreeX));
                    object.rotateY(degToRad(degreeY));
                    object.rotateZ(degToRad(degreeZ));
                 }
                 
                 // usage:
                 rotateObject(object, 0, 0, 70);

                //animate rotation
                function update() {
                    object.rotation.x += 0.015
                }
                const render = () => {
                   timeout = requestAnimationFrame(render);
                    update();
                    renderer.render(scene, camera);
                    gl.endFrameEXP();
                  };
                render();
            },
           
            // called when loading is in progresses
            function ( xhr ) {

                console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

            },
            // called when loading has errors
            function ( error ) {

                console.log( error );

            }
        
        );   
      
};

*/


/*
// When the phone rotates, or the view changes size, this method will be called.
onResize = ({ x, y, scale, width, height }) => {
    // Let's stop the function if we haven't setup our scene yet
    if (!this.renderer) {
        return;
    }
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setPixelRatio(scale);
    this.renderer.setSize(width, height);
};

// Called every frame.
onRender = delta => {


    // Finally render the scene with the Camera
    renderer.render(scene, camera);
};




*/


export { TutorialFrame }