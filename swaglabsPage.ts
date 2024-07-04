import { By, WebDriver } from "selenium-webdriver";
import { BasePage } from "./basePage";
const fs = require('fs'); 

export class SwagLabs extends BasePage {
    usernameInput: By = By.xpath('//*[@id="user-name"]');
    passwordInput: By = By.xpath('//*[@id="password"]');
    loginButton: By = By.xpath('//*[@id="login-button"]');
    logoutButton: By = By.xpath('//*[@id="logout_sidebar_link"]');
    inventoryItemByName = (itemName: string): By => By.xpath(`//div[text()="${itemName}"]/ancestor::div[@class="inventory_item"]//button`);
    cartButton: By = By.xpath('//*[@class="shopping_cart_link"]');
    cartQuantityInputByName = (itemName: string): By => By.xpath(`//div[text()="${itemName}"]/ancestor::div[@class="cart_item"]//input[@class="cart_quantity"]`);
    cartItemByName = (itemName: string): By => By.xpath(`//div[text()="${itemName}"]/ancestor::div[@class="cart_item"]`);
    removeButtonByName = (itemName: string): By => By.xpath(`//div[text()="${itemName}"]/ancestor::div[@class="cart_item"]//button`);
    checkoutButton: By = By.xpath('//*[@id="checkout"]');
    continueButton: By = By.xpath('//*[@id="continue"]');
    finishButton: By = By.xpath('//*[@id="finish"]');
    firstNameInput: By = By.xpath('//*[@id="first-name"]');
    lastNameInput: By = By.xpath('//*[@id="last-name"]');
    zipCodeInput: By = By.xpath('//*[@id="postal-code"]');
    confirmationMessage: By = By.xpath('//h2[@class="complete-header"]');
    productsButton: By = By.xpath('//*[@id="inventory_sidebar_link"]');
    backToHomeButton: By = By.xpath('//*[@id="back-to-products"]');
    menuBtn: By = By.id('react-burger-menu-btn'); 

    constructor(){
        super({url: "https://www.saucedemo.com/"}); 
    }; 

    async login() {
        await this.setInput(this.usernameInput, "standard_user");
        await this.setInput(this.passwordInput, "secret_sauce");
        await this.click(this.loginButton);
    }

    async logout(): Promise<void> {
        await this.click(this.menuBtn); 
        await this.click(this.logoutButton);
    }

    async addItemToCart(itemName: string): Promise<void> {
        const addItemXPath = this.inventoryItemByName(itemName);
        await this.driver.findElement(addItemXPath).click();
    }

    async removeItemFromCart(itemName: string): Promise<void> {
        const removeItemXPath = this.removeButtonByName(itemName);
        await this.driver.findElement(removeItemXPath).click();
    }

    async navigateToCart(): Promise<void> {
        await this.driver.findElement(this.cartButton).click();
    }

    async changeItemQuantity(itemName: string, quantity: string): Promise<void> {
        const itemQuantityXPath = this.cartQuantityInputByName(itemName);
        const element = await this.driver.findElement(itemQuantityXPath);
        await element.clear();
        await element.sendKeys(quantity);
    }

    async getCartItems(): Promise<string[]> {
        const cartItemElements = await this.driver.findElements(By.css('.inventory_item_name'));
        const cartItems = [];
        for (const element of cartItemElements) {
            cartItems.push(await element.getText());
        }
        return cartItems;
    }

    async checkout(): Promise<void> {
        await this.driver.findElement(this.checkoutButton).click();
    }

    async fillShippingInfo(firstName: string, lastName: string, zipCode: string): Promise<void> {
        await this.setInput(this.firstNameInput, firstName);
        await this.setInput(this.lastNameInput, lastName);
        await this.setInput(this.zipCodeInput, zipCode);
        await this.click(this.continueButton);
    }

    async finishCheckout(): Promise<void> {
        await this.click(this.finishButton);
    }

    async getConfirmationMessage(): Promise<string> {
        const confirmationElement = await this.driver.findElement(this.confirmationMessage);
        return await confirmationElement.getText();
    }

    async navigateToProducts(): Promise<void> {
        await this.click(this.productsButton);
    }
}
