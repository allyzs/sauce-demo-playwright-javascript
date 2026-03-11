import { test, expect } from "@playwright/test";
import { BasePage } from "./basePage";
import { SideBarMenu } from "../components/SideBarMenu";

export class LoginPage extends BasePage {
  constructor(page) {
    super(page);
    this.username = this.page.getByPlaceholder('Username');
    this.password = this.page.getByPlaceholder('Password');
    this.loginBtn = this.page.locator('#login-button');
    this.errorMsgContainer = this.page.locator('.error-message-container');
    
    this.sidebar = new SideBarMenu(page);
  }

  // Not allowed to have test.step()
  async fillUsername(username) {
      await this.username.fill(username);
  }

  // Not allowed to have test.step()
  async fillPassword(password) {
    await this.password.fill(password);
  }

  // Not allowed to have test.step()
  async clickLoginBtn() {
    await this.loginBtn.click();
  }

  // Not allowed to have test.step()
  async login(username, password) {
    await this.fillUsername(username);
    await this.fillPassword(password);
    await this.clickLoginBtn();
  }

  async validateLoginErrorMsg(message) {
    test.step(`Validate error message - "${message}" is displayed`, async() => {
      await expect(this.errorMsgContainer).toContainText(message);
    });
  }

  async validateUserIsLoggedIn() {
    test.step('Validate that Inventory Page is visible', async() => {
      await expect(this.inventoryContainer).toBeVisible();;
    });
  }

  async validateLoginScreen() {
    test.step('Validate that Login Elements - Username, Password, Login Button are visible', async() => {
      await expect(this.username).toBeVisible();
      await expect(this.password).toBeVisible();
      await expect(this.loginBtn).toBeVisible();
    }); 
  }

  async validateLoginFieldsToBeEmpty() {
    test.step('Validate that Username and Password Fields are blank', async() => {
      await expect(this.username).toContainText('');
      await expect(this.password).toContainText('');
    }); 
  }

  async validateInvalidAccess(errorMsg, url) {
    const message = errorMsg.replace('url', url);
    await this.validateLoginErrorMsg(message);
  }
}