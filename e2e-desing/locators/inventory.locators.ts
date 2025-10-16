// e2e-design/locators/inventory.locators.ts

export const InventoryLocators = {
  // Contenedores principales
  container: '#inventory_container',
  items: '.inventory_item',

  // Información de productos
  itemName: '.inventory_item_name',
  itemPrice: '[data-test="inventory-item-price"]',
  itemDescription: '.inventory_item_desc',

   // Botones de acción
  addToCartButton: (productName: string) =>
    `button[data-test="add-to-cart-${productName.toLowerCase().replace(/\s+/g, '-')}"]`,
  addToCartGeneric: 'button[data-test^="add-to-cart"]',
  removeButton: (productName: string) =>
    `button[data-test="remove-${productName.toLowerCase().replace(/\s+/g, '-')}"]`,
  removeButtonByIndex: (index: number) =>
    `.inventory_item:nth-child(${index + 1}) button[data-test*="remove-"]`, // <-- Este es el cambio clave

  // Navegación
  cartLink: '.shopping_cart_link',
  cartBadge: '.shopping_cart_badge',

  // Filtros y ordenamiento
  sortDropdown: '[data-test="product-sort-container"]',

  // Selectores por índice (para acceso directo)
  itemByIndex: (index: number) => `.inventory_item:nth-child(${index + 1})`,
  itemNameByIndex: (index: number) =>
    `.inventory_item:nth-child(${index + 1}) .inventory_item_name`,
  itemPriceByIndex: (index: number) =>
    `.inventory_item:nth-child(${index + 1}) [data-test="inventory-item-price"]`,
  addButtonByIndex: (index: number) =>
    `.inventory_item:nth-child(${index + 1}) button[data-test^="add-to-cart"]`,
} as const;
