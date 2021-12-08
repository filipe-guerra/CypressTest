// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
Cypress.Commands.add('login', (email, password) => {
    cy.visit('/login')
    cy.get("#client_id").type(email);
    cy.get("#password").type(password);
    cy.get('[type="submit"]').click();
 })

 Cypress.Commands.add('verifyErrorMessage', () => {
    cy.get('.moon-arrow_deposit').click()
    cy.get('.modal-content >div >div > div:first-of-type > [data-testid="picker-item"]', { timeout: 10000 }).click()
    cy.get('.modal-content', { timeout: 10000 }).contains('Oops! Something went wrong')
 })

 Cypress.Commands.add('logout', () => {
    // cy.get(".moon-menu_lines").click();
    cy.get('.moon-dropdown_arrow').trigger('mouseover')
    cy.get('.bisto__dropdown-menu [href="/logout"]').click()
 })