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
    marginBottom: 5,
    textAlign: 'left',  // Align text to the left
    color: '#fff',
  },
  teamsTile: {
    backgroundColor: '#BBBFCA', 
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    flexDirection: 'row',  // Ensure text and image are aligned horizontally
    alignItems: 'center',  // Vertically center the items
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  teamsLogo: {
    width: 60, 
    height: 60, 
    borderRadius: 30, // Round the logo image
    resizeMode: 'contain',
    marginRight: 15, // Space between the image and the text
  },
  textContainer: {
    flex: 1,  // Allow text container to take up remaining space
    justifyContent: 'center',
  },
});
