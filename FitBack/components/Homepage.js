import React, { useState } from 'react';
import { Button, View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import {colors, styles} from '../styles.js'
import {LinearGradient} from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import {MontSerratText} from './Utility.js'
function Homepage() {
    const [todayList, setTodayList] = useState([
        {
            id: 0,
            name: "Push-ups",
            uri: require("../assets/images/exercises_box/push-up.png")
        },
        {
            id: 1,
            name: "Pull-ups",
            uri: require("../assets/images/exercises_box/pull-up.webp")
        },
        {
            id: 2,
            name: "Squats",
            uri: require("../assets/images/exercises_box/squat.webp")
        },
        {
            id: 3,
            name: "Lunges",
        },
        {
            id: 4,
            name: "Bench press",
        },
    ]);
    const navigation = useNavigation();
    return (
        
        <View>
        <View style={styles.homepage}>
        <MontSerratText style={[styles.titleText, {marginBottom: 10}]} text={"Welcome back John!"}/>
            <HomepageButton navigation={navigation} title="Your exercises"/>
            <HomepageButton title="Suggested exercises"/>
            <HomepageButton title="All exercises"/>
        </View>
            <TodaysTrainingComponent todayList={todayList} navigation= {navigation}/>
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
            {props.todayList.map((item) => {
                return (
                    <ExerciseBox uri={item.uri} key={item.id} text={item.name} navigation={props.navigation}/>
                )
            })}
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
            <TouchableOpacity style={props.style} onPress={props.onPressAction}>
                <MontSerratText style={styles.buttonText} color={colors.white} text={props.title}></MontSerratText>
            </TouchableOpacity>
        </View>
        
    )
}

function HomepageButton(props) {
    return (
        <View>
            <TouchableOpacity style={styles.homepageButton} onPress={() => props.navigation.navigate('Profile')}>
                <MontSerratText style={styles.HomeButtonText} color={colors.white} text={props.title}></MontSerratText>
            </TouchableOpacity>
        </View>
        
    )
}

function ExerciseBox(props) {
    return (
        <TouchableOpacity style={styles.exerciseBoxAndText} onPress={() => {props.navigation.navigate("ExerciseDetails", {text: props.text})}}>
        <View style={{marginTop:20, marginBottom: 10, marginHorizontal:20}}>
            <Image style={styles.exerciseBoxPhoto} source={props.uri}/>
        </View>
        <MontSerratText text={props.text}></MontSerratText>
        </TouchableOpacity>
    )
}

export {Homepage, MyButton}