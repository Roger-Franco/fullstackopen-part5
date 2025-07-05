describe('Blog app', function () {

  beforeEach(function () {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
    // cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Matti Luukkainen',
      username: 'mluukkai',
      password: 'salainen'
    }
    cy.request('POST', `${Cypress.env('BACKEND')}/users/`, user)
    // cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://127.0.0.1:5173/')
    // crie aqui um usuário para o backend
  })

  it('front page can be opened', function () {
    // cy.visit('http://127.0.0.1:5173/')
    cy.contains('blogs')
    cy.contains('Blog app, Department of Computer Science, University of Helsinki 2022')
  })

  it('login form is shown', function () {
    cy.contains('log in').click()
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      // cy.contains('log in').click()
      // // cy.get('input:first').type('mluukkai')
      // // cy.get('input:last').type('salainen')
      // cy.get('#username').type('mluukkai')
      // cy.get('#password').type('salainen')
      // cy.get('#login-button').click()

      cy.login({ username: 'mluukkai', password: 'salainen' })

      cy.contains('Matti Luukkainen logged in')
    })

    it('fails with wrong credentials', function () {
      cy.contains('log in').click()
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()

      // cy.get('.error').contains('Wrong credentials')
      // cy.get('.error').should('contain', 'Wrong credentials')
      // cy.get('.error').should('have.css', 'color', 'rgb(255, 0, 0)')
      // cy.get('.error').should('have.css', 'border-style', 'solid')

      cy.get('.error')
        .should('contain', 'Wrong credentials')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')

      cy.get('html').should('not.contain', 'Matti Luukkainen logged in')
      // cy.contains('Matti Luukkainen logged in').should('not.exist')

    })
  })


  describe('When logged in', function () {
    beforeEach(function () {
      // Usando comando personalizado login
      cy.login({ username: 'mluukkai', password: 'salainen' })
      // Bypass login
      // cy.request('POST', 'http://localhost:3003/api/login', {
      //   username: 'mluukkai', password: 'salainen'
      // }).then(response => {
      //   localStorage.setItem('loggedBlogappUser', JSON.stringify(response.body))
      //   cy.visit('http://127.0.0.1:5173')
      // })

      // faça login do usuário aqui
      // cy.contains('log in').click()
      // cy.get('#username').type('mluukkai')
      // cy.get('#password').type('salainen')
      // cy.get('#login-button').click()
      // cy.contains('Matti Luukkainen logged in')
    })


    it('A blog can be created', function () {
      cy.createBlog({ title: 'a blog created by cypress', author: 'Matti Luukkainen', url: 'MattiLuukkainen.test' })

      // cy.contains('new blog').click()
      // cy.get('#title').type('a blog created by cypress')
      // cy.get('#author').type('Matti Luukkainen')
      // cy.get('#url').type('MattiLuukkainen.test')
      // cy.contains('save').click()
      cy.contains('a blog created by cypress')
    })

    it('A blog can be liked', function () {
      cy.contains('new blog').click()
      cy.get('#title').type('a blog created by cypress testing to like')
      cy.get('#author').type('Matti Luukkainen')
      cy.get('#url').type('MattiLuukkainen.test')
      cy.contains('save').click()

      cy.contains('view').click()
      cy.contains('like').click()
    })

    it('A blog can be deleted', function () {
      cy.contains('new blog').click()
      cy.get('#title').type('a blog created by cypress testing to delete')
      cy.get('#author').type('Matti Luukkainen')
      cy.get('#url').type('MattiLuukkainen.test')
      cy.contains('save').click()

      cy.contains('view').click()
      cy.get('#remove-button').should('contain', 'remove')
      cy.contains('remove').click()
    })

    it('Blogs are sorted in descending order by likes', function () {
      cy.createBlog({ title: 'a blog created by cypress 1', author: 'Matti Luukkainen', url: 'MattiLuukkainen.test' })
      cy.createBlog({ title: 'a blog created by cypress 2', author: 'Matti Luukkainen', url: 'MattiLuukkainen.test', likes: 2 })
      cy.createBlog({ title: 'a blog created by cypress 3', author: 'Matti Luukkainen', url: 'MattiLuukkainen.test', likes: 3 })
      cy.contains('view').click()
      cy.get('.blog').eq(0).should('contain', 'a blog created by cypress 3')
      cy.get('.blog').eq(1).should('contain', 'a blog created by cypress 2')
      cy.get('.blog').eq(2).should('contain', 'a blog created by cypress 1')
    })

  })


})