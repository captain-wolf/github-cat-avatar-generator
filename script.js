async function fetchGitHubData() {
  const username = document.getElementById('username').value.trim();
  const profile = document.getElementById('profile');
  const spinner = document.getElementById('spinner');

  if (!username) {
    profile.innerHTML = `<p>Please enter a username.</p>`;
    profile.style.display = 'block';
    return;
  }

  // Show spinner, hide profile while loading
  spinner.style.display = 'block';
  profile.style.display = 'none';

  try {
    const response = await fetch(`https://api.github.com/users/${username}`);

    if (!response.ok) {
      profile.innerHTML = `<p>User not found.</p>`;
      profile.style.display = 'block';
      spinner.style.display = 'none';
      return;
    }

    const data = await response.json();

    const catAvatarUrl = `https://cataas.com/cat/says/Hi%20${username}?size=50&color=white`;

    profile.innerHTML = `
      <div class="profile-info">
        <h2>${data.name || data.login}</h2>
        <p>
          ${data.location ? `📍 <strong>Location:</strong> ${data.location}` : ''}
        </p>
        <p>
          ${data.company ? `🏢 <strong>Company:</strong> ${data.company}` : ''}
        </p>
        <p>
          ${data.blog ? `🔗 <strong>Website:</strong> <a href="${data.blog.startsWith('http') ? data.blog : 'https://' + data.blog}" target="_blank">${data.blog}</a>` : ''}
        </p>
        <p>
          ${data.twitter_username ? `🐦 <strong>Twitter:</strong> <a href="https://twitter.com/${data.twitter_username}" target="_blank">@${data.twitter_username}</a>` : ''}
        </p>
        <p><strong>Bio:</strong> ${data.bio || 'None'}</p>
        <p><strong>Public Repos:</strong> ${data.public_repos}</p>
        <p><strong>Followers:</strong> ${data.followers} | <strong>Following:</strong> ${data.following}</p>
        <p><strong>Hireable:</strong> ${data.hireable ? '✅ Open to work' : '❌ Not looking'}</p>
        <p><strong>Member since:</strong> ${new Date(data.created_at).toLocaleDateString()}</p>
        <p><a href="${data.html_url}" target="_blank">🔗 View GitHub Profile</a></p>
      </div>
      <img src="${catAvatarUrl}" alt="Cat Avatar">
    `;
    profile.style.display = 'flex';
  } catch (error) {
    console.error('Error fetching data:', error);
    profile.innerHTML = `<p>Something went wrong. Please try again later.</p>`;
    profile.style.display = 'block';
  } finally {
    spinner.style.display = 'none';
  }
}
