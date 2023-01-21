
const searchInput = document.querySelector('.search-input');
const searchBtn = document.querySelector('#search-btn');

// assign gitHub user name:
// let username = searchInput.value;

// ToDo: Add call at page load to fetch default github data - octocat

async function fetchGitHubData(devname) {

  // username = searchInput.value;

  const res = await fetch(`https://api.github.com/users/${devname}`);
  const data = await res.json();

  console.log(data);

  // *** data needed: 
  // *********************************
  // data.avatar_url => avatar img src
  // data.name
  // data.html_url => gitHub handle ('@' + data.login, href="{html_url}")
  // data.created_at => 'Joined' => format date properly
  // data.bio 
  // data.public_repos
  // data.followers
  // data.following
  // data.location
  // data.twitter_username
  // data.blog 
  // data.company
  displayUserInfo(data)
}

// handle html for data returned from fetchGitHubData function
function displayUserInfo(data) {

  let {avatar_url, name, login, html_url, created_at, bio, public_repos, followers, following, location, twitter_username, blog, company } = data;

  const resultsSection = document.querySelector('.results-section');
  // Account for null values in data:
  if (bio === null) bio = 'This dev has no bio listed.';
  if (location === null) location = 'Not Available';
  if (twitter_username === null) twitter_username = 'Not Available';
  if (company === null) company = 'Not Available';
  if (blog === null) blog = 'Not Available';

  resultsSection.innerHTML = `
    <div class="user-info__header">
      <img src="${avatar_url}" alt="" id="user-avatar" class="user-avatar">
      <div class="user-meta">
        <div class="user-name-container">
          <h2 id="user-name" class="user-name fw-700">${name}</h2>
          <a href="${html_url}" target="_blank" id="user-github__link" class="user-github__link fw-400">@${login}</a>
        </div>
        <span id="user-joined__date">Joined ${created_at}</span>
      </div>
    </div>
  
    <div class="user-info-container">
      <p class="user-bio">${bio}</p>
      <div class="github-meta">
        <div class="meta-col">
          <h4 class="fw-400">Repos</h4>
          <p class="meta-result fw-700">${public_repos}</p>
        </div>
        <div class="meta-col">
          <h4 class="fw-400">Followers</h4>
          <p class="meta-result fw-700">${followers}</p>
        </div>
        <div class="meta-col">
          <h4 class="fw-400"> Following</h4>
          <p class="meta-result fw-700">${following}</p>
        </div>
      </div>
      <ul class="contact-list">
        <li class="contact-list-item location">
          <img src="./assets/icon-location.svg" alt="" class="icon-contact">
          <p id="user-loaction">${location}</p>
        </li>
        <li class="contact-list-item website">
          <img src="./assets/icon-website.svg" alt="" class="icon-contact">
          <a class="contact-link" href="#" id="user-website">${blog}</a>
        </li>
        <li class="contact-list-item twitter">
          <img src="./assets/icon-twitter.svg" alt="" class="icon-contact">
          <a class="contact-link" href="#" id="user-twitter">${twitter_username}</a>
        </li>
        <li class="contact-list-item company">
          <img src="./assets/icon-company.svg" alt="" class="icon-contact">
          <a class="contact-link" href="#" id="user-company">${company}</a>
        </li>
      </ul>
    </div>
  `
  // apply 50% opacity if contact data null
  if (twitter_username === 'Not Available') {
    document.querySelector('.twitter').classList.add('not-available');
  }



  console.log('Avatar URL: ', avatar_url)
  console.log('User Name: ',  name)
  console.log('Github login: ', login)
  console.log('Github link: ', html_url) // github handle
  console.log('Joined Date: ', created_at)
  console.log('Bio: ', bio) // if null, 'This user profile has no bio'
  console.log('Repo Count: ', public_repos)
  console.log('Follower Count:', followers)
  console.log('Following Count:', following)
  console.log('Location:', location) // if null, 'Not Available'
  console.log('Titter: ', twitter_username)
  console.log('Blog: ', blog) // if null, 'Not Available'
  console.log('Company: ', company) // if null, 'Not Available'
}

// event listeners
// searchBtn.addEventListener('click', fetchGitHubData);

searchBtn.addEventListener('click', () => {
  const devname = searchInput.value; // get the text from input
  fetchGitHubData(devname)
  searchInput.value = ''; // clear input after click
})

// Default user on load
fetchGitHubData('octocat')

// searchUser.addEventListener('keyup', (e) => {
//   const userText = e.target.value; // get input text

//   if (userText !== '') {
//     console.log(userText)
//     github.getUser(userText)
//       .then(data => {
//         console.log(data)
//         if (data.profile.message === 'Not Found') {
//           // show alert
//           ui.showAlert('User not found', 'alert alert-danger');
//         } else {
//           // show profile
//           ui.showProfile(data.profile);
//           ui.showRepos(data.repos);
//         }
//       })
//   } else {
//     // clear profile
//     ui.clearProfile();
//   }
// })