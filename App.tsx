import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import StartPage from "./components/StartPage";
import { useState } from "react";

export default function App() {
  const [showStartPage, toggleStartPage] = useState(true);
  return (
    <View style={styles.main}>
      {showStartPage && <StartPage></StartPage>}
      <StatusBar style="light" />
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    position: "relative",
    backgroundColor: "black",
    height: "100%",
    width: "100%",
  },
});
