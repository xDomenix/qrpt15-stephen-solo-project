import { By, WebDriver } from "selenium-webdriver";
import { BasePage } from "./basePage";
const fs = require('fs'); 

export class SwagLabs extends BasePage {
    usernameInput: By = By.xpath('//*[@id="user-name"]');
    passwordInput: By = By.xpath('//*[@id="password"]');
    loginButton: By = By.xpath('//*[@id="login-button"]');
    inventoryItemByName = (itemName: string): By => By.xpath(`//div[text()="${itemName}"]/ancestor::div[@class="inventory_item"]//button`);
    cartButton: By = By.xpath('//*[@class="shopping_cart_link"]');
    cartQuantityInputByName = (itemName: string): By => By.xpath(`//div[text()="${itemName}"]/ancestor::div[@class="cart_item"]//input[@class="cart_quantity"]`);
    checkoutButton: By = By.xpath('//*[@id="checkout"]');
    continueButton: By = By.xpath('//*[@id="continue"]');
    finishButton: By = By.xpath('//*[@id="finish"]');

    constructor(){
        super({url: "https://www.saucedemo.com/"}); 
    }; 
    
    async login() {
        await this.setInput(this.usernameInput, "standard_user"); 
        await this.setInput(this.passwordInput, "secret_sauce"); 
        await this.click(this.loginButton); 
        }

    async addItemToCart(itemName: string): Promise<void> {
        const addItemXPath = this.inventoryItemByName(itemName);
        await this.driver.findElement(addItemXPath).click();
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

    async checkout(): Promise<void> {
        await this.driver.findElement(this.checkoutButton).click();
        // Additional steps to enter shipping info, continue, and finish checkout
    }
}