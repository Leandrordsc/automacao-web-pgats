/// <reference types="cypress" />
import faker from 'faker';

describe('Automation Exercise', () => {
    let email;
    const signUpName = 'Tester QA'
    const password = '12345'
  
    it('Caso de teste 1: Registrar usuário', () => {
      const timestamp = new Date().getTime()
      email = `tester-${timestamp}@mail.com`
      cy.visit('/')
      cy.contains('Signup').click()
      cy.get('[data-qa="signup-name"]').type(signUpName)
      cy.get('[data-qa="signup-email"]').type(email)
      cy.contains('button', 'Signup').click()
      cy.get('input[type=radio]').check('Mrs')
      cy.get('input[type=radio]').eq(1).check()
      cy.get('[type=password]').type(password, { log: false })
      cy.get('[data-qa="days"]').select('5')
      cy.get('[data-qa="months"]').select('November')
      cy.get('[data-qa="years"]').select('1993')
      cy.get('input[type=checkbox]#newsletter').check()
      cy.get('input[type=checkbox]#optin').check()
      cy.get('[data-qa="first_name"]').type('Cristiano')
      cy.get('[data-qa="last_name"]').type('Ronaldo')
      cy.get('[data-qa="company"]').type('Tigrinho Tabajara')
      cy.get('[data-qa="address"]').type('rua treze, n 14')
      cy.get('[data-qa="country"]').select('United States')
      cy.get('[data-qa="state"]').type('Califórnia')
      cy.get('[data-qa="city"]').type('Los Angeles')
      cy.get('[data-qa="zipcode"]').type('90001')
      cy.get('[data-qa="mobile_number"]').type('111 222 333')
      cy.get('[data-qa="create-account"]').click()
      cy.url().should('include', 'account_created')
      cy.get('[data-qa="account-created"]').should('be.visible')
      cy.get('[data-qa="continue-button"]').click()
      cy.get('i.fa-user').parent().should('contain', signUpName)
    })
  
    it('Caso de teste 2: Login do usuário com e-mail e senha corretos e excluir a conta', () => {
      cy.visit('/')
      cy.contains(' Signup / Login').click()
      cy.get('[data-qa="login-email"]').type(email)
      cy.get('[data-qa="login-password"]').type(password, { log: false })
      cy.contains('button', 'Login').click()
      cy.get('i.fa-user').parent().should('contain', signUpName)
      cy.contains('Delete Account').click()
      cy.get('[data-qa="account-deleted"]').should('be.visible')
    })
    it('Caso de teste 3: Login de usuário com e-mail e senha incorretos', () => {
      cy.visit('/')
      cy.contains(' Signup / Login').click()
      cy.get('h2').contains('Login to your account').should('be.visible')
      cy.get('[data-qa="login-email"]').type('teste@email.com')
      cy.get('[data-qa="login-password"]').type('147258', { log: false })
      cy.contains('button', 'Login').click()
      cy.get('p').contains('Your email or password is incorrect!').should('be.visible');     
    })
    it('Caso de teste 4: Sair do usuário', () => {
      cy.visit('/')
      cy.url().should('eq', 'https://automationexercise.com/')
      cy.contains(' Signup / Login').click()
      cy.get('[data-qa="login-email"]').type('testeUser@email.com')
      cy.get('[data-qa="login-password"]').type('1472589', { log: false })
      cy.contains('button', 'Login').click()
      cy.get('i.fa-user').parent().should('contain', 'Leandro Teste')
      cy.contains('Logout').click()
      cy.url('/login')
      
    })
    it('Caso de teste 5: Registrar usuário com e-mail existente', () => {
      cy.visit('/')
      cy.contains('Signup').click()
      cy.get('[data-qa="signup-name"]').type('Sandor Clegane')
      cy.get('[data-qa="signup-email"]').type('testeUser@email.com')
      cy.contains('button', 'Signup').click()
      cy.contains('Email Address already exist!').should('be.visible')
      
    })
    it.only('Caso de teste 6: Formulário de contato', () => {
      const Assunto = faker.lorem.words(2)
      const Mensagem = faker.lorem.paragraph()
      cy.visit('')
      cy.url().should('eq', 'https://automationexercise.com/')
      cy.contains('Contact us').click()
      cy.get('[data-qa="name"]').type('Leandro')
      cy.get('[data-qa="name"]').type('testeUser@email.com')
      cy.get('[data-qa="subject"]').type(Assunto)
      cy.get('[data-qa="message"]').type(Mensagem)
      cy.contains('button','upload_file').click()



      
    });
  })
  
  