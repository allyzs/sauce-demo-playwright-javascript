import { expect } from "@playwright/test";
import { BasePage } from "./basePage";
import { SideBarMenu } from "../components/SideBarMenu";

export class LoginPage extends BasePage {
  constructor(page) {
    super(page);
    this.username = this.page.locator('#user-name');
    this.password = this.page.locator('#password');
    this.loginBtn = this.page.locator('#login-button');
    this.errorMsgContainer = this.page.locator('.error-message-container');
    
    this.sidebar = new SideBarMenu(page);
  }

  async fillUsername(username) {
    await this.username.fill(username);
  }

  async fillPassword(password) {
    await this.password.fill(password);
  }

  async clickLoginBtn() {
    await this.loginBtn.click();
  }

  async login(username, password) {
    await this.fillUsername(username);
    await this.fillPassword(password);
    await this.clickLoginBtn();
  }

  async validateLoginErrorMsg(message) {
    await expect(this.errorMsgContainer).toContainText(message);
  }

  async validateUserIsLoggedIn() {
    await expect(this.inventoryContainer).toBeVisible();
  }

  async validateLoginScreen() {
    await expect(this.username).toBeVisible();
    await expect(this.password).toBeVisible();
    await expect(this.loginBtn).toBeVisible();
  }

  async validateLoginFieldsToBeEmpty() {
    await expect(this.username).toContainText('');
    await expect(this.password).toContainText('');
  }
}