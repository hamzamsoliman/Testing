import { Given } from '@badeball/cypress-cucumber-preprocessor';
import LoginPage from '../pages/LoginPage';

Given('I am logged in as a standard user', () => {
    LoginPage.visit();
    LoginPage.login('standard_user', 'secret_sauce');
}); 