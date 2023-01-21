import { MontSerratText } from "./Utility";
import { styles } from "../styles";
import { View, Text, ScrollView, Button, TouchableOpacity, ImageBackground } from "react-native";
import { useState } from "react";
import { Card } from "react-native-elements";
import { MyButton } from "./Homepage";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";

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

function ExerciseDetails(props) {
    const navigation = useNavigation();
    const exercise = props.route.params.exercise
    const user = props.route.params.user
    return ( 
        <View style={{ flex: 1, flexDirection: "column", alignItems: "center" }}>
            <ScrollView>
                <View style={{ flex: 1, flexDirection: "column", alignItems: "center" }}>
                    <MontSerratText style={[styles.titleText, { marginVertical: 10 }]} text={exercise.title}></MontSerratText>
                    <TouchableOpacity onPress={() => props.navigation.navigate("Tutorial", { exercise: exercise})}>

                        <ImageBackground source={getImage(exercise.image_path)} style={{ backgroundColor: 'grey', borderWidth: 1, height: 200, width: 350, marginHorizontal: 10, justifyContent: "center", alignItems: "center" }} blurRadius={30}>
                            <AntDesign name="play" size={100} color="#BA181B" />
                            <MontSerratText style={[{ fontSize: 20, marginVertical: 10, color: "white" }]} text={"Watch AR tutorial"}></MontSerratText>
                        </ImageBackground>

                    </TouchableOpacity>

                    <MyCard user={user} exercise={exercise} />
                    <Text style={[styles.titleText]}>Description</Text>

                    <View style={styles.cardStyle.cardContainer}>
                        <Text style={{ padding: 10 }}>
                            {exercise.description}
                        </Text>
                    </View>
                </View>
            </ScrollView>
            <View style={styles.exerciseDetailsButtons}>
                <MyButton style={styles.secondaryButton} title={"Reviews"} onPressAction={() => { navigation.navigate("ReviewsList", { exercise: exercise }) }} />
                <MyButton style={styles.primaryButton} title={"Start AR training"} onPressAction={() => { navigation.navigate("FrameYourself", { exercise: exercise, singleExercise:true }) }} />
            </View>

        </View>
    )

}

function MyCard(props) {
    return (
        <View style={styles.cardStyle.cardContainer}>
            <View style={styles.cardStyle.cardHeader}>
                <Text style={styles.cardStyle.cardHeaderText} >
                    {
                        props.user.level === props.exercise.difficulty ?
                            "Why this exercise is for you" :
                            "Why this exercise is NOT for you"
                    }
                </Text>
            </View>
            <View style={styles.cardStyle.cardBody}>
                <Text >
                    {
                        props.user.level === props.exercise.difficulty ?
                            "This exercise is suitable for you because you’ve already learned basic rules and uses only part of your bodyweight." :
                            "This exercise is not suitable for you because it uses 75% of your body weight, that is too much for your level. You should do exercise of your level before."
                    }

                </Text>
            </View>

        </View>
    )
}

export { ExerciseDetails };