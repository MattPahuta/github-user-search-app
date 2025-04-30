// GitHub User Search App
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
const themeToggle = document.getElementById('themeToggle');

const alertMessage = document.getElementById('alertMessage');

// Handle light/dark mode toggle
function toggleTheme() {
  const toggleText = document.getElementById('themeToggleText');
  const moonIcon = document.getElementById('moonIcon');
  const sunIcon = document.getElementById('sunIcon');
  const currentTheme = document.documentElement.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

  // Toggle button text and icons
  toggleText.textContent = newTheme === 'dark' ? 'Light' : 'Dark';
  moonIcon.classList.toggle('visually-hidden', newTheme === 'dark');
  sunIcon.classList.toggle('visually-hidden', newTheme === 'light');

  document.documentElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
  console.log(`Theme changed to: ${newTheme}`);
}

themeToggle.addEventListener('click', toggleTheme);

function renderAlert(message = 'Something went wrong') {
  alertMessage.textContent = message;
  console.log(`Rendering alert: ${message}`);
}

async function fetchGitHubUser(username) {
  // fetch data from github api
  try {
    const res = await fetch(`https://api.github.com/users/${username}`);

    if (res.ok) {
      const data = await res.json();
      console.log(data);
      renderUserData(data);
    } else if (res.status === 404 && !res.ok) {
      console.log('404 error...')
      renderAlert('No results');
      // throw new Error('User not found');
    } else if (res.status === 403 && !res.ok) {
      console.log('403 error...')
      renderAlert('API rate limit exceeded');
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    renderAlert();
  }
}

// ToDo: Add utility functions: formatDate, validateUrl - add to utils.js
// ToDo: Simplify this validation function
function validateUrl(url) {
  // Check if the URL is valid
  const pattern = new RegExp(
    '^(https?:\\/\\/)?' + // protocol
    '((([a-zA-Z\\d]([a-zA-Z\\d-]*[a-zA-Z\\d])*)\\.)+[a-zA-Z]{2,}|' + // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-zA-Z\\d%_.~+]*)*' + // port and path
    '(\\?[;&a-zA-Z\\d%_.~+=-]*)?' + // query string
    '(\\#[-a-zA-Z\\d_]*)?$', // fragment locator
    'i'
  );
  return pattern.test(url);

}

// console.log(validateUrl('https://github.com')); // true
// console.log(validateUrl('invalid-url')); // false 
// console.log(validateUrl('htp://google.com')); // false
  

// Format date to '25 Jan 2011' format
function formatDate(dateString) {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, '0'); // Add leading zero if needed
  const month = date.toLocaleString('default', { month: 'short' });
  const year = date.getFullYear();
  return `${day} ${month} ${year}`;
}

// Create HTML anchor element
function createAnchorElement(href, text) {
  const aElement = document.createElement('a');
  aElement.href = href;
  aElement.target = '_blank';
  aElement.textContent = text;
  aElement.classList.add('contact-link');
  return aElement;
}

// Render User Avatar
function renderUserAvatar(avatar_url, name) {
  const avatar = document.getElementById('gh-user__avatar');
  avatar.src = avatar_url;
  avatar.alt = `User avatar for ${name}`;
}

// Render username 
function renderUserName(name) {
  const userName = document.getElementById('gh-user__name');
  userName.textContent = name || 'Anonymous Github User';
}

// Render GitHub profile link
function renderUserProfileLink(html_url, login) {
  const userLink = document.getElementById('gh-user__profile');
  userLink.href = html_url;
  userLink.textContent = `@${login}`;
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
  userLocation.textContent = location || 'Not Specified';

  userLocation.parentElement.style.opacity = location ? '1' : '0.6'; // set opacity for <li> tag
}

// Render user website
function renderUserWebsite(blog) {
  const userWebsite = document.getElementById('gh-user__website'); // <span>
  userWebsite.innerHTML = ''; // clear previous <a> tag if exists
  // if blog is invalid, remove the <a> tag from <li> tag
  if (!validateUrl(blog)) {
    // differentiate between an empty string or an invalid url
    // blog === '' ? console.error('No website listed') : console.error('Invalid URL:', blog);
    userWebsite.textContent = 'Not Specified'; // add text content to <span> tag
  } else {
    // if blog is valid, set the text content and href attribute for <a> tag
    const websiteLink = createAnchorElement(blog, blog); // create <a> tag with href and text content
    userWebsite.appendChild(websiteLink); // append <a> tag to <span> tag
  }
  userWebsite.parentElement.style.opacity = validateUrl(blog) ? '1' : '0.6'; // set opacity for <li> tag
}

// Render user twitter
function renderUserTwitter(twitter_username) {
  const userTwitter = document.getElementById('gh-user__twitter'); // <span>
  if (userTwitter.childNodes.length > 0) {
    userTwitter.innerHTML = ''; // clear previous <a> tag if exists
  }
  if (!twitter_username) {
    userTwitter.textContent = 'Not Available'; // add text content to <span> tag
  } else {
    const twitterLink = createAnchorElement(`https://twitter.com/${twitter_username}`, twitter_username); // create <a> tag with href and text content
    userTwitter.appendChild(twitterLink); // append <a> tag to <span> tag
  }
  userTwitter.parentElement.style.opacity = twitter_username ? '1' : '0.6'; // set opacity for <li> tag
}

// Render user company
function renderUserCompany(company) {
  const userCompany = document.getElementById('gh-user__company');
  userCompany.textContent = company || 'Not specified';
  userCompany.parentElement.style.opacity = company ? '1' : '0.6'; // set opacity for <li> tag
}


// Render user card with data
async function renderUserData(data) {
  try {
    const { avatar_url, name, login, html_url, created_at, bio, public_repos, followers, following, location, twitter_username, blog, company } = await data;
    renderUserAvatar(avatar_url, name);
    renderUserName(name);
    renderUserProfileLink(html_url, login);
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
  alertMessage.textContent = ''; // clear any previous errors
  const searchInput = document.getElementById('searchInput');
  const username = searchInput.value.trim();
  if (username) {
    fetchGitHubUser(username);
  }
  // Clear input field after submission
  searchInput.value = '';
});

// Load default user on initial page load
// window.addEventListener('DOMContentLoaded', () => {
//   fetchGitHubUser('octocat');
// });



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

