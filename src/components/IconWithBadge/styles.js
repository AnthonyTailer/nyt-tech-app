import { StyleSheet } from 'react-native'

export const iconStyles = StyleSheet.create({
  container: {
    width: 24,
    height: 24,
    margin: 5
  },
  badge: {
    position: 'absolute',
    right: -6,
    top: -3,
    backgroundColor: 'red',
    borderRadius: 6,
    width: 12,
    height: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  }
})