import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import * as Haptics from "expo-haptics";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface StartPageProps {
  handelToggle: () => void;
}

export default function StartPage(props: StartPageProps) {
  const [score, setScore] = useState(0);

  useEffect(() => {
    const loadScore = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem("scoreMovie");
        if (jsonValue !== null) {
          console.log("Loaded Score: ", JSON.parse(jsonValue));
          setScore(JSON.parse(jsonValue));
        }
      } catch (e) {
        console.error("Fehler beim Laden der Allergene:", e);
      }
    };

    loadScore();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        <Text style={{ color: "green", fontWeight: "900" }}>Before</Text> OR{" "}
        <Text style={{ color: "red", fontWeight: "900" }}>After</Text>
      </Text>
      <Text style={styles.highScore}>Highscore: {score}</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          props.handelToggle();
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        }}
      >
        <Text style={styles.buttonText}>Start Game</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    position: "absolute",
    top: 0,
    left: 0,
    backgroundColor: "black",

    // display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
    zIndex: 20,
  },
  title: {
    fontSize: 50,
    color: "white",
  },
  highScore: {
    color: "white",
    fontSize: 20,
  },
  button: {
    width: 200,
    height: 50,
    backgroundColor: "white",
    borderRadius: 20,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "black",
    fontWeight: "800",
    fontSize: 25,
    fontFamily: "normal",
  },
});
