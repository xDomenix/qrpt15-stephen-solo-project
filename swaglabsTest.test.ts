import { Builder, WebDriver } from 'selenium-webdriver';
import { SwagLabsPage } from './swaglabsPage';

describe('Swag Labs Tests', () => {
    let driver: WebDriver;
    let swagLabsPage: SwagLabsPage;

    beforeAll(async () => {
        driver = await new Builder().forBrowser('chrome').build();
        swagLabsPage = new SwagLabsPage(driver);
    }, 30000);

    afterAll(async () => {
        await driver.quit();
    });

    test('should be able to login', async () => {
        await swagLabsPage.open('https://www.saucedemo.com/');
        await swagLabsPage.login('standard_user', 'secret_sauce');
    }, 30000);
    
    test('should log in and add an item to the cart', async () => {
        await swagLabsPage.open('https://www.saucedemo.com/');
        await swagLabsPage.login('standard_user', 'secret_sauce');
        await swagLabsPage.addItemToCart('Sauce Labs Backpack');
        await swagLabsPage.navigateToCart();
        const quantityElement = await swagLabsPage.findElementByXPath('//div[text()="Sauce Labs Backpack"]/ancestor::div[@class="cart_item"]//input[@class="cart_quantity"]');
        const quantity = await quantityElement.getAttribute('value');
        expect(quantity).toBe('1');
    }, 30000);

    test('should change item quantity in the cart', async () => {
        await swagLabsPage.open('https://www.saucedemo.com/');
        await swagLabsPage.login('standard_user', 'secret_sauce');
        await swagLabsPage.addItemToCart('Sauce Labs Backpack');
        await swagLabsPage.navigateToCart();
        await swagLabsPage.changeItemQuantity('Sauce Labs Backpack', '2');
        const quantityElement = await swagLabsPage.findElementByXPath('//div[text()="Sauce Labs Backpack"]/ancestor::div[@class="cart_item"]//input[@class="cart_quantity"]');
        const quantity = await quantityElement.getAttribute('value');
        expect(quantity).toBe('2');
    }, 30000);
});