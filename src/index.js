
import Notiflix from 'notiflix';
import { heroLoad } from './apiKey';
//const fetch = require('node-fetch');
const url = 'https://api.themoviedb.org/3/configuration';
const heroRefs = {
  heroFilmsList: document.querySelector('.hero-films-list'),
  heroPaginationList: document.querySelector('.hero-pagination-list'),
  heroMessageList: document.querySelector('.hero-films-message'),

};


  
//function getFilms(hits) {
//     const markUp = hits
//         .map(item => {
//       return `<div class="hero-photo-card">
//             <a href ="${item.options.base_url}">
//   <img src="${item.options.secure_base_url}" alt="${item.options.change_keys[3]}" width = "${item.options.backdrop_sizes}
// " loading="lazy" />
//                 </a>
//   <div class="hero-film-info">
//     <p class="hero-info-item">
//       <b>Title</b> </br> ${item.options.change_keys[0]}</p>
//     <p class="hero-info-item">
//       <b>Genre</b> </br> ${item.options.change_keys[19]}</p>
//     <p class="hero-info-item">
//       <b>Released</b></br> ${item.options.change_keys[37]}</p>
//       </div>
// </div>`;
//     })
//     .join('');
//   filmsGallery.insertAdjacentElement('beforeend', markUp);
// }

// getFilms();

const heroPathForImg = 'https://image.tmdb.org/t/p/w342/';
const heroImgDefault = './images/default-opt.jpg';
export default {
  additemList(listFilms, detalsFilm) {
    if (!listFilms || !listFilms.length) {
      Notiflix.Notify.warning(`Error Warning There is no film list!`);

      heroRefs.heroFilmsList.innerHTML = '';
      heroRefs.heroPaginationList.innerHTML = '';
      return;
    }
    const resultForMarkup = listFilms.map(elem => {
      const genresFilm = detalsFilm.find(item => item.id === elem.id).genres;

      const genres = genresFilm.length > 2 ? [...genresFilm.slice(0, 2), { id: 999, name: 'Other' }] : genresFilm.length
        ? genresFilm : [...genresFilm.slice(0, 2), { id: 998, name: 'N/A' }];
      return {
        ...elem,
        poster_path: elem.poster_path
          ? heroPathForImg + elem.poster_path
          : false,
        release_date: elem.release_date ? elem.release_date.slice(0, 4) : 'N/A',
        genres,
      };
    });
 
    heroRefs.heroFilmsList.innerHTML = '';
    heroRefs.heroFilmsList.insertAdjacentHTML('beforeend', filmCard(resultForMarkup));

  },
  addLibraryList(listFilms) {
    if (!listFilms || !listFilms.length) {
      heroRefs.heroFilmsList.innerHTML = '';
      heroRefs.heroPaginationList.innerHTML = '';
      const heroNameLibrary = heroLoad('currentRequest');
      heroRefs.heroMessageList.classList.remove('is-hidden');
      Notiflix.Notify(`Oops! Your "${heroNameLibrary}" library is empty!`);
      return;
    }
    heroRefs.heroMessageList.classList.add('is-hidden');

    const heroResulOfMarkup = listFilms.map(elem => {
      const genres = elem.genres.length > 2 ? [...elem.genres.slice(0, 2), { id: 999, name: 'Other' }] : elem.genres.length
        ? elem.genres : [...elem.genres.slice(0, 2), { id: 998, name: 'N/A' }];
      
      return {
        ...elem, poster_path: elem.poster_path ? heroPathForImg + elem.poster_path : heroImgDefault,
        release_date: elem.release_date ? elem.release_date.slice(0, 4) : 'N/A',
        genres,
      };
    });
    heroRefs.heroFilmsList.innerHTML = '';
    heroRefs.heroFilmsList.insertAdjacentHTML('beforeend',filmCard(resultForMarkup));
  },
};