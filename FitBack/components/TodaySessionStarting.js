import { View, Text, Image, ScrollView, Overlay, TouchableOpacity } from 'react-native';
import { colors, styles } from '../styles.js'
import { React, useState } from "react";
import { MontSerratText } from '../components/Utility.js';
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from '@expo/vector-icons';


const HardCodedSession = [
    {
        "title": "Lift Harm",
        "reps": "1x7",
    },
    {
        "title": "Squat",
        "reps": "1x7",
    },

]

function StartingSession(props) {
    const ex = props.route.params.list
    const [exercises, setExercise] = useState(HardCodedSession) // Lascia hardcode, va bene così Ale
    const [visible, setVisible] = useState(false);
    const navigation = useNavigation();

    return (

        <View style={{ margin: 15 }}>

            <View>
                <MontSerratText style={styles.textStartingSession} text={"You are starting today's session!"} />
                <View style={{ margin: 10, flexDirection: "row" }}>
                    <Text style={{ fontWeight: "bold", fontSize: 25 }}>{"Exercise"}</Text>
                    <Text style={{ fontWeight: "bold", fontSize: 25, textAlign: "right", marginStart: 200 }}>{"Reps"}</Text>
                </View>
                <View style={{ flex: 1, height: 2, backgroundColor: 'black', marginLeft: 10, width: 350 }} />

                <View style={{ flex: 1, height: 1, backgroundColor: 'black', marginLeft: 10 }} />
                <ScrollView style={{ marginTop: 10 }}>
                    {
                        ex.map((e, i) => <ExerciseList key={i} exercise={e} reps={7} navigation={props.navigation} ></ExerciseList>)
                    }
                </ScrollView>

            </View>



            <View style={{ "alignContent": "center", "alignItems": "center", marginTop: 30, marginLeft: 25 }}>
                <MyButton style={[styles.startSession]} navigation={props.navigation} onPressAction={() => props.navigation.navigate("FrameYourself", { exercises: exercises })} title="Start AR session" ></MyButton>
            </View>
        </View>

    );
}

function ExerciseList(props) {
    return (
        <View
            style={{
                marginTop: 20,
                alignItems: "center",
                flexDirection: "row",
                flex: 1,
                justifyContent: "space-between",
                borderBottomWidth: 5,
            }}
        >
            <View style={{flexDirection: "row"}}>
                <Text style={{ fontWeight: "normal", fontSize: 20, marginLeft: 20, marginRight: 10 }}>
                    {props.exercise.title}
                </Text>
                <Ionicons name="ios-information-circle-outline" size={24} color="black" onPress={() => props.navigation.navigate("ExerciseDetails", { exercise: props.exercise })} />
            </View>

            <Text style={{ fontWeight: "normal", fontSize: 20, marginRight: 30 }}>
                {props.reps}
            </Text>

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