let users = [];

document.getElementById('fileInput').addEventListener('change', handleFileUpload);

function handleFileUpload(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function(e) {
    try {
      const rawData = JSON.parse(e.target.result);
      users = Object.values(rawData);
      console.log('Users loaded:', users);
    } catch (err) {
      alert('Invalid JSON file.');
    }
  };
  reader.readAsText(file);
}

function findFriends() {
  const myStateInput = prompt('Enter your state (e.g., Georgia, California)').trim();
  if (!myStateInput) {
    alert('Please enter a state.');
    return;
  }

  if (users.length === 0) {
    alert('No user data loaded.');
    return;
  }

  const myState = myStateInput.toLowerCase();

  // Filter users by matching state
  const matchedUsers = users.filter(user => 
    user.state && user.state.toLowerCase() === myState
  );

  // Limit to 5
  const topMatches = matchedUsers.slice(0, 5);

  // Display
  const resultsDiv = document.getElementById('friendResults');
  resultsDiv.innerHTML = `<h2>Friends in ${myStateInput}</h2>` + 
    (topMatches.map(user => `
      <div class="friend-card">
        <img class="cat-avatar" src="https://cataas.com/cat?width=250&height=250&${Math.random()}" alt="Cat Avatar">
        <div class="friend-info">
          <p><strong>${user.name}</strong> (${user.github_login})</p>
          <p>Title: ${user.title}</p>
          <p>State: ${user.state}</p>
          <p><a href="https://github.com/${user.github_login}" target="_blank">View GitHub Profile</a></p>
        </div>
      </div>
    `).join(''));

  if (topMatches.length === 0) {
    resultsDiv.innerHTML = `<p>No friends found in ${myStateInput}.</p>`;
  }
}
