// HEADER
// Descris în documentație
import SimpleLightbox from 'simplelightbox';
// Import suplimentar de stil
import 'simplelightbox/dist/simple-lightbox.min.css';

import axios from 'axios';

var _ = require('lodash');

const fetch = require('node-fetch');

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

const headerInput = document.querySelector('.search-form-input');
// console.log(headerInput);

let searchText = null;

// searchText = headerInput.value.replace(/ /g, '%20');
// console.log(searchText);

const headerSearchBtn = document.querySelector('.search-form-button');
// console.log(headerSearchBtn);

let page = 1;

const heroList = document.querySelector('.gallery');

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MDA4MGZmMTg0Y2FiZWJkZjFiNDJlYWE4OGZiNTczOCIsInN1YiI6IjY2NjAyNTUwN2MwMjgyZWYzMDRmNjAxOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.-GiosJEhvb8JZPRVsDWYKnyMuBuXM_jJXaHMa3NkslY',
  },
};

// let findUrl = `https://api.themoviedb.org/3/search/movie?include_adult=true&language=en-US&page=${page}`;

// const searchOptions = {
//   query: searchText,
//   method: 'GET',
//   headers: {
//     accept: 'application/json',
//     Authorization:
//       'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MDA4MGZmMTg0Y2FiZWJkZjFiNDJlYWE4OGZiNTczOCIsInN1YiI6IjY2NjAyNTUwN2MwMjgyZWYzMDRmNjAxOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.-GiosJEhvb8JZPRVsDWYKnyMuBuXM_jJXaHMa3NkslY',
//   },
// };

// const url =
//   'https://api.themoviedb.org/3/search/movie?query=cat%20and%20dog&include_adult=false&language=en-US&page=1';

headerSearchBtn.addEventListener('click', ev => {
  ev.preventDefault();

  headerSearchBtn.disabled = true;
  console.log(headerInput.value);

  headerInput.addEventListener('change', ev => {
    headerSearchBtn.disabled = false;
    console.log('change');
  });

  // if ((headerInput.value = [])) {
  //   headerSearchBtn.disabled = false;
  //   console.log('null');
  //   return;
  // }

  searchText = headerInput.value.replace(/ /g, '%20');
  console.log(searchText);

  let findUrl = `https://api.themoviedb.org/3/search/movie?query=${searchText}&include_adult=true&language=en-US&page=${page}`;
  console.log(findUrl);

  heroList.innerHTML = null;

  fetch(findUrl, options)
    .then(res => res.json())
    .then(res => {
      console.log(findUrl);
      console.log(res);
      console.log(res.results);
      const movies = res.results;

      movies.map(element => {
        renderCards(element);
      });

      const heroImagesLink = document.querySelectorAll('.hero-cards-link');
      // console.log(heroImagesLink);

      heroImagesLink.forEach(link => {
        const linkImage = link.querySelector('.hero-cards-image');
        // console.log(linkImage);

        link.addEventListener('click', ev => {
          ev.preventDefault();

          console.log(linkImage.src);
          console.log(link.href);

          // linkImage.src = link.href;

          // setting the modal window gallery using the SimpleLightbox library and adding "alt" caption title on bottom with 250 ms delay
          let gallery = new SimpleLightbox(`.gallery a`, {
            captionsData: 'alt',
            captionDelay: 250,
          });
        });
      });
    })
    .catch(err => console.error('error:' + err));
});

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

// const url =
//   `https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=${page}`;

// const url =
//   `https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=${page}`;

const genresApiUrl = `https://api.themoviedb.org/3/genre/movie/list?language=en&page=${page}`;

// const options = {
//   method: 'GET',
//   headers: {
//     accept: 'application/json',
//     Authorization:
//       'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MDA4MGZmMTg0Y2FiZWJkZjFiNDJlYWE4OGZiNTczOCIsInN1YiI6IjY2NjAyNTUwN2MwMjgyZWYzMDRmNjAxOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.-GiosJEhvb8JZPRVsDWYKnyMuBuXM_jJXaHMa3NkslY',
//   },
// };

// const url = 'https://api.themoviedb.org/3/keyword/keyword_id';

const trendingMoviesUrl = `https://api.themoviedb.org/3/trending/movie/day?language=en-US&page=${page}`;

fetch(trendingMoviesUrl, options)
  .then(res => res.json())
  .then(res => {
    // console.log(res);
    // console.log(res.results);
    const movies = res.results;
    movies.map(element => {
      renderCards(element);
    });

    const heroImagesLink = document.querySelectorAll('.hero-cards-link');
    // console.log(heroImagesLink);

    heroImagesLink.forEach(link => {
      const linkImage = link.querySelector('.hero-cards-image');
      // console.log(linkImage);

      link.addEventListener('click', ev => {
        ev.preventDefault();

        // console.log(linkImage.src);
        // console.log(link.href);

        // linkImage.src = link.href;

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
  const heroCardListItem = document.createElement('div');
  heroCardListItem.setAttribute('class', 'movie-card item');
  heroCardListItem.setAttribute('data-movie-id', `${params.id}`);
  heroList.append(heroCardListItem);

  const heroLink = document.createElement('a');
  if (params.backdrop_path === null) {
    heroLink.setAttribute(
      'src',
      'https://lascrucesfilmfest.com/wp-content/uploads/2018/01/no-poster-available.jpg'
    );
  } else {
    heroLink.setAttribute(
      'href',
      `https://image.tmdb.org/t/p/original/${params.poster_path}`
    );
  }
  heroLink.setAttribute('class', `hero-cards-link`);

  heroCardListItem.append(heroLink);

  const img = document.createElement('img');
  if (params.backdrop_path === null) {
    img.setAttribute(
      'src',
      'https://lascrucesfilmfest.com/wp-content/uploads/2018/01/no-poster-available.jpg'
    );
  } else {
    img.setAttribute(
      'src',
      `https://image.tmdb.org/t/p/original/${params.backdrop_path}`
    );
  }
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

  // heroCardDetails.append(heroMovieGenresList);

  let movieGenres = params.genre_ids;
  // console.log(movieGenres);

  if (movieGenres.length > 3) {
    // console.log(movieGenres.length);
    movieGenres = movieGenres.slice(0, 2);
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
          res.genres.map(x => {
            if (x.id === element) {
              heroMovieGenresListItem.textContent = `${x.name},`;
            }
          });
        })
        .catch(err => console.error('error:' + err));

      heroMovieGenresList.append(heroMovieGenresListItem);
    });

    const heroGenresOther = document.createElement('li');
    heroGenresOther.setAttribute('class', 'hero-movie-genres-list-item');
    heroGenresOther.textContent = 'Otherr';
    heroMovieGenresList.append(heroGenresOther);
  } else {
    if (movieGenres.length === 0) {
      const heroGenresOther = document.createElement('li');
      heroGenresOther.setAttribute('class', 'hero-movie-genres-list-item');
      heroGenresOther.textContent = 'Otherr';
      heroMovieGenresList.append(heroGenresOther);
    }
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
          res.genres.map(x => {
            if (x.id === element) {
              heroMovieGenresListItem.textContent = `${x.name},`;
            }
          });
        })
        .catch(err => console.error('error:' + err));

      heroMovieGenresList.append(heroMovieGenresListItem);
    });
  }

  setTimeout(heroCommaRemove, 2000);

  function heroCommaRemove() {
    let heroLastItem = heroMovieGenresList.lastChild;
    // console.log(heroLastItem);
    // console.log(heroLastItem.textContent);

    let heroLastChild = heroLastItem.textContent;

    heroLastItem.textContent = heroLastChild.slice(0, -1);
  }

  const date = params.release_date;
  const year = date.slice(0, 4);
  const yearCard = document.createElement('span');
  yearCard.setAttribute('class', 'hero-year-span');
  yearCard.textContent = `| ` + year;
  // heroCardDetails.append(yearCard);

  // console.log(params.vote_count);
  const votes = document.createElement('span');
  votes.setAttribute('class', 'hero-votes-span');
  votes.textContent = params.vote_average;
  // heroCardDetails.append(votes);

  const heroMovieDetailsContainer = document.createElement('div');
  heroMovieDetailsContainer.setAttribute('class', 'hero-details-container');
  heroCardDetails.append(heroMovieDetailsContainer);
  heroMovieDetailsContainer.append(heroMovieGenresList, yearCard, votes);
}

// PAGE-CHANGER

// PAGE-UP
const pageUp = document.querySelector('.page-up');
// const scrollTo = document.querySelector('#scroll-to');

// window.addEventListener('scroll', () => {
//   const scrolledTo = window.scrollY + window.innerHeight;

//   // const isReachBottom = body.scrollHeight <= scrolledTo;
//   if (window.scrollY < scrolledTo / 3) {
//     pageUp.classList.add('is-hidden');
//   }
//   if (window.scrollY >= scrolledTo / 3) {
//     pageUp.classList.toggle('is-hidden');
//   }
// });

// FOOTER
