import React, {Component} from "react";
import { Image, TouchableOpacity} from "react-native";
import { connect } from "react-redux";
import ImageTile from '../ImageTile/';
import {
  Container,
  Content,
  Item,
  Card,
  Input,
  Button,
  Icon,
  View,
  Text
} from "native-base";
import { getMovie, alphabetPressed, deleteAnswerKey, updateStore, updateCoins, getCoins, revealAnswerKey } from '../../actions';
import { CharacterButton, CardSection, Banner, Confirm} from '../common';

import styles from "./styles";
const answerBoxFilled = false;
class MoviePage extends Component {
  constructor() {
  super();
  this.state = { wrongAnswer: false, showModal: false };
}
  componentWillMount(){
    this.props.getMovie();
    this.props.getCoins();
  }
  onLevelUp() {
    this.props.getMovie();
  }
  onHelpRequested() {
    this.setState({ showModal: false });
    // this.props.updateCoins(-60);
    this.props.revealAnswerKey();
    this.checkAllAnswered();
  }
  onAlphabetPress(id) {
    const answerFilled = _.every(this.props.answer, (answerObj) => answerObj.character !== '' || answerObj.hide);
    if(!answerFilled){
      this.setState({correctAnswer: false});
      this.props.alphabetPressed(id);
      this.checkAllAnswered();
      this.answerFilled();
    }
  }
  onAnswerKeyPress(characterObj) {
    this.setState({wrongAnswer: false})
    if(!this.state.correctAnswer)
      this.props.deleteAnswerKey(characterObj);
  }
  checkAllAnswered() {
    const answerFilled = _.every(this.props.answer, (answerObj) => answerObj.character !== '' || answerObj.hide);
    if (answerFilled) {
      const answerString = this.props.answer.map((answerObj) => answerObj.character).join('');
      if (answerString === _.toUpper(this.props.movie.movieName.replace(/\s/g,''))) {
        this.props.updateStore();
        this.props.updateCoins(10);
        this.setState({correctAnswer: true});;
      } else {
        this.setState({wrongAnswer: true});;
        console.log(' Bad Job');
      }
    }
  }
  onDecline() {
    this.setState({ showModal: false });
  }

  showConfirmModal(){
    const answerFilled = _.every(this.props.answer, (answerObj) => answerObj.character !== '' || answerObj.hide);
    if(!answerFilled)
    this.setState({ showModal: !this.state.showModal });
  }

  answerFilled(){
    answerBoxFilled = _.every(this.props.answer, (answerObj) => answerObj.character !== '' || answerObj.hide);
    console.log('cheb', answerBoxFilled);
  }

  renderAlphabetsOrBanner() {
    console.log('rendering alphabets or banner');
    const { alphabets } = this.props;
    if (_.isEmpty(this.props.movie)) {
      return;
    }
    const answerFilled = _.every(this.props.answer, (answerObj) => answerObj.character !== '' || answerObj.hide);
    if (answerFilled) {
      const answerString = this.props.answer.map((answerObj) => answerObj.character).join('');
      if (answerString === _.toUpper(this.props.movie.movieName.replace(/\s/g, ''))) {
        return <Banner onPress={this.onLevelUp.bind(this)} />;
      }
    }
    return _.map(alphabets, (characterObj) => {
      return (
        <CharacterButton
              key={characterObj.id}
              character={characterObj.character}
              disabled={characterObj.disabled}
              onPress={this.onAlphabetPress.bind(this, characterObj.id)}
        />
         );
    });
  }

  renderAnswer() {
    if (_.isEmpty(this.props.movie)) {
      return;
    }
    const { answer } = this.props;
      return _.map(answer, (characterObj) => {
        return (
          <CharacterButton
                  key={characterObj.pos}
                  character={characterObj.character}
                  disabled={characterObj.character === ''}
                  type
                  onPress={this.onAnswerKeyPress.bind(this, characterObj)}
                  displaySpace={characterObj.hide}
                  wrong = {this.state.wrongAnswer}
          />
            );
      });
  }

  renderImageTile() {
    if (_.isEmpty(this.props.movie)) {
      return;
    }
    return <ImageTile cast={this.props.movie.cast} />;
  }
  render() {
    return(
      <Image style={styles.ImageContainer}  source={require('../assets/blue.png')}>
        <Container>
          <Content>
            {this.renderImageTile()}

            <CardSection>
                {this.renderAnswer()}
                <TouchableOpacity onPress={this.showConfirmModal.bind(this)}>
                    <Icon name="help" style={styles.IconStyle} />
                </TouchableOpacity>
            </CardSection>

            <CardSection style={styles.AlphabetStyle}>
              {this.renderAlphabetsOrBanner()}
            </CardSection>

            <Confirm
              visible={this.state.showModal}
              onAccept={this.onHelpRequested.bind(this)}
              onDecline={this.onDecline.bind(this)}
            >
                Reveal a character ?
            </Confirm>
          </Content>
        </Container>
      </Image>

    )
  }
}

const mapStateToProps = ({ movieRecogniser, coinState }) => {
  const { movie, alphabets, answer } = movieRecogniser;
  const {coins} = coinState;
  return {
    movie, alphabets, answer, coins
  };
};

export default connect(mapStateToProps,
      { getMovie,
        alphabetPressed,
        deleteAnswerKey,
        getCoins,
        updateStore,
        updateCoins,
        revealAnswerKey
       })(MoviePage);
