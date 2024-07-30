import faker from 'faker';

class Contato {
    preencherDados() {
      const Assunto = faker.lorem.words(2)
      const Mensagem = faker.lorem.paragraph()
      cy.contains('Contact us').click()
      cy.get('[data-qa="name"]').type('Leandro')
      cy.get('[data-qa="email"]').type('testeUser@email.com')
      cy.get('[data-qa="subject"]').type(Assunto)
      cy.get('[data-qa="message"]').type(Mensagem)
      cy.fixture('example.json').as('arquivo')
      cy.get('input[name="upload_file"]').selectFile('@arquivo')
      cy.get('[data-qa="submit-button"]').click()
      return this
    }
}

export default new Contato()
