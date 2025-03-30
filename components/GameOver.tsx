import { StyleSheet, TouchableOpacity } from "react-native";
import { Text, View } from "./Themed";

interface Props {
  retry: () => void;
}

export default function GameOver({ retry }: Props) {
  return (
    <View style={styles.overlay}>
      <View style={styles.popup}>
        <Text style={styles.title}>💀 Game Over!</Text>
        <Text style={styles.subtitle}>Your streak has ended.</Text>
        <Text style={styles.subtitle}>Want to try again? 🎬</Text>

        <TouchableOpacity style={styles.button} onPress={retry}>
          <Text style={styles.buttonText}>🔁 Retry</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    height: "100%",
    width: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 99,
  },
  popup: {
    backgroundColor: "#1f2937", // dark gray
    padding: 24,
    borderRadius: 20,
    alignItems: "center",
    width: "80%",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#f87171", // red
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: "#e5e7eb",
    textAlign: "center",
    marginBottom: 8,
  },
  button: {
    marginTop: 20,
    backgroundColor: "#10b981", // green
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
