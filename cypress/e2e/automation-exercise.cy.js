/// <reference types="cypress" />
import { should } from 'chai';
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
      cy.get('[data-qa="login-email"]').type('testeUser@email.com')
      cy.get('[data-qa="login-password"]').type('1472589', { log: false })
      cy.contains('button', 'Login').click()
      cy.get('i.fa-user').parent().should('contain', 'Leandro Teste')
      //cy.contains('Delete Account').click()
      //cy.get('[data-qa="account-deleted"]').should('be.visible')
    })
    it('Caso de teste 3: Login de usuário com e-mail e senha incorretos', () => {
      cy.visit('/')
      cy.contains(' Signup / Login').click()
      cy.get('h2').contains('Login to your account').should('be.visible')
      cy.get('[data-qa="login-email"]').type('teste@email.com')
      cy.get('[data-qa="login-password"]').type('147258')
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
    it('Caso de teste 6: Formulário de contato', () => {
      const Assunto = faker.lorem.words(2)
      const Mensagem = faker.lorem.paragraph()
      cy.visit('')
      cy.url().should('eq', 'https://automationexercise.com/')
      cy.contains('Contact us').click()
      cy.get('[data-qa="name"]').type('Leandro')
      cy.get('[data-qa="email"]').type('testeUser@email.com')
      cy.get('[data-qa="subject"]').type(Assunto)
      cy.get('[data-qa="message"]').type(Mensagem)
      cy.fixture('example.json').as('arquivo')
      cy.get('input[name="upload_file"]').selectFile('@arquivo')
      cy.get('[data-qa="submit-button"]').click()
      cy.get('.status').should('have.text','Success! Your details have been submitted successfully.')   
    })
    it('Caso de teste 8: verificar todos os produtos e a página de detalhes do produto', () => {
      cy.visit('/')
      cy.contains('Products').click()
      //cy.url().should('be.visible').and('contain','All Products')
      cy.get('.single-products').should('be.visible').and('have.length.at.least', 1).first()
        .parent().contains('View Product')
        .click()
      //cy.get('.product-information > h2').should('be.visible')
      //product name, category, price, availability, condition, brand
      cy.get('.product-information > h2').should('be.visible')
      cy.get('.product-information p').should('be.visible').and('have.length', 4)
      cy.get('.product-information span span').should('be.visible')    
    });

    it('Test Case 15: Place Order: Register before Checkout', () => {
      const timestamp = new Date().getTime()
      const nome = "Iron Man"

      cy.visit('https://automationexercise.com')
      cy.get('[href$=login]').click()
      cy.get('[data-qa="signup-name"]').type(nome)
      cy.get('[data-qa=signup-email]').type(`ironman${timestamp}@qa.com.br`)
      cy.get('[data-qa="signup-button"]').click()
      cy.get('input[type=radio]').eq(0).check();
      cy.get('[data-qa="password"]').type('5r4s15sd5f1', { log: false });
      cy.get('[data-qa=days]').select(25)
      cy.get('[data-qa="months"]').select(5)
      cy.get('[data-qa="years"]').select('1989')
      cy.get('input[type=checkbox]#newsletter').check()
      cy.get('input[type=checkbox]#optin').check()
      cy.get('[data-qa="first_name"]').type('Tony')
      cy.get('[data-qa="last_name"]').type('Stark')
      cy.get('[data-qa="company"]').type('Stark Industries')
      cy.get('[data-qa="address"]').type('XXXX')
      cy.get('[data-qa="country"]').select('United States')
      cy.get('[data-qa="state"]').type('California')
      cy.get('[data-qa="city"]').type('Los Angeles')
      cy.get('[data-qa="zipcode"]').type('8789498')
      cy.get('[data-qa="mobile_number"]').type('378 98562-8781')
      cy.get('[data-qa="create-account"]').click()
      cy.get('b')
          .should('contain', 'Account Created!')
      cy.url().should('includes', 'account_created')
      cy.get('[data-qa="account-created"]')
          .should('be.visible')
      cy.get('[data-qa="continue-button"]').click()
      cy.get('b').should('contain', nome)
      cy.contains("Add to cart").click()
      cy.contains("View Cart").click()
      cy.get('.btn-default.check_out').should('be.visible')
      cy.get('.btn-default.check_out').click()
      cy.get(':nth-child(2) > .heading').should('have.text', 'Address Details')
      cy.get(':nth-child(4) > .heading').should('have.text', 'Review Your Order')
      cy.get('.form-control').type('378 98562-8781')
      cy.get('.btn-default.check_out').click()
      cy.get('[data-qa="name-on-card"]').type(faker.name.findName());
      cy.get('[data-qa="card-number"]').type(faker.finance.creditCardNumber())
      cy.get('[data-qa="cvc"]').type(faker.finance.creditCardCVV())
      cy.get('[data-qa="expiry-month"]').type(12)
      cy.get('[data-qa="expiry-year"]').type(2035)
      cy.get('[data-qa="pay-button"]').click()
      cy.get('[data-qa="order-placed"]').should('be.visible')
      cy.get('[href *="delete"]').click()
      cy.get('b').should('contain', 'Account Deleted!')
      cy.get('[data-qa="continue-button"]').click()
  
  
  });
  })
  
  