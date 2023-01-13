import React, { useEffect, useState, useRef } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { Video } from "expo-av";
import { Button } from "react-native-elements";
import { colors } from "../styles.js";
import { Ionicons } from "@expo/vector-icons";
import { MontSerratText } from "./Utility.js";
import { ResizeMode } from "expo-av";


const ReviewVideo = () => {
	const video = useRef(null);
	const [status, setStatus] = useState({});
	const [showError, setShowError] = useState(false);
	const [percentage, setPercentage] = useState(0);

	useEffect(() => {
		if (status.isLoaded) {
			setPercentage((status.positionMillis/status.durationMillis*100).toString() + "%");
			if (status.positionMillis >= status.durationMillis/3 && status.positionMillis <= status.durationMillis/3*2 ) {
			
				setShowError(true);
			}
			else {
				setShowError(false);
			}
		}
		
	}, [status]);

	return (
		<View style={styles.container}>
			<View style={styles.overVideo1}>
				<MontSerratText
					text={"Exercise name"}
					color={colors.white}
				></MontSerratText>
				<MontSerratText
					text={"Exercise date"}
					color={colors.white}
				></MontSerratText>
			</View>
			
			{showError && (
				<View style={styles.overVideo2}>
					<View
						style={{
							flexDirection: "row",
							alignItems: "center",
							paddingHorizontal: 30,
						}}
					>
						<Ionicons
							size={48}
							color={colors.white}
							name="alert-circle-outline"
						></Ionicons>
						<MontSerratText
							text={"In this moment you disalign your elbow!"}
							color={colors.white}
							style={{ marginLeft: 5 }}
						></MontSerratText>
					</View>
				</View>
			)}
			
			<Video
				ref={video}
				style={styles.video}
				source={require("../assets/video/dancing_man.mp4")}
				useNativeControls={false}
				resizeMode="cover"
				isLooping
				onPlaybackStatusUpdate={(status) => setStatus(() => status)}
			/>
			<View style={styles.buttons}>
				<TouchableOpacity
					title={status.isPlaying ? "Pause" : "Play"}
					onPress={() =>
						status.isPlaying
							? video.current.pauseAsync()
							: video.current.playAsync()
					}
				>
				{status.isPlaying ? 
				<Ionicons color={colors.gray} size={100} name="pause-circle"></Ionicons> : <Ionicons  color={colors.gray}  size={100} name="play-circle"></Ionicons>}
				</TouchableOpacity>
			</View>
			
			<View style={[styles.fullBar, {backgroundColor: colors.red, width: percentage, zIndex:2}]}></View>
			<View style={styles.fullBar}></View>
			
			
		</View>
	);
};



const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		backgroundColor: colors.darkGray,
		paddingBottom: 20,
	},
	bar: {
		position: "absolute",
	},
	video: {
		position: "absolute",
		top: 0,
		left: 0,
		bottom: 0,
		right: 0,
	},
	overVideo1: {
		zIndex: 1,
		backgroundColor: colors.darkGray,
		padding: 40,
		borderWidth: 2,
		borderColor: colors.white,
		borderRadius: 20,
		alignItems: "center",
		paddingVertical: 10,
		opacity: 0.7,
		position: "absolute",
		bottom: 0,
		marginBottom: 45,
		marginLeft: 10,

		alignSelf: "flex-start",
	},
	overVideo2: {
		zIndex: 1,
		backgroundColor: colors.darkGray,
		width: "75%",
		borderWidth: 2,
		borderColor: colors.white,
		borderRadius: 20,
		alignItems: "center",
		paddingVertical: 10,
		opacity: 0.7,
		marginTop: 20,
	},
	buttons: {
		position: "absolute",
		marginBottom: 20,
		marginRight: 40,
		bottom: 0,
		alignSelf: "flex-end",
	},
	fullBar: {
		height: 10,
		backgroundColor: colors.gray,
		width: "100%",
		alignSelf: "flex-start",
		position: "absolute",
		bottom: 0,
	}
});
{
}

export { ReviewVideo };
