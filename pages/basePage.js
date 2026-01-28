export class BasePage {
  constructor(page) {
    this.page = page;
  }

  async openSauceDemo() {
    await this.page.goto('/');
  }

  async navigateToInventoryPage() {
    await this.page.goto('https://www.saucedemo.com/inventory.html');
  }
}