# StatLine

StatLine is a React Native app designed to track soccer teams, providing users with detailed statistics, team rosters, and performance updates. The app is built using JavaScript and the Expo framework, and it leverages Expo SQLite for data persistence.

## Table of Contents
- [Features](#features)
- [Technologies](#technologies)
- [Installation](#installation)
- [Usage](#usage)
- [Development](#development)
- [Testing](#testing)
- [Contributing](#contributing)
- [License](#license)

## Features
- **Team Tracking**: View and manage multiple soccer teams.
- **Player Stats**: Track individual player statistics such as goals, assists, and game performance.
- **Game Logs**: Maintain a history of team performances over a season.
- **SQLite Integration**: Use Expo SQLite for offline data persistence, storing team and player statistics directly on the user's device.

## Technologies
- **React Native**: Framework for building mobile apps using JavaScript and React.
- **Expo**: An open-source platform for building native apps using React Native.
- **Expo SQLite**: A lightweight SQL database integrated with Expo for data persistence.
- **JavaScript (ES6)**: Programming language used for the app logic.
- **VS Code**: Integrated development environment (IDE) for coding and debugging.

## Installation

1. **Clone the Repository**:
    ```bash
    git clone https://github.com/username/StatLine.git
    ```

2. **Navigate to the Project Directory**:
    ```bash
    cd StatLine
    ```

3. **Install Dependencies**:
    ```bash
    npm install
    ```

4. **Install Expo CLI**:
    ```bash
    npm install -g expo-cli
    ```

5. **Start the Development Server**:
    ```bash
    expo start
    ```

## Usage

Once the development server is running, you can use the Expo Go app to view StatLine on your mobile device, or run it on an Android or iOS emulator from your development environment.

### SQLite Setup
- The app uses Expo SQLite to store team and player data locally.
- The database will automatically create tables for teams, players, and game logs on the user's device.
- Data is persisted across app sessions, ensuring offline access and reliable data management.

## Development

### Folder Structure
- `App.js`: Main entry point of the app.
- `src/components/`: Contains reusable components for the app.
- `src/screens/`: Contains the different screens (pages) of the app.
- `src/services/`: Contains the services for interacting with SQLite.
- `src/utils/`: Contains utility functions and helper modules.

### SQLite Integration
- The app uses Expo SQLite to store soccer team and player data locally on the device.
- SQLite is utilized to persist data such as team rosters, player stats, and game history.
- Users can interact with their data offline, with changes being stored directly on the device.

### Example Database Schema
- **Teams**: Stores team names, IDs, and other team-related data.
- **Players**: Stores player information, such as names, team associations, and statistics.
- **Game Logs**: Keeps track of game results and team performance over time.

## Testing

1. **Jest**: Run unit tests using Jest.
   ```bash
   npm test
2. **React Native Testing Library**: For testing components and UI behavior.
3. **Integration Testing**: Test interactions between components and SQLite to ensure data is properly stored and retrieved.

## Contributing

1. Fork the repository.
2. Create a new branch:
    ```bash
    git checkout -b feature-branch
    ```
3. Commit your changes:
    ```bash
    git commit -m "Add new feature"
    ```
4. Push the branch:
    ```bash
    git push origin feature-branch
    ```
5. Submit a pull request.

## License

StatLine is licensed under the MIT License.
