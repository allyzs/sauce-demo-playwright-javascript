import { test as base } from '@playwright/test';
import { LoginPage, InventoryPage, ProductDetailPage } from '../pages';

export const test = base.extend({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  inventoryPage: async ({ page }, use) => {
    await use(new InventoryPage(page));
  },
  productPage: async({ page }, use) => {
    await use(new ProductDetailPage(page));
  }
});

export { expect } from '@playwright/test';