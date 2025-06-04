async function fetchGitHubData() {
  const username = document.getElementById('username').value.trim();
  const profile = document.getElementById('profile');
  const spinner = document.getElementById('spinner');

  if (!username) {
    profile.innerHTML = `<p>Please enter a username.</p>`;
    profile.style.display = 'block';
    return;
  }

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
        ${data.location ? `
          <p>
            <svg xmlns="http://www.w3.org/2000/svg" class="icon" viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5 14.5 7.62 14.5 9 13.38 11.5 12 11.5z"/>
            </svg> ${data.location}
          </p>` : ''}
        ${data.company ? `
          <p>
            <svg xmlns="http://www.w3.org/2000/svg" class="icon" viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
              <path d="M4 6H20V8H4V6M4 10H20V12H4V10M4 14H14V16H4V14Z"/>
            </svg> ${data.company}
          </p>` : ''}
        ${data.blog ? `
          <p>
            <svg xmlns="http://www.w3.org/2000/svg" class="icon" viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
              <path d="M14 3H5C3.89 3 3 3.89 3 5V19C3 20.1 3.89 21 5 21H19C20.11 21 21 20.1 21 19V10L14 3Z"/>
            </svg> <a href="${data.blog.startsWith('http') ? data.blog : 'https://' + data.blog}" target="_blank">${data.blog}</a>
          </p>` : ''}
        ${data.twitter_username ? `
          <p>
            <svg xmlns="http://www.w3.org/2000/svg" class="icon" viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
              <path d="M22.46 6c-.77.35-1.6.58-2.46.69a4.3 4.3 0 001.88-2.37 8.59 8.59 0 01-2.72 1.04 4.28 4.28 0 00-7.3 3.9A12.13 12.13 0 013 4.64a4.28 4.28 0 001.32 5.71 4.23 4.23 0 01-1.94-.53v.05a4.28 4.28 0 003.44 4.19 4.3 4.3 0 01-1.93.07 4.29 4.29 0 004 2.97A8.6 8.6 0 013 19.54a12.1 12.1 0 006.56 1.92c7.88 0 12.2-6.54 12.2-12.21 0-.19 0-.37-.01-.56A8.74 8.74 0 0022.46 6z"/>
            </svg> <a href="https://twitter.com/${data.twitter_username}" target="_blank">@${data.twitter_username}</a>
          </p>` : ''}
        <p><strong>Bio:</strong> ${data.bio || 'None'}</p>
        <p><strong>Public Repos:</strong> ${data.public_repos}</p>
        <p><strong>Followers:</strong> ${data.followers} | <strong>Following:</strong> ${data.following}</p>
        <p><strong>Hireable:</strong> ${data.hireable ? '✅ Open to work' : '❌ Not looking'}</p>
        <p><strong>Member since:</strong> ${new Date(data.created_at).toLocaleDateString()}</p>
        <p>
          <svg xmlns="http://www.w3.org/2000/svg" class="icon" viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
            <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
          </svg> <a href="${data.html_url}" target="_blank">View GitHub Profile</a>
        </p>
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
