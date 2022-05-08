import { STATUS } from '../../../utils/constants';
import { CHANGE_STATUS, CHECK_RESERVE, GET_BEARS, GET_BEAR_INFO, SET_BEAR_MODAL, SET_STATUS } from './types';

const initialState = {
  bears: [],
  isReserved: false,
  status: STATUS.NONE,
  bearModal: null,
};

export const bearsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_BEARS:
      const { bears, status } = action;
      return { ...state, bears: bears.map(bear => ({ ...bear, status })) };
    case CHANGE_STATUS:
      return { ...state, bears: action.bears };
    case CHECK_RESERVE:
      return { ...state, isReserved: action.isReserved };
    case SET_STATUS:
      return { ...state, status: action.status };
    case SET_BEAR_MODAL:
      return { ...state, bearModal: action.bearModal };
    default:
      return state;
  }
};
