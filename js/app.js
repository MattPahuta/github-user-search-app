
const searchInput = document.querySelector('.search-input');
const searchBtn = document.querySelector('#search-btn');

// assign gitHub user name:
let username = 'octocat';

async function fetchGitHubData() {
  const res = await fetch(`https://api.github.com/users/${username}`);
  const data = await res.json();

  // console.log(data);

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

function displayUserInfo(data) {

  const {avatar_url, name, html_url, created_at, bio, public_repos, followers, following, location, twitter_username, blog, company } = data;

  console.log('Avatar URL: ', avatar_url)
  console.log('User Name: ',  name)
  console.log('Github link: ', html_url)
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
searchBtn.addEventListener('click', fetchGitHubData);