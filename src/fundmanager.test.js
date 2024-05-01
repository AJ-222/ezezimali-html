const fetchMock = require('jest-fetch-mock');
const getInfo = require('./fundmanager');
fetchMock.enableMocks();

test('getInfo function fetches user data and updates the DOM', async () => {
  // Mock user data returned by the fetch API
  fetchMock.mockResponseOnce(JSON.stringify({
    clientPrincipal: {
      userDetails: 'testuser@example.com',
      userId: '12345',
      userRoles: ['admin'],
    },
  }));

  // Simulate HTML structure
  document.body.innerHTML = `
    <div id="email"></div>
    <div id="role"></div>
    <div id="account"></div>
  `;

  // Call the getInfo function
  await getInfo();

  // Check if the DOM elements are updated correctly
  expect(document.getElementById('email').innerHTML).toBe('Welcome testuser@example.com');
  expect(document.getElementById('role').innerHTML).toBe('Role: Admin');

  // Verify if the admin button was created and added to the DOM
  const adminButton = document.getElementById('account').querySelector('button');
  expect(adminButton).not.toBeNull(); // Check if the button was created
  expect(adminButton.innerHTML).toBe('Admin'); // Check the button text
});
