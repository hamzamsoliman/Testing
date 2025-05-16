import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';

Given('I am on the login page', () => {
    cy.visit('/');
});

When('I enter valid username and password', () => {
    cy.get('[data-test="username"]').type('standard_user');
    cy.get('[data-test="password"]').type('secret_sauce');
});

When('I enter invalid username and password', () => {
    cy.get('[data-test="username"]').type('invalid_user');
    cy.get('[data-test="password"]').type('invalid_password');
});

When('I click the login button', () => {
    cy.get('[data-test="login-button"]').click();
});

Then('I should be logged in successfully', () => {
    cy.url().should('include', '/inventory.html');
});

Then('I should see the inventory page', () => {
    cy.get('.inventory_list').should('be.visible');
});

Then('I should see an error message', () => {
    cy.get('[data-test="error"]').should('be.visible');
});

Then('I should remain on the login page', () => {
    cy.url().should('eq', Cypress.config().baseUrl + '/');
}); 