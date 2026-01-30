import { expect } from "@playwright/test";

export class InventoryPage {
  constructor(page) {
    this.page = page;
    this.inventoryContainer = this.page.locator('.inventory_container');
    this.productCard = this.page.locator('.inventory_item');
    this.productTitle = this.productCard.locator('.inventory_item_name');
    this.productDescription = this.productCard.locator('.inventory_item_desc');
    this.productPrice = this.productCard.locator('.inventory_item_price');
    this.productImage = this.productCard.locator('img');
    this.addButton = (productKey) => this.page.locator(`[data-test="add-to-cart-${productKey}"]`);
    this.removeButton = (productKey) => this.page.locator(`[data-test="remove-${productKey}"]`);
    this.sortDropdown = this.page.locator('select.product_sort_container');
    this.sortOptions = {
      az: 'az',         // Name (A to Z)
      za: 'za',         // Name (Z to A)
      lohi: 'lohi',     // Price (low to high)
      hilo: 'hilo',     // Price (high to low)
    }
  }

  async open() {
    await this.page.goto('/inventory.html');
  }

  async validateInvetoryPageIsVisible() {
    await expect(this.inventoryContainer).toBeVisible();
  }

  async getDisplayedProductDetails() {
    await this.inventoryContainer.waitFor();
    const products = await this.productCard.all();
    const displayedProducts = [];

    for(let i = 0; i < products.length; i++) {
      displayedProducts.push({
        "title" : await this.productTitle.nth(i).innerText(),
        "description" :  await this.productDescription.nth(i).innerText(),
        "price" :  await this.productPrice.nth(i).innerText(),
        "image" : await this.productImage.nth(i).getAttribute('src')
      })
    }

    return displayedProducts;
  }

  async validateDisplayedProducts(expectedProducts) {
    const displayedProducts = await this.getDisplayedProductDetails();
    const sorted = arr =>
      arr.slice().sort((a, b) => a.title.localeCompare(b.title));
    
    const cleanedDisplayedProducts = displayedProducts.map(p => ({
      ...p,
      price: p.price.replace('$', '')
    }));

    expect(sorted(cleanedDisplayedProducts)).toEqual(sorted(expectedProducts));
  } 

  

}