import BlogDetails from '../components/BlogDetails'
import {
  createBlog,
  createCommentById,
  deleteBlog,
  getAllBlogs,
  putBlog,
} from '../services/blogs'
import { clearNotification, setNotification } from './notification.reducers'

const initialState = []

const getAllBlogsFromDB = () => {
  return async (dispatch) => {
    try {
      const data = await getAllBlogs()
      dispatch({
        type: 'SET_BLOGS_FROM_DB',
        data,
      })
    } catch (error) {
      dispatch(clearNotification())
      dispatch(setNotification(error))
    }
  }
}

const setBlogs = (data) => {
  return (dispatch) => {
    dispatch({
      type: 'SET_BLOGS',
      data,
    })
  }
}

const filterBlogAndDelete = (data) => {
  return async (dispatch) => {
    try {
      await deleteBlog(data.id)
      dispatch(clearNotification())
      dispatch(setNotification(`${data.title} deleted`, false))
      dispatch({
        type: 'FILTER_BLOG_AND_DELETE',
        data,
      })
    } catch (error) {
      dispatch(clearNotification())
      dispatch(setNotification(error))
    }
  }
}

const createNewBlog = (data, toggleClose, clearAll) => {
  return async (dispatch) => {
    try {
      const { title, author, url } = data
      const request = await createBlog({ title, author, url })
      dispatch({
        type: 'CREATE_NEW_BLOG',
        data: request,
      })
      dispatch(clearNotification())
      dispatch(setNotification(`${title} created`, false))
      if (clearAll) clearAll()
      if (toggleClose) toggleClose()
    } catch (error) {
      dispatch(clearNotification())
      dispatch(setNotification(error))
    }
  }
}

const likeBlog = (data) => {
  return async (dispatch) => {
    try {
      const dataToSend = {
        author: data.author,
        id: data.id,
        likes: data.likes + 1,
        title: data.title,
        url: data.url,
      }
      const request = await await putBlog(data.id, dataToSend)
      dispatch({
        type: 'LIKE_BLOG',
        data: request,
      })
      dispatch(clearNotification())
      dispatch(setNotification(`${data.title} like`, false))
    } catch (error) {
      dispatch(clearNotification())
      dispatch(setNotification(error))
    }
  }
}

const addCommentBlog = (data, clearImputs) => {
  return async (dispatch) => {
    try {
      await createCommentById(data.id, data.comment)
      dispatch(clearNotification())
      dispatch(setNotification('Comment added', false))
      dispatch({
        type: 'ADD_COMMENT_BLOG',
        data: {
          id: data.id,
          comment: data.comment,
        },
      })
      /*  console.log('hola')
      clearImputs() */
    } catch (error) {
      dispatch(clearNotification())
      dispatch(setNotification(error))
    }
  }
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'SET_BLOGS_FROM_DB':
      return action.data
    case 'SET_BLOGS':
      return [...state, ...action.data]
    case 'FILTER_BLOG_AND_DELETE':
      return state.filter((blog) => blog.id !== action.data.id)
    case 'CREATE_NEW_BLOG':
      return state.concat(action.data)
    case 'LIKE_BLOG':
      return state.map((blog) =>
        blog.id === action.data.id ? { ...blog, likes: blog.likes + 1 } : blog,
      )
    case 'ADD_COMMENT_BLOG':
      return state.map((blog) =>
        blog.id === action.data.id
          ? {
              ...blog,
              comments: blog.comments.concat(action.data.comment),
            }
          : blog,
      )
    default:
      return state
  }
}

export {
  getAllBlogsFromDB,
  setBlogs,
  filterBlogAndDelete,
  createNewBlog,
  likeBlog,
  addCommentBlog,
}
