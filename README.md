# StatLine

StatLine is a React Native app designed to track soccer teams, providing users with detailed statistics, team rosters, and performance updates. The app is built using JavaScript and the Expo framework, and it leverages Expo SQLite for data persistence. StatLine also integrates with **API-FOOTBALL** to fetch real-time soccer data, such as team information, match results, and player statistics.

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
- **SQLite Integration**: Use Expo SQLite for offline data persistence, storing team and player statistics, as well as user login information, directly on the user's device.
- **Real-Time Data**: Fetch up-to-date soccer data using **API-FOOTBALL**.

## Technologies
- **React Native**: Framework for building mobile apps using JavaScript and React.
- **Expo**: An open-source platform for building native apps using React Native.
- **Expo SQLite**: A lightweight SQL database integrated with Expo for data persistence.
- **API-FOOTBALL**: Provides real-time soccer data, including team details, match results, and player statistics.
- **Babel**: JavaScript compiler to transpile modern ES6+ code into compatible JavaScript.
- **Jest**: Testing framework for running unit and integration tests.
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
    Install all required dependencies, including Axios for API calls, Babel for transpiling, and Jest for testing.
    ```bash
    npm install
    ```

4. **Install Expo CLI**:
    Expo CLI is required to start and run the app. Install it globally using the following command:
    ```bash
    npm install -g expo-cli
    ```

5. **Start the Development Server**:
    After installing the dependencies, start the development server:
    ```bash
    expo start
    ```

6. **Install Babel**:
    Ensure Babel is set up for transpiling ES6+ code. If Babel is not installed:
    ```bash
    npm install --save-dev @babel/core @babel/preset-env
    ```

7. **Install Jest** (for testing):
    Install Jest to run the app’s unit tests:
    ```bash
    npm install --save-dev jest babel-jest @testing-library/react-native
    ```

## Usage

Once the development server is running, you can use the Expo Go app to view StatLine on your mobile device, or run it on an Android or iOS emulator from your development environment.

### API-FOOTBALL Setup
- The app uses **API-FOOTBALL** to fetch real-time soccer data.
- You will need an API key from [API-FOOTBALL](https://www.api-football.com/) to access the data.
- The API key should be stored securely, and the app will handle requests to fetch updated team, match, and player statistics.

### SQLite Setup
- The app uses Expo SQLite to store team and player data, as well as user login information, locally.
- The database will automatically create tables for users, teams, players, and game logs on the user's device.
- Data is persisted across app sessions, ensuring offline access and reliable data management.

## Development

### Folder Structure
- `App.js`: Main entry point of the app.
- `src/components/`: Contains reusable components for the app.
- `src/screens/`: Contains the different screens (pages) of the app.
- `src/services/`: Contains the services for interacting with SQLite and API-FOOTBALL.
- `src/styles/`: Contains stylesheets for the app.

### SQLite Integration
- The app uses Expo SQLite to store soccer team and player data, along with user login information, locally on the device.
- SQLite is utilized to persist data such as team rosters, player stats, user credentials, and game history.
- Users can interact with their data offline, with changes being stored directly on the device.

### API-FOOTBALL Integration
- The app fetches real-time soccer data such as live scores, team standings, and match details using **API-FOOTBALL**.
- API requests are handled asynchronously, ensuring that the latest data is available to users while also allowing local persistence for offline access.

### Example Database Schema
- **Users**: Stores user login information such as username and password.
- **Teams**: Stores team names, IDs, and other team-related data.
- **Players**: Stores player information, such as names, team associations, and statistics.
- **Game Logs**: Keeps track of game results and team performance over time.

## Testing

1. **Jest**: Run unit tests using Jest.
   ```bash
   npm test
2. **React Native Testing Library**: For testing components and UI behavior.
3. **Integration Testing**: Test interactions between components, API-FOOTBALL, and SQLite to ensure data is properly stored and retrieved.

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

## Contributors

- William Hurley: [wdhurleyjr](https://github.com/wdhurleyjr)
- Sebastian Santoyo: [SebasX5](https://github.com/SebasX5)
- Mason Allred: [MasonA717](https://github.com/MasonA717)
## License

StatLine is licensed under the MIT License.
