import _ from 'lodash';
import React, { Component } from 'react';
import { View } from 'react-native';
import { Image } from "react-native";
import ImageMapper from '../../reducers/mapper.js';
import styles from "./styles";

class ImageTile extends Component {
  onImageClick(item) {
    console.log(item);
  }
  render() {
    const { TileStyle, ImageStyles } = styles;
    const { cast } = this.props;
    console.log(cast);
    const icon = _.map(cast, (actor) => {
      return ImageMapper[actor];
    });
    return (
      <View style={TileStyle}>
        <View style={{ flexDirection: 'row' }}>
          <Image style={ImageStyles} source={icon[0]} />
          <Image style={ImageStyles} source={icon[1]} />
        </View>
        <View style={{ flexDirection: 'row' }}>
          <Image style={ImageStyles} source={icon[2]} />
          <Image style={ImageStyles} source={icon[3]} />
        </View>
      </View>
    );
  }
}


export default ImageTile;
