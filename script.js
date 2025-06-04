async function fetchGitHubData() {
  const username = document.getElementById('username').value;
  const response = await fetch(`https://api.github.com/users/${username}`);

  if (!response.ok) {
    document.getElementById('profile').innerHTML = `<p>User not found.</p>`;
    return;
  }

  const data = await response.json();

  const catAvatarUrl = `https://cataas.com/cat/says/Hi%20${username}?size=50&color=white`;

  document.getElementById('profile').innerHTML = `
    <h2>${data.name || data.login}</h2>
    <p><strong>Location:</strong> ${data.location || 'Not specified'}</p>
    <p><strong>Bio:</strong> ${data.bio || 'None'}</p>
    <img src="${catAvatarUrl}" alt="Cat Avatar">
  `;
}
