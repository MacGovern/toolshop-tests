// Creación de una marca desde el panel de administración.
// La base de datos es compartida; el nombre/slug incluye un timestamp para
// evitar colisiones con datos de otras personas o de corridas anteriores.

const { test, expect } = require('@playwright/test');

test('TS-19: un administrador puede crear una marca', async ({ page }) => {
  await page.goto('/auth/login');
  await page.getByTestId('email').fill('admin@practicesoftwaretesting.com');
  await page.getByTestId('password').fill('welcome01');
  await page.getByTestId('login-submit').click();
  await expect(page).toHaveURL(/admin\/dashboard/);

  const sufijo = Date.now();
  await page.goto('/admin/brands/add');
  await page.getByTestId('name').fill(`Marca Playwright ${sufijo}`);
  await page.getByTestId('slug').fill(`marca-playwright-${sufijo}`);
  await page.getByTestId('brand-submit').click();

  await expect(page.getByText('Brand saved')).toBeVisible();
});
