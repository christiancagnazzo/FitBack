import { MontSerratText } from "./Utility";
import { styles, colors} from "../styles";
import { View, Text, ScrollView, Button, TouchableOpacity,StyleSheet, ImageBackground, Modal } from "react-native";
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
    const [modalVisible, setModalVisible] = useState(false);

    return (
        <View style={{ flex: 1, flexDirection: "column", alignItems: "center" }}>
            <ScrollView>
                <View style={{ flex: 1, flexDirection: "column", alignItems: "center" }}>
                    <MontSerratText style={[styles.titleText, { marginVertical: 10 }]} text={exercise.title}></MontSerratText>
                    <TouchableOpacity onPress={() => props.navigation.navigate("Tutorial", { exercise: exercise })}>

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

            <ModalSafeExit
                modalVisible={modalVisible}
                navigation={navigation}
                setModalVisible={setModalVisible}
                exercise={exercise}
            />

            <View style={styles.exerciseDetailsButtons}>
                <MyButton style={styles.secondaryButton} title={"Revisions"} onPressAction={() => { navigation.navigate("ReviewsList", { exercise: exercise }) }} />
                <MyButton style={styles.primaryButton} title={"Start AR training"} onPressAction={() => {
                    if (user.level === exercise.difficulty)
                        navigation.navigate("FrameYourself", { exercise: exercise, singleExercise: true })
                    else {
                        setModalVisible(true)
                    }
                }
                } />
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
                            "This exercise is suitable for you because it is based on simple movements and there is not risk to get hurt" :
                            "This exercise is not suitable for you because it uses 75% of your body weight, that is too much for your level. You should do exercise of your level before."
                    }

                </Text>
            </View>

        </View>
    )
}


function ModalSafeExit(props) {
    return (
        <Modal visible={props.modalVisible} animationType="none" transparent={true}>
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <MontSerratText
                        style={pageStyles.whatAreReviewsText}
                        text={"This exercise is NOT recommended to you. Are you sure that you want  to continue?"}
                    ></MontSerratText>
                    <View style={styles.horizontalFlex}>
                        <MyButton
                            style={pageStyles.continueButton}
                            title={"Cancel"}
                            onPressAction={() => props.setModalVisible(false)}
                        ></MyButton>
                        <MyButton
                            style={pageStyles.turnHomeButton}
                            title={"Start Training"}
                            onPressAction={() => {
                                props.setModalVisible(false);
                                props.navigation.navigate("FrameYourself", { exercise: props.exercise, singleExercise: true })
                            }}
                        ></MyButton>
                    </View>
                </View>
            </View>
        </Modal>
    );
}

const pageStyles = StyleSheet.create({
    turnHomeButton: {
      backgroundColor: colors.red,
      marginTop: 10,
      width: 100,
      height: 60,
      borderRadius: 10,
      justifyContent: "center",
      alignItems: "center",
      padding: 4
    },
    continueButton: {
      backgroundColor: "grey",
      marginTop: 10,
      width: 100,
      height: 60,
      borderRadius: 10,
      justifyContent: "center",
      alignItems: "center",
    },
    whatAreReviewsText: {
      fontSize: 18,
    },
  });
  

export { ExerciseDetails };