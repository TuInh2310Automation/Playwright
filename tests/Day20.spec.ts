

import { test } from '@playwright/test'

test('Link Text', async ({ page }) => {


    await page.goto("https://the-internet.herokuapp.com/dropdown");

    //target dropdown element
    const dropdownElement = await page.locator("#dropdown");

    //Select option 1
    await dropdownElement.selectOption({ index: 1 });
    //Debug for purpose only
    await page.waitForTimeout(1000)

    //Select option 2
    await dropdownElement.selectOption({ value: '2' });
    //Debug for purpose only
    await page.waitForTimeout(1000)

    //Debug for purpose only
    await page.waitForTimeout(1000)

})

test('Handle Iframe', async ({ page }) => {


    await page.goto('https://the-internet.herokuapp.com/iframe')

    //target dropdown element
    const iframeEle = await page.frameLocator('iframe[id^="mce"]');

    const editTextArea = await iframeEle.locator('body p');

    await editTextArea.click();
    await editTextArea.clear();
    await editTextArea.fill('New content');

    const footerPowerLinkEle = await page.locator('a:has-text("Elemental")');
    await footerPowerLinkEle.click();
    //Debug for purpose only
    await page.waitForTimeout(3000)

})

test('Mouse hover and narrowdown searching scope', async ({ page }) => {


    await page.goto('https://the-internet.herokuapp.com/hovers');

    const allFigureEles = await page.locator('.figure').all();
    for (const figureEle of allFigureEles) {

        const imgEle = await figureEle.locator('img');
        //Before hover
        const userName = await figureEle.locator('h5');
        console.log(`Before isUserName visible ${await userName.isVisible()}`);

        const hyperLink = await figureEle.locator('a');
        console.log(`Before isHyperLink visible ${await hyperLink.isVisible()}`);
        

        //mouse hover
        await imgEle.hover();

        //Before hover
        const userNameAfter = await figureEle.locator('h5');
        console.log(`After isUserName visible ${await userNameAfter.isVisible()}`);

        const hyperLinkAfter = await figureEle.locator('a');
        console.log(`After isHyperLink visible ${await hyperLinkAfter.isVisible()}`);

        //Debug for purpose only
        await page.waitForTimeout(1000)


    }
})

test.only('Checking element status and handle dynamic status', async ({ page }) => {


    await page.goto('https://the-internet.herokuapp.com/dynamic_controls')

    //Locate 2 parent component
    const checkboxComp = await page.locator('#checkbox-example');

    const inputEles = await page.locator('#input-example');

    //Interact with the checkbox component

    const checkboxEle= await checkboxComp.locator("#checkbox input");
    const isEnabled = await checkboxEle.isEnabled();
    let isSelected = await checkboxEle.isChecked();

    console.log(`is checkbox Enable ${isEnabled}`);
    console.log(`is checkbox isSelected ${isSelected}`);
    

    if (!isSelected) {
        await checkboxEle.click();
    }

    let isSelectedAfter = await checkboxEle.isChecked();
    console.log(`is checkbox isSelectedAfter ${isSelectedAfter}`);
    if (!isSelectedAfter) {
        await checkboxEle.click();
    }
0
    const removeButton = checkboxComp.locator('button')
    await removeButton.click()
    await page.waitForSelector('#checkbox-example #checkbox input', {state: 'hidden', timeout: 5*1000});

    //Interact with the input component
    const textboxEle = await inputEles.locator("input");
    let isEditable = await textboxEle.isEditable();
    console.log(`is checkbox isEditable ${isEditable}`);

    
    if (!isEditable) {
        const enableButton = inputEles.locator('button')
        await enableButton.click()
        await page.waitForSelector('#input-example #message', {state: 'visible', timeout: 5*1000});
    }
    const messageEle = await inputEles.locator("#message");
    let isEditableAfter = await textboxEle.isEditable();
    let isMessageVisible = await messageEle.isVisible();
     if (isMessageVisible && isEditableAfter == true) {
     textboxEle.fill("Meomeo");
     }
        console.log(`is checkbox isEditableAfter ${isEditableAfter}`);
})
