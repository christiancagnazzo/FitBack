import { View, Text, Image, ScrollView, Overlay, TouchableOpacity } from 'react-native';
import { colors, styles } from '../styles.js'
import { React, useState } from "react";
import { MontSerratText } from '../App.js';


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

function StartingSession() {
    const [exercises, setExercise] = useState(HardCodedSession) // temp
    const [visible, setVisible] = useState(false);

    return (
        <View>

            <View>
                <MontSerratText style={styles.textStartingSession} text={"You are starting today's session!"} />
                <ScrollView style={{ marginTop: 10 }}>
                    {
                        exercises.map((e, i) => <ExerciseList key={i} exercise={e}></ExerciseList>)
                    }
                </ScrollView>

            </View>
            <View style={styles.horizontalFlexReverse}>
                <MyButton style={[styles.startSession]} title="Start AR session" ></MyButton>
            </View>
        </View>

    );
}

function ExerciseList(props) {
    return (
        <View >
            <View style={{ alignItems: 'center', flexDirection: 'row', flex: 1 }}>
                <View>
                    <View style={{ margin: 3 }}>
                        <Text style={{ fontWeight: "normal", fontSize: 20, marginLeft: 10 }}>{props.exercise.title}</Text>

                        <Text style={{ fontWeight: "normal", fontSize: 20, textAlign: 'right' }}>{props.exercise.reps}</Text>
                    </View>
                    <View style={{ flex: 1, height: 1, backgroundColor: 'black', marginLeft: 10, width: 350 }} />
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
            <TouchableOpacity style={props.style}>
                <MontSerratText style={styles.buttonText} color={colors.white} text={props.title}></MontSerratText>
            </TouchableOpacity>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            </View>
        </View>

    )
}




export { StartingSession };