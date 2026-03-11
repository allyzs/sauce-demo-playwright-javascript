export class BasePage {
  constructor(page) {
    this.page = page;
  }

  // Not allowed to have test.step()
  async openSauceDemo() {
    await this.page.goto('/');
  }

  async openPage(url) {
    await this.page.goto(url);
  }

  async clickBrowserBack() {
    await this.page.goBack();
  }
}