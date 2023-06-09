import React, { useState } from 'react';
import { Button, View, Text, TouchableOpacity, ScrollView, Image, ImageBackground } from 'react-native';
import { colors, styles } from '../styles.js'
import { MontSerratText } from '../App.js';
import { LinearGradient } from 'expo-linear-gradient';


function HomepageAfterSession() {
    return (

        <View>
            <View style={styles.homepage}>
                <MontSerratText style={[styles.titleText, { marginBottom: 10 }]} text={"Welcome back John!"} />
                <HomepageButton title="Already Executed Exercises" />
                <HomepageButton title="Exercises For Your Level" />
                <HomepageButton title="All Exercises" />
            </View>
            <TodaysTrainingComponent />
        </View>

    );
}

function TodaysTrainingComponent(props) {
    const [todaysTrainingText, setTodaysTrainingText] = useState("Today's training session")
    return (
        <View>
            <View style={styles.centerAligned}>
                <MontSerratText color={colors.black} style={styles.titleText} text={todaysTrainingText}> </MontSerratText>
            </View>
            <View>
                <FinishedBox>
                </FinishedBox>
            </View>
            <View style={styles.horizontalFlexReverse}>
                <MyButton style={[styles.startARTrainingButton]} title="Start AR training" ></MyButton>
            </View>
        </View>

    )
}

function MyButton(props) {
    return (
        <View>
            <TouchableOpacity style={props.style}>
                <MontSerratText style={styles.buttonText} color={colors.white} text={props.title}></MontSerratText>
            </TouchableOpacity>
        </View>

    )
}

function HomepageButton(props) {
    return (
        <View>
            <TouchableOpacity style={styles.homepageButton}>
                <MontSerratText style={styles.HomeButtonText} color={colors.white} text={props.title}></MontSerratText>
            </TouchableOpacity>
        </View>

    )
}

function ExerciseBox() {
    return (
        <View style={[styles.exerciseBox, { marginVertical: 30, marginHorizontal: 20 }]}>

        </View>
    )
}

function FinishedBox() {
    return (
        <View style={[styles.alreadyFinishedBox, { marginVertical: 20, marginHorizontal: 15 }]}>
            <MontSerratText color={colors.black} text="You already finished your daily training! "></MontSerratText>
            <MontSerratText color={colors.black} text="Good Job! "></MontSerratText>
            <Image
                source={require("../assets/coccarda.png")}
                resizeMode="contain"
                style={styles.FinishedTrainingImage}
            ></Image>
            <MontSerratText color={colors.black} text="Try to look at suggested exercises "></MontSerratText>
        </View>
    )
}

export { HomepageAfterSession }