/// <reference types="cypress" />
import faker from 'faker'
import cadastro  from '../pages/cadastro/index.js'
import login from '../pages/login/index.js'
import contato from '../pages/Contato/index.js';
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

    it('Caso de teste 6: Formulário de contato', () => {
      cy.url().should('eq', 'https://automationexercise.com/')
      contato.preencherDados()
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

    it('Caso de teste 9: Buscar Produtos', () => {
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
  
    it('Caso de Teste 10: Verificar Inscrição na Página Inicial', () => {
      cy.get('input#susbscribe_email')
        .scrollIntoView()
        .type('tester-qa@mail.com')
      cy.get('button#subscribe').click()
      cy.contains('You have been successfully subscribed!').should('be.visible')
    })

    it('Caso de Teste 15: Realizar Pedido: Registrar antes da Finalização da Compra', () => {
      cadastro.preencherFormulario()
      .cadastrarCartao()
      cy.get('[href *="delete"]').click()
      cy.get('b').should('contain', 'Account Deleted!')
      cy.get('[data-qa="continue-button"]').click()
  
    })
})
  
  