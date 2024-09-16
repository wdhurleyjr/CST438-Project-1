import * as SQLite from 'expo-sqlite';

const openDatabase = async () => {
  return await SQLite.openDatabaseAsync('statline.db');
};

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
};

export const insertUser = async (username, email, password) => {
  const db = await openDatabase();
  await db.runAsync(
    'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
    [username, email, password]
  );
  console.log('User inserted successfully');
};

export const insertLeague = async (id, name, country, season, logo) => {
  const db = await openDatabase();
  try {
    await db.runAsync(
      'INSERT OR REPLACE INTO leagues (id, name, country, season, logo) VALUES (?, ?, ?, ?, ?)',
      [id, name, country, season, logo]
    );
    console.log('League inserted successfully');
  } catch (error) {
    console.log('Error inserting league:', error);
  }
};

export const insertTeam = async (id, name, logo, founded, venue_name, venue_city, league_id) => {
  const db = await openDatabase();
  await db.runAsync(
    'INSERT INTO teams (id, name, logo, founded, venue_name, venue_city, league_id) VALUES (?, ?, ?, ?, ?, ?, ?)',
    [id, name, logo, founded, venue_name, venue_city, league_id]
  );
  console.log('Team inserted successfully');
};
  
export const getUsers = async (setUsers) => {
  const db = await openDatabase();
  const result = await db.execAsync('SELECT * FROM users');
  setUsers(result.rows._array);
};

export const getLeagues = async (setLeagues) => {
  const db = await openDatabase();
  const result = await db.execAsync('SELECT * FROM leagues');
  setLeagues(result.rows._array);
};

export const getTeamsByLeague = async (league_id, setTeams) => {
  const db = await openDatabase();
  const result = await db.execAsync('SELECT * FROM teams WHERE league_id = ?', [league_id]);
  setTeams(result.rows._array);
};

export const updateUser = async (id, newUsername) => {
  const db = await openDatabase();
  await db.runAsync('UPDATE users SET username = ? WHERE id = ?', [newUsername, id]);
  console.log('User updated successfully');
};

export const deleteUser = async (id) => {
  const db = await openDatabase();
  await db.runAsync('DELETE FROM users WHERE id = ?', [id]);
  console.log('User deleted successfully');
};

export const deleteLeague = async (id) => {
  const db = await openDatabase();
  await db.runAsync('DELETE FROM leagues WHERE id = ?', [id]);
  console.log('League deleted successfully');
};

export const deleteTeam = async (id) => {
  const db = await openDatabase();
  await db.runAsync('DELETE FROM teams WHERE id = ?', [id]);
  console.log('Team deleted successfully');
};
