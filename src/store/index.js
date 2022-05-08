import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import logger from 'redux-logger';
import { bearsReducer } from './state/bears';

const reducers = combineReducers({
  bearsDomain: bearsReducer,
});

export const store = createStore(reducers, applyMiddleware(thunkMiddleware, logger));
