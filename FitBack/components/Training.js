import { Camera, CameraType } from "expo-camera";
import * as React from "react";
import {
  StyleSheet,
  Button,
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  Modal,
  Dimensions,
} from "react-native";
import { useEffect, useState } from "react";
import { colors, styles } from "../styles.js";
import { MontSerratText } from "./Utility";
import * as Progress from "react-native-progress";
import { Video, AVPlaybackStatus } from "expo-av";
import { useNavigation } from "@react-navigation/native";

function FrameYourself() {
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [frameFinished, setFrameFinished] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const navigation = useNavigation();

  useEffect(() => {
    //simulates the fact that the user has framed his self inside the rectancle
    setTimeout(exitFromThisScreen, 10000);
  },[]);

  if (!permission) {
    // Camera permissions are still loading
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: "center" }}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  function toggleCameraType() {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  }

  function exitFromThisScreen() {
    setFrameFinished(true);

    //wait 1 second to let the green screen be visible than change screen
    setTimeout(() => {
      navigation.navigate("ExecuteExercise", {type:type});
    }, 1000);
  
  }

  return (
    <View style={styles.container3}>
      <Camera style={styles.camera} type={type}>
        <View style={{ flex: 1 }}>
          {frameFinished ? (
            <View style={styles.externalRectangleFrameGreen}>
              <View style={styles.rectangleFrameYourSelfTitle}>
                <MontSerratText
                  style={styles.textFrameYouself}
                  text={"Ready to start!"}
                />
              </View>
              <ModalSafeExit
                modalVisible={modalVisible}
                navigation={navigation}
                setModalVisible={setModalVisible}
              />
            </View>
          ) : (
            <View style={styles.externalRectangleFrameRed}>
              <View style={styles.rectangleFrameYourSelfTitle}>
                <MontSerratText
                  style={styles.textFrameYouself}
                  text={"Frame yourself in the camera"}
                />
              </View>
              <ModalSafeExit
                modalVisible={modalVisible}
                navigation={navigation}
                setModalVisible={setModalVisible}
              />
            </View>
          )}

          <View style={styles.bottomView}>
            <View style={styles.horizontalFlex}>
              <MyButton
                style={[styles.exitButton]}
                title="Exit"
                onPress={() => setModalVisible(true)}
              ></MyButton>
              <MyButton
                style={[styles.reverseButton]}
                title="Reverse camera"
                onPress={toggleCameraType}
              ></MyButton>
            </View>
          </View>
        </View>
      </Camera>
    </View>
  );
}

function ExecuteExercise(props) {
  const [reps, setReps] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  let   [permission, requestPermission] = Camera.useCameraPermissions();
  const [intervalId, setIntervalId] = useState(0);

  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;

  const totalReps = 15; //fake! use props
  const navigation = useNavigation();
  const video = React.useRef(null);

  useEffect(() => {
    const myinterval= setInterval(updateReps, 3000);
    setIntervalId(myinterval)

    let r =0; 

    function updateReps() {
      r = r+1;
      if (r === totalReps)
      { 
        console.log('dentro')
        props.navigation.navigate("ReportSession")
        clearInterval(intervalId)
      }
       else
      setReps((current) => (current < totalReps ? current + 1 : current));
    }

  }, []);

  if (!permission) {
    // Camera permissions are still loading
    return <View style={{margin:100}}>
    </View>;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: "center" }}>
          We need your permission to show the  camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }


  function toggleCameraType() {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  }

  return (
    <View style={[styles.container3]}>
      <Camera
        style={{ flex: 1, width: windowWidth, height: windowHeight}}
        type={CameraType.front}
      >
        <View style={{ flex: 1 }}>
          <View style={styles.horizontalFlex}>
            <View style={styles.rectangleExerciseTitle}>
              <MontSerratText
                style={styles.textFrameYouself}
                text={"fake Title.."}
              />
            </View>
            <View>
              <Video
                ref={video}
                source={require("../assets/video/SquatTutorial.mp4")}
                style={{ width: 150, height: 100 }}
                resizeMode="contain"
                shouldPlay={true}
                isLooping={true}
                isMuted={true}
              ></Video>
            </View>
          </View>
          <View style={{ alignItems: "center" }}>
            <FlipCameraButton onPress={toggleCameraType} />
          </View>

          <View style={[{ margin:40, flexDirection: "row", justifyContent:'space-between', marginTop:350}]}>
            <View style={{flexDirection:'row'}}>
            <MontSerratText text={'Reps='} style={{fontSize: 25, fontWeight:'bold'}}></MontSerratText>
            <MontSerratText text={reps+"/"+totalReps} style={{fontSize: 25}}></MontSerratText>
            </View>
            <View style={{flexDirection:'row'}}>
            <MontSerratText text={"Sets="} style={{fontSize: 25, fontWeight:'bold'}}></MontSerratText>
            <MontSerratText text={"1"+"/"+"3"} style={{fontSize: 25}}></MontSerratText>
            </View>
          </View>

          <ModalSafeExit
            modalVisible={modalVisible}
            navigation={navigation}
            setModalVisible={setModalVisible}
          />

          <View style={styles.bottomView2}>
            <View style={styles.horizontalFlex}>
              <MyButton style={[styles.exitButton]} title="Exit" onPress={()=>setModalVisible(true)}></MyButton>
              <PauseButton style={[styles.pauseButton]} onPress={()=>  props.navigation.navigate("PauseExercise", {reps:reps})} />
            </View>

            <View style={{ flex: 1, marginTop: 10, alignItems: "center" }}>
              <Progress.Bar
                progress={reps / totalReps}
                color={colors.red}
                borderRadius={0}
                width={windowWidth}
              />
            </View>
          </View>
        </View>
      </Camera>
    </View>
  );
}


function ExercisePaused(props) {
  const [reps, setReps] = useState(props.route.params.reps);
  const [modalVisible, setModalVisible] = useState(false);

  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;

  const totalReps = 15; //fake! use props

  return (
    <View style={[styles.container3]}>
      <ImageBackground source={require("../assets/images/sfondo_pause.png")}  style={{flex:1 }} blurRadius={10}>
        <View style={{ flex: 1 }}>
          <View style={styles.horizontalFlex}>
            <View style={styles.rectangleExerciseTitle}>
              <MontSerratText
                style={styles.textFrameYouself}
                text={"fake Title.."}
              />
            </View>
          </View>

          <View style={{ alignItems: "center", marginTop:100 }}>
            <PlayButton onPress={()=> props.navigation.navigate('ExecuteExercise')}/>
          </View>

          <View style={[{ margin:40, flexDirection: "row", justifyContent:'space-between', marginTop:150}]}>
            <View style={{flexDirection:'row'}}>
            <MontSerratText text={"Reps: "} style={{fontSize: 25, fontWeight:'bold'}}></MontSerratText>
            <MontSerratText text={reps+"/"+totalReps} style={{fontSize: 25}}></MontSerratText>
            </View>
            <View style={{flexDirection:'row'}}>
            <MontSerratText text={"Sets: "} style={{fontSize: 25, fontWeight:'bold'}}></MontSerratText>
            <MontSerratText text={"1/3"} style={{fontSize: 25}}></MontSerratText>
            </View>
          </View>

          <ModalSafeExit
            modalVisible={modalVisible}
            navigation={props.navigation}
            setModalVisible={setModalVisible}
          />

          <View style={styles.bottomView2}>
            <View style={styles.horizontalFlex}>
              <MyButton style={[styles.exitButton]} title="Exit" onPress={()=>setModalVisible(true)}></MyButton>
            </View>

            <View style={{ flex: 1, marginTop: 10, alignItems: "center" }}>
              <Progress.Bar
                progress={reps / totalReps}
                color={colors.red}
                borderRadius={0}
                width={windowWidth}
              />
            </View>
          </View>
        </View>
      </ImageBackground>
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

function PauseButton(props) {
  return (
    <View>
      <TouchableOpacity style={props.style} onPress={props.onPress}>
        <Image
          source={require("../assets/images/pause.png")}
          style={{ width: 70, height: 70 }}
        />
      </TouchableOpacity>
    </View>
  );
}

function PlayButton(props) {
  return (
    <View>
      <TouchableOpacity style={props.style} onPress={props.onPress}>
        <Image
          source={ require("../assets/images/play.png")}
          style={{ width: 150, height: 150 }}
        />
      </TouchableOpacity>
    </View>
  );
}

function FlipCameraButton(props) {
  return (
    <View>
      <TouchableOpacity style={props.style} onPress={props.onPress}>
        <Image
          source={require("../assets/images/reverse_Camera.png")}
          style={{ width: 35, height: 35 }}
        />
      </TouchableOpacity>
    </View>
  );
}

function ModalSafeExit(props) {
  return (
    <Modal visible={props.modalVisible} animationType="none" transparent={true}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <MontSerratText
            style={pageStyles.whatAreReviewsText}
            text={"Are you sure you want to exit? You will lose progress"}
          ></MontSerratText>
          <View style={styles.horizontalFlex}>
            <MyButton
              style={pageStyles.turnHomeButton}
              title={"Continue training"}
              onPress={() => props.setModalVisible(false)}
            ></MyButton>
            <MyButton
              style={pageStyles.turnHomeButton}
              title={"Exit"}
              onPress={() => {props.setModalVisible(false);
                              props.navigation.navigate('Homepage')}}
            ></MyButton>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const pageStyles = StyleSheet.create({
  turnHomeButton: {
    backgroundColor: colors.red,
    marginTop: 10,
    width: 100,
    height: 60,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  whatAreReviewsText: {
    fontSize: 18,
  },
});

export { FrameYourself, ExecuteExercise, ExercisePaused };