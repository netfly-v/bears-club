import { CHANGE_STATUS, CHECK_RESERVE, GET_BEARS, SET_BEAR_MODAL, SET_STATUS } from './types';

export const getBearsAction = (bears, status) => ({ type: GET_BEARS, bears, status });
export const changeBearStatusAction = bears => ({ type: CHANGE_STATUS, bears });
export const checkIsBearReservedAction = isReserved => ({ type: CHECK_RESERVE, isReserved });
export const bearsStatusAction = status => ({ type: SET_STATUS, status });
export const getBearsWithStatusAction = bears => ({ type: GET_BEARS, bears });
export const setBearModalAction = bearModal => ({ type: SET_BEAR_MODAL, bearModal });
