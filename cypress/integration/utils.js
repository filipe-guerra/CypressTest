export const login = (username, password) => {
  cy.get('#login-username').type(username)
  cy.get('#login-password').type(password)
  cy.get('#login').submit()
}

export const verifyErrorMessage = () => {
    cy.get('.moon-arrow_deposit').click()
    cy.get('.modal-content >div >div > div:first-of-type > [data-testid="picker-item"]', { timeout: 10000 }).click()
    cy.get('.modal-content', { timeout: 10000 }).contains('Oops! Something went wrong')
}
