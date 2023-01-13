import {View, Text} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles, colors } from "../styles";
import { StyleSheet } from 'react-native';
import { MontSerratText } from './Utility';
import { MyButton } from "./Homepage";

function Settings() {
    return (
        <View style={styles.container2}>
            <Text style={styles.titleText}>
				Settings
			</Text>
            <Ionicons name="settings" size={200}></Ionicons>
            <SettingsRow title={"Language"} text={"English"}></SettingsRow>
            <SettingsRow title={"Font size"} text={"32"}></SettingsRow>
            <SettingsRow title={"Notifications"} text={"On"}></SettingsRow>
            <View style={page_styles.buttonFlex}>
            <MyButton  viewStyle={{alignSelf: "flex-start"}} style={page_styles.cancelButton} title="Cancel"></MyButton>
            <MyButton viewStyle={{alignSelf: "flex-end"}} style={page_styles.button} title="Save"></MyButton>
            </View>
        </View>
    )
}

function SettingsRow (props) {
    return (
        <View style={page_styles.rowFlex}>
            <Text style={page_styles.boldText}>{props.title}:</Text>
            <Text>  </Text>
            <MontSerratText style={{fontSize: 25, backgroundColor: colors.white, width: 150, textAlign: "center"}}text={props.text}></MontSerratText>
        </View>
    )
}

const page_styles = StyleSheet.create({
    boldText: {
        color: colors.darkGray,
        fontFamily: 'MontSerratBold',  
        fontSize: 25,
        width: 200,
      },
    rowFlex: {
        marginVertical: 10,
        flexDirection: "row",
        alignSelf: "flex-start",
        justifyContent: "space-around",
        alignSelf: "stretch",
    },
    button: {
        backgroundColor: colors.red,
        marginTop: 10,
        width: 150,
        height: 60,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: "center"
    },
    cancelButton: {
        backgroundColor: colors.darkGray,
        marginTop: 10,
        width: 150,
        height: 60,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: "center"
    },
    buttonFlex: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignSelf: "stretch",
        marginHorizontal: 15
    },
});
export {Settings}