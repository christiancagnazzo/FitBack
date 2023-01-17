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
    title: "PUSH-UPS",
    attempts: "27/36",
  },
  {
    title: "BENCH PRESS",
    attempts: "30/40",
  },
  {
    title: "SQUAT",
    attempts: "35/36",
  },
  {
    title: "LATERAL-LUNGES",
    attempts: "53/100",
  },
];

function Report(props) {
  const [exercises, setExercise] = useState(HardCodedResults); // temp

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
        <View style={{ margin: 5, flexDirection: "row" }}>
          <Text style={{ fontWeight: "bold", fontSize: 25, marginLeft: 10 }}>
            {"Exercise"}
          </Text>
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 25,
              textAlign: "right",
              marginStart: 50,
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
            margin:15,
          }}
        >
          <MontSerratText
            style={{ fontWeight: "bold", fontSize: 30, alignSelf: "center"}}
            text={"Estimated\nevaluation"}
            color = {colors.black}
          />
          <View
            style={[styles.rectangleExerciseTitle, { marginLeft: 60, flex: 1 }]}
          >
            <MontSerratText
              //style={styles.textFrameYouself}
              style={{
                margin: 10,
                color: colors.black,
                fontSize: 20,
                fontWeight: "bold",
                textAlign: "center",
              }}
              text={"68%"}
            />
          </View>
        </View>

        <View style={{marginTop:15}}>
        <MyButton style={[styles.exitButton]} title="Exit" onPress={()=>  {props.navigation.navigate("HomepageAfterSession") }  /*Navigate to home page without start ar training*/ }></MyButton>
        </View>
      </View>
    </View>
  );
}

function updateAlreadyTrained(){

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

export { Report };