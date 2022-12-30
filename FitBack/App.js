import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import {styles} from './styles.js'
import { Homepage } from './components/Homepage.js';
import { Navbar, MyStatusBar } from './components/Navbar.js';
import { useFonts } from 'expo-font';
import { LinearGradient } from 'expo-linear-gradient';

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
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <Navbar/>
      <SafeAreaView style={styles.container2}>
        <LinearGradient colors={['#D3D3D3','#FFFFFF']}>
          <Homepage />
        </LinearGradient>
      </SafeAreaView>
      
    </SafeAreaView>
  );
}

function MontSerratText(props) {
  return (
    <Text style={[styles.montSerratText, {color: props.color}, props.style]}>{props.text}</Text>
  )
}

export {MontSerratText};

