const filmsGallery = document.querySelector('.hero-films-gallery');
const fetch = require('node-fetch');
const url = 'https://api.themoviedb.org/3/configuration';
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3NWIyM2Q3ZGY4MTY5YTRmYTJlNmY5YjAzYjZmZGY1OCIsInN1YiI6IjY2NjQ0ODdiM2ZiNTViYmExODA5ZWQ5YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.KeSc5hLobWtGaw46ZiucUM4d-MwlPh_Hd_I9wfwm5gw',
  },
};


  
function getFilms(hits) {
    const markUp = hits
        .map(({item}) => {
      return `<div class="hero-photo-card">
            <a href ="${item.base_url}">
  <img src="${item.secure_base_url}" alt="${item.change_keys[3]}" width = "${item.backdrop_sizes}
" loading="lazy" />
                </a>
  <div class="hero-film-info">
    <p class="hero-info-item">
      <b>Title</b> </br> ${item.change_keys[0]}</p>
    <p class="hero-info-item">
      <b>Genre</b> </br> ${item.change_keys[19]}</p>
    <p class="hero-info-item">
      <b>Released</b></br> ${item.change_keys[37]}</p>
      </div>
</div>`;
    })
    .join('');
  filmsGallery.insertAdjacentElement('beforeend', markUp);
}
fetch(url, options)
  .then(res => res.json())
  .then(json => console.log(json))
  .catch(err => console.error('error:' + err));
getFilms();
 //async function logMovies() {
//  const response = await fetch(url,options);
//  const movies = await response.json();
 // console.log("movies", movies);
//}