import { applyMiddleware, combineReducers, createStore } from 'redux'
import reducerAnecdote from '../reducers/anecdoteReducer'
import { composeWithDevTools } from 'redux-devtools-extension'
import notificationReducer from '../reducers/notificationReducer'
import filterReducer from '../reducers/filterReducer'
import thunk from 'redux-thunk'

const reducers = combineReducers({
  anecdote: reducerAnecdote,
  notification: notificationReducer,
  filter: filterReducer,
})

const store = createStore(reducers, composeWithDevTools(applyMiddleware(thunk)))

export default store
