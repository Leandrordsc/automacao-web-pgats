import faker from 'faker';
class Cadastro {
    preencherFormulario() {
        const signUpName = 'Tester QA';
        Cypress.env('signUpName', signUpName);
        let email;
        const password = '12345';
        const timestamp = new Date().getTime();
        email = `tester-${timestamp}@mail.com`;
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
    cy.get('[data-qa="first_name"]').type('Ronaldo')
    cy.get('[data-qa="last_name"]').type('Brilha Muito')
    cy.get('[data-qa="company"]').type('Tabajara')
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
    return this
    }

    iniciarCadastro(nome,usuario){
      cy.contains('Signup').click()
      cy.get('[data-qa="signup-name"]').type(nome)
      cy.get('[data-qa="signup-email"]').type(usuario)
      cy.contains('button', 'Signup').click()
      return this
}

    verificarSeCadastroFoiConcluido(){
        cy.get('i.fa-user').parent().should('contain', Cypress.env('signUpName'))
        
        return this
    }
    cadastrarCartao(){
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
      return this
    }

}

export default new Cadastro()