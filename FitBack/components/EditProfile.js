import { View, Text } from "react-native"
import { MyButton } from "./Homepage"
import { Ionicons } from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native"
import {useState} from "react"
import { StyleSheet, TextInput } from "react-native"
import {styles, colors} from "../styles"
import {Picker} from '@react-native-picker/picker';

function EditProfile() {
    const [name, setName] = useState('John');
    const [surname, setSurname] = useState('');
    const [height, setHeight] = useState('');
    const [weight, setWeight] = useState('');
    const [age, setAge] = useState('0');
    const [sex, setSex] = useState('male');
    const navigation = useNavigation();
    
    const selectAge = function(age) {
        if (!isNaN(age)) {
            setAge(age);
        }

    }

    return (
        <View style={styles.container2}>
            <Text style={styles.titleText}>
				Edit Profile
			</Text>
            <View style={page_styles.form}>
            
            <FormField title={"Name"} value={name} setValue={setName}></FormField>
            <FormField title={"Surname"} value={surname} setValue={setSurname}></FormField>
            <FormField title={"Height"} value={height} setValue={setHeight}></FormField>
            <FormField title={"Weight"} value={weight} setValue={setWeight}></FormField>
            <FormField title={"Age"} value={age} setValue={selectAge}></FormField>

      <Text style={page_styles.sexText}>Sex</Text>
      <Picker
        selectedValue={sex}
        onValueChange={(itemValue, itemIndex) =>
            setSex(itemValue)
        }>
        <Picker.Item label="Male" value="Male" />
        <Picker.Item label="Female" value="Female" />
        <Picker.Item label="Other" value="Other" />
        </Picker>
      
            </View>
            <View style={page_styles.buttonFlex}>
            <MyButton onPressAction={() => navigation.navigate("EditProfile")} viewStyle={{alignSelf: "flex-start"}} style={page_styles.cancelButton} title="Cancel"></MyButton>
            <MyButton onPressAction={() => navigation.navigate("EditProfile")} viewStyle={{alignSelf: "flex-end"}} style={page_styles.button} title="Save"></MyButton>
            </View>
        </View>
    )
}

function FormField (props) {
    return (
        <View style={page_styles.flexForm}>
            <Text style={page_styles.boldText}>{props.title}</Text>
      <TextInput
        keyboardType="numeric"
        borderRadius={10}
        width={200}
        marginHorizontal={10}
        backgroundColor={colors.white}
        fontSize={25}
        value={props.value}
        onChangeText={(text) => props.setValue(text)}
      />
      </View>
    )
}

const page_styles = StyleSheet.create({
    sexText: {
        color: colors.darkGray,
        fontFamily: 'MontSerratBold',  
        fontSize: 25,
        alignSelf: "center",
    },
    boldText: {
        color: colors.darkGray,
        fontFamily: 'MontSerratBold',  
        fontSize: 25,
        width: 150,
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
    form: {
        alignSelf: "flex-start",
    },
    flexForm: {
        marginHorizontal: 15,
        flexDirection: "row",
        justifyContent: "space-around",
        alignSelf: "stretch",
        marginVertical: 10,
        alignSelf: "flex-start",
    }

})

export {EditProfile}