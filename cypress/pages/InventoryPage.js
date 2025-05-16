import BasePage from './BasePage';

class InventoryPage extends BasePage {
    constructor() {
        super();
        this.url = '/inventory.html';
        this.selectors = {
            inventoryList: '.inventory_list',
            inventoryItem: '.inventory_item',
            cartBadge: '.shopping_cart_badge',
            sortDropdown: '[data-test="product_sort_container"]',
            itemName: '.inventory_item_name',
            itemPrice: '.inventory_item_price'
        };
    }

    addItemToCart(itemName) {
        const dataTest = `add-to-cart-${itemName.toLowerCase().replaceAll(' ', '-').replaceAll('.', '').replaceAll('_', '-')}`;
        cy.get(`[data-test="${dataTest}"]`).click();
    }

    removeItemFromCart(itemName) {
        const dataTest = `remove-${itemName.toLowerCase().replaceAll(' ', '-').replaceAll('.', '').replaceAll('_', '-')}`;
        cy.get(`[data-test="${dataTest}"]`).click();
    }

    getCartItemCount() {
        return cy.get(this.selectors.cartBadge);
    }

    sortItems(sortOption) {
        cy.url().should('include', '/inventory.html');
        cy.get('.inventory_list').should('be.visible');
        cy.screenshot('before-sorting');
        cy.document().then(doc => {
          cy.log(doc.documentElement.outerHTML);
        });
        cy.get('body').then($body => {
          if ($body.find('[data-test="error"]').length) {
            cy.get('[data-test="error"]').then($el => {
              cy.log('Error message:', $el.text());
            });
          }
        });
        // Try data-test selector first, then fallback to class selector
        cy.get('[data-test="product_sort_container"]', { timeout: 10000 })
          .should('be.visible')
          .select(sortOption)
          .then(null, () => {
            cy.get('.product_sort_container', { timeout: 10000 })
              .should('be.visible')
              .select(sortOption);
          });
    }

    getItemPrice(itemName) {
        return cy.contains(this.selectors.itemName, itemName)
            .parent()
            .find(this.selectors.itemPrice);
    }
}

export default new InventoryPage(); 