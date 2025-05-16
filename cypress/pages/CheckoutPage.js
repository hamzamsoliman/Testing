import BasePage from './BasePage';

class CheckoutPage extends BasePage {
    constructor() {
        super();
        this.url = '/checkout-step-one.html';
        this.selectors = {
            firstName: '[data-test="firstName"]',
            lastName: '[data-test="lastName"]',
            postalCode: '[data-test="postalCode"]',
            continueButton: '[data-test="continue"]',
            cancelButton: '[data-test="cancel"]',
            errorMessage: '[data-test="error"]',
            summaryInfo: '.summary_info',
            finishButton: '[data-test="finish"]',
            completeHeader: '.complete-header'
        };
    }

    fillCheckoutInformation(firstName, lastName, postalCode) {
        this.typeText(this.selectors.firstName, firstName);
        this.typeText(this.selectors.lastName, lastName);
        this.typeText(this.selectors.postalCode, postalCode);
    }

    continueToOverview() {
        this.clickElement(this.selectors.continueButton);
    }

    cancelCheckout() {
        this.clickElement(this.selectors.cancelButton);
    }

    finishCheckout() {
        this.clickElement(this.selectors.finishButton);
    }

    getErrorMessage() {
        return this.getElement(this.selectors.errorMessage);
    }

    getCompleteHeader() {
        return this.getElement(this.selectors.completeHeader);
    }
}

export default new CheckoutPage(); 