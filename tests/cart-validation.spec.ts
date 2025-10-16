// tests/cart-validation.spec.ts

import { test, expect } from '@playwright/test';
import { CartFlowTask } from '../e2e-desing/tasks/cart-flow.task.ts';


test.describe('Cart Validation Flow', () => {
  let cartFlowTask: CartFlowTask;

  test.beforeEach(async ({ page }) => {
    // Login
    await page.goto('https://www.saucedemo.com');
    await page.fill('[data-test="username"]', 'standard_user');
    await page.fill('[data-test="password"]', 'secret_sauce');
    await page.click('[data-test="login-button"]');
    await page.waitForURL('**/inventory.html');

    // Inicializar Task
    cartFlowTask = new CartFlowTask(page);
  });

  test('Debe validar todos los productos en orden aleatorio', async () => {
    await cartFlowTask.validateAllProductsRandomly();
  });

  test('Debe validar productos con selector aleatorio sin repetición', async () => {
    await cartFlowTask.validateProductsWithRandomSelector();
  });

  test('Debe validar un producto específico (índice 0)', async () => {
    await cartFlowTask.validateSingleProduct(0);
  });
});