# Movie Guessing Game

Willkommen beim Movie Guessing Game! Diese App ist ein unterhaltsamer und interaktiver Weg, dein Wissen über Filmpremieren zu testen. Versuche zu erraten, ob ein Film vor oder nach einem anderen veröffentlicht wurde, um Punkte zu sammeln und deinen Highscore zu übertreffen.

## Funktionen

- **Zufällige Filmauswahl:** Die App ruft zufällige Filme von der OMDb API basierend auf einem zufälligen Jahr ab.
- **Punkteverfolgung:** Verfolge deinen aktuellen Punktestand und Highscore.
- **Haptisches Feedback:** Genieße haptisches Feedback bei falschen Antworten.
- **Persistente Speicherung:** Highscores werden lokal mit AsyncStorage gespeichert.

## Installation

Folge diesen Schritten, um die App auf deinem lokalen Rechner einzurichten:

1. **Repository klonen:**

   ```bash
   git clone https://github.com/yourusername/movie-guessing-game.git
   cd movie-guessing-game
   ```

2. **Abhängigkeiten installieren:**

   ```bash
   npm install
   ```

3. **Erstelle eine `.env` Datei im Stammverzeichnis und füge deinen OMDb API-Schlüssel hinzu:**

   ```
   API_TOKEN=your_omdb_api_key
   ```

4. **Starte die App:**

   ```bash
   npm start
   ```

   Dies startet den Expo-Entwicklungsserver. Du kannst dann die Expo Go App auf deinem mobilen Gerät verwenden, um den QR-Code zu scannen und die App auszuführen.

## Abhängigkeiten

- **React & React Native:** Kernbibliotheken zum Erstellen der App.
- **Expo:** Framework und Plattform für universelle React-Anwendungen.
- **AsyncStorage:** Zur persistenten Speicherung von Highscores.
- **OMDb API:** Zum Abrufen von Filmdaten.

## Preview

Benötigt ExpoGo App

iOS -> Mit der Kamera scannen <br>
Android -> Mit der ExpoGo App scannen

![image](https://github.com/user-attachments/assets/178d90d5-ab69-4085-9beb-f844fbc23154)

![img](https://i.imgur.com/Afs94lj.png)

## Lizenz

Dieses Projekt ist unter der MIT-Lizenz lizenziert. Siehe die [LICENSE](LICENSE) Datei für Details.

Viel Spaß beim Spiel und beim Raten der Filmpremieren! Wenn du auf Probleme stößt, öffne gerne ein Issue auf GitHub.
