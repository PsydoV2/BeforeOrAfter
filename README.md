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

## Nutzung

1. **Spiel starten:**
   - Wenn du die App öffnest, siehst du eine Startseite. Klicke auf den Button, um das Spiel zu starten.
2. **Veröffentlichungsreihenfolge raten:**

   - Dir werden zwei Filme angezeigt. Ein Film wird oben und der andere unten angezeigt.
   - Rate, ob der untere Film vor oder nach dem oberen veröffentlicht wurde, indem du auf die Buttons "Before" oder "After" klickst.

3. **Punkte sammeln:**

   - Wenn deine Vermutung richtig ist, erhöht sich dein Punktestand um eins und ein neues Filmpaar wird angezeigt.
   - Wenn deine Vermutung falsch ist, endet das Spiel und dein Punktestand wird mit deinem Highscore verglichen.

4. **Highscore anzeigen:**
   - Dein Highscore wird gespeichert und kann auf der Startseite angezeigt werden, wenn du das Spiel neu startest.

## Code-Übersicht

### Hauptkomponenten

- **App.tsx:** Die Hauptkomponente, die die Spiellogik, das Abrufen von Filmdaten, die Zustandsverwaltung und das Rendern der Benutzeroberfläche übernimmt.
- **StartPage.tsx:** Eine einfache Startseitenkomponente, die die Sichtbarkeit des Spiels umschaltet.

### Funktionen

- **randomIntFromInterval:** Generiert eine zufällige Ganzzahl innerhalb eines gegebenen Bereichs.
- **getCurrentMovie & getNextMovie:** Ruft einen zufälligen Film von der OMDb API basierend auf einem zufälligen Jahr ab.
- **before & after:** Übernimmt die Logik für das Raten, ob der untere Film vor oder nach dem oberen veröffentlicht wurde.
- **storeScore & loadScore:** Verwaltet das Speichern und Laden des Highscores mit AsyncStorage.

## Abhängigkeiten

- **React & React Native:** Kernbibliotheken zum Erstellen der App.
- **Expo:** Framework und Plattform für universelle React-Anwendungen.
- **AsyncStorage:** Zur persistenten Speicherung von Highscores.
- **OMDb API:** Zum Abrufen von Filmdaten.

## Lizenz

Dieses Projekt ist unter der MIT-Lizenz lizenziert. Siehe die [LICENSE](LICENSE) Datei für Details.

Viel Spaß beim Spiel und beim Raten der Filmpremieren! Wenn du auf Probleme stößt, öffne gerne ein Issue auf GitHub.
