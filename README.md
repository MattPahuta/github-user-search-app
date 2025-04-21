# Frontend Mentor - GitHub user search app solution

This is a solution to the [GitHub user search app challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/github-user-search-app-Q09YOgaH6). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Useful resources](#useful-resources)
- [Author](#author)
- [Acknowledgments](#acknowledgments)

## Overview

### The challenge

Users should be able to:

- View the optimal layout for the app depending on their device's screen size
- See hover states for all interactive elements on the page
- Search for GitHub users by their username
- See relevant user information based on their search
- Switch between light and dark themes
- **Bonus**: Have the correct color scheme chosen for them based on their computer preferences. _Hint_: Research `prefers-color-scheme` in CSS.

### Screenshot

![](./screenshot.jpg)

### Links

- Solution URL: [Add solution URL here](https://your-solution-url.com)
- Live Site URL: [Add live site URL here](https://your-live-site-url.com)

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- CSS Grid
- Mobile-first workflow
- Vanilla JavaScript

### What I learned

Project Notes
- Slight update to base colors from design for better A11Y contrast ratio
- Repositioned alert dialogs for better A11Y compliance

I initially marked up and styled the GitHub User's metadata section using grid and a series of divs before realizing this is very clearly tabular data and a perfect use case for a `table` element. This revision from my initial code was part of an overall re-focus on realigning the app with accessbility best practices.

```html
<table class="gh-info__table">
  <caption class="visually-hidden">
    User's total repos, followers, and Github users followed
  </caption>
  <thead>
    <tr class="">
      <th scope="col" class="gh-info__table-header">Repos</th>
      <th scope="col" class="gh-info__table-header">Followers</th>
      <th scope="col" class="gh-info__table-header">Following</th>
    </tr>
  </thead>
  <tbody>
    <tr class="">
      <td class="gh-info__table-item">8</td>
      <td class="gh-info__table-item">3938</td>
      <td class="gh-info__table-item">9</td>
    </tr>
  </tbody>
</table>
```

Styling to match the design comp was easier by simply changing the table's display to grid, but I decided to the convenience wasn't enough to justify losing the table's native semantics. Overall, these felt like some pretty modest styles to get the job done.

```css
.gh-info__table {
  table-layout: fixed;
  width: 100%;
  border-collapse: collapse;
  border-radius: var(--radius-100);
  background: var(--clr-offwhite);
}

.gh-info__table th {
  padding-block-start: var(--spacing-125);
  padding-inline: 0;
  font-size: var(--fs-200);
  font-weight: 400;
}

.gh-info__table th:first-of-type,
.gh-info__table td:first-of-type {
  padding-inline-start: var(--spacing-075);
}

.gh-info__table th:last-of-type,
.gh-info__table td:last-of-type {
  padding-inline-end: var(--spacing-075);
}

.gh-info__table td {
  padding-block: var(--spacing-075) var(--spacing-125);
  text-align: center;
  font-size: var(--fs-600);
  font-weight: 700;
  line-height: 1.1;
  color: var(--clr-lm-dark);
}
```

I set out to make the functions as generic as possible,

```js
const proudOfThisFunc = () => {
  console.log('🎉');
};
```

If you want more help with writing markdown, we'd recommend checking out [The Markdown Guide](https://www.markdownguide.org/) to learn more.

### Useful resources

- [Example resource 1](https://www.example.com) - This helped me for XYZ reason. I really liked this pattern and will use it going forward.
- [Beautiful focus outlines](https://medienbaecker.com/articles/focus-outlines) - Great article on creating good looking and accessible focus outlines for interactive elements. Tried some of the approaches in this project.

## Author

- Frontend Mentor - [@MattPahuta](https://www.frontendmentor.io/profile/MattPahuta)
- Twitter - [@MattPahuta](https://twitter.com/MattPahuta)

## Acknowledgments

I'd like to give thanks to the folks over at Skillcrush, where I've learned so much over the years. One of the final projects in their JavaScript course is a similar GitHub Repo Gallery project that also uses the GitHub API to dynamically search and populate content. It was a fantastic primer for this Frontend Mentor challenge.
