import { expect } from "@playwright/test";
import { CartHeader } from "../components/CartHeader";

export class InventoryPage extends CartHeader{
  constructor(page) {
    super(page);
    this.inventoryContainer = this.page.locator('.inventory_container');
    this.productCard = this.page.locator('.inventory_item');
    this.productTitle = this.productCard.locator('.inventory_item_name');
    this.productDescription = this.productCard.locator('.inventory_item_desc');
    this.productPrice = this.productCard.locator('.inventory_item_price');
    this.productImage = this.productCard.locator('img');
    this.addButton = (productKey) => this.page.locator(`[data-test="add-to-cart-${productKey}"]`);
    this.removeButton = (productKey) => this.page.locator(`[data-test="remove-${productKey}"]`);
    this.sortDropdown = this.page.locator('select.product_sort_container');
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

    const cleanedDisplayedProducts = displayedProducts.map(p => ({
      ...p,
      price: p.price.replace('$', '')
    }));


    return cleanedDisplayedProducts;
  }

  async validateDisplayedProducts(expectedProducts) {
    const displayedProducts = await this.getDisplayedProductDetails();
    const sorted = arr =>
      arr.slice().sort((a, b) => a.title.localeCompare(b.title));
    
    expect(sorted(displayedProducts)).toEqual(sorted(expectedProducts));
  }

  async addToCart(productName) {
    let productKey = productName.toLowerCase().replaceAll(' ', '-');
    await this.addButton(productKey).click();
  }

  async removeFromCart(productName) {
    let productKey = productName.toLowerCase().replaceAll(' ', '-');
    await this.removeButton(productKey).click();
  }

  async addMultipleItemsToCart(products, numberOfItemsToAdd) {
    let productsAdded = [];
     for(let i = 0; i < numberOfItemsToAdd; i++) {
        await this.addToCart(products[i].title);
        productsAdded.push(products[i]);
    }

    return productsAdded;
  }

  async removeMultipleItemsFromCart(products, numberOfItemsToRemove) {
    let productsRemoved = [];
     for(let i = 0; i < numberOfItemsToRemove; i++) {
        await this.removeFromCart(products[i].title);
        productsRemoved.push(products[i]);
    }

    return productsRemoved;
  }

  async openProductByTitle(productIndex) {
    await this.productTitle.nth(productIndex).click();
  }

  async openProductByImage(productIndex) {
    await this.productImage.nth(productIndex).click();
  }

  async validateThatProductItemIsDisplayed() {
    await expect(this.page).toHaveURL(/inventory-item/);
  }

  async sortDisplayedProducts(option) {
    await this.sortDropdown.selectOption({ label: option });
  }

  async validateThatProductsAreSortedCorrectly(option, expectedProductLists) {
    const displayedSortedProducts = await this.getDisplayedProductDetails();
    const sortedByTitle = arr =>
      arr.slice().sort((a, b) => a.title.localeCompare(b.title));

    const sortByPriceThenTitle = (products, order = 'asc') =>
      products.slice().sort((a, b) => {
        if (a.price !== b.price) {
          return order === 'asc'
            ? a.price - b.price
            : b.price - a.price;
        }

      return a.title.localeCompare(b.title);
    });

    switch(option) {
      case 'Name (A to Z)':
        expect(sortedByTitle(expectedProductLists)).toEqual(displayedSortedProducts);
        break;
      case 'Name (Z to A)':
        expect(sortedByTitle(expectedProductLists).reverse()).toEqual(displayedSortedProducts);
        break;
      case 'Price (low to high)':
        expect(sortByPriceThenTitle(expectedProductLists)).toEqual(displayedSortedProducts);
        break;
      case 'Price (high to low)':
        expect(sortByPriceThenTitle(expectedProductLists, 'desc')).toEqual(displayedSortedProducts);
        break;
    }
  }

}