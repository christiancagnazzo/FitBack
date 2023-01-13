import { Text } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons';
import { ScrollView, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

function Sidebar() {
    return (
        <ScrollView scrollEnabled={false} style={{ "backgroundColor": "grey" }}>
            <TouchableWithoutFeedback style={{ justifyContent: 'center', alignItems: 'center', marginTop: 100 }}>
                <FontAwesome5 style={{ marginBottom: 10 }} name="user-circle" size={40} color="black" />
                <Text style={{  fontSize: 24, fontFamily: "BebasNeue" }}>Profile</Text>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback style={{ justifyContent: 'center', alignItems: 'center', marginTop: 30 }}>
                <SimpleLineIcons style={{ marginBottom: 10 }} name="settings" size={40} color="black" />
                <Text style={{  fontSize: 24, fontFamily: "BebasNeue" }}>Settings</Text>
                </TouchableWithoutFeedback>
        </ScrollView>

    )
}


export default Sidebar