import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import LoginPage from '../pages/LoginPage';
import InventoryPage from '../pages/InventoryPage';

When('I add {string} to the cart', (itemName) => {
    InventoryPage.addItemToCart(itemName);
});

When('I remove {string} from the cart', (itemName) => {
    InventoryPage.removeItemFromCart(itemName);
});

When('I sort items by {string}', (sortOption) => {
    InventoryPage.sortItems(sortOption);
});

Then('the cart badge should show {string}', (count) => {
    InventoryPage.getCartItemCount().should('have.text', count);
});

Then('the cart badge should not be visible', () => {
    cy.get('.shopping_cart_badge').should('not.exist');
});

Then('the "Add to Cart" button should change to "Remove"', () => {
    cy.get('[data-test^="remove"]').should('be.visible');
});

Then('the "Remove" button should change to "Add to Cart"', () => {
    cy.get('[data-test^="add-to-cart"]').should('be.visible');
});

Then('the items should be sorted by price in ascending order', () => {
    cy.get('.inventory_item_price').then(($prices) => {
        const prices = Array.from($prices).map(price => 
            parseFloat(price.textContent.replace('$', ''))
        );
        const sortedPrices = [...prices].sort((a, b) => a - b);
        expect(prices).to.deep.equal(sortedPrices);
    });
}); 