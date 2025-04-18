import { ImageBackground, StyleSheet, TouchableOpacity } from "react-native";
import { Text, View } from "@/components/Themed";
import { useSession } from "@/src/context/ctx";
import * as Haptics from "expo-haptics";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from "expo-status-bar";
import { Circle } from "react-native-progress";
import GameOver from "@/components/GameOver";

interface MovieProps {
  Title: string;
  Year: string;
  imdbID: string;
  type: string;
  Poster: string;
}

export default function TabOneScreen() {
  const API_TOKEN = "ba5bd1b3";
  const { signOut, session } = useSession();
  const [currentMovie, setCurrentMovie] = useState<MovieProps | null>(null);
  const [nextMovie, setNextMovie] = useState<MovieProps | null>(null);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [showEndScreen, toggleEndScreen] = useState(false);
  const [movieCache, setMovieCache] = useState<MovieProps[]>([]);

  useEffect(() => {
    const load = async () => {
      try {
        const val = await AsyncStorage.getItem("scoreMovie");
        const parsed = val ? JSON.parse(val) : 0;
        setScore(parsed);
        setHighScore(parsed);
      } catch (e) {
        console.error("Fehler beim Laden des Scores", e);
      }
    };
    load();

    const initGame = async () => {
      await preloadMovies(15); // mehr laden = mehr Varianz

      // Zwei unterschiedliche Filme aus dem Cache ziehen
      let first = popMovieFromCache();
      let second = popMovieFromCache();

      // Backup: falls zweiter fehlt oder gleich ist, nochmal versuchen
      for (
        let i = 0;
        i < 5 && (!second || second.imdbID === first?.imdbID);
        i++
      ) {
        second = popMovieFromCache();
      }

      // Wenn es immer noch nicht klappt: Abbruch oder Dummy
      if (!first || !second || first.imdbID === second.imdbID) {
        console.warn("Nicht genügend unterschiedliche Filme gefunden.");
        toggleEndScreen(true); // oder Fehleranzeige
        return;
      }

      setCurrentMovie(first);
      setNextMovie(second);
    };

    initGame();
  }, []);

  const randomIntFromInterval = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  const popMovieFromCache = (): MovieProps | null => {
    if (movieCache.length === 0) return null;
    const movie = movieCache[0];
    setMovieCache((prev) => prev.slice(1));
    return movie;
  };

  const preloadMovies = async (count: number, maxAttempts = 10) => {
    let loaded: MovieProps[] = [...movieCache];
    let attempts = 0;
    const seenIDs = new Set(loaded.map((m) => m.imdbID));

    while (loaded.length < count && attempts < maxAttempts) {
      const batch = await fetchMoviesBatch();
      const filtered = batch.filter(
        (m) => m.Poster !== "N/A" && !seenIDs.has(m.imdbID)
      );
      filtered.forEach((m) => seenIDs.add(m.imdbID));
      loaded = [...loaded, ...filtered];
      attempts++;
    }

    setMovieCache(loaded);
  };

  const fetchMoviesBatch = async (): Promise<MovieProps[]> => {
    const movies: MovieProps[] = [];
    const randomYear = randomIntFromInterval(1950, new Date().getFullYear());
    try {
      const res = await fetch(
        `https://www.omdbapi.com/?apikey=${API_TOKEN}&s=movie&y=${randomYear}&type=movie`
      );
      const data = await res.json();
      if (data.Response === "True" && data.Search?.length) {
        data.Search.forEach((movie: MovieProps) => {
          if (movie.Poster !== "N/A") movies.push(movie);
        });
      }
    } catch (err) {
      console.error("API Error", err);
    }
    return movies;
  };

  const retry = () => {
    toggleEndScreen(false);
    setScore(0);
    setCurrentMovie(popMovieFromCache());
    setNextMovie(popMovieFromCache());
    if (movieCache.length < 5) preloadMovies(10);
  };

  const storeScore = async (scoreToStore: number) => {
    if (scoreToStore > highScore) {
      try {
        const jsonValue = JSON.stringify(scoreToStore);
        await AsyncStorage.setItem("scoreMovie", jsonValue);
        setHighScore(scoreToStore);
      } catch (e) {
        console.error("Fehler beim Speichern des Scores:", e);
      }
    }
  };

  const handleAnswer = (isCorrect: boolean) => {
    if (isCorrect) {
      setScore((prev) => prev + 1);
      setCurrentMovie(nextMovie);
      const newMovie = popMovieFromCache();
      setNextMovie(newMovie);
      if (movieCache.length < 5) preloadMovies(10);
    } else {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
      storeScore(score);
      toggleEndScreen(true);
    }
  };

  const before = () => {
    if (currentMovie && nextMovie) {
      const isCorrect = parseInt(currentMovie.Year) >= parseInt(nextMovie.Year);
      handleAnswer(isCorrect);
    }
  };

  const after = () => {
    if (currentMovie && nextMovie) {
      const isCorrect = parseInt(currentMovie.Year) <= parseInt(nextMovie.Year);
      handleAnswer(isCorrect);
    }
  };

  return (
    <View style={styles.main}>
      <StatusBar style="light" />

      <View style={styles.topMovieCon}>
        {currentMovie ? (
          <>
            <ImageBackground
              style={styles.backgroundPoster}
              source={{ uri: currentMovie.Poster }}
            />
            <View style={styles.movieContent}>
              <Text style={styles.movieTitle}>{currentMovie.Title}</Text>
              <Text style={styles.textMid}>was released</Text>
              <Text style={styles.movieYear}>{currentMovie.Year}</Text>
            </View>
          </>
        ) : (
          <View style={styles.loadingCon}>
            <Circle size={150} indeterminate color="white" borderWidth={5} />
            <Text style={styles.loadingText}>Loading...</Text>
          </View>
        )}
      </View>

      <View style={styles.divider} />
      <Text style={styles.dividerText}>VS</Text>

      <View style={styles.bottomMovieCon}>
        {nextMovie ? (
          <>
            <ImageBackground
              style={styles.backgroundPoster}
              source={{ uri: nextMovie.Poster }}
            />
            <View style={styles.movieContent}>
              <Text style={styles.movieTitle}>{nextMovie.Title}</Text>
              <Text style={styles.textMid}>was</Text>
              <TouchableOpacity style={styles.buttonHigher} onPress={before}>
                <Text style={styles.buttonText}>Before</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.buttonLower} onPress={after}>
                <Text style={styles.buttonText}>After</Text>
              </TouchableOpacity>
              <Text style={styles.movieYear}>
                {currentMovie?.Year} released
              </Text>
            </View>
          </>
        ) : (
          <View style={styles.loadingCon}>
            <Circle size={150} indeterminate color="white" borderWidth={5} />
            <Text style={styles.loadingText}>Loading...</Text>
          </View>
        )}
      </View>

      {showEndScreen && <GameOver score={score} retry={retry} />}
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: "black",
  },
  backgroundPoster: {
    width: "100%",
    height: "100%",
    position: "absolute",
  },
  topMovieCon: {
    width: "100%",
    height: "49.5%",
    backgroundColor: "black",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
  },
  bottomMovieCon: {
    width: "100%",
    height: "49.5%",
    backgroundColor: "rgba(0, 0, 255, 0.5)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
  },
  movieContent: {
    height: "100%",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
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
    textAlign: "center",
    width: "80%",
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
  textMid: {
    color: "white",
    fontSize: 20,
  },
  movieYear: {
    color: "white",
    fontSize: 25,
    fontWeight: "900",
  },
  loadingCon: {
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
  },
  loadingText: {
    color: "white",
    fontSize: 20,
    fontWeight: "900",
    marginTop: 20,
  },
  endCon: {
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 22,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
  },
  endScreen: {
    width: "80%",
    height: "20%",
    backgroundColor: "white",
    zIndex: 22,
    borderRadius: 20,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  endText: {
    color: "red",
    fontSize: 20,
    fontWeight: "900",
    marginBottom: 20,
  },
  endButtCon: {
    width: "100%",
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
    flexDirection: "row",
    marginTop: 20,
  },
  endButt: {
    height: 40,
    width: 40,
    backgroundColor: "black",
    borderRadius: 8,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});
