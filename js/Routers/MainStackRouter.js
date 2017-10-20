import React, { Component } from 'react';
import { Scene, Stack, Router } from 'react-native-router-flux';
import MoviePage from "../components/MoviePage/";

class RouterComponent extends Component {
  render() {
  return (
    <Router sceneStyle={{  }}>
    <Stack key="root">
       <Scene
        key="MoviePage"
        initial
        component={MoviePage}
        title="0"
        rightTitle="0 coins"
        titleStyle={styles.titleStyle}
        navigationBarStyle={styles.navigationBarStyle}
        rightButtonTextStyle={styles.rightTitleStyle}
        onRight={() => console.log('hi')}
       />
     </Stack>
    </Router>
  );
}
}

const styles = {
  navigationBarStyle: {
    backgroundColor: 'green'
  },
  titleStyle: {
    marginLeft: 56,
    color: 'gold',
    fontWeight: '900',
    fontSize: 30,
    alignSelf: 'center',
    paddingTop: 3,
    justifyContent: 'space-between',
    textAlign: 'center'

  },
  // rightButtonIconStyle: {
  //   width: 30,
  //   height: 30,
  //   marginBottom: 20,
  //   backgroundColor: 'red'
  // },
  rightTitleStyle: {
    marginRight: 1,
    color: 'gold',
    fontSize: 20,
    fontWeight: '500'
  }
};

export default RouterComponent;
