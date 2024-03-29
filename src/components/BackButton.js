import React from 'react'
import { TouchableOpacity,StyleSheet } from 'react-native'
import { getStatusBarHeight } from 'react-native-status-bar-height'
import {AntDesign} from "@expo/vector-icons";

export default function BackButton({ goBack }) {
  return (
    <TouchableOpacity onPress={goBack} style={styles.container}>
      <AntDesign
          size={24}
          color="black"
        style={styles.image}
        name="left"
      />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 20 + getStatusBarHeight(),
    left: 10,
    width: 60,
    height: 60,
    flex:1,
    justifyContent: "center",
    alignContent: "center"
  },
  image: {
    alignSelf:"center"
  },
})
