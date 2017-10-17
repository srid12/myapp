import { combineReducers } from 'redux';
import movieRecogniserReducer from './MovieRecogniserReducer';
import coinReducer from './CoinReducer';

export default combineReducers({
  movieRecogniser: movieRecogniserReducer,
  coinState: coinReducer
});
