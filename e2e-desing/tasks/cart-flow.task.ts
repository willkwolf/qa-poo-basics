// e2e-design/tasks/cart-flow.task.ts
import { Page, expect } from '@playwright/test';
import { InventoryActions, ProductData } from '../actions/inventory.actions';
import { CartActions, CartProductData } from '../actions/cart.actions';
import { ProductSelector } from '../utils/product-selector.util';
import { TestDataUtil } from '../utils/test-data.util';

export class CartFlowTask {
  private inventoryActions: InventoryActions;
  private cartActions: CartActions;

  constructor(private page: Page) {
    this.inventoryActions = new InventoryActions(page);
    this.cartActions = new CartActions(page);
  }

  /**
   * TASK: Validar un producto completo (add → validate → remove)
   */
  async validateSingleProduct(productIndex: number): Promise<void> {
    // 1. Obtener datos del producto en inventory
    const inventoryProduct = await this.inventoryActions.getProductByIndex(productIndex);
    console.log(`  🛒 Agregando: ${TestDataUtil.formatProductInfo(inventoryProduct)}`);
    // 2. Agregar al carrito
    await this.inventoryActions.addProductToCartByIndex(productIndex);
    // 3. Validar que el badge del carrito muestre "1"
    const cartCount = await this.inventoryActions.getCartCount();
    expect(cartCount, 'El carrito debe mostrar 1 producto').toBe(1);
    // 4. Ir al carrito
    await this.inventoryActions.goToCart();
    // 5. Obtener producto del carrito
    const cartProduct = await this.cartActions.getFirstProduct();
    expect(cartProduct, 'Debe existir un producto en el carrito').not.toBeNull();
    // 6. Validar coincidencia
    this.assertProductMatch(inventoryProduct, cartProduct!);
    console.log(`  ✓ Validado en carrito: ${TestDataUtil.formatProductInfo(cartProduct!)}`);
    // 7. Remover del carrito (ahora usa removeFirstProduct, que internamente usa removeProductByName)
    await this.cartActions.removeFirstProduct();
    console.log(`  🗑️  Removido del carrito`);
    // 8. Validar que el carrito esté vacío
    const isEmpty = await this.cartActions.isCartEmpty();
    expect(isEmpty, 'El carrito debe estar vacío después de remover').toBeTruthy();
    // 9. Volver a inventory
    await this.cartActions.backToInventory();
    console.log(`  ↩️  De vuelta en inventario\n`);
  }

  /**
   * TASK: Validar todos los productos en orden aleatorio
   */
  async validateAllProductsRandomly(): Promise<void> {
    const totalProducts = await this.inventoryActions.getTotalProductsCount();
    const selector = new ProductSelector(totalProducts);
    const shuffledIndices = selector.getAllIndicesShuffled();
    console.log(`\n🎲 Iniciando validación aleatoria de ${totalProducts} productos\n`);
    for (let i = 0; i < shuffledIndices.length; i++) {
      const productIndex = shuffledIndices[i];
      console.log(`[${TestDataUtil.formatProgress(i + 1, totalProducts)}]`);

      await this.validateSingleProduct(productIndex);
    }
    console.log(`✅ COMPLETADO: Todos los ${totalProducts} productos validados\n`);
  }

  /**
   * TASK: Validar productos uno a uno con selección aleatoria sin repetición
   */
  async validateProductsWithRandomSelector(): Promise<void> {
    const totalProducts = await this.inventoryActions.getTotalProductsCount();
    const selector = new ProductSelector(totalProducts);
    console.log(`\n🎯 Iniciando validación con selector aleatorio (${totalProducts} productos)\n`);
    let iteration = 0;
    while (!selector.allSelected()) {
      const randomIndex = selector.getRandomUnusedIndex();

      if (randomIndex === null) break;
      iteration++;
      const progress = selector.getProgress();
      console.log(`[Iteración ${iteration}] ${TestDataUtil.formatProgress(progress.selected, progress.total)}`);
      await this.validateSingleProduct(randomIndex);
    }
    console.log(`✅ COMPLETADO: ${iteration} productos validados con selector aleatorio\n`);
  }

  /**
   * Assertion helper: Valida coincidencia de productos
   */
  private assertProductMatch(
    inventoryProduct: ProductData,
    cartProduct: CartProductData
  ): void {
    expect(
      cartProduct.name,
      `El nombre debe coincidir: esperado "${inventoryProduct.name}"`
    ).toBe(inventoryProduct.name);
    expect(
      cartProduct.price,
      `El precio debe coincidir: esperado "${inventoryProduct.price}"`
    ).toBe(inventoryProduct.price);
    // Validación adicional de formato
    expect(
      TestDataUtil.isValidPrice(cartProduct.price),
      'El precio debe tener formato válido ($XX.XX)'
    ).toBeTruthy();
  }
}
