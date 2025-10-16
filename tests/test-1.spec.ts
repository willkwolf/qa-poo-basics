import { test, expect } from '@playwright/test';
import { LoginTasks } from '../e2e-desing/tasks/loginTasks';
import { TestData } from '../e2e-desing/utils/testData';

test('test login success', async ({ page }) => {
  const url = 'https://www.saucedemo.com/v1/';
  const username = 'standard_user';
  const password = 'secret_sauce';
  await page.goto(url);
  await page.locator('[data-test="username"]').fill(username);
  await page.locator('[data-test="password"]').fill(password);
  await page.getByRole('button', { name: 'LOGIN' }).click();
  await expect(page.getByText('Products')).toBeVisible();
  await expect(page.getByText('Products')).toHaveText('Products');
});

test('test login success new model', async ({ page }) => {
  const url = TestData.URL;
  const username = TestData.USERS.STANDARD_USER.username;
  const password = TestData.USERS.STANDARD_USER.password;
  const loginTasks = new LoginTasks(page);
  await loginTasks.navigateToLoginPage(url);
  await loginTasks.doLogin(username, password);
  await expect(page.getByText(TestData.VALIDATIONS_TEXTS.PRODUCTS_HEADER)).toBeVisible();
  await expect(page.getByText(TestData.VALIDATIONS_TEXTS.PRODUCTS_HEADER)).toHaveText(TestData.VALIDATIONS_TEXTS.PRODUCTS_HEADER);
});