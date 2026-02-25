import { test } from '../fixtures/testFixtures';
import { productList } from '../data/testData';

test.beforeEach(async({inventoryPage}) => {
    await inventoryPage.open();
});

test('Validate that each product has the title, description, and the price displayed', async({inventoryPage}) => {
    await inventoryPage.validateDisplayedProducts(productList);
});

test('Validate that cart counter is incremented by 1 after adding 1 item', async({inventoryPage}) => {
    const displayedProducts = await inventoryPage.getDisplayedProductDetails();
    const productIndex = Math.floor(Math.random() * displayedProducts.length);
    const beforeAddToCart = await inventoryPage.getNumberOfItemsInCart();

    await inventoryPage.addToCart(displayedProducts[productIndex].title);
    await inventoryPage.validateNumberOfItemsInCart(beforeAddToCart + 1);
});

test('Validate that cart counter is incremented based on the number of multiple items added', async({inventoryPage})  => {
    const displayedProducts = await inventoryPage.getDisplayedProductDetails();
    const numberOfItemsToAdd = (Math.floor(Math.random() * displayedProducts.length)) + 1;
    //Make sure that cart is empty
    await inventoryPage.validateNumberOfItemsInCart(0);
    await inventoryPage.addMultipleItemsToCart(displayedProducts, numberOfItemsToAdd);
    await inventoryPage.validateNumberOfItemsInCart(numberOfItemsToAdd);
});

test('Validate that cart counter is decremented by 1 after removing 1 item', async({inventoryPage}) => {
    const displayedProducts = await inventoryPage.getDisplayedProductDetails();
    const numberOfItemsToAdd = (Math.floor(Math.random() * displayedProducts.length)) + 1;
    //Make sure that cart is empty
    await inventoryPage.validateNumberOfItemsInCart(0);
    //Make sure that there will items to be removed
    const productsAdded = await inventoryPage.addMultipleItemsToCart(displayedProducts, numberOfItemsToAdd);

    const productIndex = Math.floor(Math.random() * productsAdded.length);
    await inventoryPage.removeFromCart(productsAdded[productIndex].title);
    await inventoryPage.validateNumberOfItemsInCart(numberOfItemsToAdd - 1);
});

test('Validate that cart counter is decremented based on the number of multiple items removed', async({inventoryPage}) => {
    const displayedProducts = await inventoryPage.getDisplayedProductDetails();
    const numberOfItemsToAdd = (Math.floor(Math.random() * displayedProducts.length)) + 1;
    //Make sure that cart is empty
    await inventoryPage.validateNumberOfItemsInCart(0);
    //Make sure that there will items to be removed
    const productsAdded = await inventoryPage.addMultipleItemsToCart(displayedProducts, numberOfItemsToAdd);

    const numberOfItemsToRemove = (Math.floor(Math.random() * productsAdded.length)) + 1;
    await inventoryPage.removeMultipleItemsFromCart(productsAdded, numberOfItemsToRemove);
    await inventoryPage.validateNumberOfItemsInCart(numberOfItemsToAdd - numberOfItemsToRemove);
});

test('Validate that products details can be viewed or opened in Product View Page by clicking Product Title', async({inventoryPage}) => {
    const displayedProducts = await inventoryPage.getDisplayedProductDetails();
    const productIndex = Math.floor(Math.random() * displayedProducts.length);
    await inventoryPage.openProductByTitle(productIndex);
    await inventoryPage.validateThatProductItemIsDisplayed();
});

test('Validate that products details can be viewed or opened in Product View Page by clicking Product Image', async({inventoryPage}) => {
    const displayedProducts = await inventoryPage.getDisplayedProductDetails();
    const productIndex = Math.floor(Math.random() * displayedProducts.length);
    await inventoryPage.openProductByImage(productIndex);
    await inventoryPage.validateThatProductItemIsDisplayed();
});

const sortingOptions = ['Name (A to Z)', 'Name (Z to A)', 'Price (low to high)', 'Price (high to low)'];
sortingOptions.forEach( option => {
    test(`Validate that products are sorted by ${option}`, async({inventoryPage}) => {
        await inventoryPage.sortDisplayedProducts(option);
        await inventoryPage.validateThatProductsAreSortedCorrectly(option, productList);
    });
});