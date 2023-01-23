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
  ExecuteSingleExercise,
} from "./components/Training.js";
import { Report, ReportSingleExercise } from "./components/ReportSession.js";
import { Profile } from "./components/Profile.js"
import { EditProfile } from "./components/EditProfile.js";
import { Settings } from "./components/Settings.js";
import dao from './persistence/dao';
import * as SQLite from 'expo-sqlite';
import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();//Ignore all log notifications

const Stack = createNativeStackNavigator();

export default function App() {
  const [sidebar, setSidebar] = useState(false);
  const [db, setDb] = useState(SQLite.openDatabase('fitback.db'));
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [resetDb, setResetDb] = useState(false)
  const menu = <Sidebar setSidebar={setSidebar} user={user}></Sidebar>;


/*
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
  */

  useEffect(() => {

    if (resetDb) {
      console.log('elimino tabelle')

      db.transaction(tx => {
       tx.executeSql("DROP TABLE exercises",
       [],
       (_, res) =>{console.log(res)},
       (_, err) =>{console.log(err)}
       )
    });

    db.transaction(tx => {
      tx.executeSql("DROP TABLE users",
      [],
      (_, res) =>{console.log(res)},
      (_, err) =>{console.log(err)}
      )
    });

    db.transaction(tx => {
      tx.executeSql("DROP TABLE userExercise",
      [],
      (_, res) =>{console.log(res)},
      (_, err) =>{console.log(err)} )
    });

    db.transaction(tx => {
      tx.executeSql("DROP TABLE reviews",
      [],
      (_, res) =>{console.log(res)},
      (_, err) =>{console.log(err)} )
    });

    db.transaction(tx => {
      tx.executeSql("DROP TABLE equipments",
      [],
      (_, res) =>{console.log(res)},
      (_, err) =>{console.log(err)} )
    });

    db.transaction(tx => {
      tx.executeSql("DROP TABLE muscles",
      [],
      (_, res) =>{console.log(res)},
      (_, err) =>{console.log(err)} )
    });

    db.transaction(tx => {
      tx.executeSql("DROP TABLE exerciseEquipment",
      [],
      (_, res) =>{console.log(res)},
      (_, err) =>{console.log(err)} )
    });
  
    setResetDb(false)
    }
    
    db.transaction(tx => {
      tx.executeSql('CREATE TABLE IF NOT EXISTS "exercises"(\
        "id"    INTEGER,\
        "title" TEXT,\
        "difficulty"    TEXT,\
        "ar_video_path" TEXT,\
        "image_path"    TEXT,\
        "description"   TEXT,\
        PRIMARY KEY("id" AUTOINCREMENT))',
        [],
        (_, res) =>{console.log(res)},
        (_, err) =>{console.log(err)}
        )
    });

    db.transaction(tx => {
      tx.executeSql( 'CREATE TABLE IF NOT EXISTS "users"(\
        "id"    INTEGER,\
        "name"  TEXT,\
        "surname"   TEXT,\
        "height"    TEXT,\
        "age"   INTEGER,\
        "sex"   TEXT,\
        "level" TEXT,\
        "info_review"   INTEGER,\
        "sessiondone" INTEGER, \
        PRIMARY KEY("id" AUTOINCREMENT))'
        ,
       [],
       (_, res) =>{console.log(res)},
       (_, err) =>{console.log(err)})
    });

    
      db.transaction(tx => {
        tx.executeSql('CREATE TABLE IF NOT EXISTS "userExercise"(\
          "id"    INTEGER,\
          "exercise"  INTEGER,\
          "user"  INTEGER,\
          "evaluation"    INTEGER,\
          FOREIGN KEY("exercise") REFERENCES "exercises"("id") on DELETE CASCADE ON UPDATE CASCADE, \
          FOREIGN KEY("user") REFERENCES "users"("id") on DELETE CASCADE ON UPDATE CASCADE, \
          PRIMARY KEY("id" AUTOINCREMENT))'
          ,
       [],
       (_, res) =>{console.log(res)},
       (_, err) =>{console.log(err)}
       )
      });

      db.transaction(tx => {
        tx.executeSql('CREATE TABLE IF NOT EXISTS "reviews"(\
                "id"    INTEGER,\
                "exercise"  INTEGER,\
                "title" TEXT,\
                "date" TEXT,\
                "message" TEXT,\
                "user"  INTEGER,\
                "pathvideo"    TEXT,\
                "paththumbnail"   TEXT,\
                PRIMARY KEY("id" AUTOINCREMENT))',
                [],
                (_, res) =>{console.log(res)},
                (_, err) =>{console.log(err)})
      });

      db.transaction(tx => {
        tx.executeSql('CREATE TABLE IF NOT EXISTS "equipments"(\
          "id"    INTEGER,\
          "name"  INTEGER,\
          "path_foto" TEXT,\
          PRIMARY KEY("id" AUTOINCREMENT))',
          [],
          (_, res) =>{console.log(res)},
          (_, err) =>{console.log(err)})
      });

      db.transaction(tx => {
        tx.executeSql('CREATE TABLE IF NOT EXISTS "muscles"(\
          "id"    INTEGER,\
          "name"  INTEGER,\
          "path_foto" TEXT,\
          PRIMARY KEY("id" AUTOINCREMENT))',
          [],
          (_, res) =>{console.log(res)},
          (_, err) =>{console.log(err)})
      });

      db.transaction(tx => {
        tx.executeSql('CREATE TABLE IF NOT EXISTS "exerciseMuscle"(\
          "id"    INTEGER,\
          "exercise"  INTEGER,\
          "muscle"    INTEGER,\
          FOREIGN KEY("exercise") REFERENCES "exercises"("id") on DELETE CASCADE ON UPDATE CASCADE, \
          FOREIGN KEY("muscle") REFERENCES "muscles"("id") on DELETE CASCADE ON UPDATE CASCADE, \
          PRIMARY KEY("id" AUTOINCREMENT))',
          [],
          (_, res) =>{console.log(res)},
          (_, err) =>{console.log(err)})
      });

      db.transaction(tx => {
        tx.executeSql('CREATE TABLE IF NOT EXISTS "exerciseEquipment"(\
          "id"    INTEGER,\
          "exercise"  INTEGER,\
          "equipment" INTEGER,\
          FOREIGN KEY("exercise") REFERENCES "exercises"("id") on DELETE CASCADE ON UPDATE CASCADE, \
          FOREIGN KEY("equipment") REFERENCES "equipments"("id") on DELETE CASCADE ON UPDATE CASCADE, \
          PRIMARY KEY("id" AUTOINCREMENT))',
          [],
          (_, res) =>{console.log(res)},
          (_, err) =>{console.log(err)})
      });

      db.transaction(tx => {
        tx.executeSql("INSERT OR IGNORE INTO users VALUES (1, 'Antonio', 'Cassano', '170', 24, 'M', 'Beginner', 0, 0)")
      });

      
      db.transaction(tx => {
        tx.executeSql("INSERT OR IGNORE INTO exercises VALUES (1, 'Squat', 'Beginner', 'video_path', 'squat', 'A squat is a strength exercise in which the trainee lowers their hips from a standing position and then stands back up. During the descent the hip and knee joints flex while the ankle joint dorsiflex. During the ascent  the hip and knee joints extend and the ankle joint plantarflexes')")
      });

      
      db.transaction(tx => {
        tx.executeSql("INSERT OR IGNORE INTO exercises VALUES (2, 'Push-up', 'Advanced', 'video_path', 'pushup', 'Push-ups are exercises where you have to keep a prone position: hands palms down under the shoulders balls of the feet on the ground back straight. In this position you pushes the body up and lets it down by an alternate straightening and bending of the arm')")
      });

      db.transaction(tx => {
        tx.executeSql("INSERT OR IGNORE INTO exercises VALUES (3, 'Lateral Lunges', 'Intermediate', 'video_path', 'lunges', 'The lateral lunge involves a step out to the side instead of forward or back. Muscles involvment. Because of the lateral movement pattern, the inside groin muscles (the adductors) are more active in this variation than in the other types of lunges')"
        )
      });

      db.transaction(tx => {
        tx.executeSql("INSERT OR IGNORE INTO exercises VALUES (4, 'Lift Right Arm', 'Beginner', 'video_path', 'lift', 'This exercise is very simple and is used for arm muscles. It consists of lateral arm raises without weight and therefore is suitable for beginner level users')")
      });

      db.transaction(tx => {
        tx.executeSql("INSERT OR IGNORE INTO muscles VALUES (1, 'Biceps', 'path')")
      });

      db.transaction(tx => {
        tx.executeSql("INSERT OR IGNORE INTO muscles VALUES (2, 'Quadriceps', 'path')")
      });

      db.transaction(tx => {
        tx.executeSql("INSERT OR IGNORE INTO muscles VALUES (3, 'Calf', 'path')")
      });

      db.transaction(tx => {
        tx.executeSql("INSERT OR IGNORE INTO exerciseMuscle VALUES (1, 1, 2)")
      });

      db.transaction(tx => {
        tx.executeSql(   
          "INSERT OR IGNORE INTO exerciseMuscle VALUES (2, 1, 3)")
      });

      db.transaction(tx => {
        tx.executeSql(   
          "INSERT OR IGNORE INTO exerciseMuscle VALUES (3, 2, 1)")
      });

      db.transaction(tx => {
        tx.executeSql(   
          "INSERT OR IGNORE INTO exerciseMuscle VALUES (4, 3, 2)")
      });

      db.transaction(tx => {
        tx.executeSql(   
          "INSERT OR IGNORE INTO exerciseMuscle VALUES (5, 3, 3)")
      });

      db.transaction(tx => {
        tx.executeSql(   
          "INSERT OR IGNORE INTO exerciseMuscle VALUES (6, 4, 1)")
      });

      db.transaction(tx => {
        tx.executeSql("INSERT OR IGNORE INTO equipments VALUES (1, 'Dummbell', 'path')")
      });

      db.transaction(tx => {
        tx.executeSql("INSERT OR IGNORE INTO equipments VALUES (2, 'Kettlebell', 'path')")
      });

      db.transaction(tx => {
        tx.executeSql("INSERT OR IGNORE INTO equipments VALUES (3, 'Mat', 'path')")
      });

      db.transaction(tx => {
        tx.executeSql("INSERT OR IGNORE INTO exerciseEquipment VALUES (1, 2, 3)")
      });

      db.transaction(tx => {
        tx.executeSql("INSERT OR IGNORE INTO exerciseEquipment VALUES (2, 3, 3)")
      });

      db.transaction(tx => {
        tx.executeSql("INSERT OR IGNORE INTO exerciseEquipment VALUES (3, 1, 2)")
      });

      db.transaction(tx => {
        tx.executeSql("INSERT OR IGNORE INTO exerciseEquipment VALUES (4, 4, 3)")
      });
   

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


    setIsLoading(false);
  }, [db, resetDb]);

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <NavigationContainer>
          <>
            <SideMenu
              onChange={(status) => setSidebar(status)}
              disableGestures={true}
              isOpen={sidebar}
              menu={menu}
              openMenuOffset={180}
              resetDb = {resetDb}
              setResetDb = {setResetDb}
            >
              <MyApp db={db} user={user} setSidebar={setSidebar} setResetDb = {setResetDb} />
            </SideMenu>

          </>
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
          initialParams={{ 'db': props.db, 'user': props.user, 'resetDb': props.resetDb, 'setResetDb' : props.setResetDb }}
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
          name="ExecuteSingleExercise"
          component={ExecuteSingleExercise}
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
        <Stack.Screen
          name="ReportSingleExercise"
          component={ReportSingleExercise}
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
