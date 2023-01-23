import React from "react";
import {
  StyleSheet,
  Button,
  SafeAreaView,
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

const HardCodedResults = [
  {
    title: "Lift Harm",
    attempts: "7/7",
  },
  {
    title: "Squat",
    attempts: "6/7",
  },
];

function Report(props) {
  const [exercises, setExercise] = useState(HardCodedResults); // Lascia così

  return (
    <View>
      <View>
        <MontSerratText
          style={{
            fontWeight: "bold",
            fontSize: 35,
            margin: 35,
            alignSelf: "center",
          }}
          text={"Well Done!"}
        />
        <View style={{ margin: 5, marginLeft: 10, flexDirection: "row" }}>
          <Text style={{ fontWeight: "bold", fontSize: 25, marginLeft: 10 }}>
            {"Exercise"}
          </Text>
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 25,
              textAlign: "right",
              marginStart: 65,
            }}
          >
            {"Correct Attempts"}
          </Text>
        </View>
        <View
          style={{
            flex: 1,
            height: 2,
            backgroundColor: "black",
            marginLeft: 10,
            width: 350,
          }}
        />

        <View
          style={{
            flex: 1,
            height: 1,
            backgroundColor: "black",
            marginLeft: 10,
            marginBottom: 5,
          }}
        />
        <ScrollView style={{ marginTop: 5 }}>
          {exercises.map((e, i) => (
            <ExerciseList key={i} exercise={e} index={i}></ExerciseList>
          ))}
        </ScrollView>
      </View>
      <View style={{ alignItems: "center", marginTop: 15 }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            margin: 15,
          }}
        >
          <MontSerratText
            style={{ fontWeight: "bold", fontSize: 30, alignSelf: "center" }}
            text={"Estimated\nevaluation"}
            color={colors.w}
          />
          <View
            style={[styles.rectangleExerciseTitle, { marginLeft: 60, marginTop: 15, flex: 1 }]}
          >
            <MontSerratText
              //style={styles.textFrameYouself}
              style={{
                margin: 15,
                color: colors.white,
                fontSize: 20,
                fontWeight: "bold",
                textAlign: "center",
              }}
              text={"68%"}
            />
          </View>
        </View>

        <View style={{ marginTop: 15 }}>
          <MyButton
            style={[styles.exitButton]}
            title="Go Home"
            onPress={
              () =>
                props.navigation.navigate(
                  "LevelUp"
                ) /*Navigate to home page without start ar training*/
            }
          ></MyButton>
        </View>
      </View>
    </View>
  );
}

function ExerciseList(props) {
  const [myMargin, setMyMargin] = useState(props.index === 0 ? 10 : 40);
  return (
    <View
      style={{
        marginTop: myMargin,
        alignItems: "center",
        flexDirection: "row",
        flex: 1,
        justifyContent: "space-between",
        borderBottomWidth: 5,
      }}
    >
      <Text style={{ fontWeight: "normal", fontSize: 20, marginLeft: 20 }}>
        {props.exercise.title}
      </Text>
      <Text style={{ fontWeight: "normal", fontSize: 20, marginRight: 30 }}>
        {props.exercise.attempts}
      </Text>
    </View>
  );
}

function ReportSingleExercise(props) {

  function getImage(image) {
    switch (image) {
      case 'squat':
        return require('../assets/squat.png')
      case 'lunges':
        return require('../assets/lunges.png')
      case 'pushup':
        return require('../assets/pushup.png')
      case 'lift':
        return require('../assets/lift.png')

    }
  }

  return (
    <View>
      <View style={styles.homepage}>
        <MontSerratText
          style={[styles.titleText, { marginBottom: 20, marginTop: 20 }]}
          text={"Exercise Result"}
        />
        <MontSerratText
          style={[
            {
              color: colors.red,
              fontFamily: "MontSerratBold",
              fontSize: 25,
              marginBottom: 20,
            },
          ]}
          text={props.route.params.exercise.title}
        />

        <Image source={getImage(props.route.params.exercise.image_path)} style={{ height: 100, width: 100 }}></Image>

        <View style={{ marginTop: 20, marginBottom: 10 }}>
          <MontSerratText
            style={[
              {
                color: colors.darkGray,
                fontFamily: "MontSerratBold",
                fontSize: 25,
              },
            ]}
            text={"Correct Attempets"}
          />
          <View
            style={{
              margin: 15,
              borderWidth: 3,
              borderColor: colors.black,
              backgroundColor: colors.black,
              borderRadius: 10,
            }}
          >
            <MontSerratText
              //style={styles.textFrameYouself}
              style={{
                margin: 10,
                color: colors.white,
                fontSize: 20,
                fontWeight: "bold",
                textAlign: "center",
              }}
              text={"7/7"}
            />
          </View>

          <MontSerratText
            style={[
              {
                color: colors.darkGray,
                fontFamily: "MontSerratBold",
                fontSize: 25,
                marginTop: 20,
              },
            ]}
            text={"Estimated evaluation"}
          />
          <View
            style={{
              margin: 15,
              borderWidth: 3,
              borderColor: colors.black,
              backgroundColor: colors.black,
              borderRadius: 10,
            }}
          >
            <MontSerratText
              //style={styles.textFrameYouself}
              style={{
                margin: 10,
                color: colors.white,
                fontSize: 20,
                fontWeight: "bold",
                textAlign: "center",
              }}
              text={"100%"}
            />
          </View>
        </View>
      </View>

      <View style={styles.exerciseDetailsButtons}>
        <MyButton style={styles.primaryButton} title={"Go Home"} onPress={() => { props.navigation.navigate("Homepage") }} />
        <MyButton style={[styles.secondaryButton,]} title={"Revision Exercise"} onPress={() => { props.navigation.navigate("ReviewsList", { exercise: props.route.params.exercise }) }} />

      </View>

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

export { Report, ReportSingleExercise };
