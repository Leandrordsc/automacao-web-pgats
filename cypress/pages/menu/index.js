import cadastro from "../cadastro"

class Menu{
    menus = {
        PRODUTOS: 'Products'
    }

    irParaProdutos(){
        cy.contains('Products').click()
    }

    irParaLoginCadastro(){
        cy.contains('Singup').click()
        return cadastro
    }

    irPara(menu){
        cy.contains(menu).click()
    }
}