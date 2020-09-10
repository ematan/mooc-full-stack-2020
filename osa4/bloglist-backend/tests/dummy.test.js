const listHelper = require('../utils/list_helper')
const data = require('./blogs')
const blogs = data.blogs


test('dummy returns one', () => {
  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})


describe('totalLikes', () => {
  test('totalLikes returns all likes (36)', () => {
    const result = listHelper.totalLikes(blogs)
    expect(result).toBe(36)
  })

  test('of empty list is zero', () => {
    const empty_blog = []
    const result = listHelper.totalLikes(empty_blog)
    expect(result).toBe(0)
  })

  test('of array of length 1 returns likes for that object', () => {
    const single_blog = [{
      _id: '5a422a851b54a676234d17f7',
      title: 'React patterns',
      author: 'Michael Chan',
      url: 'https://reactpatterns.com/',
      likes: 7,
      __v: 0
    }]
    const result = listHelper.totalLikes(single_blog)
    expect(result).toBe(7)
  })
})

describe('favoriteBlog', () => {
  test('finds first blog with most likes', () => {
    const result = listHelper.favoriteBlog(blogs)
    const comparison = {
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      likes: 12
    }
    expect(result).toEqual(comparison)
  })

  test('returns null if empty list', () => {
    const empty_blog = []
    const result = listHelper.favoriteBlog(empty_blog)
    expect(result).toEqual(null)
  })

})

describe('mostBlogs', () => {
  test('mostBlogs', () => {
    const result = listHelper.mostBlogs(blogs)
    const comparison = {
      author: 'Robert C. Martin',
      blogs: 3
    }
    expect(result).toEqual(comparison)
  })

  test('returns null if empty list', () => {
    const empty_blog = []
    const result = listHelper.mostBlogs(empty_blog)
    expect(result).toEqual(null)
  })

})

describe('mostLikes', () => {
  test('mostLikes', () => {
    const result = listHelper.mostLikes(blogs)
    const comparison = {
      author: 'Edsger W. Dijkstra',
      likes: 17
    }
    expect(result).toEqual(comparison)
  })

  test('returns null if empty list', () => {
    const empty_blog = []
    const result = listHelper.mostLikes(empty_blog)
    expect(result).toEqual(null)
  })

})