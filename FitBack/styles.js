import { StyleSheet } from 'react-native';

import { StatusBar } from 'expo-status-bar';

const colors = {
  black: '#0B090A',
  darkGray: '#161A1D',
  darkRed: '#660708',
  red: '#A4161A',
  strawberryRed: '#BA181B',
  lightRed: '#E5383B',
  midGray: '#B1A7A6',
  gray: '#D3D3D3',
  lightGray: '#F5F3F4',
  white: '#FFFFFF',
}

const styles = StyleSheet.create({
    myStatusBar: {
      backgroundColor: colors.darkGray,
    },
    montSerratText: {
      fontFamily: 'Montserrat',
    },
    headerText: {
      fontSize: 40,
      fontFamily : 'BebasNeue',
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
      flex:1,
      alignItems:'center',
      alignSelf:'stretch'
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
      fontSize: 30,
      fontWeight: "bold"
    },
    centerAligned: {
      alignItems: 'center'
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
      justifyContent: 'center',
      alignItems: "center",
    },
    exerciseBoxAndText: {
      alignItems: 'center',
    },
    backButton: {
      color: colors.darkGray,
      fontFamily: 'Montserrat',
    }
  });



export {styles, colors}