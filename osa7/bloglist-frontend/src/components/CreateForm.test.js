import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
//import { prettyDOM } from '@testing-library/dom'
import CreateForm from './CreateForm'

describe('CreateForm', () => {
  const testUser = {
    username:'tester',
    name:'tester'
  }
  const testBlog = {
    title: 'testTitle',
    author: 'testAuthor',
    url: 'http://test.url',
    likes: 0,
    user: testUser
  }
  let mockHandler
  let component

  beforeEach(() => {
    mockHandler = jest.fn()
  })

  test('updates parent state and calls on onSubmit', () => {
    component = render(
      <CreateForm createBlog={mockHandler} />
    )
    const title = component.container.querySelector('#title')
    const author = component.container.querySelector('#author')
    const url = component.container.querySelector('#url')

    fireEvent.change(title, {
      target: { value: testBlog.title }
    })
    fireEvent.change(author, {
      target: { value: testBlog.author }
    })
    fireEvent.change(url, {
      target: { value: testBlog.url }
    })

    const form = component.container.querySelector('form')
    fireEvent.submit(form)

    expect(mockHandler.mock.calls).toHaveLength(1)
    expect(mockHandler.mock.calls[0][0].title).toBe(testBlog.title)
    expect(mockHandler.mock.calls[0][0].author).toBe(testBlog.author)
    expect(mockHandler.mock.calls[0][0].url).toBe(testBlog.url)

  })
})