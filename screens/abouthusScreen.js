import React from "react";
import { View, Text, StyleSheet } from "react-native";


class AbouthusScreen extends React.Component {
  constructor(props) {
    super()
  }
  render() {
    return (<View style={styles.container}><Text>Hakkımızda</Text></View>) 
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    fontSize:22,
    justifyContent: "center",
    alignItems: "center",
  }
})

export default AbouthusScreen