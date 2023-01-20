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
import { Video, AVPlaybackStatus, Audio } from "expo-av";
import { useNavigation } from "@react-navigation/native";

function FrameYourself(props) {
  const [type, setType] = useState(CameraType.front);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [frameFinished, setFrameFinished] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const navigation = useNavigation();

  useEffect(() => {
    //simulates the fact that the user has framed his self inside the rectancle
    setTimeout(exitFromThisScreen, 3000);
  }, []);


  if (!permission) {
    // Camera permissions are still loading
    return <View />
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


  function exitFromThisScreen() {
    setFrameFinished(true);

    //wait 1 second to let the green screen be visible than change screen
    setTimeout(() => {
      navigation.navigate("ExecuteExercise", { title: 'Lift Left Arm' });
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
  let [permission, requestPermission] = Camera.useCameraPermissions();
  const [title, setTitle] = useState(props.route.params.title)
  const [type, setType] = useState(CameraType.front);

  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;

  const totalReps = 7;
  const navigation = useNavigation();
  const video = React.useRef(null);
  const [sound, setSound] = React.useState();

  useEffect(() => {
    return sound
      ? () => {
          console.log('Unloading Sound');
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  useEffect(() => {

    const myinterval = setInterval(updateReps, 1000);
    console.log(myinterval)

    let r = 0;
    let title2 = title;

    function updateReps() {
      r = r + 1;
      if (r === totalReps) {
        r = 0;
        console.log(title2)
        switch (title2) {
          case 'Lift Left Arm':
            setTitle('Squat')
            title2 = 'Squat'
            setReps(0)
            break
          case 'Squat':
            console.log('dentro case squat')
            console.log(myinterval)
            clearInterval(myinterval)
            updateDbEndSession()
            props.navigation.navigate("ReportSession")
            break
        }

      }
      else
        setReps((current) => (current < totalReps ? current + 1 : current));
    }

  }, []);

  async function playSound() {
    const { sound } = await Audio.Sound.createAsync( require('../assets/correction.mp3')
    );
    setSound(sound);

    await sound.playAsync();
  }

  if (reps === 3 && title === 'Squat')
    playSound()

  function updateDbEndSession() {

    sql = "UPDATE users SET sessiondone=1"
    props.route.params.db.transaction((tx) => {
      tx.executeSql(
        sql,
        [],
        (_, result) => { console.log(result) },
        (_, error) => console.log(error)
      );
    })

  }

  function toggleCameraType() {
    console.log('cambio tipo')
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  }


  if (!permission) {
    // Camera permissions are still loading
    return <View style={{ margin: 100 }}>
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


  return (
    <View style={[styles.container3]}>
      <Camera
        style={{ flex: 1, width: windowWidth, height: windowHeight }}
        type={type}
      >
        <View style={{ flex: 1 }}>
          <View style={styles.horizontalFlex}>
            <View style={styles.rectangleExerciseTitle}>
              <MontSerratText
                style={styles.textFrameYouself}
                text={title}
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
          <View>
            {
              title === 'Squat' && reps > 2 && reps < 7 ? <Image style={{ width: 150, height: 150, marginTop: 80, marginLeft: 0, marginRight: 200 }} source={require("../assets/giphy.gif")} ></Image> : null
            }
          </View>
          <View style={[{ marginLeft: 80, flexDirection: "row", justifyContent: 'space-between', marginTop: 700, zIndex: 1, position: 'absolute', backgroundColor: 'black', borderRadius: 10, padding: 10 }]}>
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ color:'white', fontSize: 25, fontWeight: 'bold' }}> {"Reps="} </Text>
              <Text style={{ color:'white', fontSize: 25 }}> {reps + "/" + totalReps}</Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ color:'white', fontSize: 25, fontWeight: 'bold' }}> {"Sets="} </Text>
              <Text style={{ color:'white', fontSize: 25 }}> {"1/1"}</Text>
            </View>
          </View>

          <ModalSafeExit
            modalVisible={modalVisible}
            navigation={navigation}
            setModalVisible={setModalVisible}
          />

          <View style={styles.bottomView2}>
            <View style={styles.horizontalFlex}>
              <MyButton style={[styles.exitButton]} title="Exit" onPress={() => setModalVisible(true)}></MyButton>
              <PauseButton style={[styles.pauseButton]} onPress={() => props.navigation.navigate("PauseExercise", { reps: reps, title: title })} />
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

  const totalReps = 7; //fake! use props

  return (
    <View style={[styles.container3]}>
      <ImageBackground source={require("../assets/images/sfondo_pause.png")} style={{ flex: 1 }} blurRadius={10}>
        <View style={{ flex: 1 }}>
          <View style={styles.horizontalFlex}>
            <View style={styles.rectangleExerciseTitle}>
              <MontSerratText
                style={styles.textFrameYouself}
                text={props.route.params.title}
              />
            </View>
          </View>

          <View style={{ alignItems: "center", marginTop: 100 }}>
            <PlayButton onPress={() => props.navigation.navigate('ExecuteExercise', { title: props.route.params.title })} />
          </View>

          <View style={[{ margin: 40, flexDirection: "row", justifyContent: 'space-between', marginTop: 150 }]}>
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ fontSize: 25, fontWeight: 'bold' }}> Reps= </Text>
              <Text style={{ fontSize: 25 }}> {reps + "/" + totalReps}</Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ fontSize: 25, fontWeight: 'bold' }}>Sets= </Text>
              <Text style={{ fontSize: 25 }}> {"1/1"}</Text>
            </View>
          </View>

          <ModalSafeExit
            modalVisible={modalVisible}
            navigation={props.navigation}
            setModalVisible={setModalVisible}
          />

          <View style={styles.bottomView2}>
            <View style={styles.horizontalFlex}>
              <MyButton style={[styles.exitButton]} title="Exit" onPress={() => setModalVisible(true)}></MyButton>
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
          source={require("../assets/images/play.png")}
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
              onPress={() => {
                props.setModalVisible(false);
                props.navigation.navigate('Homepage')
              }}
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