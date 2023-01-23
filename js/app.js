
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

  const gitHubResults = document.querySelector('.gh-results-grid');
  // Account for null values in data:
  if (bio === null || bio === '') bio = 'This dev has no bio listed.';

  // ToDo: add dynamic alt attribute for user avatar
  gitHubResults.innerHTML = `
    <div class="gh-info__image">
      <img src="${avatar_url}" alt="github user avatar" class="gh-user__avatar">
    </div>

    <div class="gh-info__header">
      <div class="user-name-container">
        <h2 class="gh-user__name fw-700">${name}</h2>
        <a href="${html_url}" target="_blank" class="gh-user__link fw-400">@${login}</a>
      </div>
      <span id="user-joined__date">Joined ${created_at}</span>
    </div>
  
    <div class="gh-info__bio">
      <p class="gh-user__bio">${bio}.</p>
    </div>

    <div class="gh-info__data">

      <div class="gh-user__meta">
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

      <ul class="gh-user__contact-list">
        <li class="gh-contact__list-item location">
          <img src="./assets/icon-location.svg" alt="icon" class="icon-contact">
          ${displayContactItem(location)}
        </li>
        <li class="gh-contact__list-item website">
          <img src="./assets/icon-website.svg" alt="icon" class="icon-contact">
          ${displayContactItem(blog)}
        </li>
        <li class="gh-contact__list-item twitter">
          <img src="./assets/icon-twitter.svg" alt="icon" class="icon-contact">
          ${displayContactItem(twitter_username)}
        </li>
        <li class="gh-contact__list-item company">
          <img src="./assets/icon-company.svg" alt="icon" class="icon-contact">
          ${displayContactItem(company)}
        </li>
      </ul>
    </div>
  `

  // apply proper list item to contact list
  function displayContactItem(item) {
    let html = '';

    switch (item) {
      case null:
      case '':
        html = `<p class="not-available">Not Available</p>`;
        break;
      case location:
      case company:
        html = `<p>${item}</p>`;
        break;
      case blog:
        html = `<a class="contact-link" href="${item}" target="_blank">${item}</a>`;
        break;
      case twitter_username:
        html = `<a class="contact-link" href="https://twitter.com/${item}" id="user-twitter">${item}</a>`
        break;
    }

    return html;  

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