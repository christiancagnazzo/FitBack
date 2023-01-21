import { React, useEffect, useState } from 'react';
import { Button, View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import { colors, styles } from '../styles.js'
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { MontSerratText } from './Utility.js'
function Homepage(props) {
    const [alreadyTrained, setalreadyTrained] = useState(false);
    const [todayList, setTodayList] = useState([
        { "ar_video_path": "video_path", "description": "A squat is a strength exercise in which the trainee lowers their hips from a standing position and then stands back up. During the descent the hip and knee joints flex while the ankle joint dorsiflex. During the ascent  the hip and knee joints extend and the ankle joint plantarflexes", "difficulty": "Beginner", "equipments": ["Dummbell", "Kettlebell"], "id": 4, "image_path": "lift", "muscles": ["Dummbell", "Kettlebell"], "title": "Lift Left arm", "uri": require("../assets/lift.png")},
        { "ar_video_path": "video_path", "description": "This exercise is very simple and is used for arm muscles. It consists of lateral arm raises without weight and therefore is suitable for beginner level users", "difficulty": "Beginner", "equipments": ["Dummbell", "Kettlebell"], "id": 1, "image_path": "squat", "muscles": ["Dummbell", "Kettlebell"], "title": "Squat", "uri": require("../assets/squat.png") }
    ]);
    const navigation = useNavigation();

    useEffect(() => {
        props.route.params.db.transaction((tx) => {
            tx.executeSql(
                "SELECT sessiondone FROM users ",
                [],
                (_, result) => { setalreadyTrained(result.rows._array[0].sessiondone) },
                (_, error) => console.log(error)
            );
        }

        )

    })



    return (
        <View>
            <View style={styles.homepage}>
                <MontSerratText style={[styles.titleText, { marginBottom: 20, marginTop: 20 }]} text={"Welcome back John!"} />
                <HomepageButton navigation={navigation} title="Your exercises" type={"Your Exercises"} />
                <HomepageButton navigation={navigation} title="Suggested exercises" type={"Suggested Exercises"} />
                <HomepageButton navigation={navigation} title="All exercises" type={"All Exercises"} />
            </View>
            <TodaysTrainingComponent todayList={todayList} navigation={navigation} alreadyTrained={alreadyTrained} />
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
                                <ExerciseBox exercise={item} uri={item.uri} key={item.id} text={item.title} navigation={props.navigation} />
                            )
                        })}
                    </ScrollView>
                }

            </View>
            
            {
                !props.alreadyTrained ?
                    <View style={styles.horizontalFlexReverse}>
                        <MyButton style={[styles.startARTrainingButton]} navigation={props.navigation} onPressAction={() => props.navigation.navigate("TodaySessionStarting", { text: props.text, list: props.todayList })} title="Start AR training" ></MyButton>
                    </View>
                    :
                    <></>
            }
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
            <TouchableOpacity style={styles.homepageButton} onPress={() => props.navigation.navigate('ExercisesList', { type: props.type, navigation: props.navigation })}>
                <MontSerratText style={styles.HomeButtonText} color={colors.white} text={props.title}></MontSerratText>
            </TouchableOpacity>
        </View>

    )
}

function ExerciseBox(props) {
    return (
        <TouchableOpacity style={styles.exerciseBoxAndText} onPress={() => { props.navigation.navigate("ExerciseDetails", { exercise: props.exercise }) }}>
            <View style={{ marginTop: 20, marginBottom: 10, marginHorizontal: 20, backgroundColor: 'white', borderRadius: 10 }}>
                <Image style={styles.exerciseBoxPhoto} source={props.uri} />
            </View>
            <MontSerratText text={props.text}></MontSerratText>
        </TouchableOpacity>
    )
}

function FinishedBox() {
    return (
        <View style={[styles.alreadyFinishedBox, { marginVertical: 20, marginHorizontal: 30, }]}>
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
