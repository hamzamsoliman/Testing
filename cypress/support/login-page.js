Cypress.Commands.add('Username', () => { 
    cy.get('[name="user-name"]')
})
Cypress.Commands.add('Password', () => { 
    cy.get('[name="password"]')
})
Cypress.Commands.add('login', () => { 
    cy.get('[name="login-button"]').click();
})
