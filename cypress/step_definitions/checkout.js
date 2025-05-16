import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import LoginPage from '../pages/LoginPage';
import InventoryPage from '../pages/InventoryPage';
import CartPage from '../pages/CartPage';
import CheckoutPage from '../pages/CheckoutPage';

Given('I have {string} in my cart', (itemName) => {
    InventoryPage.addItemToCart(itemName);
});

When('I proceed to checkout', () => {
    CartPage.proceedToCheckout();
});

When('I enter my shipping information', (dataTable) => {
    const info = dataTable.hashes()[0];
    CheckoutPage.fillCheckoutInformation(info.firstName, info.lastName, info.zipCode);
});

When('I continue to the overview', () => {
    CheckoutPage.continueToOverview();
});

When('I continue to the overview without entering information', () => {
    CheckoutPage.continueToOverview();
});

When('I finish the checkout', () => {
    CheckoutPage.finishCheckout();
});

Then('I should see the order summary', () => {
    cy.get('.summary_info').should('be.visible');
});

Then('I should see the order confirmation message', () => {
    CheckoutPage.getCompleteHeader().should('contain', 'THANK YOU FOR YOUR ORDER');
});

Then('I should see an error message', () => {
    CheckoutPage.getErrorMessage().should('be.visible')
        .and('contain', 'Error: First Name is required');
}); 