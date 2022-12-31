import { MontSerratText } from "../App";
import { styles } from "../styles";
import { View, Text, ScrollView, Button } from "react-native";
import { useState } from "react";
import {Card} from "react-native-elements";

function ExerciseDetails(props) {
    const [exerciseName, setExerciseName] = useState(props.route.params.text);
    
    return (
    <View style={{flex: 1, flexDirection: "column", alignItems:"center"}}>
        <ScrollView>
        <MontSerratText style={styles.titleText} text={exerciseName}></MontSerratText>
        <View style={{borderWidth:1, height: 200, width:350, marginHorizontal: 10}}></View>
        <Card>
            <Card.Title>Card title</Card.Title>
            <Card.Divider/>
            <Text>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris
                sagittis pellentesque lacus eleifend lacinia...
            </Text>
        </Card>
        <Text>Description</Text>
        <Text>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris
            sagittis pellentesque lacus eleifend lacinia 
        </Text>
        </ScrollView>
        <View style={{flexDirection: "row"}}>
            <Button title="Start AR exercise">
            </Button>
            <Button title= "Reviews">
            </Button>
        </View>

    </View>
    )
    
}

export { ExerciseDetails };