class BasePage {
    constructor() {
        this.url = '';
        this.defaultWaitTime = 10000; // 10 seconds
    }

    log(message) {
        cy.log(`[${this.constructor.name}] ${message}`);
    }

    visit() {
        this.log(`Visiting URL: ${this.url}`);
        cy.visit(this.url, {
            timeout: 30000, // 30 seconds
            retryOnNetworkFailure: true,
            retryOnStatusCodeFailure: true,
            retryOnTimeout: true,
            retryAttempts: 3
        });
        cy.url().should('include', this.url);
    }


    getElement(selector, options = {}) {
        const { timeout = this.defaultWaitTime } = options;
        this.log(`Getting element: ${selector}`);
        return cy.get(selector, { timeout }).should('be.visible');
    }

    clickElement(selector, options = {}) {
        const { force = false } = options;
        this.log(`Clicking element: ${selector}`);
        this.getElement(selector).click({ force });
    }

    typeText(selector, text, options = {}) {
        const { clear = true, force = false } = options;
        this.log(`Typing '${text}' into: ${selector}`);
        const element = this.getElement(selector);
        if (clear) {
            element.clear({ force });
        }
        element.type(text, { force });
    }

    shouldBeVisible(selector, options = {}) {
        const { timeout = this.defaultWaitTime } = options;
        this.log(`Checking visibility of: ${selector}`);
        return this.getElement(selector, { timeout }).should('be.visible');
    }

    shouldContainText(selector, text, options = {}) {
        const { timeout = this.defaultWaitTime } = options;
        this.log(`Checking '${selector}' contains text: ${text}`);
        return this.getElement(selector, { timeout }).should('contain', text);
    }

    waitForPageLoad() {
        this.log('Waiting for page to load...');
        cy.document().should('exist');
        cy.get('body').should('be.visible');
        cy.window().should('have.property', 'jQuery');
    }

    waitForNetworkIdle() {
        this.log('Waiting for network to be idle...');
        cy.intercept('**').as('anyRequest');
        cy.wait('@anyRequest', { timeout: 10000 });
    }

    scrollTo(selector) {
        this.log(`Scrolling to: ${selector}`);
        this.getElement(selector).scrollIntoView();
    }
}

export default BasePage;