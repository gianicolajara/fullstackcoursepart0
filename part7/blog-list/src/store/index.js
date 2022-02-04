import { applyMiddleware, combineReducers, createStore } from 'redux'
import thunkMiddleware from 'redux-thunk'
import blogsReducer from '../reducers/blogs.reducers'
import notificationReducers from '../reducers/notification.reducers'
import userReducers from '../reducers/user.reducers'
import { composeWithDevTools } from '@redux-devtools/extension'

const combiner = combineReducers({
  blogs: blogsReducer,
  user: userReducers,
  notification: notificationReducers,
})

const store = createStore(
  combiner,
  composeWithDevTools(applyMiddleware(thunkMiddleware)),
)

export default store
