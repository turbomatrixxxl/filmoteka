//Scroll button
const scrollToTopButton = document.getElementById('scrollToTopButton');

// Show the button when the user scrolls down 100px from the top
window.onscroll = function () {
  if (
    document.body.scrollTop > 100 ||
    document.documentElement.scrollTop > 100
  ) {
    scrollToTopButton.parentElement.style.display = 'block';
  } else {
    scrollToTopButton.parentElement.style.display = 'none';
  }
};

// Scroll to the top of the document when the button is clicked
scrollToTopButton.addEventListener('click', function () {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
});
///////////////

//Library button
const headerLibraryButton = document.querySelector('.library-button');
const headerWatchedButton = document.querySelector('.watched-button');
const headerQueueButton = document.querySelector('.queue-button');
const headerIconTitle = document.querySelector('.icon-title-div');
function isMobile() {
  return window.innerWidth <= 768;
}

headerLibraryButton.addEventListener('click', function (e) {
  headerQueueButton.classList.remove('is-hidden');
  headerWatchedButton.classList.remove('is-hidden');
});
function updateMargin() {
  if (!isMobile()) {
    //Reseteaza daca pagina are width mai mare de 768px
    headerIconTitle.style.marginBottom = '16px';
  }
}
headerLibraryButton.addEventListener('click', function () {
  if (isMobile()) {
    headerIconTitle.style.marginBottom = '74px';
  }
});

window.addEventListener('resize', updateMargin);

updateMargin();
///////////////////////HERO
fetch(trendingMoviesUrl, options)
  .then(res => res.json())
  .then(res => {
    // console.log(res);
    console.log(res.results);
    const movies = res.results;
    movies.map(element => {
      renderCards(element);
    });

    const heroImagesLink = document.querySelectorAll('.hero-cards-link');
    // console.log(heroImagesLink);

    heroImagesLink.forEach(link => {
      // const linkImage = link.querySelector('.hero-cards-image');
      // console.log(linkImage);

      link.addEventListener('click', ev => {
        ev.preventDefault();

        // console.log(ev.target);
        const currentLink = ev.currentTarget;
        // console.log(currentLink);

        const linkSrc = currentLink.href;
        // console.log(linkSrc);
        modalImage.setAttribute('src', linkSrc);

        const linkId = currentLink.getAttribute('id');
        modalImage.setAttribute('id', linkId);

        addRemButtons(
          'queued',
          linkId,
          modalAddToQueueBtn,
          modalRemFromQueueBtn
        );

        addRemButtons(
          'watched',
          linkId,
          modalAddToWatchBtn,
          modalRemFromWatchBtn
        );

        const linkTitle = currentLink.getAttribute('title');
        // console.log(linkTitle);
        modalTitle.textContent = linkTitle;

        const linkVote = currentLink.getAttribute('vote');
        // console.log(linkVote);
        modalVote.textContent = linkVote;

        const linkVotes = currentLink.getAttribute('votes');
        // console.log(linkVotes);
        modalVotes.textContent = linkVotes;

        const linkPopurarity = currentLink.getAttribute('popularity');
        // console.log(linkPopurarity);
        modalPopularity.textContent = linkPopurarity;

        const linkOrigTitle = currentLink.getAttribute('original_title');
        // console.log(linkOrigTitle);
        modalOrigTitle.textContent = linkOrigTitle;

        const linkDescription = currentLink.getAttribute('description');
        // console.log(linkDescription);
        modalDescription.textContent = linkDescription;

        const genres = currentLink.getAttribute('genres');
        // console.log(genres);
        modalGenre.textContent = genres;

        modalWindow.classList.toggle('is-hidden');

        // console.log(linkImage.src);
        // console.log(link.href);

        // linkImage.src = link.href;

        // setting the modal window gallery using the SimpleLightbox library and adding "alt" caption title on bottom with 250 ms delay
        // let gallery = new SimpleLightbox(`.gallery a`, {
        //   captionsData: 'src',
        //   captionDelay: 250,
        //   captionPosition: 'outside',
        //   alertError: false,
        //   captionHTML: false,
        // });
        // console.dir(gallery);
        // console.log(gallery.elements);
        // console.log(gallery.options);
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
      'href',
      'https://lascrucesfilmfest.com/wp-content/uploads/2018/01/no-poster-available.jpg'
    );
  } else {
    heroLink.setAttribute(
      'href',
      `https://image.tmdb.org/t/p/original/${params.poster_path}`
    );
  }

  const genresArr = params.genre_ids;
  // console.log(genresArr.length);
  let genres = [];

  genresArr.forEach(element => {
    fetch(genresApiUrl, options)
      .then(res => res.json())
      .then(res => {
        res.genres.map(x => {
          if (x.id === element) {
            genres.push(x.name);
            heroLink.setAttribute('genres', genres);
          }
        });
      })
      .catch(err => console.error('error:' + err));
  });

  heroLink.setAttribute('genres', genres);

  heroLink.setAttribute('class', `hero-cards-link`);
  heroLink.setAttribute('title', `${params.title}`);
  heroLink.setAttribute('vote', `${params.vote_average}`);
  heroLink.setAttribute('votes', `${params.vote_count}`);
  heroLink.setAttribute('popularity', `${params.popularity}`);
  heroLink.setAttribute('original_title', `${params.original_title}`);
  heroLink.setAttribute('description', `${params.overview}`);
  heroLink.setAttribute('id', params.id);

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
  img.setAttribute('id', params.id);

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
