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
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

// Custom command to login
Cypress.Commands.add('login', (username, password) => {
    cy.get('[data-test="username"]').type(username);
    cy.get('[data-test="password"]').type(password);
    cy.get('[data-test="login-button"]').click();
});

// Custom command to add item to cart
Cypress.Commands.add('addToCart', (itemName) => {
    cy.contains(itemName)
        .parent()
        .find('[data-test="add-to-cart"]')
        .click();
});

// Custom command to remove item from cart
Cypress.Commands.add('removeFromCart', (itemName) => {
    cy.contains(itemName)
        .parent()
        .find('[data-test="remove"]')
        .click();
});

// Custom command to check if element exists
Cypress.Commands.add('elementExists', (selector) => {
    return cy.get('body').then(($body) => {
        return $body.find(selector).length > 0;
    });
});

// Custom command to wait for network requests to complete
Cypress.Commands.add('waitForNetworkIdle', (timeout = 5000) => {
    cy.intercept('**/*').as('allRequests');
    cy.wait('@allRequests', { timeout });
});