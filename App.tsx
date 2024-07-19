import { StatusBar } from "expo-status-bar";
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import StartPage from "./components/StartPage";
import { useEffect, useState } from "react";
import * as Haptics from "expo-haptics";

interface MovieProps {
  poster: string;
  Title: string;
  type: string;
  Year: string;
  imdbID: string;
}

export default function App() {
  const [showStartPage, toggleStartPage] = useState(true);
  const key = "ba5bd1b3";
  const [currentMovie, setCurrentMovie] = useState<MovieProps>();
  const [nextMovie, setNextMovie] = useState<MovieProps>();
  const [score, setScore] = useState(0);

  function randomIntFromInterval(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  function getCurrentMovie() {
    const randomYear = randomIntFromInterval(1950, new Date().getFullYear());
    console.log(randomYear);

    fetch(
      `https://www.omdbapi.com/?apikey=${key}&s=movie&y=${randomYear}&type=movie`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        if (data.Response === "False") {
          getCurrentMovie();
        } else {
          setCurrentMovie(data.Search[1]);
          console.log(data);
          getNextMovie();
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        getCurrentMovie();
      });
  }

  function getNextMovie() {
    const randomYear = randomIntFromInterval(1950, new Date().getFullYear());
    console.log(randomYear);

    fetch(
      `https://www.omdbapi.com/?apikey=${key}&s=movie&y=${randomYear}&type=movie`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        if (data.Response === "False") {
          getNextMovie();
        } else {
          setNextMovie(data.Search[1]);
          console.log(data);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        getNextMovie();
      });
  }

  function before() {
    console.log("Before");
    if (currentMovie?.Year > nextMovie?.Year) {
      setScore(score + 1);
      setCurrentMovie(nextMovie);
      getNextMovie();
    } else {
      setScore(0);
      toggleStartPage(true);
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    }
  }

  function after() {
    console.log("After");
    if (currentMovie?.Year < nextMovie?.Year) {
      setScore(score + 1);
      setCurrentMovie(nextMovie);
      getNextMovie();
    } else {
      setScore(0);
      toggleStartPage(true);
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    }
  }

  return (
    <View style={styles.main}>
      {showStartPage && (
        <StartPage
          handelToggle={() => {
            getCurrentMovie();
            toggleStartPage(false);
          }}
        ></StartPage>
      )}
      <StatusBar style="light" />

      <View style={styles.topMovieCon}>
        {/* <ImageBackground source={currentMovie?.poster}></ImageBackground> */}
        <Text style={styles.movieTitle}>{currentMovie?.Title}</Text>
        <Text>was released</Text>
        <Text>{currentMovie?.Year}</Text>
      </View>

      <View style={styles.divider}></View>
      <Text style={styles.dividerText}>VS</Text>

      <View style={styles.bottomMovieCon}>
        <Text style={styles.movieTitle}>{nextMovie?.Title}</Text>
        <Text>was</Text>
        <TouchableOpacity style={styles.buttonHigher} onPress={() => before()}>
          <Text style={styles.buttonText}>Before</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonLower} onPress={() => after()}>
          <Text style={styles.buttonText}>After</Text>
        </TouchableOpacity>
        <Text>{currentMovie?.Year} released</Text>
      </View>

      <Text style={styles.score}>Score: {score}</Text>
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
  score: {
    color: "black",
    position: "absolute",
    bottom: 20,
    left: 50,
    fontSize: 20,
  },
});
