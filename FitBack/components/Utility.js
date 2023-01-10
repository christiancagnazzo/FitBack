import {Text} from 'react-native';
import {colors, styles} from '../styles.js'

function MontSerratText(props) {
	return (
		<Text
			style={[styles.montSerratText, { color: props.color }, props.style]}
		>
			{props.text}
		</Text>
	);
}

export { MontSerratText };
