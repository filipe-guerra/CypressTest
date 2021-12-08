 import { verifyErrorMessage } from './utils'

beforeEach(() => {
    cy.fixture("users").then((user) => {
        cy.login(user.email, user.password)
    })
})

afterEach(() => {
    cy.logout()
})

describe('Scenario 1', () => {
    
    it("try to deposit Bitcoin", () => {
        cy.get('[for="btc"]').click()
        cy.verifyErrorMessage()
    });
    
    // it("try to deposit Ethereum", () => {
    //     cy.get('[for="eth"]').click()
    //     cy.verifyErrorMessage()
    // });
    
    // it("try to deposit BCH", () => {
    //     cy.get('[for="bch"]').click()
    //     cy.verifyErrorMessage()
    // });
    
    // it("try to deposit dai", () => {
    //     cy.get('[for="dai"]').click()
    //     cy.verifyErrorMessage()
    // });
    
    // it("try to deposit xrp", () => {
    //     cy.get('[for="xrp"]').click()
    //     cy.verifyErrorMessage()
    // });
    
    // it("try to deposit mana", () => {
    //     cy.get('[for="mana"]').click()
    //     cy.verifyErrorMessage()
    // });
})

describe('Scenario 2', () => {

    it("no name", () => {
        cy.visit('/r/user/beneficiaries/add')
        cy.get('[data-testid="add-beneficiary-button"]')
            .should('be.disabled')
            .click()
        cy.get('#first_name').type('Put a random name here')
        cy.get('#last_name').type('Put a random Lname here')
        cy.get('#second_last_name').type('Put a random SLname here')
        cy.get('[name="day"]').select("4")
        cy.get('[name="month"]').select("May")
        cy.get('[name="year"]').select("2001")
        cy.get('[for="relationship"]').select("Relative")
        cy.get('#percentage').type('10')
        cy.get('[data-testid="add-beneficiary-button"]').click()
        
        cy.get('.modal-content', { timeout: 10000 }).contains('Confirm beneficiary')
        cy.get('#pin').type("123456")
        cy.get('.modal-content [type="primary"]')
            .should('be.enabled')
            .click()
        cy.get('[type="error"]')
            .should('be.displayed')
            .contains('error message')
    });
    

    
})