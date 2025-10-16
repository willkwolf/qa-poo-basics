// e2e-design/locators/cart.locators.ts
export const CartLocators = {
  // Contenedores principales
  cartList: '.cart_list',
  cartItems: '.cart_item',

  // Información de productos en carrito
  itemName: '.inventory_item_name',
  itemPrice: '.inventory_item_price',
  itemDescription: '.inventory_item_desc',
  itemQuantity: '.cart_quantity',

  // Botones de acción
  removeButton: 'button[data-test*="remove-"]', // Cambiado de ^= a *=
  removeButtonByProduct: (productName: string) =>
    `button[data-test="remove-${productName.toLowerCase().replace(/\s+/g, '-')}"]`,
  removeButtonById: (productName: string) => {
    // Escapar caracteres especiales para CSS
    const escapedName = productName
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[()]/g, '\\$&'); // Escapar paréntesis
    return `#remove-${escapedName}`;
  },

  // Navegación
  continueShoppingButton: '[data-test="continue-shopping"]',
  checkoutButton: '[data-test="checkout"]',

  // Selectores por índice
  cartItemByIndex: (index: number) => `.cart_item:nth-child(${index + 1})`,
  itemNameByIndex: (index: number) =>
    `.cart_item:nth-child(${index + 1}) .inventory_item_name`,
  itemPriceByIndex: (index: number) =>
    `.cart_item:nth-child(${index + 1}) .inventory_item_price`,
  removeButtonByIndex: (index: number) =>
    `.cart_item:nth-child(${index + 1}) button[data-test*="remove-"]`, // Actualizado para usar *=
} as const;
