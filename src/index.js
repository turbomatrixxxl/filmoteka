// import Notiflix from 'notiflix';

const fetch = require('node-fetch');
// const url = 'https://api.themoviedb.org/3/configuration';

const heroRefs = {
  heroFilmsList: document.querySelector('.hero-films-list'),
  heroPaginationList: document.querySelector('.hero-pagination-list'),
  heroMessageList: document.querySelector('.hero-films-message'),
};

const urlImg = 'http://image.tmdb.org/t/p/w500';
const urlGenres = 'https://api.themoviedb.org/3/genre/movie/list?language=en';

const url =
  'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc';
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3NWIyM2Q3ZGY4MTY5YTRmYTJlNmY5YjAzYjZmZGY1OCIsInN1YiI6IjY2NjQ0ODdiM2ZiNTViYmExODA5ZWQ5YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.KeSc5hLobWtGaw46ZiucUM4d-MwlPh_Hd_I9wfwm5gw',
  },
};

// {
//     "adult": false,
//     "backdrop_path": "/fqv8v6AycXKsivp1T5yKtLbGXce.jpg",
//     "genre_ids": [
//         878,
//         12,
//         28
//     ],
//     "id": 653346,
//     "original_language": "en",
//     "original_title": "Kingdom of the Planet of the Apes",
//     "overview": "Several generations in the future following Caesar's reign, apes are now the dominant species and live harmoniously while humans have been reduced to living in the shadows. As a new tyrannical ape leader builds his empire, one young ape undertakes a harrowing journey that will cause him to question all that he has known about the past and to make choices that will define a future for apes and humans alike.",
//     "popularity": 3327.202,
//     "poster_path": "/gKkl37BQuKTanygYQG1pyYgLVgf.jpg",
//     "release_date": "2024-05-08",
//     "title": "Kingdom of the Planet of the Apes",
//     "video": false,
//     "vote_average": 6.815,
//     "vote_count": 1032
// }

function getFilms(hits, genresLabels) {
  console.log(hits);

  const markUp = hits
    .map(item => {
      return `<div class="hero-photo-card">
            
  <img src="${urlImg}${item.poster_path}" alt="${item.title}"  class="hero-img"
" loading="lazy" />
                
  <div class="hero-film-info">
    <p class="hero-info-item-title">
       ${item.title}
      </p>
    
    <p class="hero-info-item-genre">
      <b>Genre</b> ${item.genre_ids
        .map(id => genresLabels[id] + ' ')
        .slice(0, 2)}
      </p>
    <p class="hero-info-item-release">
       ${item.release_date}
      </p>      
      <div>
      </div>
      <button class="hero-button-watched" type= submit>Add to Watched</button>
      <button class= "hero-button-queue" type = submit>Add to queue</button>
      </div>
</div>`;
    })
    .join('');
  heroRefs.heroFilmsList.innerHTML = markUp;
}

var promises = [url, urlGenres].map(url =>
  fetch(url, options).then(res => res.json())
);
Promise.all(promises).then(([movies, genresdata]) => {
  const genresLabels = [];
  genresdata.genres.forEach(element => {
    genresLabels[element.id] = element.name;
  });
  if (movies.success === false) {
    heroRefs.heroMessageList.innerHTML = movies.status_message;
  } else {
    getFilms(movies.results, genresLabels);
  }
});
