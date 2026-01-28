import { expect } from "@playwright/test";

export class SideBarMenu {
  constructor(page) {
    this.page = page;
    this.burgerMenuBtn = this.page.locator('#react-burger-menu-btn');
    this.sidebarLink = {
      about : () => this.page.locator('#about_sidebar_link'),
      inventory : () => this.page.locator('#inventory_sidebar_link'),
      logout : () => this.page.locator('#logout_sidebar_link')
    }
  }

  async openSideBarMenu() {
    await this.burgerMenuBtn.click();
  }

  async logout() {
    await this.openSideBarMenu();
    await this.sidebarLink.logout().click();
  }

}