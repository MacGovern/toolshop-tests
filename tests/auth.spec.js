// Autenticación, registro y control de acceso por rol.
// Cuentas de prueba públicas del entorno de demostración:
//   admin@practicesoftwaretesting.com    / welcome01  (rol administrador)
//   customer@practicesoftwaretesting.com / welcome01  (rol cliente)

const { test, expect } = require('@playwright/test');

async function intentarLogin(page, email, password) {
  await page.goto('/auth/login');
  await page.getByTestId('email').fill(email);
  await page.getByTestId('password').fill(password);
  await page.getByTestId('login-submit').click();
}

async function login(page, email, password) {
  await intentarLogin(page, email, password);
  await expect(page.getByTestId('nav-sign-in')).not.toBeVisible();
}

test('TS-01: Login con credenciales válidas', async ({ page }) => {
  await login(page, 'customer@practicesoftwaretesting.com', 'welcome01');
  await expect(page.getByTestId('nav-sign-in')).not.toBeVisible();
});

test('TS-02: Login con contraseña incorrecta', async ({ page }) => {
  await intentarLogin(page, 'customer@practicesoftwaretesting.com', 'ClaveIncorrecta123');
  await expect(page.getByText(/invalid|incorrect|credentials/i)).toBeVisible();
});

test('TS-03: el usuario autenticado puede ver su sección de cuenta', async ({ page }) => {
  await login(page, 'customer@practicesoftwaretesting.com', 'welcome01');
  await page.goto('/account/invoices');
  await expect(page).toHaveURL(/account\/invoices/);
});

test('TS-04: registro de un nuevo usuario', async ({ page }) => {
  const sufijo = Date.now();
  await page.goto('/auth/register');
  await page.getByTestId('first-name').fill('Test');
  await page.getByTestId('last-name').fill('Automatizado');
  await page.getByTestId('dob').fill('1995-02-25');
  await page.getByTestId('country').selectOption('UY');
  await page.getByTestId('postal_code').fill('11200');
  await page.getByTestId('house_number').fill('123');
  await page.getByTestId('street').fill('Calle de Prueba');
  await page.getByTestId('city').fill('Montevideo');
  await page.getByTestId('state').fill('Montevideo');
  await page.getByTestId('phone').fill('0059891234567');
  await page.getByTestId('email').fill(`qa.test.${sufijo}@correo.com`);
  await page.getByTestId('password').fill(`TestQA${sufijo}Pass#1`);
  await page.getByTestId('register-submit').click();

  await expect(page).toHaveURL(/auth\/login/);
});

test('TS-05: un cliente no puede acceder al panel de administración', async ({ page }) => {
  await login(page, 'customer@practicesoftwaretesting.com', 'welcome01');
  await page.goto('/admin/brands/add');
  await expect(page.getByTestId('name')).not.toBeVisible();
});
