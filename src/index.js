// HEADER
const body = document.body;

const darkThemeButton = document.querySelector('.checkbox');

const libraryButton = document.querySelector('.header-library-button');

const headerBottomButtonsContainer = document.querySelector(
  '.header-bottom-buttons-container'
);

const headerWatchedButton = document.querySelector('.header-watched-button');

const headerClearWatchedButton = document.querySelector(
  '.header-clear-watched-button'
);

const headerQueuedButton = document.querySelector('.header-queue-button');

const headerClearQueuedButton = document.querySelector(
  '.header-clear-queue-button'
);

libraryButton.addEventListener('click', ev => {
  headerBottomButtonsContainer.classList.toggle('is-hidden');
});

darkThemeButton.addEventListener('click', ev => {
  var isChecked = darkThemeButton.checked;

  if (isChecked) {
    body.style.backgroundColor = 'var(--gray)';
  } else {
    body.style.backgroundColor = 'var(--white)';
  }
});

headerWatchedButton.addEventListener('click', ev => {
  headerClearWatchedButton.classList.toggle('is-hidden');
  if (headerClearQueuedButton.classList.contains('is-hidden')) {
    return;
  } else {
    headerClearQueuedButton.classList.toggle('is-hidden');
  }
});

headerQueuedButton.addEventListener('click', ev => {
  headerClearQueuedButton.classList.toggle('is-hidden');
  if (headerClearWatchedButton.classList.contains('is-hidden')) {
    return;
  } else {
    headerClearWatchedButton.classList.toggle('is-hidden');
  }
});

// HERO

// Descris în documentație
import SimpleLightbox from 'simplelightbox';
// Import suplimentar de stil
import 'simplelightbox/dist/simple-lightbox.min.css';

import axios from 'axios';

var _ = require('lodash');

const fetch = require('node-fetch');

const heroList = document.querySelector('.hero-list');

let page = 1;

// const url =
//   `https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=${page}`;

// const url =
//   `https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=${page}`;

const genresApiUrl = `https://api.themoviedb.org/3/genre/movie/list?language=en&page=${page}`;

// const url = 'https://api.themoviedb.org/3/keyword/keyword_id';

const trendingMoviesUrl = `https://api.themoviedb.org/3/trending/movie/day?language=en-US&page=${page}`;

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MDA4MGZmMTg0Y2FiZWJkZjFiNDJlYWE4OGZiNTczOCIsInN1YiI6IjY2NjAyNTUwN2MwMjgyZWYzMDRmNjAxOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.-GiosJEhvb8JZPRVsDWYKnyMuBuXM_jJXaHMa3NkslY',
  },
};

fetch(trendingMoviesUrl, options)
  .then(res => res.json())
  .then(res => {
    console.log(res);
    console.log(res.results);
    const movies = res.results;
    movies.map(element => {
      renderCards(element);
    });

    const heroImagesLink = document.querySelectorAll('.hero-cards-link');
    console.log(heroImagesLink);

    heroImagesLink.forEach(link => {
      const linkImage = link.querySelector('.hero-cards-image');
      // console.log(linkImage);

      link.addEventListener('click', ev => {
        ev.preventDefault();

        console.log(linkImage.src);
        console.log(link.href);

        linkImage.src = link.href;

        // setting the modal window gallery using the SimpleLightbox library and adding "alt" caption title on bottom with 250 ms delay
        let gallery = new SimpleLightbox(`.gallery a`, {
          captionsData: 'alt',
          captionDelay: 250,
        });
      });
    });
  })
  .catch(err => console.error('error:' + err));

function renderCards(params) {
  const heroCardListItem = document.createElement('li');
  heroCardListItem.setAttribute('class', 'film-li item');
  heroCardListItem.setAttribute('data-movie-id', `${params.id}`);
  heroList.append(heroCardListItem);

  const heroLink = document.createElement('a');
  heroLink.setAttribute(
    'href',
    `https://image.tmdb.org/t/p/w342/${params.poster_path}`
  );
  heroLink.setAttribute('class', `hero-cards-link`);

  heroCardListItem.append(heroLink);

  const img = document.createElement('img');
  img.setAttribute(
    'src',
    `https://image.tmdb.org/t/p/w342/${params.backdrop_path}`
  );
  img.setAttribute('class', `hero-cards-image`);
  img.setAttribute('alt', `${params.media_type}`);
  img.setAttribute('loading', `lazy`);
  img.setAttribute('loading', `lazy`);
  // console.log(img);

  heroLink.append(img);

  const heroCardDetails = document.createElement('div');
  heroCardDetails.setAttribute('class', 'hero-movie-details-container');
  heroCardDetails.setAttribute('data-movie-id', `${params.id}`);

  heroCardListItem.append(heroCardDetails);

  const heroMovieTitle = document.createElement('h3');
  heroMovieTitle.setAttribute('class', 'hero-movie-title');
  heroMovieTitle.textContent = `${params.title}`;

  heroCardDetails.append(heroMovieTitle);

  const heroMovieGenresList = document.createElement('ul');
  heroMovieGenresList.setAttribute('class', 'hero-movie-genres-list');

  heroCardDetails.append(heroMovieGenresList);

  const movieGenres = params.genre_ids;
  // console.log(movieGenres);

  movieGenres.forEach(element => {
    // console.log(element);
    const heroMovieGenresListItem = document.createElement('li');
    heroMovieGenresListItem.setAttribute(
      'class',
      'hero-movie-genres-list-item'
    );

    fetch(genresApiUrl, options)
      .then(res => res.json())
      .then(res => {
        const genresArray = res.genres.map(x => {
          if (x.id === element) {
            heroMovieGenresListItem.textContent = `${x.name},`;
          }
        });
      })
      .catch(err => console.error('error:' + err));

    heroMovieGenresList.append(heroMovieGenresListItem);
  });

  setTimeout(heroCommaRemove, 2000);

  function heroCommaRemove() {
    let heroLastItem = heroMovieGenresList.lastChild;

    let heroLastChild = heroLastItem.textContent;

    heroLastItem.textContent = heroLastChild.slice(0, -1);
  }

  const date = params.release_date;
  const year = date.slice(0, 4);
  const yearCard = document.createElement('span');
  yearCard.setAttribute('class', 'hero-year-span');
  yearCard.textContent = `| ` + year;
  heroCardDetails.append(yearCard);

  // console.log(params.vote_count);
  const votes = document.createElement('span');
  votes.setAttribute('class', 'hero-votes-span');
  votes.textContent = ` |  ` + params.vote_count;
  heroCardDetails.append(votes);

  // console.log(heroList);
}

const heroImagesLink = document.querySelectorAll('.hero-cards-link');
console.log(heroImagesLink.length);

heroImagesLink.forEach(link => {
  const linkImage = document.querySelector('.hero-cards-image');
  console.log(linkImage);

  link.addEventListener('click', ev => {
    ev.preventDefault();

    console.log(linkImage.src);
    console.log(link.href);

    linkImage.src = link.href;

    // setting the modal window gallery using the SimpleLightbox library and adding "alt" caption title on bottom with 250 ms delay
    let gallery = new SimpleLightbox(`.gallery a`, {
      // captionsData: 'alt',
      // captionDelay: 250,
    });
  });
});

// PAGE-CHANGER

// PAGE-UP
const pageUp = document.querySelector('.page-up');
// const scrollTo = document.querySelector('#scroll-to');

window.addEventListener('scroll', () => {
  const scrolledTo = window.scrollY + window.innerHeight;

  // const isReachBottom = body.scrollHeight <= scrolledTo;
  if (window.scrollY < scrolledTo / 3) {
    pageUp.classList.add('is-hidden');
  }
  if (window.scrollY >= scrolledTo / 3) {
    pageUp.classList.toggle('is-hidden');
  }
});

// FOOTER
