class BasePage {
    constructor() {
        this.url = '';
    }

    visit() {
        cy.visit(this.url);
    }

    getElement(selector) {
        return cy.get(selector);
    }

    clickElement(selector) {
        this.getElement(selector).click();
    }

    typeText(selector, text) {
        this.getElement(selector).type(text);
    }

    shouldBeVisible(selector) {
        this.getElement(selector).should('be.visible');
    }

    shouldContainText(selector, text) {
        this.getElement(selector).should('contain', text);
    }
}

export default BasePage; 