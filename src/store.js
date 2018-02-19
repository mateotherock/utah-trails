import { createStore, applyMiddleware } from 'redux';
import reducer from './ducks/reducer.js';
import promiseMiddleware from 'redux-promise-middleware';
import logger from 'redux-logger';

export default createStore(reducer, applyMiddleware(promiseMiddleware(), logger));