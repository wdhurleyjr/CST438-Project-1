import { openDatabaseAsync } from 'expo-sqlite';
import { 
  getUsers, insertUser, insertLeague, getLeagues, deleteUser, updateUser, 
  deleteLeague, insertTeam, getTeamsByLeague, deleteTeam 
} from '../src/services/db';

jest.mock('expo-sqlite');

describe('Database Operations', () => {

  beforeEach(() => {
    openDatabaseAsync.mockClear();
  });

  it('should fetch users and return an empty array', async () => {
    const setUsersMock = jest.fn();
    const dbMock = {
      execAsync: jest.fn().mockResolvedValue({ rows: { _array: [] } }),
    };

    openDatabaseAsync.mockResolvedValue(dbMock);
    await getUsers(setUsersMock);
    expect(setUsersMock).toHaveBeenCalledWith([]); 
    expect(dbMock.execAsync).toHaveBeenCalledWith('SELECT * FROM users');
  });

  it('should insert a user successfully', async () => {
    const username = 'testUser';
    const email = 'test@example.com';
    const password = 'password123';
    const dbMock = {
      runAsync: jest.fn().mockResolvedValue(),
    };

    openDatabaseAsync.mockResolvedValue(dbMock);
    await insertUser(username, email, password);
    expect(dbMock.runAsync).toHaveBeenCalledWith(
      'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
      [username, email, password]
    );
  });

  it('should insert a league successfully', async () => {
    const leagueId = 39;
    const leagueName = 'Premier League';
    const country = 'England';
    const season = 2022;
    const logo = 'https://some-logo-url.png';
    const dbMock = {
      runAsync: jest.fn().mockResolvedValue(),
    };

    openDatabaseAsync.mockResolvedValue(dbMock);
    await insertLeague(leagueId, leagueName, country, season, logo);
    expect(dbMock.runAsync).toHaveBeenCalledWith(
      'INSERT OR REPLACE INTO leagues (id, name, country, season, logo) VALUES (?, ?, ?, ?, ?)',
      [leagueId, leagueName, country, season, logo]
    );
  });

  it('should fetch leagues and return data', async () => {
    const setLeaguesMock = jest.fn();
    const dbMock = {
      execAsync: jest.fn().mockResolvedValue({ rows: { _array: [{ id: 39, name: 'Premier League' }] } }),
    };

    openDatabaseAsync.mockResolvedValue(dbMock);
    await getLeagues(setLeaguesMock);
    expect(setLeaguesMock).toHaveBeenCalledWith([{ id: 39, name: 'Premier League' }]);
    expect(dbMock.execAsync).toHaveBeenCalledWith('SELECT * FROM leagues');
  });

  it('should update a user successfully', async () => {
    const userId = 1;
    const newUsername = 'updatedUser';
    const dbMock = {
      runAsync: jest.fn().mockResolvedValue(),
    };

    openDatabaseAsync.mockResolvedValue(dbMock);
    await updateUser(userId, newUsername);
    expect(dbMock.runAsync).toHaveBeenCalledWith(
      'UPDATE users SET username = ? WHERE id = ?',
      [newUsername, userId]
    );
  });

  it('should delete a user successfully', async () => {
    const userId = 1;
    const dbMock = {
      runAsync: jest.fn().mockResolvedValue(),
    };

    openDatabaseAsync.mockResolvedValue(dbMock);
    await deleteUser(userId);
    expect(dbMock.runAsync).toHaveBeenCalledWith(
      'DELETE FROM users WHERE id = ?',
      [userId]
    );
  });

  it('should delete a league successfully', async () => {
    const leagueId = 39;
    const dbMock = {
      runAsync: jest.fn().mockResolvedValue(),
    };

    openDatabaseAsync.mockResolvedValue(dbMock);
    await deleteLeague(leagueId);
    expect(dbMock.runAsync).toHaveBeenCalledWith(
      'DELETE FROM leagues WHERE id = ?',
      [leagueId]
    );
  });

  it('should insert a team successfully', async () => {
    const teamId = 33;
    const teamName = 'Manchester United';
    const logo = 'https://some-team-logo-url.png';
    const founded = 1878;
    const venue_name = 'Old Trafford';
    const venue_city = 'Manchester';
    const leagueId = 39;
    const dbMock = {
      runAsync: jest.fn().mockResolvedValue(),
    };

    openDatabaseAsync.mockResolvedValue(dbMock);
    await insertTeam(teamId, teamName, logo, founded, venue_name, venue_city, leagueId);
    expect(dbMock.runAsync).toHaveBeenCalledWith(
      'INSERT INTO teams (id, name, logo, founded, venue_name, venue_city, league_id) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [teamId, teamName, logo, founded, venue_name, venue_city, leagueId]
    );
  });

  it('should fetch teams by league and return data', async () => {
    const leagueId = 39;
    const setTeamsMock = jest.fn();
    const dbMock = {
      execAsync: jest.fn().mockResolvedValue({ rows: { _array: [{ id: 33, name: 'Manchester United' }] } }),
    };

    openDatabaseAsync.mockResolvedValue(dbMock);
    await getTeamsByLeague(leagueId, setTeamsMock);
    expect(setTeamsMock).toHaveBeenCalledWith([{ id: 33, name: 'Manchester United' }]);
    expect(dbMock.execAsync).toHaveBeenCalledWith('SELECT * FROM teams WHERE league_id = ?', [leagueId]);
  });

  it('should delete a team successfully', async () => {
    const teamId = 33;
    const dbMock = {
      runAsync: jest.fn().mockResolvedValue(),
    };

    openDatabaseAsync.mockResolvedValue(dbMock);
    await deleteTeam(teamId);
    expect(dbMock.runAsync).toHaveBeenCalledWith(
      'DELETE FROM teams WHERE id = ?',
      [teamId]
    );
  });
});



