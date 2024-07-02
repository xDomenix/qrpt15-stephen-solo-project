import { SwagLabs } from './swaglabsPage';
const swag = new SwagLabs();

test('making sure i can log in',async () => {
    await swag.navigate(); 
    await swag.login(); 
    await swag.driver.sleep(2000)
    await swag.driver.quit();
test('adding item to cart')
}); 