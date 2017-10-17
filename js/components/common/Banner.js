import React from 'react';
import { View, Text } from 'react-native';
import { Header } from './Header';
import { Button } from './Button';
import { CardSection } from './CardSection';
import _ from 'lodash';
const msg = ['Well Done', 'Excellent', 'Awesome', 'Good Work', 'Congrats', 'Bulls Eye','Great'];
const Banner = ({ onPress }) => {
  return (
    <View style={{ flexDirection: 'column', flex: 1 }}>
     <Header headerText={_.sample(msg)}/>
      <CardSection>
      <Button onPress={onPress}> Next Movie </Button>
      </CardSection>
    </View>
  );
};

export { Banner };
