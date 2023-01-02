import React, { useState } from "react";
import { View, Text, ScrollView, Button, FlatList, SafeAreaView, TouchableOpacity } from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';
import { styles } from "../styles";
import { useNavigation } from "@react-navigation/native";


function ReviewsList(props) {
	let reviewsPlaceHolder = [
		<ReviewVideo/>,
		<ReviewVideo/>,
        <ReviewVideo/>,
	];
    const reviewsData = [
        {
        id: 1,
        title: "Review 1",
        date: "2020-08-29",
        },
        {
        id: 2,
        title: "Review 2",
        date: "2020-08-29",
        },
        {
        id: 3,
        title: "Review 3",
        date: "2020-08-29",
        },

    ]
	const [reviews, setReviews] = useState(reviewsData);
    const [date, setDate] = useState(new Date(1598051730000));

    const renderItem = ({item}) => (<ReviewVideo title={item.title}/>)
    
	return (
		<View style={styles.container2}>
			<Text style={styles.titleText}>{props.route.params.exerciseName}</Text>
            <View style={{flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderWidth: 0, width: "100%"}}>
                <Text style={{borderWidth: 0}}>Select date:</Text>
                <DateTimePicker mode="date" value={date} style={{borderWidth: 0}} />
                <Button title="All dates" style={{flex:1}}></Button>
            </View>
			
            <Text style={{alignSelf: "left"}}>Selected date: {date.toDateString()}</Text>
            <SafeAreaView>
            <FlatList 
            data={reviews}
            numColumns={2}
            renderItem={({item}) => {
                return <ReviewVideo title={item.title} date={item.date}></ReviewVideo>} 
            }               
            
            keyExtractor={(item) => item.id}
            />
                
            
            </SafeAreaView>
		</View>
	);
}



const ReviewVideo = (props) => {
    const navigation = useNavigation();
    return (
        <TouchableOpacity onPress={() => {
            navigation.navigate("ReviewVideoScreen")
        }}>
        <View style={styles.review}>
            <View style={styles.reviewVideo}>

            </View>
            <Text>
                {props.title}
            </Text>
            <Text>
                {props.date}
            </Text>
        </View>
        </TouchableOpacity>
    );
}

export { ReviewsList };
