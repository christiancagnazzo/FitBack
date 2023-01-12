import { StyleSheet } from "react-native";

import { StatusBar } from "expo-status-bar";

const colors = {
  black: "#0B090A",
  darkGray: "#161A1D",
  darkRed: "#660708",
  red: "#A4161A",
  strawberryRed: "#BA181B",
  lightRed: "#E5383B",
  midGray: "#B1A7A6",
  gray: "#D3D3D3",
  lightGray: "#F5F3F4",
  white: "#FFFFFF",
  green: "#adff2f"
};

const styles = StyleSheet.create({
  myStatusBar: {
    backgroundColor: colors.darkGray,
  },
  montSerratText: {
    fontFamily: 'Montserrat',
  },
  headerText: {
    fontSize: 40,
    fontFamily: 'BebasNeue',
    color: colors.red,
  },
  hide: {
    opacity: 0,
  },
  horizontalFlex: {
    flexDirection: "row",
    alignItems: 'center',
    alignSelf: 'stretch',
    justifyContent: 'space-between',
  },
  horizontalFlexReverse: {
    flexDirection: "row-reverse",
    alignItems: 'center',
    alignSelf: 'stretch',
    justifyContent: 'space-between',
  },
  headerBar: {
    backgroundColor: colors.darkGray,

  },
  container: {
    backgroundColor: colors.darkGray,

  },
  container2: {
    flex: 1,
    alignItems: 'center',
    alignSelf: 'stretch',
    backgroundColor: colors.lightGray,
  },
  primaryButton: {
    backgroundColor: colors.red,
    marginBottom: 20,
    width: 160,
    height: 60,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: "center",
  },
  secondaryButton: {
    backgroundColor: colors.darkGray,
    marginBottom: 20,
    width: 160,
    height: 60,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: "center",
  },
  exerciseDetailsButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignSelf: "stretch",
    marginHorizontal: 15
  },
  homepage: {
    marginTop: 30,
    flexDirection: "column",
    alignItems: 'center',
  },
  homepageButton: {
    backgroundColor: colors.darkGray,
    marginBottom: 30,
    width: 250,
    height: 90,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: "center",
  },
  HomeButtonText: {
    fontSize: 20,
  },
  titleText: {
    color: colors.darkGray,
    fontFamily: 'MontSerratBold',
    fontSize: 30,
  },
  centerAligned: {
    alignItems: 'center'
  },
  reviewVideo: {
    height: 288,
    width: 162,
    borderWidth: 1,
    borderColor: colors.darkGray,
    borderRadius: 10,
  },
  reviewContainer: {
    marginTop: 20,
    flexDirection: "row",

  },
  datePicker: {
    alignSelf: 'flex-start',
  },
  review: {
    marginHorizontal: 15,
    flexDirection: "column",
    alignItems: 'center',
  },
  exerciseBoxPhoto: {
    height: 100,
    width: 100,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.darkGray,
  },
  startARTrainingButton: {
    backgroundColor: colors.red,
    marginTop: 10,
    width: 150,
    height: 60,
    borderRadius: 10,
    marginRight: 25,
    justifyContent: 'center',
    alignItems: "center",
  },
  exerciseBoxAndText: {
    alignItems: 'center',
  },
  backButton: {
    color: colors.darkGray,
    fontFamily: 'Montserrat',
  },
  cardStyle: {
    cardContainer: {
      marginVertical: 20,
      width: 350,
      borderRadius: 10,
      borderWidth: 1,
    },
    cardHeader: {
      backgroundColor: colors.darkGray,
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
      height: 30,
      justifyContent: 'center',
      alignItems: 'center',
    },
    cardHeaderText: {
      color: colors.white,
      fontFamily: 'MontSerratBold',
    },
    cardBody: {
      backgroundColor: colors.white,
      borderBottomLeftRadius: 10,
      borderBottomRightRadius: 10,
      padding: 10,
    }},
    myStatusBar: {
      backgroundColor: colors.darkGray,
    },
    headerText: {
      fontSize: 40,
      fontFamily: "BebasNeue",
      color: colors.red,
    },
    hide: {
      opacity: 0,
    },
    horizontalFlex: {
      flexDirection: "row",
      alignItems: "center",
      alignSelf: "stretch",
      justifyContent: "space-between",
    },
    horizontalFlexReverse: {
      flexDirection: "row-reverse",
      alignItems: "center",
      alignSelf: "stretch",
      justifyContent: "space-between",
    },
    headerBar: {
      backgroundColor: colors.darkGray,
    },
    container: {
      backgroundColor: colors.darkGray,
      flex: 1,
    },
    container2: {
      flex: 1,
      alignItems: "center",
      alignSelf: "stretch",
    },
    homepage: {
      flexDirection: "column",
      alignItems: "center",
    },
    homepageButton: {
      backgroundColor: colors.darkGray,
      marginBottom: 30,
      width: 250,
      height: 90,
      borderRadius: 10,
      justifyContent: "center",
      alignItems: "center",
    },
    HomeButtonText: {
      fontSize: 20,
    },
    titleText: {
      fontSize: 30,
      fontWeight: "bold",
    },
    centerAligned: {
      alignItems: "center",
    },
    exerciseBox: {
      backgroundColor: colors.lightGray,
      height: 100,
      width: 100,
      borderWidth: 1,
      borderColor: colors.darkGray,
      borderRadius: 10,
    },
    startARTrainingButton: {
      backgroundColor: colors.red,
      marginTop: 10,
      width: 150,
      height: 60,
      borderRadius: 10,
      marginRight: 25,
      justifyContent: "center",
      alignItems: "center",
    },
    exitButton: {
      backgroundColor: colors.darkGray,
      marginLeft: 20,
      width: 150,
      height: 60,
      borderRadius: 10,
      marginRight: 25,
      justifyContent: "center",
      alignItems: "center",
    },
    bottomView: {
      flex: 1,
      width: "100%",
      position: "absolute", //Here is the trick
      bottom: 10, //Here is the trick
    },
    containerMain: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
    textStyle: {
      color: "#fff",
      fontSize: 18,
    },
    externalRectangleFrame: {
      borderWidth: 3,
      borderColor: colors.white,
      flex: 1,
      margin: 20,
      marginBottom: 80,
    },
    rectangleFrameYourSelfTitle: {
      margin: 20,
      alignItems: "center",
      borderWidth: 3,
      borderColor: colors.white,
      borderRadius: 10,
    },
    ectangleRotateToSee: {
      margin: 40,
      alignItems: "center",
      borderWidth: 3,
      borderColor: colors.black,
      borderRadius: 10,
    },
    rectangleRotateToSee1: {
      margin: 40,
      alignItems: "center",
      borderWidth: 3,
      borderColor: colors.white,
      borderRadius: 10,
    },
    container3: {
      flex: 1,
      justifyContent: 'center',
    },
    camera: {
      flex: 1,
    },
    buttonContainer: {
      flex: 1,
      flexDirection: 'row',
      backgroundColor: 'transparent',
      margin: 64,
    },
    button: {
      flex: 1,
      alignSelf: 'flex-end',
      alignItems: 'center',
    },
    text: {
      fontSize: 24,
      fontWeight: 'bold',
      color: 'white',
    },
    textStartingSession: {
      fontSize: 30,
      fontWeight: 'bold',
      color: 'black',
      margin: 35,
      alignSelf: "center"
    },
    textFrameYouself: {
      margin: 10,
      color: colors.white,
      fontSize: 20,
      fontWeight: "bold",
      textAlign: "center",
    },
    textRotateToSee: {
      margin: 10,
      color: colors.black,
      fontSize: 20,
      fontWeight: "bold",
      textAlign: "center",
    },
    FinishedTrainingImage: {
      flex: 1
    },
    switchText: {
      margin: 10,
      color: colors.black,
      fontSize: 20,
      fontWeight: "bold",
      textAlign: "center",
    },
    exitButton: {
      backgroundColor: colors.darkGray,
      marginLeft: 20,
      width: 150,
      height: 60,
      borderRadius: 10,
      marginRight: 25,
      justifyContent: "center",
      alignItems: "center",
    },
    bottomView: {
      flex: 1,
      width: "100%",
      position: "absolute", //Here is the trick
      bottom: 10, //Here is the trick
    },
    alreadyFinishedBox: {
      backgroundColor: colors.lightGray,
      height: 150,
      width: 350,
      borderWidth: 1,
      borderColor: colors.darkGray,
      borderRadius: 15,
      justifyContent: "center",
      alignItems: "center",
      alignContent: "center"
    },
    startSession: {
      backgroundColor: colors.red,
      marginTop: 10,
      width: 150,
      height: 60,
      borderRadius: 10,
      marginRight: 25,
      justifyContent: "center",
      alignItems: "center",
      alignSelf: "flex-end"
    },
    switchButton: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center"
    },
    textStyle: {
      color: "#fff",
      fontSize: 18,
    },
    externalRectangleFrameRed: {
      borderWidth: 10,
      borderColor: colors.red,
      flex: 1,
      margin: 20,
      marginBottom: 80,
    },
    externalRectangleFrameGreen: {
      borderWidth: 10,
      borderColor: colors.green,
      flex: 1,
      margin: 20,
      marginBottom: 80,
    },
    rectangleFrameYourSelfTitle: {
      margin: 20,
      alignItems: "center",
      borderWidth: 3,
      borderColor: colors.white,
      borderRadius: 10,
    },
    rectangleRotateToSee: {
      margin: 40,
      alignItems: "center",
      borderWidth: 3,
      borderColor: colors.black,
      borderRadius: 10,
    },
    rectangleRotateToSee1: {
      margin: 40,
      alignItems: "center",
      borderWidth: 3,
      borderColor: colors.white,
      borderRadius: 10,
    },
    container3: {
      flex: 1,
      justifyContent: 'center',
    },
    camera: {
      flex: 1,
    },
    buttonContainer: {
      flex: 1,
      flexDirection: 'row',
      backgroundColor: 'transparent',
      margin: 64,
    },
    button: {
      flex: 1,
      alignSelf: 'flex-end',
      alignItems: 'center',
    },
    text: {
      fontSize: 24,
      fontWeight: 'bold',
      color: 'white',
    },
    textStartingSession: {
      fontSize: 30,
      fontWeight: 'bold',
      color: 'black',
      margin: 35,
      alignSelf: "center"
    },
    textFrameYouself: {
      margin: 10,
      color: colors.white,
      fontSize: 20,
      fontWeight: "bold",
      textAlign: "center",
    },
    textRotateToSee: {
      margin: 10,
      color: colors.black,
      fontSize: 20,
      fontWeight: "bold",
      textAlign: "center",
    },
    FinishedTrainingImage: {
      flex: 1
    },
    switchText: {
      margin: 10,
      color: colors.black,
      fontSize: 20,
      fontWeight: "bold",
      textAlign: "center",
    }
  });

export { styles, colors };