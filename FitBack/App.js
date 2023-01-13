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
import { StartingSession } from "./components/TodaySessionStarting.js";
import { TutorialFrame } from "./components/Tutorial.js";
import { useState } from "react";
import SideMenu from "react-native-side-menu-updated";
import LevelUp from "./components/LevelUp.js";
import Exercise from "./components/Exercises.js";
import Sidebar from "./components/Sidebar.js";
import {
  FrameYourself,
  ExecuteExercise,
  ExercisePaused,
} from "./components/Training.js";

const Stack = createNativeStackNavigator();

export default function App() {
  const [sidebar, setSidebar] = useState(false);
  const menu = <Sidebar></Sidebar>;

  return (
    <SideMenu
      onChange={(status) => setSidebar(status)}
      disableGestures={true}
      isOpen={sidebar}
      menu={menu}
      openMenuOffset={180}
    >
      <MyApp setSidebar={setSidebar} />
    </SideMenu>
  );
}

function MyApp(props) {
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
            headerTitleAlign: "center",

            headerLeft: () => (
              <MyMenu
                setSidebar={props.setSidebar}
                setPrevSidebar={props.setPrevSidebar}
              />
            ),

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
			headerTitleAlign: "center",
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
			headerTitleAlign: "center",
            headerBackTitle: "Back",
            headerBackTitleStyle: styles.backButton,
            headerTintColor: colors.lightGray,

            headerRight: () => <InfoButton />,
          }}
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
        <Stack.Screen
          name="TodaySessionStarting"
          component={StartingSession}
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
        <Stack.Screen
          name="Tutorial"
          component={TutorialFrame}
          options={{
            title: "FITBACK",
            headerStyle: styles.headerBar,
            headerTitleStyle: styles.headerText,
            headerBackTitle: "Back",
            headerBackTitleStyle: styles.backButton,
            headerTintColor: colors.lightGray,
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="ExercisesList"
          component={Exercise}
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
          name="FrameYourself"
          component={FrameYourself}
          options={{
            title: "FITBACK",
            headerStyle: styles.headerBar,
            headerTitleStyle: styles.headerText,
            headerBackTitle: "Back",
            headerBackTitleStyle: styles.backButton,
            headerTintColor: colors.lightGray,
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="PauseExercise"
          component={ExercisePaused}
          options={{
            title: "FITBACK",
            headerStyle: styles.headerBar,
            headerTitleStyle: styles.headerText,
            headerBackTitle: "Back",
            headerBackTitleStyle: styles.backButton,
            headerTintColor: colors.lightGray,
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="ExecuteExercise"
          component={ExecuteExercise}
          options={{
            title: "FITBACK",
            headerStyle: styles.headerBar,
            headerTitleStyle: styles.headerText,
            headerBackTitle: "Back",
            headerBackTitleStyle: styles.backButton,
            headerTintColor: colors.lightGray,
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
