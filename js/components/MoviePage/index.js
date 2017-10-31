import React, {Component} from "react";
import { Image, TouchableOpacity} from "react-native";
import { connect } from "react-redux";
import ImageTile from '../ImageTile/';
import {
  AdMobBanner,
  AdMobInterstitial,
  PublisherBanner,
  AdMobRewarded
} from 'react-native-admob'
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
AdMobRewarded.setTestDevices(['EMULATOR']);
AdMobRewarded.setAdUnitID('ca-app-pub-3940256099942544/1033173712');




AdMobInterstitial.setTestDevices(['EMULATOR']);
AdMobInterstitial.setAdUnitID('ca-app-pub-3940256099942544/4411468910');
AdMobInterstitial.addEventListener('adLoaded',
   () => {
    //  console.log('AdMobInterstitial adLoaded')
   }
 );
 AdMobInterstitial.addEventListener('adFailedToLoad',
   (error) => {
    //  console.warn(error)
   }
 );
 AdMobInterstitial.addEventListener('adOpened',
   () => {
    //  console.log('AdMobInterstitial => adOpened')
   }
 );
 AdMobInterstitial.addEventListener('adClosed',
   () => {
    //  console.log('AdMobInterstitial => adClosed');
     AdMobInterstitial.requestAd().catch(error => {
      //  console.warn(error)});
   })
 }
 );
 AdMobInterstitial.addEventListener('adLeftApplication',
   () => {
    //  console.log('AdMobInterstitial => adLeftApplication')
   }
 );



 AdMobInterstitial.requestAd().catch(error => console.warn(error));
class MoviePage extends Component {
  constructor() {
  super();
  this.state = { wrongAnswer: false, showModal: false };

}

componentWillUnmount() {
    AdMobRewarded.removeAllListeners();
    // AdMobInterstitial.removeAllListeners();
  }

componentDidMount(){
  AdMobRewarded.addEventListener('adClosed',
   () => {
    //  console.log('AdMobRewarded => adClosed');
     AdMobRewarded.requestAd().catch(error => {
      //  console.warn(error)
     }
   );
   }
  );

  AdMobRewarded.addEventListener('rewarded',
       (reward) => {
        // console.log('AdMobRewarded => rewarded', reward);
       this.props.updateCoins(60);
      }
     );

  AdMobRewarded.addEventListener('adLoaded',
   () => {
    //  console.log('AdMobRewarded => adLoaded');
   }
  );
  AdMobRewarded.addEventListener('adFailedToLoad',
   (error) => {
    //  console.warn(error)
   }
  );
  AdMobRewarded.addEventListener('adOpened',
   () => {
    //  console.log('AdMobRewarded => adOpened')
   }
  );
  AdMobRewarded.addEventListener('videoStarted',
   () => {
    //  console.log('AdMobRewarded => videoStarted')
   }
  );

  AdMobRewarded.addEventListener('adLeftApplication',
   () => {
    //  console.log('AdMobRewarded => adLeftApplication')
   }
  );

  AdMobRewarded.requestAd().catch(error => {
    // console.warn(error)
  });

}


  componentWillMount(){
    this.props.getMovie();
    this.props.getCoins();
  }
  onLevelUp() {
    if(this.props.qNo%5 === 0){
      this.showInterstitial();
    }
    this.props.getMovie();
  }

  showRewarded() {
    AdMobRewarded.showAd().catch(error => console.warn(error));
  }

  onHelpRequested() {
    this.setState({ showModal: false });
    if(this.props.coins >= 60){
      this.props.updateCoins(-60);
      this.props.revealAnswerKey();
      this.checkAllAnswered();
    } else {
      this.showRewarded();
    }


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
      }
    }
  }
  onDecline() {
    this.setState({ showModal: false });
  }

  showInterstitial() {
    AdMobInterstitial.showAd().catch(error => console.warn(error));
  }


  showConfirmModal(){
    const answerFilled = _.every(this.props.answer, (answerObj) => answerObj.character !== '' || answerObj.hide);
    if(!answerFilled)
    this.setState({ showModal: !this.state.showModal });
  }

  answerFilled(){
    answerBoxFilled = _.every(this.props.answer, (answerObj) => answerObj.character !== '' || answerObj.hide);
  }

  renderAlphabetsOrBanner() {
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

  showConfirmText(){
    if(this.props.coins < 60) {
      return 'Insufficient coins, watch a ad to get 500 coins'
    } else {
      return 'Reveal a character for 60 coins'
    }
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
                {this.showConfirmText()}
            </Confirm>

          </Content>
        </Container>
        <AdMobBanner
    adSize="fullBanner"
    adUnitID="ca-app-pub-3940256099942544/1033173712"
    testDeviceID="EMULATOR"
    didFailToReceiveAdWithError={this.bannerError} />
      </Image>

    )
  }
}

const mapStateToProps = ({ movieRecogniser, coinState }) => {
  const { movie, alphabets, answer, qNo } = movieRecogniser;
  const {coins} = coinState;
  return {
    movie, alphabets, answer, coins, qNo
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
