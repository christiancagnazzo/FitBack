import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import {styles} from './styles.js'
import { Homepage } from './components/Homepage.js';
import { HomepageAfterSession } from './components/HomepageAfterSession.js';
import { Navbar, MyStatusBar, MyMenu } from './components/Navbar.js';
import { useFonts } from 'expo-font';
import { FrameYourself } from './components/Training.js';
import { TutorialFrame } from './components/Tutorial.js';
import { LinearGradient } from 'expo-linear-gradient';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

export default function App() {
  const [loaded] = useFonts({
    Montserrat: require('./assets/fonts/Montserrat-Regular.ttf'),
    BebasNeue: require('./assets/fonts/BebasNeue-Regular.ttf'),
    MonteSerratBold: require('./assets/fonts/Montserrat-Bold.ttf'),
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
					component={HomepageAfterSession}
					options={{
						title: "Home",
						headerStyle: styles.headerBar,
						headerTitleStyle: styles.headerText,

            headerLeft: () => (
              <MyMenu/>
            ),
            
            headerRight: () => (<View />)
					}}
          
				/>
			</Stack.Navigator>
		</NavigationContainer>
  );
}

function MontSerratText(props) {
  return (
    <Text style={[styles.montSerratText, {color: props.color}, props.style]}>{props.text}</Text>
  )
}

export {MontSerratText};