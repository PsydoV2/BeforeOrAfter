# 🎬 BeforeOrAfter

**BeforeOrAfter** is a simple and addictive movie quiz app built with **Expo**. The goal is to guess whether a movie was released **before** or **after** another one. It’s perfect for movie lovers who want to test or expand their film knowledge in a fun way.

## 📱 Features

- 🎥 Guess the release order of two movies
- 🔄 Randomized movie combinations for endless play
- 🧠 Keeps track of your current and highest score
- 🖼️ Clean and modern UI using React Native
- ⚡ Fast and responsive performance with Expo

## 🕹️ Gameplay

1. The app shows a reference movie with title, poster, and release year.
2. A second movie is shown (title + poster, **no year**).
3. You select whether the second movie came **before** or **after**.
4. If correct, your score increases and the next round begins.
5. A wrong answer resets the game — try to beat your high score!

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/)
- [Expo CLI](https://docs.expo.dev/get-started/installation/)

### Installation

```bash
git clone https://github.com/PsydoV2/BeforeOrAfter.git
cd BeforeOrAfter
npm install
expo start
```

Scan the QR code with the Expo Go app on your phone to run the app.

## 🧰 Tech Stack

- **React Native** with **Expo**
- **TMDB API** for fetching movie data
- **AsyncStorage** for saving the high score
- **Custom UI** with Open Sans font and minimal design

## 🖼️ Assets

- Movie posters are loaded dynamically via TMDB
- All other icons and fonts are open-source or royalty-free

## 🔮 Future Improvements

- 🌍 Localization / multiple languages
- 🏆 Online leaderboards
- 🕹️ Game modes (e.g. timed, categories, streaks)
- 📊 Stats screen with detailed history
- 🖥️ Web version
