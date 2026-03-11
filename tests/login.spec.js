import { test } from '../fixtures/testFixtures';
const { loginUsers, loginErrorMsg } = require('../data/testData');

test.describe('Login Tests', {tag: '@login'}, () => {
    test.beforeEach(async({loginPage}) => {
        await loginPage.openSauceDemo();
    });

    test('Validate that username is required', async ({loginPage}) => {
        await loginPage.fillPassword(loginUsers.password_for_users);
        await loginPage.clickLoginBtn();
        await loginPage.validateLoginErrorMsg(loginErrorMsg.required_username);
    });

    test('Validate that password is required', async ({loginPage}) => {
        await loginPage.fillUsername(loginUsers.accepted_usernames.standard);
        await loginPage.clickLoginBtn();
        await loginPage.validateLoginErrorMsg(loginErrorMsg.required_password);
    });

    test('Validate that error message for locked out user is displayed', async ({loginPage}) => {
        await loginPage.login(loginUsers.accepted_usernames.locked_out, loginUsers.password_for_users);
        await loginPage.validateLoginErrorMsg(loginErrorMsg.locked_out);
    });

    test('Validate that error message for wrong password is displayed', async ({loginPage}) => {
        await loginPage.login(loginUsers.accepted_usernames.standard, loginUsers.wrong_password);
        await loginPage.validateLoginErrorMsg(loginErrorMsg.invalid_credentials);
    });

    test('Validate that user is successfully logged in', async({loginPage, inventoryPage}) => {
        await loginPage.login(loginUsers.accepted_usernames.standard, loginUsers.password_for_users);
        await inventoryPage.validateInventoryPageIsVisible();
    });

    const pages = [{ name : "Inventory", url : "/inventory.html"},
                   { name : "Cart", url : "/cart.html"},
                   { name : "Check Out - Your Information", url : "/checkout-step-one.html"},
                   { name : "Check Out - Overview", url : "/checkout-step-two.html"},
                   { name : "Check Out - Complete", url : "/checkout-complete.html"},
                  ]

    pages.forEach( page => {
        test(`Validate that error message is displayed after navigating to ${page.name} without logging in`, async ({loginPage}) => {
            await loginPage.openPage(page.url);
            await loginPage.validateInvalidAccess(loginErrorMsg.invalid_access, page.url);
        });
    });

    test('Validate that user is back to Log In screen after Log out', async({loginPage}) => {
        await loginPage.login(loginUsers.accepted_usernames.standard, loginUsers.password_for_users);
        await loginPage.sidebar.logout();
        await loginPage.validateLoginScreen();
    });
});
