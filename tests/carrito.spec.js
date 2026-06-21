// Carrito de compras: agregar, eliminar y un caso exploratorio de cantidad alta.

const { test, expect } = require('@playwright/test');

async function irAlPrimerProducto(page) {
  await page.goto('/category/hand-tools');
  await page.locator('[data-test^="product-"]').first().click();
}

test('TS-12: Agregar un producto al carrito', async ({ page }) => {
  await irAlPrimerProducto(page);
  await page.getByTestId('add-to-cart').click();
  await page.getByTestId('nav-cart').click();
  await expect(page.locator('[data-test^="product-"]').first()).toBeVisible();
});

test('TS-13: Eliminar un producto del carrito', async ({ page }) => {
  await irAlPrimerProducto(page);
  await page.getByTestId('add-to-cart').click();
  await page.getByTestId('nav-cart').click();
  await page.locator('.btn.btn-danger').first().click();
  await expect(page.getByText(/empty/i)).toBeVisible();
});

test('TS-14: Comprobar si existe límite máximo de cantidad para un producto dado', async ({ page }) => {
  await irAlPrimerProducto(page);
  const campoCantidad = page.getByRole('spinbutton');
  if (await campoCantidad.count()) {
    await campoCantidad.fill('101');
  }
  await page.getByTestId('add-to-cart').click();
});
