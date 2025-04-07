
  // Render user card
  function createUserCardMarkup(data) {
    resultContainer.innerHTML = ''; // Clear previous results
    // Create user card element
    const card = document.createElement('div');
    card.className = 'user-card gh-results-grid';
    // User avatar
    const avatarContainer = document.createElement('div');
    avatarContainer.className = 'gh-info__image';
    const avatar = document.createElement('img');
    avatar.className = 'gh-user__avatar';
    avatar.src = data.avatar_url;
    avatar.alt = `${data.login}'s avatar`;
    avatarContainer.appendChild(avatar);
    // User name and handle header/container
    const info = document.createElement('div');
    info.className = 'gh-info__header';
    const nameContainer = document.createElement('user-name-container');
    nameContainer.className = 'user-name-container';
    info.appendChild(nameContainer);
    // user name and handle
    const name = document.createElement('h2');
    name.textContent = data.name || 'No name available';
    name.className = 'gh-user__name fw-700';
    const handle = document.createElement('a');
    handle.className = 'gh-user__link';
    handle.href = data.html_url;
    handle.target = '_blank';
    handle.innerHTML = `@${data.login}`;
    nameContainer.append(name, handle);
    // user joined date 
    const joinedDate = document.createElement('p');
    joinedDate.classList.add('joined-date');
    joinedDate.innerHTML = `Joined ${formatDate(data.created_at)}`;
    info.appendChild(joinedDate);
    // user bio
    const bioContainer = document.createElement('div');
    bioContainer.className = 'bio-container gh-info__bio';
    const bio = document.createElement('p');
    bio.className = 'gh-user__bio';
    bio.textContent = data.bio || 'No bio available';
    bioContainer.appendChild(bio);
    card.appendChild(bioContainer);
    // user data
    const dataContainer = document.createElement('div');
    dataContainer.className = 'gh-info__data';
    // repos, followers, following
    const metaData = document.createElement('div');
    metaData.className = 'gh-user__meta';

    const joined = document.createElement('p');
    joined.innerHTML = `<strong>Joined:</strong> ${formatDate(data.created_at)}`;

    const repos = document.createElement('p');
    repos.innerHTML = `<strong>Public Repos:</strong> ${data.public_repos}`;

    const followers = document.createElement('p');
    followers.innerHTML = `<strong>Followers:</strong> ${data.followers}`;

    const location = document.createElement('p');
    location.innerHTML = `<strong>Location:</strong> ${data.location || 'Not specified'}`;

    const company = document.createElement('p');
    company.innerHTML = `<strong>Company:</strong> ${data.company || 'Not specified'}`;

    info.append(name, handle, bio, joined, repos, followers, location, company);
    card.append(avatar, info);
    resultContainer.appendChild(card);
  }
