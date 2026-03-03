import { test } from '../fixtures/testFixtures';

test.beforeEach(async({inventoryPage}) => {
    await inventoryPage.open();
});

test('Validate that Cart Page can be opened in Inventory Page', async({inventoryPage, cartPage}) => {
    await inventoryPage.openCart();
    await cartPage.validateThatCartPageIsDisplayed();
});

test('Validate that Cart Page can be opened in Product Details Page', async({inventoryPage, productPage, cartPage}) => {
    const displayedProducts = await inventoryPage.getDisplayedProductDetails();
    const productIndex = Math.floor(Math.random() * displayedProducts.length);

    await inventoryPage.openProductByTitle(productIndex);
    await productPage.openCart();
    await cartPage.validateThatCartPageIsDisplayed();
});

test('Validate that correct item details - Title, Description, and Price are displayed in Cart Page', async({inventoryPage, cartPage}) => {
    const displayedProducts = await inventoryPage.getDisplayedProductDetails();
    const numberOfItemsToAdd = (Math.floor(Math.random() * displayedProducts.length)) + 1;
    await inventoryPage.validateNumberOfItemsInCart(0);
    //Add multiple products to Cart
    const addedItems = await inventoryPage.addMultipleItemsToCart(displayedProducts, numberOfItemsToAdd);

    await cartPage.open();
    await cartPage.validateAddedItemDetails(addedItems);
});

test('Validate that Product Detail Page is opened by clicking the item title in Cart Page', async ({inventoryPage, productPage, cartPage}) => {
    const displayedProducts = await inventoryPage.getDisplayedProductDetails();
    const numberOfItemsToAdd = (Math.floor(Math.random() * displayedProducts.length)) + 1;
    await inventoryPage.validateNumberOfItemsInCart(0);
    //Add multiple products to Cart
    await inventoryPage.addMultipleItemsToCart(displayedProducts, numberOfItemsToAdd);

    await cartPage.open();
    const itemIndex = Math.floor(Math.random() * numberOfItemsToAdd);
    await cartPage.openProductDetailPage(itemIndex);
    await productPage.validateUserIsNavigatedToProductDetailPage();
});

test('Validate that Checkout button is disabled when the cart is empty', async({cartPage}) => {
    await cartPage.open();
    await cartPage.validateNumberOfItemsInCart(0);
    await cartPage.validateCheckoutButtonIsDisabled();
});

test('Validate that Cart Badge Number matches the number of listed items in Cart Page', async({inventoryPage, cartPage}) => { 
    const displayedProducts = await inventoryPage.getDisplayedProductDetails();
    const numberOfItemsToAdd = (Math.floor(Math.random() * displayedProducts.length)) + 1;
    await inventoryPage.validateNumberOfItemsInCart(0);
    //Add multiple products to Cart
    await inventoryPage.addMultipleItemsToCart(displayedProducts, numberOfItemsToAdd);
    await cartPage.validateThatCartBadgeNumberMatchesTheNumberOfItemsInCart();
});

test('Validate that user can navigate back to Inventory Page using Continue Shopping button', async({inventoryPage, cartPage}) => {
    await cartPage.open();
    await cartPage.clickContinueShopping();
    await inventoryPage.validateInventoryPageIsVisible();
});

test('Validate that user can navigate back to Inventory Page using Browser Back Button', async({inventoryPage, cartPage}) => {
    await cartPage.open();
    await cartPage.clickBrowserBack();
    await inventoryPage.validateInventoryPageIsVisible();
});

test('Validate that item in Cart Page can be removed', async({inventoryPage, cartPage})  => {
    const displayedProducts = await inventoryPage.getDisplayedProductDetails();
    const numberOfItemsToAdd = (Math.floor(Math.random() * displayedProducts.length)) + 1;
    await inventoryPage.validateNumberOfItemsInCart(0);
    //Add multiple products to Cart
    await inventoryPage.addMultipleItemsToCart(displayedProducts, numberOfItemsToAdd);
    await cartPage.open();
    const itemIndex = Math.floor(Math.random() * numberOfItemsToAdd);
    await cartPage.removeItem(itemIndex);
    await cartPage.validateNumberOfItemsInCart(numberOfItemsToAdd - 1);
});