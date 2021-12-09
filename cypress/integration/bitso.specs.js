// ***********************************************
// Test created by Filipe Guerra
// ***********************************************

function userID_Alpha() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  
    for (var i = 0; i < 10; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
  
    return text;
  }

beforeEach(() => {
    cy.fixture("users").then((user) => {
        cy.login(user.email, user.password)
    })
})

afterEach(() => {
    cy.logout()
})

describe('Scenario 1 Serie', () => {

    it("try to deposit Bitcoin", () => {
        cy.get('[for="btc"]').click()
        cy.verifyErrorMessage('Bitcoin')
    
        cy.get('[for="eth"]').click()
        cy.verifyErrorMessage('Ether')
    
        cy.get('[for="bch"]').click()
        cy.verifyErrorMessage('Bitcoin cash')
    
        cy.get('[for="dai"]').click()
        cy.verifyErrorMessage('Dai')
    
        cy.get('[for="xrp"]').click()
        cy.verifyErrorMessage('XRP')
    
        cy.get('[for="mana"]').click()
        cy.verifyErrorMessage('MANA')
    });
})

// describe('Scenario 1 Parallel', () => {
    
//     it("try to deposit Bitcoin", () => {
//         cy.get('[for="btc"]').click()
//         cy.verifyErrorMessage('Bitcoin')
//     });
    
//     it("try to deposit Ethereum", () => {
//         cy.get('[for="eth"]').click()
//         cy.verifyErrorMessage('Ether')
//     });
    
//     it("try to deposit BCH", () => {
//         cy.get('[for="bch"]').click()
//         cy.verifyErrorMessage('Bitcoin cash')
//     });
    
//     it("try to deposit dai", () => {
//         cy.get('[for="dai"]').click()
//         cy.verifyErrorMessage('Dai')
//     });
    
//     it("try to deposit xrp", () => {
//         cy.get('[for="xrp"]').click()
//         cy.verifyErrorMessage('XRP')
//     });
    
//     it("try to deposit mana", () => {
//         cy.get('[for="mana"]').click()
//         cy.verifyErrorMessage('MANA')
//     });
// })

describe('Scenario 2', () => {

    it("Add Beneficary", () => {
        const randDay = () => Cypress._.random(1, 30)
        const randYear = () => Cypress._.random(1932, 2021)
        
        cy.goFromMainScrenToProfile()
        cy.url().should('include', '/r/user/overview') 
        cy.get('[href="/r/user/beneficiaries"]').click()
        cy.wait(2)
        cy.get('main > div button')
            .should('be.visible')
            .focus()
            .click()
        const addBeneficiary = '[data-testid="add-beneficiary-button"]'
        cy.get(addBeneficiary).should('be.disabled')//.click().expect(fn).to.throw(Error)
        cy.get('#first_name').type(userID_Alpha())
        cy.get('#last_name').type(userID_Alpha())
        cy.get('#second_last_name').type(userID_Alpha())
        cy.get('#day').click().type("25{downarrow}{enter}")
        cy.get('#month').click().type("May{downarrow}{enter}")
        cy.get('#year').click().type("2015{downarrow}{enter}")
        cy.get('[for="relationship"] ~ div .moon-select_arrow').click().type("{downarrow}{enter}")
        cy.get('#percentage').type('10')
        cy.wait(1)
        cy.get(addBeneficiary).should('be.enabled').click()
        
        cy.get('.modal-content', { timeout: 10000 }).contains('Confirm beneficiary')
        cy.get('#pin').type("123456")
        cy.get('.modal-content [type="primary"]')
            .should('be.enabled')
            .click()
        cy.get('[type="error"] > div', { timeout: 10000 })
        .should('have.text', 'Incorrect PIN') 
        // .should('have.text', 'Pin locked. Too many attempts, try again in 15 minutes.')
    });
})