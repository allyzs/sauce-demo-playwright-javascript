import { test } from '../fixtures/testFixtures';
import { productList } from '../data/testData';

test.beforeEach(async({inventoryPage}) => {
    await inventoryPage.open();
});

test('Validate that each product has the title, description, and the price displayed', async({inventoryPage}) => {
    await inventoryPage.validateDisplayedProducts(productList);
});

test('Validate that one product is added to the cart', async() => {

});

test('Validate that multiple products are added to the cart', async()  => {

});

test('Validate that one product is removed from the cart', async() => {

});

test('Validate that multiple products can be removed from the cart', async() => {

});

test('Validate that products details can be viewed or opened in Product View Page', async() => {

});

test('Validate that products are sorted by Name in Ascending order', async() => {

});

test('Validate that products are sorted by Name in Descending order', async() => {

});

test('Validate that products are sorted by Price in Ascending order', async() => {

});

test('Validate that products are sorted by Price in Descending order', async() => {

});