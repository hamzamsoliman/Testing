import BasePage from './BasePage';

class LoginPage extends BasePage {
    constructor() {
        super();
        this.url = '/';
        this.selectors = {
            username: '[data-test="username"]',
            password: '[data-test="password"]',
            loginButton: '[data-test="login-button"]',
            errorMessage: '[data-test="error"]'
        };
    }

    login(username, password) {
        this.typeText(this.selectors.username, username);
        this.typeText(this.selectors.password, password);
        this.clickElement(this.selectors.loginButton);
    }

    getErrorMessage() {
        return this.getElement(this.selectors.errorMessage);
    }

    isErrorMessageVisible() {
        return this.getElement(this.selectors.errorMessage).should('be.visible');
    }
}

export default new LoginPage(); 