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
  const size = 48;
  return (
    props.hidden ? <Ionicons name="menu" size={size} color="black" style={styles.hide}/> : <Ionicons name="menu" size={size} color={colors.gray}/>
  )
}





export {Navbar}