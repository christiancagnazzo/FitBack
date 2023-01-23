import React, { useEffect, useState } from "react";
import {
	View,
	Text,
	ScrollView,
	Button,
	FlatList,
	SafeAreaView,
	TouchableOpacity,
	Platform,
	Modal,
	StyleSheet,
	Image,
	ImageBackground
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { styles } from "../styles";
import { useNavigation } from "@react-navigation/native";
import { MontSerratText } from "./Utility";
import Checkbox from "expo-checkbox";
import { colors } from "../styles.js"
import { MyButton } from "./Homepage";
import { Ionicons } from '@expo/vector-icons';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import DraggablePanel from "react-native-draggable-panel";
function ReviewsList(props) {
	const exercise = props.route.params.exercise
	/*
	const reviewsData = [
		{
			id: 1,
			title: "Revision 1",
			date: "2023-01-03",
			uri: require("../assets/video/thumbnail.png")
		},
		{
			id: 2,
			title: "Revision 2",
			date: "2023-01-03",
			uri: require("../assets/video/thumbnail.png")
		},
		{
			id: 3,
			title: "Revision 3",
			date: "2020-08-29",
		},
	];*/

	useEffect(() => {
		console.log("id: " + exercise.exercise)
		let param = 1
		let sql = `select * from reviews where user = ? and exercise = ?`
		props.route.params.db.transaction((tx) => {
			tx.executeSql(
				sql,
				[param, exercise.exercise],
				(_, result) => {
					let revisions = result.rows._array.map((item) => {
						item.uri = getPath(item.id)
						return item
					});
					setReviews(revisions)
				},
				(_, error) => console.log(error)
			);
		})

	}, [])

	function getPath(id) {
		if (id == 1) {
			return require("../assets/squat.png")
		}
		else if (id == 2) {
			return require("../assets/video/thumbnail.png")
		}
		else {
			return require("../assets/video/thumbnail.png")
		}
	}


	const [reviews, setReviews] = useState([]);
	const [date, setDate] = useState(null);
	const [isSelected, setSelection] = useState(false);
	const [showPopup, setShowPopup] = useState(true);
	const [preference, setPreference] = useState(false);
	const [showPopupInfo, setShowPopupInfo] = useState(false);
	const [showCalendar, setShowCalendar] = useState(false)

	useEffect(() => {
		props.route.params.db.transaction((tx) => {
			tx.executeSql(
				'select * from users where id = ?',
				[1],
				(_, res1) => {
					if (res1.rows._array[0].info_review == 1) {
						setShowPopup(false)
					}
					else {
						setShowPopup(true)
					}
				},
				(_, error) => console.log(error)
			)
		})
	}, [])

	useEffect(() => {
		props.route.params.db.transaction((tx) => {
			tx.executeSql(
				'select * from users where id = ?',
				[1],
				(_, res1) => {
					if (res1.rows._array[0].info_review == 1) {
						setShowPopup(false)
					}
					else {
						tx.executeSql(
							'update users set info_review = ? where id = ?',
							[preference, 1],
							(_, res1) => {
							},
							(_, error) => console.log(error)
						)
					}
				},
				(_, error) => console.log(error)
			)

		})
	}, [preference])



	const clickCheckbox = function (value) {
		setSelection(value);
	}
	useEffect(() => {
		// Use `setOptions` to update the button that we previously specified
		// Now the button includes an `onPress` handler to update the count
		props.navigation.setOptions({
			headerRight: () => (
				<TouchableOpacity title="info rewiews" onPress={() => setShowPopupInfo(true)}>
					<Ionicons name="information-circle-outline" size={38} color={colors.gray} />
				</TouchableOpacity>
			),
		});
	}, [props.navigation]);

	return (
		<View style={styles.container2}>
			<Text style={styles.titleText}>
				{exercise.title}
			</Text>
			<TouchableWithoutFeedback style={{ marginTop: 20 }} onPress={() => setShowCalendar(true)}>
				<View style={styles.filterCard}>
					<Text style={{ fontSize: 18, textAlign: "center", marginTop: 10, fontFamily: "BebasNeue" }}>FILTER FOR DATE</Text>
				</View>
			</TouchableWithoutFeedback>

			<Text style={{ fontSize: 17, fontStyle: "italic" }}>
				Selected date: {date ? date : "All dates"}
			</Text>

			<DraggablePanel borderRadius={10} visible={showCalendar} onDismiss={() => setShowCalendar(false)}>
				<Calendar onDayPress={day => {
					setShowCalendar(false)
					console.log(day)
					setDate(day.dateString);
				}}></Calendar>
				<Button onPress={() => { setDate(null); setShowCalendar(false) }} title="All Dates"></Button>
			</DraggablePanel>
			{/*<View
				style={{
					flexDirection: "row",
					alignItems: "center",
					justifyContent: "space-between",
					borderWidth: 0,
					width: "100%",
					margin: 10,
				}}
			>
				<Text style={{ borderWidth: 0, marginLeft: 10 }}>Select date:</Text>
				<MyDatePicker date={date} setDate={setDate} />
				<Button title="All dates" style={{ flex: 1 }} onPress={() => {
					setDate(null)
				}}></Button>
			</View>

			<Text style={styles.datePicker}>
				Selected date: {date ? date.toDateString() : "All dates"}
			</Text>*/}
			<SafeAreaView>

				{reviews.length === 0 ?
					<>
						<View style={{ alignItems: 'center', marginTop: 40 }}>
							<View style={{ width: 300, height: 300 }}>
								<Image style={{
									flex: 1,
									width: null,
									height: null,
									resizeMode: 'contain'
								}} source={require("../assets/noreview.png")}></Image>
							</View>
						</View>
						<View style={{ alignItems: 'center', }}>
							<Text style={{ fontWeight: "bold", fontSize: 30 }}>Nothing to review here!</Text>
						</View>

					</> :
					<FlatList style={{ marginTop: 40 }}
						ListEmptyComponent={<>
							<View style={{ alignItems: 'center', marginTop: 40 }}>
								<View style={{ width: 300, height: 300 }}>
									<Image style={{
										flex: 1,
										width: null,
										height: null,
										resizeMode: 'contain'
									}} source={require("../assets/noreview.png")}></Image>
								</View>
							</View>
							<View style={{ alignItems: 'center', }}>
								<Text style={{ fontWeight: "bold", fontSize: 30 }}>Nothing to review here!</Text>
							</View>
						</>}
						data={reviews.filter((review) => {
							if (date == null) {
								return true;
							}
							if (review.date == date) {
								return true;
							}
							else {
								return false
							}
						})}
						numColumns={2}
						renderItem={({ item }) => {
							return (

								<ReviewVideo
									uri={item.uri}
									title={item.title}
									date={item.date}
								></ReviewVideo>
							);
						}}
						keyExtractor={(item) => item.id}
					/>}
			</SafeAreaView>
			<Modal visible={showPopup} animationType="none" transparent={true}>
				<View style={pageStyles.centeredView}>
					<View style={pageStyles.modalView}>
						<Text

							style={pageStyles.whatAreReviews}
						>What are revisions?</Text>
						<MontSerratText
							style={pageStyles.whatAreReviewsText}
							text={
								"Revision show videos of your previous errors with a brief explanation"
							}
						></MontSerratText>
						<View style={pageStyles.checkboxContainer}>
							<Checkbox
								pageStyles={styles.checkbox}
								value={isSelected}
								onValueChange={clickCheckbox}
								color={isSelected ? "#4630EB" : undefined}
							/>
							<MontSerratText style={pageStyles.label} text={"Don't show this again"}>

							</MontSerratText>
						</View>
						<MyButton
							style={pageStyles.gotItButton}
							title={"Got it!"}
							onPressAction={() => { setShowPopup(false); setPreference(isSelected) }}
						></MyButton>
					</View>
				</View>
			</Modal>
			<Modal visible={showPopupInfo} animationType="none" transparent={true}>
				<View style={pageStyles.centeredView}>
					<View style={pageStyles.modalView}>
						<Text

							style={pageStyles.whatAreReviews}
						>What are revisions?</Text>
						<MontSerratText
							style={pageStyles.whatAreReviewsText}
							text={
								"Revision show videos of your previous errors with a brief explanation"
							}
						></MontSerratText>
						<View style={pageStyles.checkboxContainer}>

						</View>
						<MyButton
							style={pageStyles.gotItButton}
							title={"Got it!"}
							onPressAction={() => setShowPopupInfo(false)}
						></MyButton>
					</View>
				</View>
			</Modal>


		</View>
	);
}

function MyDatePicker(props) {
	const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
	const date = props.date;
	const setDate = props.setDate;

	const showDatePicker = () => {
		setDatePickerVisibility(true);
	};

	const hideDatePicker = () => {
		setDatePickerVisibility(false);
	};

	const handleDateSelectedAndroid = (event, value) => {
		hideDatePicker();
		setDate(value);
	};

	const handleDateSelectedIos = (event, value) => {
		setDate(value);
	};

	{
		if (Platform.OS === "ios") {
			return (
				<>

					<DateTimePicker
						onChange={handleDateSelectedIos}
						maximumDate={new Date()}
						mode="date"
						value={date ? date : new Date()}
					/>

				</>
			);
		} else {
			return (
				<>
					<Button title="Show date picker" onPress={showDatePicker}>
						Show date picker
					</Button>
					{isDatePickerVisible && (
						<DateTimePicker
							maximumDate={new Date().setHours(0, 0, 0, 0)}
							onCancel={hideDatePicker}
							onChange={handleDateSelectedAndroid}
							mode="date"
							value={date ? date : new Date()}
						/>
					)}
				</>
			);
		}
	}
}

const ReviewVideo = (props) => {
	const navigation = useNavigation();
	return (
		<TouchableOpacity
			onPress={() => {
				navigation.navigate("ReviewVideo");
			}}
		>
			<View style={styles.review}>
				<ImageBackground source={props.uri} style={{
					height: 288,
					backgroundColor: 'grey',
					width: 300,
					borderWidth: 1,
					borderColor: colors.darkGray,
					borderRadius: 10,
					justifyContent: "center", alignItems: "center"
				}} blurRadius={10}>
					<AntDesign name="play" size={100} color="#BA181B" />
				</ImageBackground>
				<Text style={{ fontSize: 20, fontWeight: "bold" }}>{props.title}</Text>
				<Text style={{ fontSize: 15 }}>{props.date}</Text>
			</View>
		</TouchableOpacity>
	);
};

const pageStyles = StyleSheet.create({
	centeredView: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	gotItButton: {
		backgroundColor: colors.red,
		marginTop: 10,
		width: 150,
		height: 60,
		borderRadius: 10,
		justifyContent: 'center',
		alignItems: "center",
	},
	whatAreReviews: {
		color: colors.darkGray,
		fontFamily: 'MontSerratBold',
		fontSize: 25,
		marginBottom: 15,
	},
	whatAreReviewsText: {
		fontSize: 18,
	},
	modalView: {
		margin: 20,
		backgroundColor: "white",
		borderRadius: 20,
		paddingBottom: 30,
		paddingHorizontal: 20,
		paddingTop: 20,
		alignItems: "center",
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5,
	},
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
	checkboxContainer: {
		flexDirection: "row",
		marginTop: 10,
		marginBottom: 10,
		alignItems: "center",
		alignSelf: "flex-start",
	},
	checkbox: {
		alignSelf: "center",
	},
	label: {
		margin: 8,
	},
});

export { ReviewsList };
