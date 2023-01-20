
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

  const {avatar_url, name, login, html_url, created_at, bio, public_repos, followers, following, location, twitter_username, blog, company } = data;

  const resultsHeader = document.querySelector('.user-info__header');

  resultsHeader.innerHTML = `

      <img src="${avatar_url}" alt="" id="user-avatar" class="user-avatar">
      <div class="user-meta">
        <div class="user-name-container">
          <h2 id="user-name" class="user-name fw-700">${name}</h2>
          <a href="${html_url}" target="_blank" id="user-github__link" class="user-github__link fw-400">@${login}</a>
        </div>
        <p>Joined <span id="user-joined__date">Joined ${created_at}</span></p>
      </div>

  
  
  `

  // const userAvatar = document.querySelector('#user-avatar');
  // const userName = document.querySelector('#user-name');
  // const userLink = document.querySelector('#user-github__link');
  // const userJoined = document.querySelector('#user-joined__date');



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