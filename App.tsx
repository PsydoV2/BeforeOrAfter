import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import StartPage from "./components/StartPage";
import { useEffect, useState } from "react";

export default function App() {
  const key = "ba5bd1b3";
  function randomIntFromInterval(min: number, max: number) {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  function getMovie() {
    const id = "tt" + randomIntFromInterval(11111111, 99999999);
    fetch(`http://www.omdbapi.com/?apikey=${key}&i=${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        if (data.Response == "False") {
          getMovie();
        }
        console.log(data);
      })
      .catch((error) => {
        console.error("Error:", error);
        getMovie();
      });
  }

  return (
    <View style={styles.main}>
      <StartPage handelToggle={getMovie}></StartPage>
      <StatusBar style="light" />

      <View style={styles.topMovieCon}>
        <Text style={styles.movieTitle}>"Movie Name"</Text>
        <Text>was released</Text>
        <Text>12.2.2222</Text>
      </View>

      <View style={styles.divider}></View>
      <Text style={styles.dividerText}>VS</Text>

      <View style={styles.bottomMovieCon}>
        <Text style={styles.movieTitle}>"Movie Name"</Text>
        <Text>was</Text>
        <TouchableOpacity style={styles.buttonHigher}>
          <Text style={styles.buttonText}>Higher</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonLower}>
          <Text style={styles.buttonText}>Lower</Text>
        </TouchableOpacity>
        <Text>12.2.2222 released</Text>
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
    top: "47%",
    left: "45%",
    color: "black",
    backgroundColor: "white",
    height: 50,
    width: 50,
    borderRadius: 50,
    fontSize: 30,

    textAlign: "center",
    lineHeight: 50,
    fontWeight: "900",
    zIndex: 10,
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
