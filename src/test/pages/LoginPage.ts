import { expect, Page } from '@playwright/test';
import * as dotenv from "dotenv";
dotenv.config();


export default class LoginPage {
    
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    private email = "//input[@type='email']";
    private password = "//input[@type='password']";
    private btnLogin = "//button[@type='submit']";
    private twoFactorCode = "#input-9";
    private btnSubmit2FA = "//button[@type='submit']";
    private dashboardIndicator = "//strong[normalize-space(text())='Welcome to Heroku']";
    private popUp = "#onetrust-accept-btn-handler";
    private errorMessage = "//div[normalize-space(text())='Este código no es válido o caducó. Pruebe otro.']";

    async navigate() {
        await this.page.goto(process.env.BASE_URL_F2A || 'https://id.heroku.com/login');
        await this.page.click(this.popUp);
    }

    async enterCredencials(email: string, password: string) {
        await this.page.fill(this.email, email);
        await this.page.fill(this.password, password);
        await this.page.click(this.btnLogin);
    }

    async enterTwoFactorCode(code: string) {
        await this.page.fill(this.twoFactorCode, code);
    }

    async submitTwoFactorForm() {
        await this.page.click(this.btnSubmit2FA);
    }
    
    async isLoggedIn() {
        await this.page.waitForSelector(this.dashboardIndicator);
        expect(this.page.url()).toContain('/apps');
        expect(this.page.isVisible(this.dashboardIndicator));
    }

    async isErrorMessageDisplayed() {
        const errorMessage = this.page.locator(this.errorMessage);
        expect(errorMessage).toBeVisible();
    }

}