import { styles, colors } from "../styles";
import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { MontSerratText } from "./Utility";
import { StyleSheet } from "react-native";
import { MyButton } from "./Homepage";
import { useNavigation } from "@react-navigation/native";


function Profile() {
    const navigation = useNavigation();
    return (
        <View style={styles.container2}>
            <Text style={styles.titleText}>
				Profile
			</Text>
            <Ionicons name="person-circle-outline" size={200}></Ionicons>
            <ProfileInfo title={"Name"} text={"John"}></ProfileInfo>
            <ProfileInfo title={"Surname"} text={"Smith"}></ProfileInfo>
            <ProfileInfo title={"Height"} text={"170 cm"}></ProfileInfo>
            <ProfileInfo title={"Age"} text={"18"}></ProfileInfo>
            <ProfileInfo title={"Sex"} text={"M"}></ProfileInfo>
            <Text style={page_styles.boldText}>Level</Text>
            <Text style={page_styles.boldText}>INTERMEDIATE</Text>
            <MyButton onPressAction={() => navigation.navigate("EditProfile")} viewStyle={{alignSelf: "flex-end"}} style={page_styles.button} title="Edit"></MyButton>
        </View>
    )
}

function ProfileInfo(props) {
    return (
        <View style={page_styles.rowFlex}>

            <Text style={page_styles.boldText}>{props.title}:</Text>
            <Text>  </Text>
            <MontSerratText style={{fontSize: 25}}text={props.text}></MontSerratText>
        </View>
    )
}


const page_styles = StyleSheet.create({
    boldText: {
        color: colors.darkGray,
        fontFamily: 'MontSerratBold',  
        fontSize: 25,
      },
    rowFlex: {
        flexDirection: "row",
        alignSelf: "flex-start",
    },
    button: {
        backgroundColor: colors.red,
        marginTop: 10,
        width: 150,
        height: 60,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: "center"
    }
})
export {Profile}