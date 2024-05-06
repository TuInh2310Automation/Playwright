// import {test} from "@playwright/test";
// import LoginPageMethod02 from "../models/pages/LoginPageMethod02";

// test('Test POM method 01- Introducing finding element methods', async ({page}) => {
//     const loginPage: LoginPageMethod02 = new LoginPageMethod02(page);
//     await page.goto('https://the-internet.herokuapp.com/login');
//     await page.waitForTimeout(30000)
//     await loginPage.username().fill("tomsmith");
//     await loginPage.password().fill("SuperSecretPassword!");
//     await loginPage.loginBtn().click();
//     await page.waitForURL('**/secure')
    
// })

import { test } from "@playwright/test";
import LoginPageMethod02 from "../models/pages/LoginPageMethod02";
import { timeout } from "../playwright.config";

test('Test POM method 02 - Introducing finding elements methods', async ({ page }) => {
    test.setTimeout(60000)
    const loginPage: LoginPageMethod02 = new LoginPageMethod02(page);
    //await page.wai('https://the-internet.herokuapp.com/login',{timeout: 600000});
    await page.goto('https://the-internet.herokuapp.com/login');
   
    // await page.waitForTimeout(50000);
    await loginPage.username().fill("tomsmith");
    await loginPage.password().fill("SuperSecretPassword!");
    await loginPage.loginBtn().click();
    await page.waitForURL("**/secure");
});