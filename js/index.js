// GitHub User Search App
const resultContainer = document.getElementById('resultContainer');
// let username = 'octocat'; // default user

// ToDo: Add call at page load to fetch default github data - octocat
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

/* 
  Debugging notes:
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
*/

const fetchUserData = async (username) => {
  // fetch data from github api
  try {
    const res = await fetch(`https://api.github.com/users/${username}`);
    const data = await res.json();
    console.log(data);
  } catch (error) {
    console.error('Error fetching data:', error);
    displayUserInfo(data)
  }
}

async function fetchGitHubUser(username) {
  // fetch data from github api
  try {
    const res = await fetch(`https://api.github.com/users/${username}`);
    if (!res.ok) {
      throw new Error('User not found');
    }
    const data = await res.json();
    console.log(data);
    renderUserData(data);
  } catch (error) {
    console.error('Error fetching data:', error);
    // ToDo: add error message to html-gnerator function call
  }
}

// ToDo: Add utility functions: formatDate, validateUrl - add to utils.js

// Format date to '25 Jan 2011' format
function formatDate(dateString) {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, '0'); // Add leading zero if needed
  const month = date.toLocaleString('default', { month: 'short' });
  const year = date.getFullYear();
  return `${day} ${month} ${year}`;
}

// Render User Avatar
function renderUserAvatar(avatar_url, name) {
  const avatar = document.getElementById('gh-user__avatar');
  avatar.src = avatar_url;
  avatar.alt = `User avatar for ${name}`;
}

// Render username 
// ToDo: separate name and handle link 
function renderUserName(name, login, html_url) {
  const userName = document.getElementById('gh-user__name');
  userName.textContent = name || 'Anonymous Github User';
  const userHandle = document.getElementById('gh-user__handle');
  userHandle.href = html_url;
  userHandle.textContent = `@${login}`;
}

// Render user joined data
function renderUserJoinedDate(created_at) {
  const userDate = document.getElementById('gh-user__date');
  userDate.textContent = `Joined ${formatDate(created_at)}`;
}

// Render user bio 
function renderUserBio(bio) {
  const userBio = document.getElementById('gh-user__bio');
  userBio.textContent = bio || 'This user profile has no bio';
}

// Render user meta data 
function renderUserMetadata(public_repos, followers, following) {
  const userRepos = document.getElementById('gh-user__repos');
  const userFollowers = document.getElementById('gh-user__followers');
  const userFollowing = document.getElementById('gh-user__following');
  userRepos.textContent = public_repos || '0';
  userFollowers.textContent = followers || '0';
  userFollowing.textContent = following || '0';
}

// Render user location
function renderUserLocation(location) {
  const userLocation = document.getElementById('gh-user__location');
  userLocation.textContent = location || 'Not specified';
}

// Render user website
function renderUserWebsite(blog) {
  const userWebsite = document.getElementById('gh-user__website');
  userWebsite.textContent = blog || 'Not specified';
}

// Render user twitter
function renderUserTwitter(twitter_username) {
  const userTwitter = document.getElementById('gh-user__twitter'); 
  userTwitter.textContent = twitter_username || 'Not specified';
  // ToDo: update href for twitter/x link
  userTwitter.href = twitter_username ? `https://twitter.com/${twitter_username}` : '#'; // ToDo: validate url
}

// Render user company
function renderUserCompany(company) {
  const userCompany = document.getElementById('gh-user__company');
  userCompany.textContent = company || 'Not specified';
}


// Render user card with data
// ToDo: render data by calling various functions
async function renderUserData(data) {
  try {
    const { avatar_url, name, login, html_url, created_at, bio, public_repos, followers, following, location, twitter_username, blog, company } = await data;
    renderUserAvatar(avatar_url, name);
    renderUserName(name, login, html_url);
    renderUserJoinedDate(created_at);
    renderUserBio(bio);
    renderUserMetadata(public_repos, followers, following);
    renderUserLocation(location);
    renderUserWebsite(blog);
    renderUserTwitter(twitter_username);
    renderUserCompany(company);
  } catch (error) {
    console.error('Error rendering user data:', error);
  }
}

document.getElementById('searchForm').addEventListener('submit', function (e) {
  e.preventDefault();
  console.log('Form submitted!');
  const username = document.getElementById('search-input').value.trim();
  if (username) {
    fetchGitHubUser(username);
  }
  // Clear input field after submission
  username.value = '';
});

// Load default user on initial page load
window.addEventListener('DOMContentLoaded', () => {
  fetchGitHubUser('octocat');
});



// *** Legacy code - to be removed after testing *** //
// function renderUserCard(data){
//   const { avatar_url, name, login, html_url, created_at, bio, public_repos, followers, following, location, twitter_username, blog, company } = data;
//   const userCard = document.createElement('div');
//   userCard.className = 'card gh-results-grid';

//   userCard.innerHTML = `
//     <div class="gh-info__image">
//       <img src=${avatar_url} alt="${login}'s avatar" class="gh-user__avatar">
//     </div>

//     <div class="gh-info__header">
//       <div class="user-name-container">
//         <h2 class="gh-user__name fw-700">${name || 'no name available'}</h2>
//         <a href="${html_url}" target="_blank" class="gh-user__link fw-400">@${login}</a>
//       </div>
//       <p id="gh-user__date" class="gh-user__date">Joined ${formatDate(created_at)}</p>
//     </div>
  
//     <div class="gh-info__bio">
//       <p class="gh-user__bio">${bio || 'No bio available'}</p>
//     </div>

//     <div class="gh-info__data">

//       <div class="gh-user__meta">
//         <div class="meta-col">
//           <h4 class="fw-400">Repos</h4>
//           <span class="meta-result fw-700">${public_repos}</span>
//         </div>
//         <div class="meta-col">
//           <h4 class="fw-400">Followers</h4>
//           <span class="meta-result fw-700">${followers}</span>
//         </div>
//         <div class="meta-col">
//           <h4 class="fw-400"> Following</h4>
//           <span class="meta-result fw-700">${following}</span>
//         </div>
//       </div>

//       <ul class="gh-user__contact-list">
//         <li class="gh-contact__list-item location">
//           <img src="./assets/icon-location.svg" alt="icon" class="icon-contact">
//           ${location || 'Not specified'}
//         </li>
//         <li class="gh-contact__list-item website">
//           <img src="./assets/icon-website.svg" alt="icon" class="icon-contact">
//           ${blog || 'Not specified'})}
//         </li>
//         <li class="gh-contact__list-item twitter">
//           <img src="./assets/icon-twitter.svg" alt="icon" class="icon-contact">
//           ${twitter_username || 'Not specified'}
//         </li>
//         <li class="gh-contact__list-item company">
//           <img src="./assets/icon-company.svg" alt="icon" class="icon-contact">
//           ${company || 'Not specified'})}
//         </li>
//       </ul>
//     </div>
//   `
//   resultContainer.appendChild(userCard);
// }

