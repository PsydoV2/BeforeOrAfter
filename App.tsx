import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import StartPage from "./components/StartPage";
import { useState } from "react";

export default function App() {
  const [showStartPage, toggleStartPage] = useState(true);
  return (
    <View style={styles.main}>
      {showStartPage && (
        <StartPage handelToggle={() => toggleStartPage(false)}></StartPage>
      )}
      <StatusBar style="light" />

      <View style={styles.topMovieCon}>
        <Text style={styles.movieTitle}>"Movie Name"</Text>
        <Text>has</Text>
        <Text>234234 Views</Text>
        <Text>blablabla</Text>
      </View>
      <View style={styles.divider}>
        <Text style={styles.dividerText}>VS</Text>
      </View>
      <View style={styles.bottomMovieCon}>
        <Text style={styles.movieTitle}>"Movie Name"</Text>
        <Text>has</Text>
        <TouchableOpacity style={styles.buttonHigher}>
          <Text style={styles.buttonText}>Higher</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonLower}>
          <Text style={styles.buttonText}>Lower</Text>
        </TouchableOpacity>
        <Text>blablabalbal</Text>
      </View>
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
  topMovieCon: {
    width: "100%",
    height: "49.5%",
    backgroundColor: "red",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
  },
  bottomMovieCon: {
    width: "100%",
    height: "49.5%",
    backgroundColor: "blue",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
  },
  divider: {
    width: "100%",
    height: "1%",
    backgroundColor: "white",
    position: "relative",
    overflow: "visible",
  },
  dividerText: {
    position: "absolute",
    left: "50%",
    color: "black",
    backgroundColor: "white",
    height: 50,
    width: 50,
    borderRadius: 50,
    fontSize: 20,
  },
  movieTitle: {
    fontSize: 30,
    color: "white",
    fontWeight: "900",
  },
  buttonHigher: {
    backgroundColor: "transparent",
    padding: 10,
    borderRadius: 10,
    borderColor: "green",
    borderWidth: 2,
    width: 200,
    height: 50,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonLower: {
    backgroundColor: "transparent",
    padding: 10,
    borderRadius: 10,
    borderColor: "red",
    borderWidth: 2,
    width: 200,
    height: 50,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
});
