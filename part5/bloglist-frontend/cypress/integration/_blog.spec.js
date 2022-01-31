describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.contains('log in to application')
  })

  describe('Login', function () {
    beforeEach(function () {
      cy.request('POST', 'http://localhost:3001/api/auth/signup', {
        username: 'root',
        name: 'root',
        password: 'sekret',
      })
    })

    it('succeeds with correct credentials', function () {
      cy.get('#username').type('root')
      cy.get('#password').type('sekret')
      cy.get('#login-button').click()
      cy.contains('blogs')
      cy.get('#logout').click()
    })

    it('fails with wrong credentials', function () {
      cy.get('#username').type('root')
      cy.get('#password').type('sekrett')
      cy.get('#login-button').click()
      cy.contains('invalid username or password')
      cy.get('#error-box').should(
        'have.css',
        'background-color',
        'rgb(255, 0, 0)',
      )
    })
  })

  describe('When logged in', function () {
    beforeEach(function () {
      cy.request('POST', 'http://localhost:3001/api/testing/reset')
      cy.request('POST', 'http://localhost:3001/api/auth/signup', {
        username: 'root',
        name: 'root',
        password: 'sekret',
      })
      cy.visit('http://localhost:3000')
      cy.get('#username').type('root')
      cy.get('#password').type('sekret')
      cy.get('#login-button').click()
    })

    it('A blog can be created', function () {
      cy.contains('create new blog').click()
      cy.get('#title').type('Titulo')
      cy.get('#author').type('root')
      cy.get('#url').type('https://www.youtube.com/')
      cy.get('#create-blog').click()
      cy.contains('Your blog was successfully created by root')
    })

    it('Button blog like', function () {
      cy.contains('create new blog').click()
      cy.get('#title').type('Titulo')
      cy.get('#author').type('root')
      cy.get('#url').type('https://www.youtube.com/')
      cy.get('#create-blog').click()
      cy.contains('Your blog was successfully created by root')
      cy.contains('show blog').click()
      cy.get('#likes').contains('0')
      cy.contains('like').click()
      cy.get('#likes').contains('1')
    })

    it('delete blog', function () {
      cy.contains('create new blog').click()
      cy.get('#title').type('Titulo')
      cy.get('#author').type('root')
      cy.get('#url').type('https://www.youtube.com/')
      cy.get('#create-blog').click()
      cy.contains('Your blog was successfully created by root')
      cy.contains('show blog').click()
      cy.contains('delete').click()
    })

    it('delete blog other user', function () {
      cy.request('POST', 'http://localhost:3001/api/auth/signup', {
        username: 'gianicola',
        name: 'gianicola',
        password: 'sekret',
      })
      cy.contains('create new blog').click()
      cy.get('#title').type('Titulo 2')
      cy.get('#author').type('root 2')
      cy.get('#url').type('https://fullstackopen.com/')
      cy.get('#create-blog').click()
      cy.contains('Your blog was successfully created by root')
      cy.get('#logout').click()
      cy.get('#username').type('gianicola')
      cy.get('#password').type('sekret')
      cy.get('#login-button').click()
      cy.contains('show blog').click()
      cy.get('delete').should('not.exist')
    })
  })

  describe('order blogs by likes', function () {
    beforeEach(function () {
      cy.request('POST', 'http://localhost:3001/api/testing/reset')
      cy.request('POST', 'http://localhost:3001/api/auth/signup', {
        username: 'root',
        name: 'root',
        password: 'sekret',
      })
      cy.visit('http://localhost:3000')
      cy.get('#username').type('root')
      cy.get('#password').type('sekret')
      cy.get('#login-button').click()
    })

    it('create blogs', function () {
      cy.contains('create new blog').click()
      cy.get('#title').type('Titulo')
      cy.get('#author').type('root')
      cy.get('#url').type('https://www.youtube.com/')
      cy.get('#create-blog').click()
      cy.contains('Your blog was successfully created by root')
      cy.contains('Titulo').parent().contains('show blog').click()
      cy.contains('Titulo').parent().contains('like').click()
      cy.contains('create new blog').click()
      cy.get('#title').type('Titulo 2')
      cy.get('#author').type('root 2')
      cy.get('#url').type('https://www.youtube.com/2')
      cy.get('#create-blog').click()
      cy.contains('Your blog was successfully created by root')
      cy.contains('Titulo 2').parent().contains('show blog').click()
      cy.contains('Titulo 2').parent().contains('like').as('theTitle2Button')
      cy.get('@theTitle2Button').click()
      cy.contains('Titulo 2').parent().find('#likes').contains('1')
      cy.get('@theTitle2Button').click()
      cy.contains('Titulo 2').parent().find('#likes').contains('2')
      cy.get('.blog').then(($els) => {
        expect($els.length).to.equal(2)
        expect($els[0].childNodes[1].children[0]).to.contain('2')
        expect($els[1].childNodes[1].children[0]).to.contain('1')
      })
    })
  })
})
