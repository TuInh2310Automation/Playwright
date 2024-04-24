import { Page, test } from '@playwright/test'
import {scrollToBottom} from '../utils/PageHelper';
import { getAdParams} from '../utils/AdHelper';
const url = 'https://the-internet.herokuapp.com/javascript_alerts';
const floatingMenuUrl = 'https://the-internet.herokuapp.com/floating_menu';

test('', async ({ page }) => {
  page.goto(url);
  const jsAleartBtnEle = page.locator('[onclick="jsAlert()"]')
  //MUST DEFINE THE EVENT FIRST
  page.on('dialog', async dialog => {
    await dialog.accept();
  })
  await jsAleartBtnEle.click();
  //Debug for purpose only
  await page.waitForTimeout(3000)
})
test('Handle js confirm', async ({ page }) => {
  page.goto(url);
  const jsConfirmBtnEle = page.locator('[onclick="jsConfirm()"]')
  //MUST DEFINE THE EVENT FIRST
  page.on('dialog', async dialog => {
    console.log(`Aleart content is: ${dialog.message}`);
    await dialog.dismiss();
  })
  await jsConfirmBtnEle.click();
  //Debug for purpose only
  await page.waitForTimeout(3000)
})

test('Handle js prompt', async ({ page }) => {
  page.goto(url);
  const jsPromptBtnEle = page.locator('[onclick="jsPrompt()"]')
  //MUST DEFINE THE EVENT FIRST
  page.on('dialog', async dialog => {
    console.log(`Aleart content is: ${dialog.message}`);
    await dialog.accept("I am accepting the js prompt!");
  })
  await jsPromptBtnEle.click();
  //Debug for purpose only
  await page.waitForTimeout(3000)
})

test('Execure js without parameter', async ({ page }) => {
  await page.goto(floatingMenuUrl);
  //explore hightlight function
  page.locator('h3').highlight();

  //wait  2 seconds
  await page.waitForTimeout(3000)

  await page.evaluate(() => {
    window.scrollTo(0, document.body.scrollHeight);
  })

  //wait  2 seconds
  await page.waitForTimeout(3000)

  await page.evaluate(() => {
    window.scrollTo(0, 0);
  })

  //Debug for purpose only
  await page.waitForTimeout(3000)
})


/*
Java script excution

*/


test('Execure js with parameter', async ({ page }) => {
  await page.goto(floatingMenuUrl);
  await scrollToBottom(page, 1)

  //wait  2 seconds
  await page.waitForTimeout(3000)

})

test.only('Execure js and return value', async ({ page }) => {
  await page.goto('https://www.foodandwine.com/');
  await page.waitForSelector('div[id="leaderboard-flex-1"]',{timeout: 10000});
  await scrollToBottom(page,1);
 // await page.waitForTimeout(5000);
  const returnAdsValues = await getAdParams(page, 'leaderboard-flex-1');
  console.log(returnAdsValues);
  

  //wait  2 seconds
  await page.waitForTimeout(3000)

})



