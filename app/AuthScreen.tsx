import {
  ImageBackground,
  StyleSheet,
  TextInput,
  useColorScheme,
  Button,
  TouchableOpacity,
} from "react-native";
import { Text, View } from "@/components/Themed";
import { useSession } from "@/src/context/ctx";
import { router } from "expo-router";

export default function AuthScreen() {
  const { signIn } = useSession();
  const colorScheme = useColorScheme();

  const isDark = colorScheme === "dark";

  const handleLogin = () => {
    signIn();
    router.replace("/");
  };

  return (
    <ImageBackground
      source={require("../assets/images/menuBack.png")}
      style={styles.background}
    >
      <View style={styles.titleBox}>
        <Text style={styles.titleRed}>BEFORE</Text>
        <Text style={styles.titleOr}>OR</Text>
        <Text style={styles.titleGreen}>AFTER</Text>
      </View>
      <TouchableOpacity onPress={() => handleLogin()}>
        <Text style={styles.start}>START</Text>
      </TouchableOpacity>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    gap: 50,
  },
  titleBox: {
    width: 300,
    // backgroundColor: "red",
    backgroundColor: "transparent",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 0,
  },
  titleRed: {
    fontSize: 80,
    color: "red",
  },
  titleGreen: {
    fontSize: 80,
    color: "green",
  },
  titleOr: {
    fontSize: 30,
    color: "white",
  },
  start: {
    fontSize: 30,
    margin: "auto",
    borderWidth: 2,
    borderStyle: "solid",
    borderColor: "red",
    padding: 10,
    width: 200,
    textAlign: "center",
    borderRadius: 10,
    color: "white",
  },
});
