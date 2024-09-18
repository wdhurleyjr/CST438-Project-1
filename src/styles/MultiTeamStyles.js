import { StyleSheet } from 'react-native';

export const MultiTeamStyles = StyleSheet.create({
  buttonContainer: {
    width: '100%',
    marginVertical: 10,
    borderRadius: 5,
  },
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#495464',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 16,
    color: '#fff', 
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 16,
    color: '#fff', 
  },
  itemText: {
    fontSize: 18,
    marginTop: 8,
    textAlign: 'center',
    color: '#fff', 
  },
  teamsTile: {
    backgroundColor: '#BBBFCA', 
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5, 
  },
  teamsLogo: {
    width: 100, 
    height: 100, 
    resizeMode: 'contain', 
  },
});
