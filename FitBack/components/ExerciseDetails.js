import { MontSerratText } from "./Utility";
import { styles } from "../styles";
import { View, Text, ScrollView, Button } from "react-native";
import { useState } from "react";
import {Card} from "react-native-elements";
import { MyButton } from "./Homepage";
import { useNavigation } from "@react-navigation/native";


function ExerciseDetails(props) {
    const [exerciseName, setExerciseName] = useState(props.route.params.text);
    const navigation = useNavigation();
    return (
    <View style={{flex: 1, flexDirection: "column", alignItems:"center"}}>
        <ScrollView>
            <View style={{flex: 1, flexDirection: "column", alignItems:"center"}}>
        <MontSerratText style={[styles.titleText, {marginVertical: 10}]} text={exerciseName}></MontSerratText>
        <View style={{borderWidth:1, height: 200, width:350, marginHorizontal: 10}}></View>
        <MyCard/>
        <Text style={[styles.titleText, {marginBottom: 10}]}>Description</Text>
        <Text>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris
            sagittis pellentesque lacus eleifend lacinia Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris
            sagittis pellentesque lacus eleifend lacinia Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris
            sagittis pellentesque lacus eleifend lacinia Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris
            sagittis pellentesque lacus eleifend lacinia Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris
            sagittis pellentesque lacus eleifend lacinia Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris
            sagittis pellentesque lacus eleifend lacinia Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris
            sagittis pellentesque lacus eleifend lacinia 
        </Text>
             </View>
        </ScrollView>
        <View style={styles.exerciseDetailsButtons}>
            <MyButton style={styles.secondaryButton} title={"Reviews"} onPressAction={() => {navigation.navigate("ReviewsList", {exerciseName: exerciseName})}}/>
            <MyButton style={styles.primaryButton} title={"Start AR training"}/>
        </View>

    </View>
    )
    
}

function MyCard(props) {
    return (
        <View style={styles.cardStyle.cardContainer}>
            <View style={styles.cardStyle.cardHeader}>
            <Text style = {styles.cardStyle.cardHeaderText} >Card Title</Text>
            </View>
            <View style = {styles.cardStyle.cardBody}>
            <Text >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris
                sagittis pellentesque lacus eleifend lacinia...
            </Text>
            </View>
            
        </View>
    )
}

export { ExerciseDetails };