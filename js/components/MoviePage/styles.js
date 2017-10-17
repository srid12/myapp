const React = require('react-native');

const { StyleSheet, Dimensions } = React;

const deviceHeight = Dimensions.get('window').height;

export default {
  ImageContainer: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'stretch',
    backgroundColor: 'rgba(0,0,0,0)'
  },
  AlphabetStyle: {
    marginTop: 10
  },
  IconStyle: {
    color: 'white',
    backgroundColor: 'green',
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 4
  }
}
