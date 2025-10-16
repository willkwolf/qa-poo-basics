import { Page, Locator } from '@playwright/test';
import { LoginLocators } from '../locators/loginLocators';

export class LoginActions {

    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async doEnterText(text:string, locator: Locator) {
        await locator.fill(text);
    }

    async doClick(locator: Locator) {
        await locator.click();
    }

    async navigateToLoginPage(url: string) {
        await this.page.goto(url);
    }

}