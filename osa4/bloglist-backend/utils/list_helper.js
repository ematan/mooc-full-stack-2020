const groupBy = require('lodash/fp/groupBy')
const flow = require("lodash/fp/flow")
const mapValues = require("lodash/fp/mapValues")
const toPairs = require("lodash/fp/toPairs")
const sortBy = require("lodash/fp/sortBy")

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const reducer = (sum, item) => sum+item.likes
  
  return blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
  const reducer = (best, item) =>{
    return best.likes > item.likes ? best : item
  }
  const formatResult = (item) => {
    return {
      title: item.title,
      author: item.author,
      likes: item.likes
    }
  }

  return blogs.length > 0 
    ? formatResult(blogs.reduce(reducer, blogs[1])) 
    : null
}

const mostBlogs = (blogs) => {

  if (blogs.length == 0) return null
  
  const result = flow(
      groupBy(x => x.author),
      mapValues(y => y.length),
      toPairs,
      sortBy(x => -x[1])
    )(blogs)
  
  return {
    author: result[0][0],
    blogs: result[0][1]
  }

}

const mostLikes = (blogs) => {

  if (blogs.length == 0) return null
  
  const result = flow(
      groupBy(x => x.author),
      mapValues(y => y.reduce((sum, item) => sum+item.likes, 0)),
      toPairs,
      sortBy(x => -x[1])
    )(blogs)
  
  return {
    author: result[0][0],
    likes: result[0][1]
  }
}

module.exports = {
  dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes
}






