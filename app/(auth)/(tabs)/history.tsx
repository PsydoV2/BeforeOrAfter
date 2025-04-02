import { StatusBar } from "expo-status-bar";
import { Platform, StyleSheet, TouchableOpacity } from "react-native";
import { Text, View } from "@/components/Themed";
import { useRouter } from "expo-router";

export default function ModalScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🎬 How to Play</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />

      <Text style={styles.text}>
        You're about to play a movie guessing game! 🍿
      </Text>
      <Text style={styles.text}>
        Two movie posters will appear on screen. Your task is to guess if the
        second movie was released before or after the first one.
      </Text>
      <Text style={styles.text}>
        ⬅️ Tap “Before” if it was released earlier
      </Text>
      <Text style={styles.text}>➡️ Tap “After” if it came out later</Text>
      <Text style={styles.text}>
        🎯 The longer your correct streak, the higher your score!
      </Text>
      <Text style={styles.text}>
        🚫 One mistake resets your score – so think carefully!
      </Text>

      <TouchableOpacity style={styles.button} onPress={() => router.back()}>
        <Text style={styles.buttonText}>Got it! ✅</Text>
      </TouchableOpacity>

      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fcd34d", // goldgelb
    marginBottom: 20,
  },
  separator: {
    marginVertical: 20,
    height: 1,
    width: "80%",
    backgroundColor: "#888",
  },
  text: {
    fontSize: 16,
    color: "#e0e7ff",
    textAlign: "center",
    marginVertical: 8,
  },
  button: {
    marginTop: 30,
    backgroundColor: "#10b981", // smaragdgrün
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
