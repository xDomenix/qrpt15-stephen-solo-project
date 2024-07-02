import { Builder, WebDriver } from "selenium-webdriver";
import { SwagLabs } from "./swaglabsPage";

describe('Swag Labs Tests', () => {
    let driver: WebDriver;
    let swagLabs: SwagLabs;

    beforeAll(async () => {
        driver = await new Builder().forBrowser('chrome').build();
        swagLabs = new SwagLabs();
    });

    afterAll(async () => {
        await driver.quit();
    });

    test('should login successfully', async () => {
        await swagLabs.navigate();
        await swagLabs.login();
        const url = await driver.getCurrentUrl();
        expect(url).toBe("https://www.saucedemo.com/inventory.html");
    });

    test('should add item to cart and click the cart button', async () => {
        const itemName = "Sauce Labs Backpack";
        await swagLabs.addItemToCart(itemName);
        await swagLabs.navigateToCart();
        const url = await driver.getCurrentUrl();
        expect(url).toBe("https://www.saucedemo.com/cart.html");
    });

    test('should logout successfully', async () => {
        await swagLabs.logout();
        const url = await driver.getCurrentUrl();
        expect(url).toBe("https://www.saucedemo.com/");
    });
});
