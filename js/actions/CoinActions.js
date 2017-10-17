import store from 'react-native-simple-store';
import {GET_COINS, UPDATE_COINS} from './types';

export const getCoins = () => {
  return (dispatch) => {
    store.get('coins').then(data => {
      dispatch({
        type: GET_COINS,
        payload: data.coins
      })
    }).catch(err => {
      return store.save('coins', { coins: 0 });
      dispatch({
        type: GET_COINS,
        payload: data.coins
      })
    })
  };
};

export const updateCoins = (amount) => {
  return {
    type: UPDATE_COINS,
    payload: {
      store,
      amount
    }
  }
}
