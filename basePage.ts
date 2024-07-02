import { Builder, By, Capabilities, until, WebDriver, WebElement, Actions } from "selenium-webdriver";

interface Options {
    driver?: WebDriver;
    url?: string;
}

export class BasePage {
    driver: WebDriver;
    url?: string;

    constructor(options?: Options) {
        if (options && options.driver) {
            this.driver = options.driver;
        } else {
            this.driver = new Builder().withCapabilities(Capabilities.chrome()).build();
        }
        this.url = options?.url || ''; // Set the url to an empty string if not provided in options
    }

    async navigate(url?: string): Promise<void> {
        if (url) {
            await this.driver.get(url); // Navigate to the provided URL
        } else if (this.url) {
            await this.driver.get(this.url); // Navigate to the URL defined in the class instance
        } else {
            throw new Error('BasePage needs a URL either in the test or in the page object.');
        }
    }

    async getElement(elementBy: By): Promise<WebElement> {
        await this.driver.wait(until.elementLocated(elementBy));
        let element = await this.driver.findElement(elementBy);
        await this.driver.wait(until.elementIsVisible(element));
        return element;
    }

    async click(elementBy: By): Promise<void> {
        await (await this.getElement(elementBy)).click();
    }

    async setInput(elementBy: By, keys: any): Promise<void> {
        let input = await this.getElement(elementBy);
        await input.clear();
        await input.sendKeys(keys);
    }

    async getText(elementBy: By): Promise<string> {
        return (await this.getElement(elementBy)).getText();
    }

    async getAttribute(elementBy: By, attribute: string): Promise<string> {
        return (await this.getElement(elementBy)).getAttribute(attribute);
    }

    actionWiggle(actions: Actions, originElement: WebElement, moveDurationMS: number = 100): Actions {
        return actions.move({ origin: originElement, duration: moveDurationMS })
            .move({ origin: originElement, x: 10, y: 0, duration: moveDurationMS })
            .move({ origin: originElement, x: 0, y: 10, duration: moveDurationMS })
            .move({ origin: originElement, x: 10, y: 0, duration: moveDurationMS })
            .move({ origin: originElement, x: 0, y: 10, duration: moveDurationMS })
            .pause(moveDurationMS);
    }
}
