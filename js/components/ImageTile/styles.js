const React = require('react-native');

const { StyleSheet, Dimensions } = React;

const deviceHeight = Dimensions.get('window').height;

export default {
  ImageStyles: {
    margin: 3,
    borderWidth: 4,
    borderColor: 'white',
    borderRadius: 4,
    flex: 0.5,
    height: deviceHeight/4.5
  },
  TileStyle: {
    alignItems: 'center',
    marginBottom: 30
  }
}
