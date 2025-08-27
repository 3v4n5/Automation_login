import { Given, When, Then } from "@cucumber/cucumber";
import LoginPage from "../pages/LoginPage";
import { generateOtp } from '../utils/totp';
import * as dotenv from "dotenv";
import { pageFixture } from '../utils/pageFixture';
dotenv.config();


import { setDefaultTimeout } from "@cucumber/cucumber";
setDefaultTimeout(32 * 1000); // 32 segundos

let loginPage: LoginPage;

//Escenario feliz - flujo correcto de 2FA
Given('the user is on the login page', async function () {
    loginPage = new LoginPage(pageFixture.page!);
    await loginPage.navigate();
});

When('the user enters valid email and password', async function () {
    await loginPage.enterCredencials(process.env.USER_EMAIL || '', process.env.USER_PASS || '');
});

When('the user enters a valid 2FA code', async function () {
    //generar un codigo OTP valido
    const otp = generateOtp();
    await loginPage.enterTwoFactorCode(otp);
});

When('the user submits the 2FA form', async function () {
    await loginPage.submitTwoFactorForm();
});

Then('the user see the dashboard', async function () {
    await loginPage.isLoggedIn();
});


//Escenario negativo - flujo incorrecto de 2FA codigo invalido
When('the user enters email and password', async function () {
    await loginPage.enterCredencials(process.env.USER_EMAIL || '', process.env.USER_PASS || '');
});


When('the user enters a invalid 2FA code', async function () {
    //ingresar un codigo incorrecto
    await loginPage.enterTwoFactorCode(process.env.USER_WRONGPASS || 'wrongcode123');
});

Then('an error message should be displayed indicating invalid credentials', async function () {
    await loginPage.isErrorMessageDisplayed();
});


//Escenario negativo - flujo incorrecto de 2FA campo vacio
When('the user leaves the 2FA code field empty', async function () {
    //ingresar un string vacio
    await loginPage.enterTwoFactorCode('');
});

Then('an error message should be displayed indicating that the 2FA code is required', async function () {
    await loginPage.isErrorMessageDisplayed();
});


//Escenario negativo - flujo incorrecto de 2FA codigo expirado
When('the user enters an expired 2FA code', async function () {
    // Generar un código OTP y esperar a que expire (por ejemplo, esperar 31 segundos)
    const otp = generateOtp();
    await pageFixture.page!.waitForTimeout(31000); // Espera 31 segundos
    await loginPage.enterTwoFactorCode(otp);
});

Then('an error message should be displayed indicating that the 2FA code has expired', async function () {
    await loginPage.isErrorMessageDisplayed();
});


