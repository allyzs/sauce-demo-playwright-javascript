import { test } from '../fixtures/testFixtures';

test.beforeEach(async({inventoryPage}) => {
    await inventoryPage.open();
});

test('Validate that correct product details - title, description, and the price are displayed when opened using Product Title', async({inventoryPage, productPage}) => {
    const displayedProducts = await inventoryPage.getDisplayedProductDetails();
    const productIndex = Math.floor(Math.random() * displayedProducts.length);
    const productDetails = await inventoryPage.getProductDetails(productIndex);

    await inventoryPage.openProductByTitle(productIndex);
    await productPage.validateProductDetails(productDetails);
});

test('Validate that correct product details - title, description, and the price are displayed when opened using Product Image', async({inventoryPage, productPage}) => {
    const displayedProducts = await inventoryPage.getDisplayedProductDetails();
    const productIndex = Math.floor(Math.random() * displayedProducts.length);
    const productDetails = await inventoryPage.getProductDetails(productIndex);

    await inventoryPage.openProductByImage(productIndex);
    await productPage.validateProductDetails(productDetails);
});

test('Validate that user can navigate back to Inventory Page using Back Button', async({inventoryPage, productPage}) => {
    await inventoryPage.openProductByTitle(0);
    await productPage.clickBackToInventoryPage();
    await inventoryPage.validateInventoryPageIsVisible();
});

test('Validate that user can navigate back to Inventory Page using Browser Back Button', async({inventoryPage, productPage}) => {
    await inventoryPage.openProductByTitle(0);
    await productPage.clickBrowserBack();
    await inventoryPage.validateInventoryPageIsVisible();
});

test('Validate that item can be added', async({inventoryPage, productPage})  => {
    const beforeAddToCart = await productPage.getNumberOfItemsInCart();
    await inventoryPage.openProductByTitle(0);
    await productPage.addProduct();
    await productPage.validateNumberOfItemsInCart(beforeAddToCart + 1);
});

test('Validate that added item can be removed', async({inventoryPage, productPage}) => {
    const displayedProducts = await inventoryPage.getDisplayedProductDetails();
    const productIndex = Math.floor(Math.random() * displayedProducts.length);
    await inventoryPage.addToCart(displayedProducts[productIndex].title);
    await inventoryPage.openProductByTitle(productIndex);

    const beforeRemoveFromCart = await productPage.getNumberOfItemsInCart();
    await productPage.removeProduct();
    await productPage.validateNumberOfItemsInCart(beforeRemoveFromCart - 1);
});