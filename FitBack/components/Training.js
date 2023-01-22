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
import { Ionicons } from "@expo/vector-icons";
import { colors, styles } from "../styles.js";
import { MontSerratText } from "./Utility";
import * as Progress from "react-native-progress";
import { Video, AVPlaybackStatus, Audio } from "expo-av";
import { useNavigation } from "@react-navigation/native";
import { usePlatformProps } from "native-base";

function FrameYourself(props) {
  const [type, setType] = useState(CameraType.front);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [frameFinished, setFrameFinished] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [myTimeout, setMyTimeout] = useState(0)
  const navigation = useNavigation();

  useEffect(() => {
    //simulates the fact that the user has framed his self inside the rectancle
    const myTimeout2 = setTimeout(exitFromThisScreen, 6000);
    setMyTimeout(myTimeout2)
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
      if (props.route.params.singleExercise) {
        navigation.navigate("ExecuteSingleExercise", { exercise: props.route.params.exercise })
      } else {
        navigation.navigate("ExecuteExercise", { title: 'Lift Left Arm' });
      }
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

            </View>
          ) : (
            <>
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
                  myTimeout={myTimeout}
                />

              </View>

              <View style={styles.bottomView}>
                <View style={styles.horizontalFlex}>
                  <MyButton
                    style={[styles.exitButton]}
                    title="Exit"
                    onPress={() => setModalVisible(true)}
                  ></MyButton>

                </View>
              </View>
            </>
          )}


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
  const [myInterval, setMyInterval] = useState(0)
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;
  const [nextExercise, setNextExercise] = useState(true);

  const totalReps = 7;
  const navigation = useNavigation();
  const video = React.useRef(null);
  const [sound, setSound] = React.useState();

  useEffect(() => {
    return sound
      ? () => {
        sound.unloadAsync();
      }
      : undefined;
  }, [sound]);

  useEffect(() => {

    const myinterval = setInterval(updateReps, 1000);
    setMyInterval(myinterval)

    let r = 0;
    let title2 = title;

    function updateReps() {
      r = r + 1;
      if (r === totalReps) {
        r = 0;
        switch (title2) {
          case 'Lift Left Arm':
            setTitle('Squat')
            title2 = 'Squat'
            setReps(0)
            clearInterval(myinterval)
            setNextExercise(false)
            break
        }
      }
      else
        setReps((current) => (current < totalReps ? current + 1 : current));

    }

  }, []);

  async function playSound() {
    const { sound } = await Audio.Sound.createAsync(require('../assets/correction.mp3')
    );
    setSound(sound);

    await sound.playAsync();
  }

  if (reps === 3 && title === 'Squat')
    playSound()

  function updateDbEndSession() {
    props.route.params.db.transaction((tx) => {
      tx.executeSql(
        "UPDATE users SET sessiondone=1",
        [],
        (_, result) => { console.log(result) },
        (_, error) => console.log(error)
      );

      tx.executeSql(
        "INSERT OR IGNORE INTO userExercise VALUES (1,4,1,50)",
        [],
        (_, result) => { console.log(result) },
        (_, error) => console.log(error)
      );
      tx.executeSql(
        "INSERT OR IGNORE INTO userExercise VALUES (2,1,1,50)",
        [],
        (_, result) => { console.log(result) },
        (_, error) => console.log(error)
      );
      tx.executeSql(
        "INSERT OR IGNORE INTO reviews (exercise, title, date, message, user, pathvideo, paththumbnail ) VALUES (2, 'squatError', '2023-30-01', 'Your back was not aligned', 1, '../assets/video/Squat_review', '../assets/video/thumbnail')",
        [],
        (_, result) => { console.log(result) },
        (_, error) => console.log(error)
      );
      tx.executeSql(
        "UPDATE users SET level='Intermediate'",
        [],
        (_, result) => { console.log(result) },
        (_, error) => console.log(error)
      );
    })

  }

  function toggleCameraType() {
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
                style={{ width: 150, height: 100, marginTop: 40, marginRight: 20 }}
                resizeMode="contain"
                shouldPlay={true}
                isLooping={true}
                isMuted={true}
              ></Video>
            </View>
          </View>
          <View>
            {
              title === 'Squat' && reps > 2 && reps < 7 ?
                <>
                  <View style={{
                    zIndex: 1,
                    backgroundColor: colors.darkGray,
                    width: "75%",
                    borderWidth: 2,
                    borderColor: colors.white,
                    borderRadius: 20,
                    alignItems: "center",
                    paddingVertical: 10,
                    opacity: 0.7,
                    marginTop: 20,
                    marginLeft: 45 
                  }}>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        paddingHorizontal: 30,
                      }}
                    >
                      <Ionicons
                        size={48}
                        color={colors.white}
                        name="alert-circle-outline"
                      ></Ionicons>
                      <MontSerratText
                        text={"In this moment you disaligned your back!"}
                        color={colors.white}
                        style={{ marginLeft: 5 }}
                      ></MontSerratText>
                    </View>
                  </View>
                  <Image style={{ width: 150, height: 150, marginTop: 80, marginLeft: 0, marginRight: 200 }} source={require("../assets/giphy.gif")} ></Image>
                </>
                : null
            }
          </View>
          <View style={[{ marginLeft: 80, flexDirection: "row", justifyContent: 'space-between', marginTop: 700, zIndex: 1, position: 'absolute', backgroundColor: 'black', borderRadius: 10, padding: 10 }]}>
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ color: 'white', fontSize: 25, fontWeight: 'bold' }}> {"Reps="} </Text>
              <Text style={{ color: 'white', fontSize: 25 }}> {reps + "/" + totalReps}</Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ color: 'white', fontSize: 25, fontWeight: 'bold' }}> {"Sets="} </Text>
              <Text style={{ color: 'white', fontSize: 25 }}> {"1/1"}</Text>
            </View>
          </View>

          {!nextExercise ? <MyButton style={{
            backgroundColor: colors.darkGray,
            margin: 140,
            width: 150,
            height: 60,
            borderRadius: 10,
            marginRight: 25,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "green"
          }} title={"Next Exercise"} onPress={() => {
            setNextExercise(true)
            let r = 0
            function updateReps() {
              r = r + 1;
              if (r === totalReps) {
                updateDbEndSession()
                props.navigation.navigate("ReportSession")
              }
              else
                setReps((current) => (current < totalReps ? current + 1 : current));
            }

            const myinterval = setInterval(updateReps, 1000);
            setMyInterval(myinterval)
          }}></MyButton> : null}

          <ModalSafeExit
            modalVisible={modalVisible}
            navigation={navigation}
            setModalVisible={setModalVisible}
            myInterval={myInterval}
          />

          <View style={styles.bottomView2}>
            <View style={styles.horizontalFlex}>
              <MyButton style={[styles.exitButton]} title="Exit" onPress={() => setModalVisible(true)}></MyButton>
              <PauseButton style={[styles.pauseButton]} onPress={() => props.navigation.navigate("PauseExercise", { reps: reps, title: title })} />
            </View>

            <View style={{ flex: 1, marginTop: 10, marginBottom: 20, alignItems: "center" }}>
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


function ExecuteSingleExercise(props) {
  const [reps, setReps] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  let [permission, requestPermission] = Camera.useCameraPermissions();
  const [title, setTitle] = useState(props.route.params.exercise.title)
  const [type, setType] = useState(CameraType.front);
  const [myInterval, setMyInterval] = useState(0)
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;


  const totalReps = 7;
  const navigation = useNavigation();
  const video = React.useRef(null);


  useEffect(() => {

    const myinterval = setInterval(updateReps, 1000);
    setMyInterval(myinterval)

    let r = 0;

    function updateReps() {
      r = r + 1;
      if (r === totalReps) {
        r = 0;
        clearInterval(myinterval)
        updateDbEndSession()
        props.navigation.navigate("ReportSingleExercise", { exercise: props.route.params.exercise })
      }
      else
        setReps((current) => (current < totalReps ? current + 1 : current));
    }

  }, []);

  function updateDbEndSession() {
    props.route.params.db.transaction((tx) => {
      const idExercise = props.route.params.exercise.id
      tx.executeSql(
        "INSERT OR IGNORE INTO userExercise(exercise, user, evaluation) VALUES (?,1,50)",
        [idExercise],
        (_, result) => { console.log(result) },
        (_, error) => console.log(error)
      );

    })
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
                style={{ width: 150, height: 100, marginTop: 40, marginRight: 20 }}
                resizeMode="contain"
                shouldPlay={true}
                isLooping={true}
                isMuted={true}
              ></Video>
            </View>
          </View>

          <View style={[{ marginLeft: 80, flexDirection: "row", justifyContent: 'space-between', marginTop: 700, zIndex: 1, position: 'absolute', backgroundColor: 'black', borderRadius: 10, padding: 10 }]}>
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ color: 'white', fontSize: 25, fontWeight: 'bold' }}> {"Reps="} </Text>
              <Text style={{ color: 'white', fontSize: 25 }}> {reps + "/" + totalReps}</Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ color: 'white', fontSize: 25, fontWeight: 'bold' }}> {"Sets="} </Text>
              <Text style={{ color: 'white', fontSize: 25 }}> {"1/1"}</Text>
            </View>
          </View>

          <ModalSafeExit
            modalVisible={modalVisible}
            navigation={navigation}
            setModalVisible={setModalVisible}
            myInterval={myInterval}
          />

          <View style={styles.bottomView2}>
            <View style={styles.horizontalFlex}>
              <MyButton style={[styles.exitButton]} title="Exit" onPress={() => setModalVisible(true)}></MyButton>
              <PauseButton style={[styles.pauseButton]} onPress={() => props.navigation.navigate("PauseExercise", { reps: reps, title: title })} />
            </View>

            <View style={{ flex: 1, marginTop: 10, alignItems: "center", marginBottom: 10 }}>
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
              style={pageStyles.continueButton}
              title={"Continue training"}
              onPress={() => props.setModalVisible(false)}
            ></MyButton>
            <MyButton
              style={pageStyles.turnHomeButton}
              title={"Exit"}
              onPress={() => {
                clearTimeout(props.myTimeout)
                clearInterval(props.myInterval)
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
  continueButton: {
    backgroundColor: "grey",
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

export { FrameYourself, ExecuteExercise, ExercisePaused, ExecuteSingleExercise };