// Pruebas de API: autenticación, registro, control de acceso a endpoints
// protegidos y validación de permisos por rol.

const { test, expect } = require('@playwright/test');

const API_URL = 'https://api.practicesoftwaretesting.com';

test('TS-15: login vía API devuelve un token', async ({ request }) => {
  const response = await request.post(`${API_URL}/users/login`, {
    data: { email: 'customer@practicesoftwaretesting.com', password: 'welcome01' },
  });
  expect(response.ok()).toBeTruthy();
  const body = await response.json();
  expect(Object.keys(body).length).toBeGreaterThan(0);
});

test('TS-16: registro vía API crea un usuario nuevo', async ({ request }) => {
  const email = `qa.api.test.${Date.now()}@correo.com`;
  const response = await request.post(`${API_URL}/users/register`, {
    data: {
      first_name: 'Test',
      last_name: 'Automatizado',
      dob: '2000-01-01',
      phone: '5555555555',
      email,
      password: 'ClaveSegura123!',
      address: {
        street: '123 Calle de Prueba',
        city: 'Montevideo',
        state: 'Montevideo',
        country: 'UY',
        postal_code: '11200',
      },
    },
  });
  expect(response.ok()).toBeTruthy();
});

test('TS-17: un endpoint protegido rechaza el acceso sin token', async ({ request }) => {
  const response = await request.get(`${API_URL}/invoices`);
  expect(response.ok()).toBeFalsy();
});

test('TS-18: el listado de marcas es público (no requiere login)', async ({ request }) => {
  const response = await request.get(`${API_URL}/brands`);
  expect(response.ok()).toBeTruthy();
  const body = await response.json();
  expect(body).toBeTruthy();
});

test('TS-20: un cliente no puede eliminar una marca vía API (solo admin)', async ({ request }) => {
  const sufijo = Date.now();
  const creada = await request.post(`${API_URL}/brands`, {
    data: { name: `Marca de prueba ${sufijo}`, slug: `marca-prueba-${sufijo}` },
  });
  expect(creada.ok()).toBeTruthy();
  const { id } = await creada.json();

  const login = await request.post(`${API_URL}/users/login`, {
    data: { email: 'customer@practicesoftwaretesting.com', password: 'welcome01' },
  });
  const loginBody = await login.json();
  const token = loginBody.access_token || loginBody.token;

  const eliminada = await request.delete(`${API_URL}/brands/${id}`, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  expect(eliminada.ok()).toBeFalsy();
});
