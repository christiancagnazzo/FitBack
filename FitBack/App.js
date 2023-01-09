import { StatusBar } from "expo-status-bar";
import { SafeAreaView, StyleSheet, Text, View, Button } from "react-native";
import { styles, colors } from "./styles.js";
import { Homepage } from "./components/Homepage.js";
import {
	Navbar,
	MyStatusBar,
	MyMenu,
	InfoButton,
} from "./components/Navbar.js";
import { useFonts } from "expo-font";
import { LinearGradient } from "expo-linear-gradient";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ExerciseDetails } from "./components/ExerciseDetails.js";
import { ReviewsList } from "./components/ReviewsList.js";
import { ReviewVideo } from "./components/ReviewVideo.js";
import { useState } from "react";

const Stack = createNativeStackNavigator();

export default function App() {
	const [prova, setProva] = useState("prova")

	const [loaded] = useFonts({
		Montserrat: require("./assets/fonts/Montserrat-Regular.ttf"),
		BebasNeue: require("./assets/fonts/BebasNeue-Regular.ttf"),
		MontSerratBold: require("./assets/fonts/Montserrat-Bold.ttf"),
	});

	if (!loaded) {
		return null;
	}
	

	

	return (
		<NavigationContainer>
			<StatusBar style="light" />

			<Stack.Navigator>
				<Stack.Screen
					name="Homepage"
					component={Homepage}
					options={{
						title: "FITBACK",
						headerStyle: styles.headerBar,
						headerTitleStyle: styles.headerText,
						headerTitleAlign: 'center',
						
						headerLeft: () => <MyMenu />,

						headerRight: () => <View />,
					}}
				/>
				<Stack.Screen
					name="ExerciseDetails"
					component={ExerciseDetails}
					options={{
						title: "FITBACK",
						headerStyle: styles.headerBar,
						headerTitleStyle: styles.headerText,
						headerBackTitle: "Back",
						headerBackTitleStyle: styles.backButton,
						headerTintColor: colors.lightGray,
					}}
				/>
				<Stack.Screen
					name="ReviewsList"
					component={ReviewsList}
					options={{
						title: "FITBACK",
						headerStyle: styles.headerBar,
						headerTitleStyle: styles.headerText,
						headerBackTitle: "Back",
						headerBackTitleStyle: styles.backButton,
						headerTintColor: colors.lightGray,
						
						headerRight: () => <InfoButton/>,
					}}
					initialParams= {{prova: prova, setProva: setProva}}
				/>
				<Stack.Screen
				name="ReviewVideo"
				component={ReviewVideo}
				options={{
					title: "FITBACK",
						headerStyle: styles.headerBar,
						headerTitleStyle: styles.headerText,
						headerBackTitle: "Back",
						headerBackTitleStyle: styles.backButton,
						headerTintColor: colors.lightGray,
						headerShown: true,
				}}
				/>
					
			</Stack.Navigator>
		</NavigationContainer>
	);
}

