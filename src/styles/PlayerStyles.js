import { StyleSheet } from 'react-native';

export const PlayerStyles = StyleSheet.create({
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
  playerTile: {
    backgroundColor: '#BBBFCA',
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  playerImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    resizeMode: 'contain',
    marginRight: 15,
  },
  itemText: {
    fontSize: 18,
    textAlign: 'left',
    color: '#fff',
  },
  statsText: {
    fontSize: 14,
    color: '#fff',
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
});