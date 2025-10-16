// e2e-design/actions/cart.actions.ts
import { Page } from '@playwright/test';
import { CartLocators } from '../locators/cart.locators';

export interface CartProductData {
  name: string;
  price: string;
  quantity: string;
  index: number;
}

export class CartActions {
  constructor(private page: Page) {}

  /**
   * Obtiene todos los productos en el carrito
   */
  async getCartProducts(): Promise<CartProductData[]> {
    const items = await this.page.locator(CartLocators.cartItems).all();
    const products: CartProductData[] = [];
    for (let i = 0; i < items.length; i++) {
      const name = await items[i].locator(CartLocators.itemName).textContent();
      const price = await items[i].locator(CartLocators.itemPrice).textContent();
      const quantity = await items[i].locator(CartLocators.itemQuantity).textContent();
      if (name && price) {
        products.push({
          name: name.trim(),
          price: price.trim(),
          quantity: quantity?.trim() || '1',
          index: i,
        });
      }
    }
    return products;
  }

  /**
   * Obtiene el primer producto del carrito
   */
  async getFirstProduct(): Promise<CartProductData | null> {
    const products = await this.getCartProducts();
    return products[0] || null;
  }

  /**
   * Remueve un producto por índice
   */
  async removeProductByIndex(index: number): Promise<void> {
    const locator = this.page.locator(CartLocators.removeButtonByIndex(index));
    await locator.waitFor({ state: 'visible' });
    await locator.click();
    await this.page.waitForTimeout(300); // Esperar animación
  }

  /**
   * Remueve un producto por nombre
   */
  async removeProductByName(productName: string): Promise<void> {
  const locator = this.page.locator(CartLocators.removeButtonByProduct(productName));
  await locator.waitFor({ state: 'visible' });
  await locator.click();
  await this.page.waitForTimeout(300); // Esperar animación
  }

  /**
   * Remueve el primer producto del carrito
   */
  async removeFirstProduct(): Promise<void> {
    const firstProduct = await this.getFirstProduct();
        if (!firstProduct) {
            throw new Error("No hay productos en el carrito.");
        }
    await this.removeProductByName(firstProduct.name);
  }

  /**
   * Verifica si el carrito está vacío
   */
  async isCartEmpty(): Promise<boolean> {
    const count = await this.page.locator(CartLocators.cartItems).count();
    return count === 0;
  }

  /**
   * Obtiene la cantidad de productos en el carrito
   */
  async getCartItemsCount(): Promise<number> {
    return await this.page.locator(CartLocators.cartItems).count();
  }

  /**
   * Vuelve a la página de inventario
   */
  async backToInventory(): Promise<void> {
    await this.page.locator(CartLocators.continueShoppingButton).click();
    await this.page.waitForURL('**/inventory.html');
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Procede al checkout
   */
  async proceedToCheckout(): Promise<void> {
    await this.page.locator(CartLocators.checkoutButton).click();
    await this.page.waitForURL('**/checkout-step-one.html');
  }
}
