import _ from 'lodash';
import { GET_COINS, UPDATE_COINS} from '../actions/types';
import { Actions } from 'react-native-router-flux';

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  switch( action.type){
    case GET_COINS: {
      Actions.refresh({ rightTitle: `${action.payload} coins` });
      return {coins: action.payload}
    }

    case UPDATE_COINS: {
      const {store, amount} = action.payload;
      let {coins} = state;
      coins += amount;
      store.update('coins', {coins});
      Actions.refresh({ rightTitle: `${coins} coins` });
      return {...state, coins};
    }

    default:
     return state;
  }
};
