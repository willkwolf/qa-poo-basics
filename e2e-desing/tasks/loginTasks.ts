import {Page} from '@playwright/test';
import { LoginActions } from '../actions/loginActions';
import { LoginLocators } from '../locators/loginLocators';

export class LoginTasks {
    private loginActions: LoginActions;
    private loginLocators: LoginLocators;

    constructor(page: Page) {
        this.loginActions = new LoginActions(page);
        this.loginLocators = new LoginLocators(page);
    }

    async doLogin(username: string, password: string) {
        await this.loginActions.doEnterText(username, this.loginLocators.usernameInput);
        await this.loginActions.doEnterText(password, this.loginLocators.passwordInput);
        await this.loginActions.doClick(this.loginLocators.loginButton);
    }

    async navigateToLoginPage(url: string) {
        await this.loginActions.navigateToLoginPage(url);
    }
}