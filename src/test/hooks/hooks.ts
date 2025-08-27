import { chromium, Page, Browser, BrowserContext } from 'playwright';  
import { Before, After } from '@cucumber/cucumber';  
import { pageFixture } from '../utils/pageFixture';
 

let browser: Browser;
let context: BrowserContext;
let page: Page;

Before( async function() {
    browser = await chromium.launch({ headless: false, slowMo: 600 });
    context = await browser.newContext({ viewport: null});
    page = await context.newPage();
    pageFixture.page = page;  
});

After( async function() {
    if (pageFixture.page) {
        await pageFixture.page.close();
    }
    await context.close();
    await browser.close();
});


