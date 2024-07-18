import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import * as Haptics from "expo-haptics";

interface StartPageProps {
  handelToggle: () => void;
}

export default function StartPage(props: StartPageProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        <Text style={{ color: "green" }}>Higher</Text> OR{" "}
        <Text style={{ color: "red" }}>Lower</Text>
      </Text>
      <Text style={styles.highScore}>Highscore: 234</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          props.handelToggle;
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

    display: "flex",
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
