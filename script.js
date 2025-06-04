let users = [];

const states = [
  'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado',
  'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho',
  'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana',
  'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota',
  'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada',
  'New Hampshire', 'New Jersey', 'New Mexico', 'New York',
  'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon',
  'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota',
  'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington',
  'West Virginia', 'Wisconsin', 'Wyoming'
];

// Fill the dropdown on page load
const stateSelect = document.getElementById('stateSelect');
states.forEach(state => {
  const option = document.createElement('option');
  option.value = state;
  option.textContent = state;
  stateSelect.appendChild(option);
});

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
  const selectedState = stateSelect.value;
  if (!selectedState) {
    alert('Please select your state.');
    return;
  }

  if (users.length === 0) {
    alert('No user data loaded.');
    return;
  }

  const myState = selectedState.toLowerCase();

  // Filter users by matching state
  const matchedUsers = users.filter(user => 
    user.state && user.state.toLowerCase() === myState
  );

  // Limit to 5
  const topMatches = matchedUsers.slice(0, 5);

  // Display
  const resultsDiv = document.getElementById('friendResults');
  resultsDiv.innerHTML = `<h2>Friends in ${selectedState}</h2>` + 
    (topMatches.map(user => `
      <div class="friend-card">
        <img class="cat-avatar" src="https://cataas.com/cat?width=250&height=250&${Math.random()}" alt="Cat Avatar" loading="lazy">
        <div class="friend-info">
          <p><strong>${user.name}</strong> (${user.github_login})</p>
          <p>Title: ${user.title}</p>
          <p>State: ${user.state}</p>
          <p><a href="https://github.com/${user.github_login}" target="_blank">View GitHub Profile</a></p>
        </div>
      </div>
    `).join(''));

  if (topMatches.length === 0) {
    resultsDiv.innerHTML = `<p>No friends found in ${selectedState}.</p>`;
  }
}
