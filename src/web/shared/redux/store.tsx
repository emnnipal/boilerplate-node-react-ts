import { applyMiddleware, compose, createStore, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import promise from 'redux-promise-middleware'

/* Reducers */
import client from './client'

const isDevelopment = process.env.NODE_ENV === 'development'
const reducers = combineReducers({
  client
})

const middlewares = [thunk, promise]
if (isDevelopment) middlewares.push(logger)

export default createStore(reducers, compose(applyMiddleware(...middlewares)))


