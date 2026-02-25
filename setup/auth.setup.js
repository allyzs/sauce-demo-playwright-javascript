import { chromium } from '@playwright/test';
import { InventoryPage, LoginPage } from '../pages';

const fs = require('fs');
const { loginUsers } = require('../data/testData');

const STORAGE = 'storageState.json';
const BASE_URL = process.env.BASE_URL;

export default async () => {
  const browser = await chromium.launch();

   if (fs.existsSync(STORAGE)) {
    console.log('Storage state exists. Validating session...');
    
    const context = await browser.newContext({
      baseURL: BASE_URL,
      storageState: STORAGE,
    });

    const page = await context.newPage();
    const inventoryPage = new InventoryPage(page);

    await inventoryPage.open();

    // Check if still logged in (very important)
    const isLoggedIn = await inventoryPage.inventoryContainer.isVisible().catch(() => false);
    
    if (isLoggedIn) {
      console.log('Session still valid. Reusing storage state.');
      await browser.close();
      return;
    }
    await context.close();
    console.log('Session expired. Re-authenticating...');
  }

  const context = await browser.newContext({ baseURL: BASE_URL });
  const page = await context.newPage();
  const loginPage = new LoginPage(page);

  await loginPage.openSauceDemo();
  await loginPage.login(loginUsers.accepted_usernames.standard, loginUsers.password_for_users)
  await loginPage.page.context().storageState({ path: 'storageState.json' });

  await browser.close();
  console.log('✅ New session saved to storageState.json');
};