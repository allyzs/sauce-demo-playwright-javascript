import { expect } from "@playwright/test";

export class InventoryPage {
  constructor(page) {
    this.page = page;
    this.inventoryContainer = this.page.locator('.inventory_container');
  }

  async validateInvetoryPageIsVisible() {
    await expect(this.inventoryContainer).toBeVisible();
  }

}