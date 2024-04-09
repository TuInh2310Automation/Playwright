

import {test} from '@playwright/test'

test('Link Text', async ({page}) => {
   

    await page.goto("https://the-internet.herokuapp.com/");

   const footerLinkEle = await page.locator('//a[contains(text(),"Elemental1")]');
   await footerLinkEle.click()

   await page.waitForTimeout(1000)

})



test('Link Text - Filtering', async ({page}) => {
   

    await page.goto("https://the-internet.herokuapp.com/");

   const footerLinkEle = await page.locator('a').filter({hasText: "Elemental" });
  await footerLinkEle.scrollIntoViewIfNeeded();

   //DEBUG purpose only
   await page.waitForTimeout(3000)

   await footerLinkEle.click()

   await page.waitForTimeout(3000)

})


test('Multiple Matching', async ({page}) => {
   

    await page.goto("https://the-internet.herokuapp.com/");

   const footerLinkEles = await page.locator('a').elementHandles();

   

   await footerLinkEles[10].click();

   await page.waitForTimeout(3000)

})

test.only('Element Atribute, page, title, url...', async ({page}) => {
   

    await page.goto("https://the-internet.herokuapp.com/");

   await page.locator('a').filter({hasText: "Form Authentication"}).click();
   await page.waitForLoadState("domcontentloaded");

   //Form interaction
   await page.locator("#username").fill("teo@sth.com");
   await page.locator("#password").fill("0987654321");

   await page.waitForTimeout(3000)

   await page.locator('button[type="submit"]').click();
   await page.waitForLoadState("domcontentloaded");

   //get text
   // all text in dom
   const textContent = await page.locator('h4').textContent();
   //all text appear on web
   const innerText = await page.locator('h4').innerText();
  
   console.log(textContent);
   console.log(innerText);
   
   

   await page.waitForTimeout(3000)

})
