Cypress.Commands.add('login', (email, password) => {
   cy.visit('/login')
   cy.get("#client_id").type(email);
   cy.get("#password").type(password);
   cy.get('[type="submit"]').click();
   cy.get("[class*='BannerButton']").then($button => {
      if ($button.is(':visible')){
         cy.get("[class*='BannerButton']").click()
      }
   })
})

Cypress.Commands.add('verifyErrorMessage', (coin) => {
   cy.get('.moon-arrow_deposit').click()
   cy.get('.modal-content', { timeout: 10000 }).contains('Deposit ' + coin)
   cy.get('.modal-content >div >div > div:first-of-type > [data-testid="picker-item"]').click()
   cy.get('.modal-content', { timeout: 10000 })
      .contains('Oops! Something went wrong')
      .type('{esc}')
})

Cypress.Commands.add('logout', () => {
   cy.get('.moon-menu_lines').click();
   cy.get('div.open > div:last-of-type')
      .contains('Profile')
      .click()
   cy.get('div.open  div.open > div:last-of-type [href="/logout"]').click()
   cy.url().should('include', '/login')

})

Cypress.Commands.add('goFromMainScrenToProfile', () => {
   cy.get('.moon-menu_lines').click();
   cy.get('div.open > div:last-of-type')
      .contains('Profile')
      .click()
   cy.get('div.open div.open > div:first-of-type a').click()
})