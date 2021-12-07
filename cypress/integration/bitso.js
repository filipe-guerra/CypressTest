import { login } from './utils'

describe('The Login Page', () => {
    
    it("should be able to login", () => {
        cy.visit('/login') // change URL to match your dev URL
        cy.fixture("users").then((user) => {
            cy.get("#client_id").type(user.email);
            cy.get("#password").type(user.password);
        });
        cy.get('[type="submit"]').click();
    });
    
    // it("try to deposit Bitcoin", () => {
    //     cy.get('[for="btc"]').click()
    // });
})