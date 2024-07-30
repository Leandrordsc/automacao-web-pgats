describe('Window e Drag and Drop', () => {
    it('Janelas e Abas', () => {
        cy.visit('https://the-internet.herokuapp.com/windows')
        cy.contains('Click Here').invoke('removeAttr',  'target').click()
        cy.url().should("include","windows/new")
        cy.get('h3').should('have.text', 'New Window')
        
      })

      it('Drag and Drop', () => {
        const dataTransfer = new  DataTransfer()
        cy.visit('https://the-internet.herokuapp.com/drag_and_drop')

        cy.contains('A').trigger('dragstart', {dataTransfer})
        cy.contains('B').trigger('drop',{dataTransfer})
        
      });
    
});