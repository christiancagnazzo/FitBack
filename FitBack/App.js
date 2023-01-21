import { StatusBar } from "expo-status-bar";
import { SafeAreaView, StyleSheet, Text, View, Button } from "react-native";
import { styles, colors } from "./styles.js";
import { useNavigation } from '@react-navigation/native';
import { Homepage } from "./components/Homepage.js";
import { HomepageAfterSession } from "./components/HomepageAfterSession";

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
import { useEffect, useState } from "react";
import SideMenu from "react-native-side-menu-updated";
import LevelUp from "./components/LevelUp.js";
import Exercise from "./components/Exercises.js";
import Sidebar from "./components/Sidebar.js";
import {
  FrameYourself,
  ExecuteExercise,
  ExercisePaused,
} from "./components/Training.js";
import { Report } from "./components/ReportSession.js";
import { Profile } from "./components/Profile.js"
import { EditProfile } from "./components/EditProfile.js";
import { Settings } from "./components/Settings.js";
import dao from './persistence/dao';

const Stack = createNativeStackNavigator();

export default function App() {
  const [sidebar, setSidebar] = useState(false);
  const menu = <Sidebar setSidebar={setSidebar}></Sidebar>;
  const [db, setDb] = useState(null);
  const [user, setUser] = useState({});

  useEffect(() => {
    const openDb = async function () {
      const db = await dao.openDatabase()
      setDb(db)

      db.transaction((tx) => {
        tx.executeSql(
          'select * from users where id = 1',
          [],
          (_, result) => {
            setUser(result.rows._array[0])
          },
          (_, error) => console.log(error)
        );
      })
    }

    openDb()
  }, [])

  return (
    <NavigationContainer>
      {
        db ?
          <>
            <SideMenu
              onChange={(status) => setSidebar(status)}
              disableGestures={true}
              isOpen={sidebar}
              menu={menu}
              openMenuOffset={180}
            >
              <MyApp db={db} user={user} setSidebar={setSidebar} />
            </SideMenu>

          </> : null
      }


    </NavigationContainer>
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
    <>
      <StatusBar style="light" />

      <Stack.Navigator
        initialRouteName="Homepage">
        <Stack.Screen
          name="Profile"
          component={Profile}
          initialParams={{ 'db': props.db, 'user': props.user }}
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
          name="Settings"
          component={Settings}
          initialParams={{ 'db': props.db, 'user': props.user }}
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
          name="EditProfile"
          component={EditProfile}
          initialParams={{ 'db': props.db, 'user': props.user }}
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
          name="Homepage"
          component={Homepage}
          initialParams={{ 'db': props.db, 'user': props.user }}
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
          initialParams={{ 'db': props.db, 'user': props.user }}
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
          initialParams={{ 'db': props.db, 'user': props.user }}
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
          initialParams={{ 'db': props.db, 'user': props.user }}
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
          initialParams={{ 'db': props.db, 'user': props.user }}
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
          initialParams={{ 'db': props.db, 'user': props.user }}
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
          initialParams={{ 'db': props.db, 'user': props.user }}
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
          initialParams={{ 'db': props.db, 'user': props.user }}
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
          initialParams={{ 'db': props.db, 'user': props.user }}
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
          initialParams={{ 'db': props.db, 'user': props.user }}
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
          name="LevelUp"
          component={LevelUp}
          initialParams={{ 'db': props.db, 'user': props.user }}
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
          name="ReportSession"
          component={Report}
          initialParams={{ 'db': props.db, 'user': props.user }}
          options={{
            title: "FITBACK",
            headerStyle: styles.headerBar,
            headerTitleStyle: styles.headerText,
            headerTintColor: colors.lightGray,
            headerTitleAlign: "center",
            headerShown: true,
            headerLeft: () => (
              <View />)
          }}
        />

      </Stack.Navigator>
    </>
  );
}  
