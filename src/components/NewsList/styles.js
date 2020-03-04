import { StyleSheet } from 'react-native'

export const listStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bodyContainer: {
    flex: 1,
    marginTop: -15,
  },
  headerImg: {
    flex: 1,
    width: 215,
    height: 'auto',
    resizeMode: 'contain',
  },
  textHeader: {
    padding: 10,
    fontSize: 15,
  },
  emptyListText: {
    flex: 1,
    textAlign: 'center',
    margin: 20,
  },
  subtitleView: {
    flex: 1,
  },
  subtitleText: {
    color: '#9e9e9e',
  },
  pubDate: {
    marginTop: 3,
    fontSize: 12
  },
  modalMainText: {
    paddingVertical: 15,
    fontSize: 20
  },
  modalButtons: {
    flexDirection: 'row'
  }
})
