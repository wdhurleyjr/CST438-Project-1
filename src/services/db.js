import * as SQLite from 'expo-sqlite';

let dbInstance = null;

// Singleton pattern with openDatabaseAsync
const openDatabase = async () => {
  if (!dbInstance) {
    dbInstance = await SQLite.openDatabaseAsync('statline.db');
  }
  return dbInstance;
};

// Create necessary tables
export const createTables = async () => {
  const db = await openDatabase();

  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT, 
      username TEXT, 
      email TEXT, 
      password TEXT
    );
  `);
  console.log('Users table created successfully');

  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS leagues (
      id INTEGER PRIMARY KEY,           -- League ID from API-FOOTBALL
      name TEXT,                        -- League name
      country TEXT,                     -- Country of the league
      season INTEGER,                   -- Season year
      logo TEXT                         -- URL for the league logo
    );
  `);
  console.log('Leagues table created successfully');

  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS teams (
      id INTEGER PRIMARY KEY,           -- Team ID from API-FOOTBALL
      name TEXT,                        -- Team name
      logo TEXT,                        -- URL for the team logo
      founded INTEGER,                  -- Year the team was founded
      venue_name TEXT,                  -- Venue name
      venue_city TEXT,                  -- Venue city
      league_id INTEGER,                -- Foreign key referencing the league
      FOREIGN KEY(league_id) REFERENCES leagues(id) ON DELETE CASCADE
    );
  `);
  console.log('Teams table created successfully');

  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS players (
      id INTEGER PRIMARY KEY,           -- Player ID from API-FOOTBALL
      name TEXT,                        -- Player name
      position TEXT,                    -- Player position
      nationality TEXT,                 -- Player nationality
      age INTEGER,                      -- Player age
      team_id INTEGER,                  -- Foreign key referencing the team
      FOREIGN KEY(team_id) REFERENCES teams(id) ON DELETE CASCADE
    );
  `);
  console.log('Players table created successfully');
};

// Insert a user into the users table
export const insertUser = async (username, email, password) => {
  const db = await openDatabase();

  try {
    // Check if a user already exists
    const existingUser = await db.getFirstAsync(
      'SELECT * FROM users WHERE username = ? OR email = ?',
      [username, email]
    );

    if (existingUser) {
      console.log('User already exists:', existingUser);
      throw new Error('User already exists with this username or email');
    }

    // If no user exists, insert the new user
    await db.runAsync(
      'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
      [username, email, password]
    );
    console.log('User inserted successfully');
  } catch (error) {
    console.error('Error inserting user:', error);
    throw error;
  }
};

// Insert a league into the leagues table
export const insertLeague = async (id, name, country, season, logo) => {
  const db = await openDatabase();
  try {
    await db.runAsync(
      'INSERT OR REPLACE INTO leagues (id, name, country, season, logo) VALUES (?, ?, ?, ?, ?)',
      [id, name, country, season, logo]
    );
    console.log(`League ${name} inserted successfully`);
  } catch (error) {
    console.error('Error inserting league:', error);
    throw error;
  }
};

// Insert a new team into the teams table
export const insertTeam = async (id, name, logo, founded, venue_name, venue_city, league_id) => {
  const db = await openDatabase();
  try {
    await db.runAsync(
      'INSERT INTO teams (id, name, logo, founded, venue_name, venue_city, league_id) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [id, name, logo, founded, venue_name, venue_city, league_id]
    );
    console.log('Team inserted successfully');
  } catch (error) {
    console.error('Error inserting team:', error);
    throw error;
  }
};

// Insert a player into the players table
export const insertPlayer = async (id, name, position, nationality, age, team_id) => {
  const db = await openDatabase();
  try {
    await db.runAsync(
      'INSERT INTO players (id, name, position, nationality, age, team_id) VALUES (?, ?, ?, ?, ?, ?)',
      [id, name, position, nationality, age, team_id]
    );
    console.log('Player inserted successfully');
  } catch (error) {
    console.error('Error inserting player:', error);
    throw error;
  }
};

// Fetch all users from the users table
export const getUsers = async (setUsers) => {
  const db = await openDatabase();
  try {
    const result = await db.getAllAsync('SELECT * FROM users');
    setUsers(result); // Assuming setUsers is a state updater
    console.log('Fetched users:', result);
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

// Fetch all leagues from the leagues table
export const getLeagues = async (setLeagues) => {
  const db = await openDatabase();
  try {
    const result = await db.getAllAsync('SELECT * FROM leagues');
    setLeagues(result); // Assuming setLeagues is a state updater
    console.log('Fetched leagues:', result);
  } catch (error) {
    console.error('Error fetching leagues:', error);
    throw error;
  }
};

// Fetch all teams by league ID from the teams table
export const getTeamsByLeague = async (league_id) => {
  const db = await openDatabase();
  try {
    const result = await db.getAllAsync('SELECT * FROM teams WHERE league_id = ?', [league_id]);
    return result;
  } catch (error) {
    console.error('Error fetching teams by league:', error);
    return []; // Return empty array if error occurs
  }
};

// Fetch all players by team ID from the players table
export const getPlayersByTeam = async (team_id) => {
  const db = await openDatabase();
  try {
    const result = await db.getAllAsync('SELECT * FROM players WHERE team_id = ?', [team_id]);
    return result;
  } catch (error) {
    console.error('Error fetching players by team:', error);
    return []; // Return empty array if error occurs
  }
};

// Update an existing user in the users table
export const updateUser = async (id, newUsername) => {
  const db = await openDatabase();
  try {
    await db.runAsync('UPDATE users SET username = ? WHERE id = ?', [newUsername, id]);
    console.log('User updated successfully');
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
};

// Delete a user from the users table
export const deleteUser = async (id) => {
  const db = await openDatabase();
  try {
    await db.runAsync('DELETE FROM users WHERE id = ?', [id]);
    console.log('User deleted successfully');
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
};

// Delete a league from the leagues table
export const deleteLeague = async (id) => {
  const db = await openDatabase();
  try {
    await db.runAsync('DELETE FROM leagues WHERE id = ?', [id]);
    console.log('League deleted successfully');
  } catch (error) {
    console.error('Error deleting league:', error);
    throw error;
  }
};

// Delete a team from the teams table
export const deleteTeam = async (id) => {
  const db = await openDatabase();
  try {
    await db.runAsync('DELETE FROM teams WHERE id = ?', [id]);
    console.log('Team deleted successfully');
  } catch (error) {
    console.error('Error deleting team:', error);
    throw error;
  }
};

// Check user credentials for login
export const checkUserCredentials = async (username, password) => {
  const db = await openDatabase();
  try {
    const result = await db.getFirstAsync(
      'SELECT * FROM users WHERE username = ? AND password = ?',
      [username, password]
    );
    console.log('Login query result:', result);
    return result !== undefined;
  } catch (error) {
    console.error('Error checking user credentials:', error);
    throw error;
  }
};

// Fetch all users for logging
export const getAllUsers = async () => {
  const db = await openDatabase();
  try {
    const users = await db.getAllAsync('SELECT * FROM users');
    console.log('All users:', users);
    return users;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

// Delete duplicate users
export const deleteDuplicateUsers = async () => {
  const db = await openDatabase();
  try {
    await db.runAsync(`
      DELETE FROM users 
      WHERE id NOT IN (
        SELECT MIN(id) 
        FROM users 
        GROUP BY username, email
      );
    `);
    console.log('Duplicate users deleted successfully');
  } catch (error) {
    console.error('Error deleting duplicate users:', error);
    throw error;
  }
};

// Fetch only specific leagues by their IDs (39, 40)
export const getSelectedLeagues = async (setLeagues) => {
  const db = await openDatabase();
  try {
    const result = await db.getAllAsync('SELECT * FROM leagues WHERE id IN (39, 40)');
    console.log('Fetched leagues from database:', result);

    if (setLeagues) {
      setLeagues(result || []);
    }

    return result || [];
  } catch (error) {
    console.error('Error fetching leagues from database:', error);
    throw error;
  }
};

// Delete all leagues
export const deleteAllLeagues = async () => {
  const db = await openDatabase();
  try {
    await db.runAsync('DELETE FROM leagues');
    console.log('All leagues deleted successfully');
  } catch (error) {
    console.error('Error deleting leagues:', error);
    throw error;
  }
};
