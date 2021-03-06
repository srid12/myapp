import React from 'react';
const ReactNative = require('react-native');
const { Dimensions } = ReactNative;
import { TouchableOpacity, Text } from 'react-native';
const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

const CharacterButton = (
    { disabled,
      character,
       onPress,
        id,
         displaySpace,
         wrong,
         type
        }) => {
  const { textStyleDisabled } = styles;

  return (
    <TouchableOpacity
      key={id}
      style={buttonStyle(disabled, displaySpace, type, wrong)}
      disabled={disabled}
      onPress={onPress}
    >
      <Text
        style={disabled ? textStyleDisabled : textStyle(wrong)}
      >{character}</Text>
    </TouchableOpacity>
  );
};

const buttonStyle = (disabled, displaySpace, type, wrong) => {
  const z = {
              width: deviceWidth/11,
              height: deviceHeight/19,
              flexDirection: 'column',
              alignItems: 'center',
              backgroundColor: '#fff',
              borderRadius: 5,
              borderWidth: 1,
              borderColor: '#007aff'
          };
  if (displaySpace) {
    z.borderColor = 'rgba(0, 0, 0, 0)';
    z.backgroundColor = 'rgba(0, 0, 0, 0)';
    return z;
  }
  if (disabled && !type) {
    z.backgroundColor = '#999';
  } else if(wrong){
    z.backgroundColor = 'red';
  } else {
    z.backgroundColor = '#fff';
  }
  return z;
};

const textStyle = (wrong) => {
  const z = {
    alignSelf: 'center',
    color: '#007aff',
    fontSize: 20,
    fontWeight: '600',
    paddingTop: 2,
    paddingBottom: 2
  }
  if(wrong)
     z.color= 'white';
  return z;
}

const styles = {
  textStyle: {
    alignSelf: 'center',
    color: '#007aff',
    fontSize: 18,
    fontWeight: '600',
    paddingTop: 1,
    paddingBottom: 1
  },
  textStyleDisabled: {
    alignSelf: 'center',
    color: 'rgb(107, 138, 161)',
    fontSize: 20,
    fontWeight: '600',
    paddingTop: 2,
    paddingBottom: 2
  },
  buttonStyle: {
    opacity: 1,
    width: 35,
    height: 35,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#007aff',
  }
};

export { CharacterButton };
