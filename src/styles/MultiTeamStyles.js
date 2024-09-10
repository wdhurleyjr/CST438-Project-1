import { StyleSheet } from 'react-native';

export const MultiTeamStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
  input: {
    width: '100%',
    padding: 10,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  buttonContainer: {
    width: '100%',
    marginVertical: 10,
    borderRadius: 5,
  },
  rowContainer:{
    flexDirection: 'row',
    flexWrap: 'wrap',
  }
});
