export class BasePage {
  constructor(page) {
    this.page = page;
  }

  async openSauceDemo() {
    await this.page.goto('/');
  }
}