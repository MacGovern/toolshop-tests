// Formulario de contacto. El campo "message" exige un mínimo de 50 caracteres.

const { test, expect } = require('@playwright/test');

const MENSAJE_VALIDO =
  'Este es un mensaje de prueba generado automáticamente para validar el formulario de contacto.';

test('TS-10: Verificar que el sistema recibe el formulario de contacto', async ({ page }) => {
  await page.goto('/');
  await page.getByTestId('nav-contact').click();
  await page.getByTestId('first-name').fill('Leonardo');
  await page.getByTestId('last-name').fill('Tester');
  await page.getByTestId('email').fill('leonardo.qa.test@correo.com');
  await page.getByTestId('subject').selectOption('customer-service');
  await page.getByTestId('message').fill(MENSAJE_VALIDO);
  await page.getByTestId('contact-submit').click();
  await expect(page.getByText(/thank|success|received/i)).toBeVisible();
});

test('TS-11: El sistema rechaza email inválido en formulario de contacto', async ({ page }) => {
  await page.goto('/');
  await page.getByTestId('nav-contact').click();
  await page.getByTestId('first-name').fill('Leonardo');
  await page.getByTestId('last-name').fill('Tester');
  await page.getByTestId('email').fill('correo-invalido-sin-arroba');
  await page.getByTestId('subject').selectOption('customer-service');
  await page.getByTestId('message').fill(MENSAJE_VALIDO);
  await page.getByTestId('contact-submit').click();
  await expect(page.locator('.error, [class*="invalid"]').first()).toBeVisible();
});
