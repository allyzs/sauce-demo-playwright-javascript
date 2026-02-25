import { expect } from "@playwright/test";

export class CartHeader {
  constructor(page) {
    this.page = page;
    this.cart = this.page.locator('.shopping_cart_link');
    this.cartBadge = this.page.locator('.shopping_cart_badge');
  }

  async getNumberOfItemsInCart() {
    await this.cart.waitFor();
    return await this.cartBadge.isVisible() ? await this.cartBadge.innerText() : 0;
  }

  async validateNumberOfItemsInCart(totalNumOfItemsInCart) {
    if(totalNumOfItemsInCart == 0) {
        await expect(this.cartBadge).not.toBeVisible();
    } else {
        expect(await this.cartBadge.innerText()).toBe(totalNumOfItemsInCart.toString());
    }
  }

}