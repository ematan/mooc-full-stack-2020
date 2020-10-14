import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
//import { prettyDOM } from '@testing-library/dom'
import Blog from './Blog'

describe('Blog', () => {
  const testUser = {
    username:'tester',
    name:'tester'
  }
  const testBlog = {
    title: 'test',
    author: 'tester',
    url: 'http://test.url',
    likes: 0,
    user: testUser
  }
  let mockHandler
  let component
  window.localStorage.setItem('loggedUser', JSON.stringify(testUser))

  beforeEach(() => {
    mockHandler = jest.fn()
    component = render(
      <Blog
        blog={testBlog}
        user={testUser}
        handleLikes={mockHandler}
        handleRemove={mockHandler}
      />)
  })

  test('renders only title and author by default', () => {

    expect(component.container).toHaveTextContent(testBlog.title)
    expect(component.container).toHaveTextContent(testBlog.author)

    const extraInfo = component.container.querySelector('.extraInfo')
    expect(extraInfo).toHaveStyle('display: none')
  })

  test('clicking expandButton changes button text (and display status)', () => {
    let testedButton = component.container.querySelector('.expandButton')
    expect(testedButton).toHaveTextContent('view')
    fireEvent.click(testedButton)
    testedButton = component.container.querySelector('.expandButton')
    expect(testedButton).toHaveTextContent('hide')
  })

  test('url and likes shown after clicking expandButton', () => {
    let extraInfo = component.container.querySelector('.extraInfo')
    expect(extraInfo).toHaveStyle('display: none')
    const expandButton = component.container.querySelector('.expandButton')
    fireEvent.click(expandButton)
    extraInfo = component.container.querySelector('.extraInfo')
    expect(extraInfo).not.toHaveStyle('display: none')
  })

  test('clicking "like" x2 adds calls handler twice', () => {
    const likeButton = component.container.querySelector('.likeButton')
    fireEvent.click(likeButton)
    fireEvent.click(likeButton)
    expect(mockHandler.mock.calls).toHaveLength(2)
  })

  afterAll(() =>  window.localStorage.clear())

})