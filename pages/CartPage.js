import { expect } from "@playwright/test";
import { CartHeader } from "../components/CartHeader";

export class CartPage extends CartHeader{
  constructor(page) {
    super(page);
    this.cartContainer = this.page.locator('.cart_contents_container');
    this.continueShoppingBtn = this.page.getByRole('button', {name: 'Continue Shopping'});
    this.cartItem = this.page.locator('.cart_item');
    this.itemQuantity = this.cartItem.locator('.cart_quantity');
    this.itemTitle = this.cartItem.locator('//*[contains(@id, "title_link")]');
    this.itemDescription = this.cartItem .locator('.inventory_item_desc');
    this.itemPrice = this.cartItem.locator('.inventory_item_price');
    this.removeItemBtn = this.cartItem.locator('//*[contains(@id, "remove")]');
    this.checkOutBtn = this.page.locator('.checkout_button');
  }

  async open() {
    await this.page.goto('/cart.html');
  }

  async getTotalItemsQuantityInCart() {
    await this.cartItem.first().waitFor();
    const items = await this.cartItem.all();
    let totalItemsQuantity = 0;

    for(let i = 0; i < items.length; i++) {
      let quantity = await this.itemQuantity.nth(i).innerText();
      totalItemsQuantity += Number(quantity);
    }

    return totalItemsQuantity;
  }

  async getProductDetails(index) {
    return ({
      "title" : await this.itemTitle.nth(index).innerText(),
      "description" :  await this.itemDescription.nth(index).innerText(),
      "price" :  await this.itemPrice.nth(index).innerText(),
      "quantity" : Number(await this.itemQuantity.nth(index).innerText())
    })
  }

  async getAddedItemsDetails() {
    await this.cartContainer.waitFor();
    const items = await this.cartItem.all();
    const addedProducts = [];

    for(let i = 0; i < items.length; i++) {
      addedProducts.push(await this.getProductDetails(i))
    }

    const cleanedDisplayedProducts = addedProducts.map(p => ({
      ...p,
      price: p.price.replace('$', '')
    }));


    return cleanedDisplayedProducts;
  }

  async openProductDetailPage(index) {
    await this.itemTitle.nth(index).click();
  }

  async clickContinueShopping() {
    await this.continueShoppingBtn.click();
  }

  async removeItem(index) {
    await this.removeItemBtn.nth(index).click();
  }

  async validateThatCartPageIsDisplayed() {
    await expect(this.page).toHaveURL(/cart/);
  }

  async validateCheckoutButtonIsDisabled() {
    await expect(this.checkOutBtn).toBeDisabled();
  }

  async validateThatCartBadgeNumberMatchesTheNumberOfItemsInCart() {
    await this.open();
    const cartPageItemQuantity = await this.getTotalItemsQuantityInCart();
    const cartBadgeItemQuantity = await this.getNumberOfItemsInCart();
    expect(cartPageItemQuantity).toBe(Number(cartBadgeItemQuantity));
  }

  async validateAddedItemDetails(expectAddedItems) {
    const addedItemsDetails = await this.getAddedItemsDetails();
    
    const sorted = arr =>
      arr.slice().sort((a, b) => a.title.localeCompare(b.title));
    
    const normalizeProducts = arr =>
      arr.map(({ title, description, price }) => ({
        title,
        description,
        price,
      }));

    expect(sorted(normalizeProducts(addedItemsDetails))).toEqual(sorted(normalizeProducts(expectAddedItems)));
  }

  
 
  

}