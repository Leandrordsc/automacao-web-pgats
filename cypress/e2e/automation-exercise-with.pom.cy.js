/// <reference types="cypress" />
import faker from 'faker'
import cadastro  from '../pages/cadastro/index.js'
import login from '../pages/login/index.js'
import { beforeEach } from 'mocha'


//HOOKS - São ações que executam antes de todos ou de cada teste, ou depois
beforeEach(() => {
  cy.visit('')   
})

describe('Automation Exercise', () => {
   it('Caso de teste 1: Registrar usuário', () => {
      cadastro.preencherFormulario()
      .verificarSeCadastroFoiConcluido()
      
   })
    it('Caso de teste 2: Login do usuário com e-mail e senha corretos e excluir a conta', () => {
      cy.contains(' Signup / Login').click()
      login.preencherLogin('testeUser@email.com', '1472589', { log: false })
      cy.get('i.fa-user').parent().should('contain', 'Leandro Teste')
      
    })

    it('Caso de teste 3: Login de usuário com e-mail e senha incorretos', () => {
      cy.contains(' Signup / Login').click()
      login.preencherLogin('teste@teste.com', '123456')
      cy.get('p').contains('Your email or password is incorrect!').should('be.visible')
            
    })

    it('Caso de teste 4: Sair do usuário', () => {
      cy.contains(' Signup / Login').click()
      login.preencherLogin('testeUser@email.com', '1472589', { log: false })
      cy.get('i.fa-user').parent().should('contain', 'Leandro Teste')
      cy.contains('Logout').click()
      cy.url('/login')
      
    })

    it('Caso de teste 5: Registrar usuário com e-mail existente', () => {
      cadastro.iniciarCadastro('Leandro', 'teste@teste.com')
      cy.contains('Email Address already exist!').should('be.visible')
      
    })

    it.only('Caso de teste 6: Formulário de contato', () => {
      
      const Assunto = faker.lorem.words(2)
      const Mensagem = faker.lorem.paragraph()
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
     
      cy.contains('Products').click()
      cy.get('.single-products').should('be.visible').and('have.length.at.least', 1).first()
        .parent().contains('View Product')
        .click()
      cy.get('.product-information > h2').should('be.visible')
      cy.get('.product-information p').should('be.visible').and('have.length', 4)
      cy.get('.product-information span span').should('be.visible')    
    })

    it('Test Case 9: Search Product', () => {
      
      cy.contains(`Products`).click()
      cy.url().should('contain', 'products')
      cy.get('.title').should('be.visible').and('contain', 'All Products')
      cy.get('input#search_product').type('Shirt')
      cy.get('button#submit_search').click()
      cy.get('.title').should('be.visible').and('contain', 'Searched Products')
      cy.get('.single-products')
        .should('be.visible')
        .and('have.length.at.least', 1)
    })
  
    it('Test Case 10: Verify Subscription in home page', () => {
      cy.get('input#susbscribe_email')
        .scrollIntoView()
        .type('tester-qa@mail.com')
      cy.get('button#subscribe').click()
      cy.contains('You have been successfully subscribed!').should('be.visible')
    })

    it('Test Case 15: Place Order: Register before Checkout', () => {
      cadastro.preencherFormulario()
      cy.get('b').should('contain', 'Tester QA')
      cy.contains("Add to cart").click()
      cy.contains("View Cart").click()
      cy.get('.btn-default.check_out').should('be.visible')
      cy.get('.btn-default.check_out').click()
      cy.get(':nth-child(2) > .heading').should('have.text', 'Address Details')
      cy.get(':nth-child(4) > .heading').should('have.text', 'Review Your Order')
      cy.get('.form-control').type('378 98562-8781')
      cy.get('.btn-default.check_out').click()
      cy.get('[data-qa="name-on-card"]').type(faker.name.findName())
      cy.get('[data-qa="card-number"]').type(faker.finance.creditCardNumber())
      cy.get('[data-qa="cvc"]').type(faker.finance.creditCardCVV())
      cy.get('[data-qa="expiry-month"]').type(12)
      cy.get('[data-qa="expiry-year"]').type(2035)
      cy.get('[data-qa="pay-button"]').click()
      cy.get('[data-qa="order-placed"]').should('be.visible')
      cy.get('[href *="delete"]').click()
      cy.get('b').should('contain', 'Account Deleted!')
      cy.get('[data-qa="continue-button"]').click()
  
  })
  })
  
  