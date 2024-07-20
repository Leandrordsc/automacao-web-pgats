
class Login {
    preencherLogin(usuario, senha) {
      cy.get('[data-qa="login-email"]').type(usuario)
      cy.get('[data-qa="login-password"]').type(senha)
      cy.contains('button', 'Login').click()
    }
}
export default new Login()