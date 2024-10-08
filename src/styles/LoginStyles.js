import { StyleSheet } from 'react-native';

export const loginStyles = StyleSheet.create({
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
  createAccountContainer: {
    marginTop: 20,
    width: '100%',
    justifyContent: 'center',
  },
  createAccountText: {
    fontSize: 16,
    color: '#000',
    textAlign: 'center',
  },
  createAccountLink: {
    fontSize: 16,
    color: '#007bff',
    textDecorationLine: 'underline',
  },
});



