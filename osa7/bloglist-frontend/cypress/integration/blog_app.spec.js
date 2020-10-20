const user = {
  name: 'Tester',
  username: 'tester',
  password: 'password'
}
const baduser = {
  name: 'Bad Tester',
  username: 'badtester',
  password: 'badpassword'
}
const blog = {
  title: 'TestBlog',
  author: 'Tester',
  url: 'test.com'
}
const blog2 = {
  title: 'TestBlog2',
  author: 'Tester',
  url: 'test.com'
}
const blog3 = {
  title: 'TestBlog3',
  author: 'Tester',
  url: 'test.com'
}

describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    cy.request('POST', 'http://localhost:3001/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('front page can be opened', function() {
    cy.contains('Log in to application')
  })

  describe('Login', function() {
    it('succeed with tester/password', function() {
      cy.contains('Log in to application')
      cy.get('#username').type(user.username)
      cy.get('#password').type(user.password)
      cy.get('#login-button').click()
      cy.contains('Hello Tester')
    })

    it('fail with wrong credentials', function() {
      cy.contains('Log in to application')
      cy.get('#username').type('aaa')
      cy.get('#password').type('aaa')
      cy.get('#login-button').click()
      cy.contains('Wrong username or password')
      cy.get('.notification').should('have.css', 'color', 'rgb(255, 0, 0)')
    })

  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login(user)
    })

    it('a blog form can be opened', function() {
      cy.contains('new blog').click()
      cy.get('#create-button').contains('create')
    })

    it('a blog can be created', function() {
      cy.contains('new blog').click()
      cy.get('#title').type(blog.title)
      cy.get('#author').type(blog.author)
      cy.get('#url').type(blog.url)
      cy.get('#create-button').click()
      cy.contains(`Added new blog ${blog.title} by ${blog.author}`)
      cy.contains(blog.title)
      cy.contains(blog.author)
    })

    it('a blog can be expanded', function() {
      cy.createBlog(blog)
      cy.contains('view').click()
      cy.contains(blog.url)
    })

    it('a blog can be liked', function() {
      cy.createBlog(blog)
      cy.contains(blog.title).parent().contains('view').click()
      cy.contains('Likes 0')

      cy.contains(blog.title)
        .parent()
        .find('button')
        .contains('like')
        .click()
      cy.contains('Likes 1')
    })

    it('a blog can be deleted by creator', function() {
      cy.createBlog(blog)
      cy.contains('view').click()
      cy.contains(blog.title)
        .parent()
        .contains('remove')
        .click()
      cy.get('#blogList').contains(blog.title).should('not.exist')
      cy.contains(`${blog.title} succesfully removed`)
    })

    it('a blog can\'t be deleted my non-creator', function() {
      cy.request('POST', 'http://localhost:3001/api/users/', baduser)
      cy.createBlog(blog)
      cy.contains('logout').click()
      cy.login(baduser)
      cy.contains('view').click()
      cy.get('remove').should('not.exist')
    })

    it.only('blogs are sorted by likes', function() {
      cy.createBlog(blog, blog2, blog3)
      cy.get('.expandButton').then( buttons => {
        for (let i = 0; i<buttons.length; i++){
          cy.wrap(buttons[i]).click()
        }
      })
      cy.get('#blogList')
        .contains(blog3.title)
        .parent()
        .contains('like')
        .click().click()
      cy.get('.singleBlog').then( blogs => {
        cy.wrap(blogs[0]).contains(blog3.title)
        cy.wrap(blogs[1]).contains(blog.title)
      })

      cy.get('#blogList')
        .contains(blog2.title)
        .parent()
        .contains('like')
        .click()
      cy.get('.singleBlog').then( blogs => {
        cy.wrap(blogs[0]).contains(blog3.title)
        cy.wrap(blogs[1]).contains(blog2.title)
      })

    })


  })



})