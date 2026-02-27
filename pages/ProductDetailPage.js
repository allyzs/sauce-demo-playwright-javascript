import { expect } from "@playwright/test";
import { CartHeader } from "../components/CartHeader";

export class ProductDetailPage extends CartHeader{
  constructor(page) {
    super(page);
    this.productDetailsCard = this.page.locator('.inventory_details_container');
    this.productTitle = this.productDetailsCard.locator('.inventory_details_name');
    this.productDescription = this.productDetailsCard.locator('.inventory_details_desc ');
    this.productPrice = this.productDetailsCard.locator('.inventory_details_price');
    this.productImage = this.productDetailsCard.locator('img');
    this.addButton = this.page.getByRole('button', {name: 'Add to cart'});
    this.removeButton = this.page.getByRole('button', {name: 'Remove'});
    this.backBtn = this.page.locator('#back-to-products');
  }

  async validateProductDetails(productDetails) {
    await this.productDetailsCard.waitFor();
    await expect(this.productTitle).toContainText(productDetails.title);
    await expect(this.productDescription).toContainText(productDetails.description);
    await expect(this.productPrice).toContainText(productDetails.price);
    await expect(this.productImage).toHaveAttribute('src', productDetails.image);
  }

  async clickBackToInventoryPage() {
    await this.backBtn.click();
  }

  async addProduct() {
    await this.addButton.click();
  }

  async removeProduct() {
    await this.removeButton.click();
  }


}