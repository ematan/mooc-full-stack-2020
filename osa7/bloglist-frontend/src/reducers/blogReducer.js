import blogService from '../services/blogs'
import userService from '../services/users'
import { setNotification } from './notificationReducer'

const reducer = (state=[], action) => {
  switch(action.type) {
    case 'NEW_BLOG':
      return [...state, action.data]
    case 'LIKE_BLOG':
      return state.map(b => b.id !== action.data.id ? b : action.data)
    case 'INIT_BLOGS':
      return action.data.blogs
    case 'DELETE_BLOG':
      return state.filter(b => b.id !== action.data.id)
    default:
      return state
  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: { blogs }
    })
  }
}

export const createBlog = (blog) => {
  return async dispatch => {
    try {
      const newBlog = await blogService.create(blog)
      dispatch({
        type: 'NEW_BLOG',
        data: newBlog
      })
    } catch (e) {
      const msg = e.response.data.error
      dispatch(setNotification({ msg:msg, color:'red' }, 5))
    }
  }
}

export const likeBlog = id => {
  return async dispatch => {
    try {
      const blogToChange = await blogService.getOne(id)
      const changedBlog = { ...blogToChange, likes: blogToChange.likes + 1 }
      await blogService.update(id, changedBlog)

      //add user to blog before dispatch
      const { blogs, ...user } = await userService.getOne(changedBlog.user)
      changedBlog.user = user

      dispatch({
        type: 'LIKE_BLOG',
        data: changedBlog
      })
    } catch (e) {
      console.log(e.response.data)
    }
  }
}

export const deleteBlog = id => {
  return async dispatch => {
    try {
      const blog = await blogService.getOne(id)
      await blogService.remove(id)
      const msg = `${blog.title} succesfully removed`
      dispatch(setNotification({ msg:msg, color:'green' }, 5))
      dispatch({
        type: 'DELETE_BLOG',
        data: blog
      })

    } catch (e) {
      console.log(e)
      dispatch(setNotification({ msg:e.response.data.error, color:'red' }, 5))
    }
  }

}


export default reducer