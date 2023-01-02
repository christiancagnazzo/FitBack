import { color, Header } from "@rneui/base";
import { View, Text } from "react-native";
import { styles, colors } from "../styles";
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';



function Navbar() {
    return (
        <View style={[styles.horizontalFlex, styles.headerBar]}>
          <MyMenu/>
          <Text style={styles.headerText}>FITBACK</Text>
          <MyMenu hidden={true}/>
    </View>
    );
  }

function MyMenu(props) {
  return (
    <Ionicons name="menu" size={38}color={colors.gray} style={{borderWidth: 0, borderColor: "red",alignSelf: 'center', width:50, height: 50}}/>
  )
}

function InfoButton(props) {
  return (
    <Ionicons name="information-circle-outline" size={38} color={colors.gray} />
  )
}




export {Navbar, MyMenu, InfoButton}