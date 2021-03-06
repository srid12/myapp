import React from 'react';
import { Text, View, Modal } from 'react-native';
import { CardSection } from './CardSection';
import { Button } from './Button';
// import { Button } from "native-base";

const Confirm = ({ children, visible, onAccept, onDecline }) => {
  const { containerStyle, textStyle, cardSectionStyle } = styles;
 return (
   <Modal
    visible={visible}
    animationType="slide"
    onRequestClose={() => {}}
    transparent
   >
    <View style={containerStyle}>
      <CardSection style={cardSectionStyle}>
        <Text style={textStyle}>{children}</Text>
      </CardSection>

      <CardSection style={cardSectionStyle}>
        <Button full success onPress={onAccept}>Yes</Button>
        <Button full danger onPress={onDecline}>No</Button>
      </CardSection>
    </View>
   </Modal>
 );
};

const styles = {
  cardSectionStyle: {
    justifyContent: 'center',
    // backgroundColor: '#ddd',
    backgroundColor: 'skyblue'
  },
  textStyle: {
    flex: 1,
    fontSize: 18,
    textAlign: 'center',
    lineHeight: 40
  },
  containerStyle: {
    backgroundColor: 'rgba(0,0,0,0.75)',
    position: 'relative',
    borderRadius: 4,
    flex: 1,
    justifyContent: 'center'
  }
};

export { Confirm };
