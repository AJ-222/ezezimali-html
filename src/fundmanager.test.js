const fetchMock = require('jest-fetch-mock');
const getInfo = require('./fundmanager');
fetchMock.enableMocks();

test('getInfo function fetches user data and updates the DOM', async () => {
  // Mock user data returned by the fetch API
  fetchMock.mockResponseOnce(JSON.stringify({
    clientPrincipal: {
      userDetails: '2551233@students.wits.ac.za',
      userId: 'ICTPass1753',
      userRoles: ['admin'],
    },
  }));

  // Simulate HTML structure
  document.body.innerHTML = `
  <header>
  <img src="Logos+icons/TopPage.png" alt="Ezezimali logo" id="larger-banner-logo">
  <nav>
      <a href="/funding"><button id= "applyBtn" title="ApplyToFund" alt="Apply">Apply for Funding</button></a>
      <a class="navIcons" href="#" title="Inbox"><img src="Logos+icons/inbox.png" alt="Inbox Icon"></a>
      <a class = "navIcons" href="#" title="Manage Funds"><img src="Logos+icons/fund-manager.png" alt="Fund Manager Icon"></a>
      <a class = "navIcons" href="#" title="Account"><img onclick="getInfo()" src="Logos+icons/account.png" alt="Account Icon"></a>
      <a class = "navIcons" href="/.auth/logout?post_logout_redirect_uri=/">Log out</a>
  </nav>
</header>
<main>
  <section id = "account">
      <h2>Account Information</h2>
      <p id="email">Welcome </p>
      <p id="role">Role: </p>
  </section>
  <section id="advertise">
      <h2>Advertise Funding Opportunities</h2>
      <!-- Form to advertise funding opportunities goes here -->
  </section>
  <section id="applications">
      <h2>Review Applications</h2>
      <article class="application">
          <h3>Name: Applicant A</h3>
          <p>Type: Education</p>
          <p>Brief: I am seeking funding for my college tuition...</p>
          <button class="open-modal">View Details</button>
      </article>
      <article class="application">
          <h3>Name: Applicant B</h3>
          <p>Type: Business</p>
          <p>Brief: I need funds to start my own bakery...</p>
          <button class="open-modal">View Details</button>
      </article>
      <article class="application">
          <h3>Name: Applicant C</h3>
          <p>Type: Event</p>
          <p>Brief: I am organizing a charity event and need funding...</p>
          <button class="open-modal">View Details</button>
      </article>
      <article class="application">
          <h3>Name: Applicant D</h3>
          <p>Type: Education</p>
          <p>Brief: I am a student in need of funds for buying books...</p>
          <button class="open-modal">View Details</button>
      </article>
  </section>
</main>
<footer>
  <p>&copy; Ezezimali - Invest in you</p>
</footer>
<aside id="myModal" class="modal">
  <section class="modal-content">
      <button class="close">&times;</button>
      <h3>Name: Applicant A</h3>
      <p>Type: Education</p>
      <p>Brief: I am seeking funding for my college tuition...</p>
      <button>Approve</button>
      <button>Deny</button>
  </section>
</aside>
  `;

  // Call the getInfo function
  await getInfo();

  // Check if the DOM elements are updated correctly
  expect(document.getElementById('email').innerHTML).toBe('Welcome 2551233@students.wits.ac.za');
  expect(document.getElementById('role').innerHTML).toBe('Role: Admin');

  // Verify if the admin button was created and added to the DOM
  const adminButton = document.getElementById('account').querySelector('button');
  expect(adminButton).not.toBeNull(); // Check if the button was created
  expect(adminButton.innerHTML).toBe('Admin'); // Check the button text
});
