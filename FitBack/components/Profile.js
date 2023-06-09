import { styles, colors } from "../styles";
import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { MontSerratText } from "./Utility";
import { StyleSheet } from "react-native";
import { MyButton } from "./Homepage";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";


function Profile(props) {
    const [level, setLevel] = useState("Beginner")

    useEffect(() => {
        props.route.params.db.transaction((tx) => {
            tx.executeSql(
                'select * from users where id = 1',
                [],
                (_, result) => {
                    setLevel(result.rows._array[0].level)
                   
                },
                (_, error) => console.log(error)
            );
        })
    }, [])


    const navigation = useNavigation();
    return (
        <View style={styles.container2}>
            <Text style={styles.titleText}>
                Profile
            </Text>
            <Ionicons name="person-circle-outline" size={200}></Ionicons>
            <View >
                <ProfileInfo title={"Name"} text={"John"}></ProfileInfo>
                <ProfileInfo title={"Surname"} text={"Smith"}></ProfileInfo>
                <ProfileInfo title={"Height"} text={"170 cm"}></ProfileInfo>
                <ProfileInfo title={"Age"} text={"18"}></ProfileInfo>
                <ProfileInfo title={"Sex"} text={"M"}></ProfileInfo>
                <ProfileInfo title={"Level"} text={level}></ProfileInfo>
            </View>
            <MyButton onPressAction={() => navigation.navigate("EditProfile")} viewStyle={{ alignSelf: "flex-end" }} style={page_styles.button} title="Edit"></MyButton>
        </View>
    )
}

function ProfileInfo(props) {
    return (
        <View style={page_styles.rowFlex}>

            <Text style={page_styles.boldText}>{props.title}:</Text>
            <Text>  </Text>
            <MontSerratText style={{ fontSize: 25 }} text={props.text}></MontSerratText>
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
        margin: 3
    },
    button: {
        backgroundColor: colors.red,
        margin: 30,
        width: 150,
        height: 60,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: "center"
    }
})
export { Profile }