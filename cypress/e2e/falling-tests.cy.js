/// <reference types="cypress" />

describe('Cadastrar entradas e saídas com bugs', () => {
    const descricao = 'Mesada'
    it('Cadastrar uma nova transação de entrada - falha 1', () => {
      cy.visit("https://devfinance-agilizei.netlify.app")   
      cy.contains("Nova Transação").click()
      cy.get("#description").type(descricao)
      cy.get("#amount").type(100)
      cy.get("#date").type("2023-02-01")
      cy.contains("Salvar").click()
      cy.get('#data-table tbody tr').should('have.length.at.least', 1)
  
    });
  
    it('Cadastrar uma nova transação de entrada - falha 2', () => {
      cy.visit("https://devfinance-agilizei.netlify.app")
  
      cy.contains("Nova Transação").click()
      cy.get("#description").type(descricao)
      cy.get("#amount").type(100)
      cy.get("#date").type("2023-02-01")
  
      cy.contains("Salvar").click()
      
      cy.get("tbody tr").should("have.length", 1)
      cy.get('.description').should('contain', descricao)
    });  
  
    it('Cadastrar uma nova transação de entrada - falha 3', () => {
      cy.visit("https://devfinance-agilizei.netlify.app")
      cy.contains("Nova Transação").click()
      cy.get("#description").type(descricao)
      cy.get("#amount").type(100)
      cy.get("#date").type("2023-02-01")
      cy.contains("Salvar").click() 
      cy.get('.description').should('contain', descricao)
    });
  
    it('Cadastrar uma nova transação de entrada - falha 4', () => {
      cy.visit("https://devfinance-agilizei.netlify.app")
      
      cy.contains("Nova Transação").click()  
      cy.get("#amount").type(100)
      cy.get("#description").type("Mesada")
      cy.get("#date").type("2023-02-01")
      cy.contains("Salvar").click()
  
      cy.get('.description').should('contain', descricao)
    });
  
    it('Cadastrar uma nova transação de entrada - falha 5', () => {
      cy.visit("https://devfinance-agilizei.netlify.app")
  
      cy.contains("Nova Transação").click()
      cy.get("#description").type(descricao)
      cy.get("#amount").type(100)
      cy.get("#date").type("2023-02-01")
  
      cy.contains("Salvar").click()
  
      cy.get('.description').should('contain', descricao)
    });
  
    it('Cadastrar uma nova transação de entrada - falha 6', () => {
      cy.visit("https://devfinance-agilizei.netlify.app")
  
      cy.contains("Nova Transação").click()
      cy.get("#description").type(descricao)
      cy.get("#amount").type(100)
      cy.get("#date").type("2023-02-01")
  
      cy.contains("Salvar").click()
  
      cy.get('.description').should('contain', descricao)
    });
  }); 