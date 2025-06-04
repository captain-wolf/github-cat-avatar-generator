async function fetchGitHubData() {
  const username = document.getElementById('username').value.trim();
  const profile = document.getElementById('profile');

  if (!username) {
    profile.innerHTML = `<p>Please enter a username.</p>`;
    profile.style.display = 'block'; // or flex depending on your layout
    return;
  }

  const response = await fetch(`https://api.github.com/users/${username}`);

  if (!response.ok) {
    profile.innerHTML = `<p>User not found.</p>`;
    profile.style.display = 'block'; // show even when error happens
    return;
  }

  const data = await response.json();

  const catAvatarUrl = `https://cataas.com/cat/says/Hi%20${username}?size=50&color=white`;

  profile.innerHTML = `
    <div class="profile-info">
      <h2>${data.name || data.login}</h2>
      <p><strong>Location:</strong> ${data.location || 'Not specified'}</p>
      <p><strong>Bio:</strong> ${data.bio || 'None'}</p>
    </div>
    <img src="${catAvatarUrl}" alt="Cat Avatar">
  `;
  profile.style.display = 'flex'; // show after successful fetch
}
