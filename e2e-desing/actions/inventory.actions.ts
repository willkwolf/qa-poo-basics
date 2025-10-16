// e2e-design/actions/inventory.actions.ts

import { Page, Locator } from '@playwright/test';
import { InventoryLocators } from '../locators/inventory.locators';

export interface ProductData {
  name: string;
  price: string;
  index: number;
}

export class InventoryActions {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Navega a la página de inventario
   */
  async navigateToInventory(): Promise<void> {
    await this.page.goto('https://www.saucedemo.com/inventory.html');
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Obtiene todos los productos disponibles
   */
  async getAllProducts(): Promise<ProductData[]> {
    const items = await this.page.locator(InventoryLocators.items).all();
    const products: ProductData[] = [];

    for (let i = 0; i < items.length; i++) {
      const name = await items[i].locator(InventoryLocators.itemName).textContent();
      const price = await items[i].locator(InventoryLocators.itemPrice).textContent();

      if (name && price) {
        products.push({
          name: name.trim(),
          price: price.trim(),
          index: i,
        });
      }
    }

    return products;
  }

  /**
   * Obtiene datos de un producto por índice
   */
  async getProductByIndex(index: number): Promise<ProductData> {
    const name = await this.page
      .locator(InventoryLocators.itemNameByIndex(index))
      .textContent();
    const price = await this.page
      .locator(InventoryLocators.itemPriceByIndex(index))
      .textContent();

    return {
      name: name?.trim() || '',
      price: price?.trim() || '',
      index,
    };
  }

  /**
   * Agrega un producto al carrito por índice
   */
  async addProductToCartByIndex(index: number): Promise<void> {
    await this.page.locator(InventoryLocators.addButtonByIndex(index)).click();
    await this.page.waitForTimeout(300); // Esperar animación
  }

  /**
   * Obtiene el conteo del carrito
   */
  async getCartCount(): Promise<number> {
    const badge = this.page.locator(InventoryLocators.cartBadge);
    const isVisible = await badge.isVisible().catch(() => false);
    
    if (!isVisible) return 0;
    
    const count = await badge.textContent();
    return count ? parseInt(count) : 0;
  }

  /**
   * Navega al carrito
   */
  async goToCart(): Promise<void> {
    await this.page.locator(InventoryLocators.cartLink).click();
    await this.page.waitForURL('**/cart.html');
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Obtiene el total de productos disponibles
   */
  async getTotalProductsCount(): Promise<number> {
    return await this.page.locator(InventoryLocators.items).count();
  }
}