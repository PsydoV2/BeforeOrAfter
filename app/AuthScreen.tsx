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
      <Text style={styles.title}>BEFORE OR AFTER</Text>
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
  },
  title: {
    fontSize: 45,
    marginBottom: 100,
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
  },
});
