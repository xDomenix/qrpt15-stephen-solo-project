import { SwagLabs } from "./swaglabsPage";
const swagLabs = new SwagLabs()
describe('Swag Labs Tests', () => {
    afterAll(async () => {
        await swagLabs.driver.quit();
    });

    test('should login successfully', async () => {
        await swagLabs.navigate();
        await swagLabs.login();
        const url = await swagLabs.driver.getCurrentUrl();
        expect(url).toBe("https://www.saucedemo.com/inventory.html");
    });

    test('should add item to cart and click the cart button', async () => {
        const itemName = "Sauce Labs Backpack";
        await swagLabs.addItemToCart(itemName);
        await swagLabs.navigateToCart();
        const url = await swagLabs.driver.getCurrentUrl();
        expect(url).toBe("https://www.saucedemo.com/cart.html");
    });

    test('should remove item from cart', async () => {
        const itemName = "Sauce Labs Backpack";
        await swagLabs.addItemToCart(itemName);
        await swagLabs.navigateToCart();
        await swagLabs.removeItemFromCart(itemName);
        const cartItems = await swagLabs.getCartItems();
        expect(cartItems).not.toContain(itemName);
    });

    test('should complete checkout process', async () => {
        const itemName = "Sauce Labs Backpack";
        await swagLabs.addItemToCart(itemName);
        await swagLabs.navigateToCart();
        await swagLabs.checkout();
        await swagLabs.fillShippingInfo('John', 'Doe', '12345');
        await swagLabs.finishCheckout();
        const confirmationMessage = await swagLabs.getConfirmationMessage();
        expect(confirmationMessage).toContain('Thank you for your order');
    });

    test('should logout successfully', async () => {
        await swagLabs.logout();
        const url = await swagLabs.driver.getCurrentUrl();
        expect(url).toBe("https://www.saucedemo.com/");
    });
});
