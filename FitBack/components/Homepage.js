import React, { useState } from 'react';
import { Button, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import {colors, styles} from '../styles.js'
import { MontSerratText } from '../App.js';
import {LinearGradient} from 'expo-linear-gradient';


function Homepage() {
    return (
        
        <View>
        <View style={styles.homepage}>
        <MontSerratText style={[styles.titleText, {marginBottom: 10}]} text={"Welcome back John!"}/>
            <HomepageButton title="Your exercises"/>
            <HomepageButton title="Suggested exercises"/>
            <HomepageButton title="All exercises"/>
        </View>
            <TodaysTrainingComponent/>
        </View>
        
    );
}

function TodaysTrainingComponent(props) {
    const [todaysTrainingText, setTodaysTrainingText] = useState("Today's training session")
    return (
        <View>
        <View style= {styles.centerAligned}>
            <MontSerratText color={colors.black} style = {styles.titleText} text={todaysTrainingText}> </MontSerratText>
        </View>
        <View>
        <ScrollView horizontal={true}>
            <ExerciseBox/>
            <ExerciseBox/>
            <ExerciseBox/>
            <ExerciseBox/>
            <ExerciseBox/>
            <ExerciseBox/>
        </ScrollView>
        </View>
        <View style={styles.horizontalFlexReverse}>
            <MyButton style = {[styles.startARTrainingButton]} title="Start AR training" ></MyButton>
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
        <View style={[styles.exerciseBox, {marginVertical: 30,marginHorizontal:20}]}>
            
        </View>
    )
}

export {Homepage}