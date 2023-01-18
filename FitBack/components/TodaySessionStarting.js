import { View, Text, Image, ScrollView, Overlay, TouchableOpacity } from 'react-native';
import { colors, styles } from '../styles.js'
import { React, useState } from "react";
import { MontSerratText } from '../components/Utility.js';
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from '@expo/vector-icons'; 




const HardCodedSession = [
    {
        "title": "PUSH-UPS",
        "reps": "3x12",
    },
    {
        "title": "BENCH PRESS",
        "reps": "4x10",
    },
    {
        "title": "SQUAT",
        "reps": "3x12",
    },
    {
        "title": "LATERAL-LUNGES",
        "reps": "4x15",
    }
]

function StartingSession(props) {
    const [exercises, setExercise] = useState(HardCodedSession) // temp
    const [visible, setVisible] = useState(false);
    const navigation = useNavigation();


    return (
        <View>

            <View>
                <MontSerratText style={styles.textStartingSession} text={"You are starting today's session!"} />
                <View style={{ margin: 5, flexDirection: "row" }}>
                    <Text style={{ fontWeight: "bold", fontSize: 25, marginLeft: 10 }}>{"Exercise"}</Text>
                    <Text style={{ fontWeight: "bold", fontSize: 25, textAlign: "right", marginStart: 180 }}>{"Reps"}</Text>
                </View>
                <View style={{ flex: 1, height: 2, backgroundColor: 'black', marginLeft: 10, width: 350 }} />
     
                <View style={{ flex: 1, height: 1, backgroundColor: 'black', marginLeft: 10, marginBottom: 20 }} />
                <ScrollView style={{ marginTop: 10 }}>
                    {
                        exercises.map((e, i) => <ExerciseList key={i} exercise={e} navigation={props.navigation} text={e.title}></ExerciseList>)
                    }
                </ScrollView>

            </View>
            <View style={styles.horizontalFlexReverse}>
                <MyButton style={[styles.startSession]} navigation={props.navigation} onPressAction={()=>props.navigation.navigate("FrameYourself", { text: props.text }) } title="Start AR session" ></MyButton>
            </View>
        </View>

    );
}

function ExerciseList(props) {
    return (
        <View >
            <View style={{ alignItems: 'center', flexDirection: 'row', flex: 1 }}>
                <View>
                    <View style={{ margin: 3, flexDirection: 'row' }}>
                        <Text style={{ fontWeight: "normal", fontSize: 20, marginLeft: 10, marginRight: 5 }}>{props.exercise.title}</Text>
                        <Ionicons name="ios-information-circle-outline" size={24} color="black" onPress={()=>props.navigation.navigate("ExerciseDetails", { text: props.text })}/>
                    </View>
                    <Text style={{ fontWeight: "normal", fontSize: 20, textAlign: 'right' }}>{props.exercise.reps}</Text>

                    <View style={{ flex: 1, height: 2, backgroundColor: 'black', marginLeft: 10, width: 350 }} />
                    <View>
                    </View>
                    <View style={{ flex: 1, height: 1, backgroundColor: 'black', marginLeft: 10, marginBottom: 20 }} />
                </View>

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



export { StartingSession };