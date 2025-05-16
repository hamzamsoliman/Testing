import BasePage from './BasePage';

class CartPage extends BasePage {
    constructor() {
        super();
        this.url = '/cart.html';
        this.selectors = {
            cartItems: '.cart_item',
            itemName: '.inventory_item_name',
            itemPrice: '.inventory_item_price',
            removeButton: '[data-test^="remove"]',
            continueShoppingButton: '[data-test="continue-shopping"]',
            checkoutButton: '[data-test="checkout"]',
            cartQuantity: '.cart_quantity'
        };
    }

    getItemQuantity(itemName) {
        return cy.contains(this.selectors.itemName, itemName)
            .parent()
            .find(this.selectors.cartQuantity);
    }

    removeItem(itemName) {
        cy.contains(this.selectors.itemName, itemName)
            .parent()
            .find(this.selectors.removeButton)
            .click();
    }

    continueShopping() {
        cy.get(this.selectors.continueShoppingButton).click();
    }

    proceedToCheckout() {
        cy.get(this.selectors.checkoutButton).click();
    }

    getItemPrice(itemName) {
        return cy.contains(this.selectors.itemName, itemName)
            .parent()
            .find(this.selectors.itemPrice);
    }
}

export default new CartPage(); 