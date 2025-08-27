import { Page } from '@playwright/test';  

let page: Page;

export const pageFixture = {
  page: undefined as Page | undefined,  
}  