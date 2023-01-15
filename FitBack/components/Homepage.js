import React, { useState } from 'react';
import { Button, View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import { colors, styles } from '../styles.js'
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { MontSerratText } from './Utility.js'
function Homepage() {
    const [alreadyTrained, setalreadyTrained] = useState(false);
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
            <HomepageButton navigation={navigation} title="Your exercises" type={"Your Exercises"}/>
            <HomepageButton navigation={navigation} title="Suggested exercises"  type={"Suggested Exercises"}/>
            <HomepageButton navigation={navigation} title="All exercises"  type={"All Exercises"}/>
        </View>
            <TodaysTrainingComponent todayList={todayList} navigation= {navigation} alreadyTrained={alreadyTrained}/>
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
                {props.alreadyTrained ?
                    <FinishedBox>
                    </FinishedBox>
                    :
                    <ScrollView horizontal={true}>
                        {props.todayList.map((item) => {
                            return (
                                <ExerciseBox uri={item.uri} key={item.id} text={item.name} navigation={props.navigation} />
                            )
                        })}
                    </ScrollView>
                }

            </View>
            <View style={styles.horizontalFlexReverse}>
                <MyButton style={[styles.startARTrainingButton]} navigation={props.navigation} onPressAction={()=>props.navigation.navigate("TodaySessionStarting", { text: props.text }) } title="Start AR training" ></MyButton>
            </View>
        </View>


    )
}

function MyButton(props) {
    return (
        <View style={props.viewStyle}>
            <TouchableOpacity style={props.style} onPress={props.onPressAction}>
                <MontSerratText style={styles.buttonText} color={colors.white} text={props.title}></MontSerratText>
            </TouchableOpacity>
        </View>

    )
}

function HomepageButton(props) {
    return (
        <View>
            <TouchableOpacity style={styles.homepageButton} onPress={() => props.navigation.navigate('ExercisesList', {type: props.type, navigation: props.navigation})}>
                <MontSerratText style={styles.HomeButtonText} color={colors.white} text={props.title}></MontSerratText>
            </TouchableOpacity>
        </View>

    )
}

function ExerciseBox(props) {
    return (
        <TouchableOpacity style={styles.exerciseBoxAndText} onPress={() => { props.navigation.navigate("ExerciseDetails", { text: props.text}) }}>
            <View style={{ marginTop: 20, marginBottom: 10, marginHorizontal: 20 }}>
                <Image style={styles.exerciseBoxPhoto} source={props.uri} />
            </View>
            <MontSerratText text={props.text}></MontSerratText>
        </TouchableOpacity>
    )
}

function FinishedBox() {
    return (
        <View style={[styles.alreadyFinishedBox, { marginVertical: 5, marginHorizontal: 15 }]}>
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



export { Homepage, MyButton }
