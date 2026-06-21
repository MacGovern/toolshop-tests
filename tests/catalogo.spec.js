// Catálogo de productos: navegación por categoría, detalle de producto y búsqueda.

const { test, expect } = require('@playwright/test');

test('TS-06: la categoría "Hand Tools" muestra productos', async ({ page }) => {
  await page.goto('/category/hand-tools');
  const productos = page.locator('[data-test^="product-"]');
  await expect(productos.first()).toBeVisible();
  expect(await productos.count()).toBeGreaterThan(0);
});

test('TS-07: Ver detalle de producto', async ({ page }) => {
  await page.goto('/category/hand-tools');
  await page.locator('[data-test^="product-"]').first().click();
  await expect(page.getByTestId('product-name')).toBeVisible();
  await expect(page.getByTestId('product-name')).not.toHaveText('');
});

test('TS-08: Buscar producto por nombre', async ({ page }) => {
  await page.goto('/category/hand-tools');
  await page.locator('[data-test^="product-"]').first().click();
  const nombreProducto = (await page.getByTestId('product-name').innerText()).trim();

  await page.goto('/');
  await page.getByPlaceholder(/search/i).fill(nombreProducto);
  await page.getByPlaceholder(/search/i).press('Enter');

  await expect(page.locator('[data-test^="product-"]').first()).toBeVisible();
});

test('TS-09: Buscar producto inexistente', async ({ page }) => {
  await page.goto('/');
  await page.getByPlaceholder(/search/i).fill('zzxxqqww123nonexistente');
  await page.getByPlaceholder(/search/i).press('Enter');
  await expect(page.getByText(/no results|no products|not found/i)).toBeVisible();
});
