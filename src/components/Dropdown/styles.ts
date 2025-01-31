import { StyleSheet } from "react-native"; 

export const styles = StyleSheet.create({
    container: {
      backgroundColor: '#F0EFF4',
      padding: 10,
    },
    dropdown: {
      height: 55,
      borderColor: 'gray',
      borderWidth: 0.5,
      borderRadius: 8,
      paddingHorizontal: 8,
    },

    label: {
      position: 'absolute',
      backgroundColor: '#F0EFF4',
      left: 22,
      top: 2,
      zIndex: 999,
      paddingHorizontal: 8,
      fontSize: 14,
    },
    placeholderStyle: {
      fontSize: 16,
      marginLeft: 15,
    },
    selectedTextStyle: {
      fontSize: 16,
      marginLeft: 15,
    },
    iconStyle: {
      width: 20,
      height: 20,
    },
    inputSearchStyle: {
      height: 40,
      fontSize: 16,
    },
  });