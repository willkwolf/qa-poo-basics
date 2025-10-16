// e2e-design/utils/test-data.util.ts

import { ProductData } from '../actions/inventory.actions';
import { CartProductData } from '../actions/cart.actions';

export class TestDataUtil {
  /**
   * Valida que dos productos coincidan (nombre y precio)
   */
  static productsMatch(
    inventoryProduct: ProductData,
    cartProduct: CartProductData
  ): boolean {
    return (
      inventoryProduct.name === cartProduct.name &&
      inventoryProduct.price === cartProduct.price
    );
  }

  /**
   * Formatea información de producto para logging
   */
  static formatProductInfo(product: ProductData | CartProductData): string {
    return `"${product.name}" - ${product.price}`;
  }

  /**
   * Genera reporte de progreso
   */
  static formatProgress(current: number, total: number): string {
    const percentage = Math.round((current / total) * 100);
    return `${current}/${total} (${percentage}%)`;
  }

  /**
   * Valida que el precio tenga formato correcto
   */
  static isValidPrice(price: string): boolean {
    return /^\$\d+\.\d{2}$/.test(price);
  }

  /**
   * Extrae el valor numérico del precio
   */
  static extractPriceValue(price: string): number {
    return parseFloat(price.replace('$', ''));
  }
}