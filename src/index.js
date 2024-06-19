// SimpleLightbox import
// Descris în documentație
// import SimpleLightbox from 'simplelightbox';
// // Import suplimentar de stil
// import 'simplelightbox/dist/simple-lightbox.min.css';

// Axios import
// import axios from 'axios';

// Lodash import
// var _ = require('lodash');

// Fetch2 import for Api
const fetch = require('node-fetch');

// function navigateTo(path) {
//   // Add a new entry to the history and update the URL
//   history.pushState(null, null, path);
//   // Update the content dynamically based on the selected path
//   updateContent('./index.html');
// }

window.addEventListener('keyup', event => {
  if (event.key === 'Escape') {
    if (modalWindow.classList.contains('is-hidden')) {
      return;
    } else {
      modalWindow.classList.add('is-hidden');
    }
  }
});

// Local storage functions
const save = (key, value) => {
  try {
    const serializedState = JSON.stringify(value);
    localStorage.setItem(key, serializedState);
  } catch (error) {
    console.error('Set state error: ', error.message);
  }
};

const load = key => {
  try {
    const serializedState = localStorage.getItem(key);
    return serializedState === null ? undefined : JSON.parse(serializedState);
  } catch (error) {
    console.error('Get state error: ', error.message);
  }
};

const remove = key => {
  try {
    const serializedState = localStorage.removeItem(key);
    return serializedState === null
      ? undefined
      : JSON.stringify(serializedState);
  } catch (error) {
    console.error('Get state error: ', error.message);
  }
};

function setTheme(theme) {
  if (theme == 'dark') {
    remove('current-theme');
    save('current-theme', 'dark');
    document.documentElement.style.setProperty('--white', '#8c8c8c');
    document.documentElement.style.setProperty('--gray', '#fff');
    document.documentElement.style.setProperty('--light-gray', '#fff');
    document.documentElement.style.setProperty('--red', '#fff');
    document.documentElement.style.setProperty('--footer-bg', '#545454');
    document.documentElement.style.setProperty('--blue', '#b92f2c');

    document.documentElement.style.setProperty('--black', '#fff');
    // alert('dark');
  }
  if (theme == 'light') {
    remove('current-theme');
    save('current-theme', 'light');
    document.documentElement.style.setProperty('--white', '#fff');
    document.documentElement.style.setProperty('--gray', '#545454');
    document.documentElement.style.setProperty('--light-gray', '#8c8c8c');
    document.documentElement.style.setProperty('--red', '#ff6b08');
    document.documentElement.style.setProperty('--footer-bg', '#f7f7f7');
    document.documentElement.style.setProperty('--blue', 'rgb(16, 16, 211)');

    document.documentElement.style.setProperty('--black', '#000');
  }
}

let toggle = document.querySelector('label#toggle');
// console.log(toggle);
let toggleClass = toggle.getAttribute('class');
// console.log(toggleClass);

const darkThemeButton = document.querySelector('.checkbox');

var issChecked = darkThemeButton.checked;
const curentTheme = load('current-theme');

if (
  curentTheme === undefined ||
  issChecked == false ||
  curentTheme.includes('light')
) {
  let toggleClass = toggle.getAttribute('class');

  toggle.classList.remove('switched');
  toggle.classList.add('toggle');
  // console.log(toggleClass);
  console.log(issChecked);

  remove('current-theme');
  save('current-theme', 'light');
  setTheme('light');
  issChecked = false;
}

if (curentTheme.includes('dark') || issChecked == true) {
  toggle.classList.remove('toggle');
  toggle.classList.add('switched');
  // console.log(toggleClass);
  console.log(issChecked);

  remove('current-theme');
  save('current-theme', 'dark');
  setTheme('dark');
  issChecked = true;
}

console.log(issChecked);

const body = document.body;

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

// const paginationContainer = document.querySelector('.pagination');

// searchText = headerInput.value.replace(/ /g, '%20');
// console.log(searchText);

const headerSearchBtn = document.querySelector('.search-form-button');
// console.log(headerSearchBtn);

const headerFormErrorMessage = document.querySelector('.header__error');

const heroList = document.querySelector('.gallery');

const apiKey = '90080ff184cabebdf1b42eaa88fb5738';

const noImageUrl =
  'https://lascrucesfilmfest.com/wp-content/uploads/2018/01/no-poster-available.jpg';

const trendingMoviesUrl = `https://api.themoviedb.org/3/trending/movie/day?language=en-US&page=${currentPage}`;

const genresApiUrl = `https://api.themoviedb.org/3/genre/movie/list?language=en&page=${currentPage}`;

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MDA4MGZmMTg0Y2FiZWJkZjFiNDJlYWE4OGZiNTczOCIsInN1YiI6IjY2NjAyNTUwN2MwMjgyZWYzMDRmNjAxOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.-GiosJEhvb8JZPRVsDWYKnyMuBuXM_jJXaHMa3NkslY',
  },
};

// modal const
const modalWindow = document.querySelector('.modal-window');
console.log(modalWindow);
const modalImage = document.querySelector('.modal-img');
// console.log(modalImage.getAttribute('src'));
const modalTitle = document.querySelector('.modal-title');
const modalVote = document.querySelector('.modal-vote');
const modalVotes = document.querySelector('.modal-votes');
const modalPopularity = document.querySelector('.modal-popularity-result');
const modalOrigTitle = document.querySelector('.modal-original-title-result');
const modalGenre = document.querySelector('.modal-genre-result');
const modalDescription = document.querySelector('.modal-movie-description');
const modalCloseBtn = document.querySelector('.modal-close-button');
modalCloseBtn.addEventListener('click', () => {
  modalWindow.classList.toggle('is-hidden');
});

function isHidden(params) {
  params.classList.add('is-hidden');
}

function remHidden(params) {
  params.classList.remove('is-hidden');
}

function addRemButtons(params, id, addBtn, remBtn) {
  let status = load(`${params}`);
  if (status === undefined) {
    isHidden(remBtn);
    remHidden(addBtn);
  } else {
    // console.log(status);
    if (status.includes(id)) {
      isHidden(addBtn);
      remHidden(remBtn);
    } else {
      isHidden(remBtn);
      remHidden(addBtn);
    }
  }
}

// Watch buttons
// remove('watched');
// remove('queued');
const modalAddToWatchBtn = document.querySelector('.modal-add-to-watched-btn');
const modalRemFromWatchBtn = document.querySelector('.remove-from-watched');

isHidden(modalRemFromWatchBtn);

modalAddToWatchBtn.addEventListener('click', ev => {
  let id = modalImage.getAttribute('id');
  // console.log(id);

  let watched = load('watched');
  // console.log(watched);

  if (watched === undefined || watched.length === 0) {
    save('watched', [id]);
  } else {
    const tru = watched.includes(id);

    if (!tru) {
      watched.push(id);
      save('watched', watched);
      // console.log('it dont has');
    } else {
      console.log('it has');
    }
  }

  isHidden(modalAddToWatchBtn);
  remHidden(modalRemFromWatchBtn);
});

modalRemFromWatchBtn.addEventListener('click', ev => {
  let id = modalImage.getAttribute('id');
  // console.log(id);

  let watched = load('watched');
  // console.log(watched);

  let watchedd = watched.filter(x => x !== id);
  // console.log(watchedd);

  save('watched', watchedd);

  isHidden(modalRemFromWatchBtn);
  remHidden(modalAddToWatchBtn);
});

// Queue buttons
const modalAddToQueueBtn = document.querySelector('.modal-add-to-queue-btn');
const modalRemFromQueueBtn = document.querySelector('.remove-from-queue-btn');

isHidden(modalRemFromQueueBtn);

modalAddToQueueBtn.addEventListener('click', ev => {
  let id = modalImage.getAttribute('id');
  console.log(id);

  let queued = load('queued');
  console.log(queued);

  if (queued === undefined || queued.length === 0) {
    save('queued', [id]);
  } else {
    const tru = queued.includes(id);

    if (!tru) {
      queued.push(id);
      console.log(queued);
      save('queued', queued);
      console.log('it dont has');
    } else {
      console.log('it has');
    }
  }

  isHidden(modalAddToQueueBtn);
  remHidden(modalRemFromQueueBtn);
});

modalRemFromQueueBtn.addEventListener('click', ev => {
  let id = modalImage.getAttribute('id');
  console.log(id);

  let queued = load('queued');
  console.log(queued);

  let queuedd = queued.filter(x => x !== id);
  console.log(queuedd);
  save('queued', queuedd);

  isHidden(modalRemFromQueueBtn);
  remHidden(modalAddToQueueBtn);
});

// Header search form

headerInput.addEventListener('input', ev => {
  if (!headerBottomButtonsContainer.classList.contains('is-hidden')) {
    headerBottomButtonsContainer.classList.add('is-hidden');
  }
  if (headerInput.value.length === 0) {
    headerFormErrorMessage.style.display = 'none';
    console.log('empty');
  }
});

headerInput.addEventListener('change', ev => {
  if (!headerBottomButtonsContainer.classList.contains('is-hidden')) {
    headerBottomButtonsContainer.classList.add('is-hidden');
  }
  headerFormErrorMessage.style.display = 'none';

  headerSearchBtn.disabled = false;
  console.log('change');
});

headerSearchBtn.addEventListener('click', ev => {
  ev.preventDefault();
  if (!headerBottomButtonsContainer.classList.contains('is-hidden')) {
    headerBottomButtonsContainer.classList.add('is-hidden');
  }

  paginationContainer.style.display = 'block';

  headerSearchBtn.disabled = true;

  searchText = headerInput.value.replace(/ /g, '%20');
  // console.log(searchText);

  let findUrl = `https://api.themoviedb.org/3/search/movie?query=${searchText}&include_adult=true&language=en-US&page=${currentPage}`;
  // console.log(findUrl);

  heroList.innerHTML = null;

  fetch(findUrl, options)
    .then(res => res.json())
    .then(res => {
      // console.log(findUrl);
      console.log(res);
      // console.log(res.results);
      const movies = res.results;
      if (movies.length === 0) {
        headerFormErrorMessage.style.display = 'block';
        console.log('not found');
      }
      console.log(res.total_pages);
      console.log(2 <= res.total_pages < 20);
      console.log(res.total_pages <= 1);

      movies.map(element => {
        renderCards(element);
        console.log('search');
      });

      linkListener();

      if (res.total_pages <= 1) {
        paginationContainer.style.display = 'none';
      }
      if (2 <= res.total_pages < 20) {
        totalPages = res.total_pages;
        element.innerHTML = createPagination(totalPages, page);
      }
      if (res.total_pages > 20) {
        page = 1;
        totalPages = 20;
        element.innerHTML = createPagination(totalPages, page);
      }

      paginationContainer.addEventListener('click', ev => {
        // console.log(ev.currentTarget);
        currentPage =
          ev.currentTarget.querySelector('.active>span').textContent;
        console.log(currentPage);
        findUrl = `https://api.themoviedb.org/3/search/movie?query=${searchText}&include_adult=true&language=en-US&page=${currentPage}`;

        heroList.innerHTML = null;
        console.log(findUrl);

        fetch(findUrl, options)
          .then(res => res.json())
          .then(res => {
            // console.log(findUrl);
            console.log(res.total_pages);

            console.log(res.results);
            const movies = res.results;

            // create movies cards
            movies.map(element => {
              renderCards(element);
            });

            linkListener();
          })
          .catch(err => console.error('error:' + err));
      });
    })
    .catch(err => console.error('error:' + err));
});

// setting state of to watched/queue buttons
libraryButton.addEventListener('click', ev => {
  headerBottomButtonsContainer.classList.toggle('is-hidden');
});

// remove('current-theme');

// setting state of to dark theme button
darkThemeButton.addEventListener('click', ev => {
  var isChecked = darkThemeButton.checked;

  if (isChecked) {
    const curentTheme = load('current-theme');
    if (curentTheme === undefined) {
      remove('current-theme');
      toggle.classList.remove('toggle');
      toggle.classList.add('switched');

      save('current-theme', 'dark');
      setTheme('dark');
    }
    toggle.classList.remove('toggle');
    toggle.classList.add('switched');

    remove('current-theme');
    save('current-theme', 'dark');
    setTheme('dark');
  }
  if (!isChecked) {
    const curentTheme = load('current-theme');
    if (curentTheme === undefined) {
      toggle.classList.add('toggle');
      toggle.classList.remove('switch');

      save('current-theme', 'light');
      setTheme('light');
    }
    toggle.classList.add('toggle');
    toggle.classList.remove('switch');

    remove('current-theme');
    save('current-theme', 'light');
    setTheme('light');
  }
});

// let mobileQuerry = window.matchMedia('(max-width: 768px)');
// let tabletQuerry = window.matchMedia('(min-width: 768px)');
// let desktopQuerry = window.matchMedia('(min-width: 1024px)');

// setting state of to watched button and getting watched page
headerWatchedButton.addEventListener('click', ev => {
  heroList.innerHTML = '';
  const moviesIdList = load('watched');

  paginationContainer.style.display = 'none';

  if (moviesIdList === undefined || moviesIdList.length === 0) {
    let emptyListMessage = document.createElement('p');
    emptyListMessage.setAttribute('class', 'empty-list');
    emptyListMessage.textContent = 'Oops ! Your "Watched" library is empty !';

    heroList.append(emptyListMessage);
  } else {
    console.log(moviesIdList);

    const optionsId = {
      headers: {
        Accept: 'application/json',
      },
    };

    // let perPage = 4;
    // page = 1;
    // totalPages = 1;

    // function createPagination(totalPages, page) {
    //   let liTag = '';
    //   let active;
    //   let beforePage = page - 1;
    //   let afterPage = page + 1;
    //   if (page > 1) {
    //     //show the next button if the page value is greater than 1
    //     liTag += `<li class="btn prev" onclick="createPagination(totalPages, ${
    //       page - 1
    //     })"><span><i class="fas fa-angle-left"></i> Prev</span></li>`;
    //   }

    //   if (page > 2) {
    //     //if page value is less than 2 then add 1 after the previous button
    //     liTag += `<li class="first numb" onclick="createPagination(totalPages, 1)"><span>1</span></li>`;
    //     if (page > 3) {
    //       //if page value is greater than 3 then add this (...) after the first li or page
    //       liTag += `<li class="dots"><span>...</span></li>`;
    //     }
    //   }

    //   // how many pages or li show before the current li
    //   if (page == totalPages) {
    //     beforePage = beforePage - 2;
    //   } else if (page == totalPages - 1) {
    //     beforePage = beforePage - 1;
    //   }
    //   // how many pages or li show after the current li
    //   if (page == 1) {
    //     afterPage = afterPage + 2;
    //   } else if (page == 2) {
    //     afterPage = afterPage + 1;
    //   }

    //   for (var plength = beforePage; plength <= afterPage; plength++) {
    //     if (plength > totalPages) {
    //       //if plength is greater than totalPage length then continue
    //       continue;
    //     }
    //     if (plength == 0) {
    //       //if plength is 0 than add +1 in plength value
    //       plength = plength + 1;
    //     }
    //     if (page == plength) {
    //       //if page is equal to plength than assign active string in the active variable
    //       active = 'active';
    //     } else {
    //       //else leave empty to the active variable
    //       active = '';
    //     }
    //     liTag += `<li class="numb ${active}" onclick="createPagination(totalPages, ${plength})"><span>${plength}</span></li>`;
    //   }

    //   if (page < totalPages - 1) {
    //     //if page value is less than totalPage value by -1 then show the last li or page
    //     if (page < totalPages - 2) {
    //       //if page value is less than totalPage value by -2 then add this (...) before the last li or page
    //       liTag += `<li class="dots"><span>...</span></li>`;
    //     }
    //     liTag += `<li class="last numb" onclick="createPagination(totalPages, ${totalPages})"><span>${totalPages}</span></li>`;
    //   }

    //   if (page < totalPages) {
    //     //show the next button if the page value is less than totalPage(20)
    //     liTag += `<li class="btn next" onclick="createPagination(totalPages, ${
    //       page + 1
    //     })"><span>Next <i class="fas fa-angle-right"></i></span></li>`;
    //   }
    //   // console.log(page);
    //   element.innerHTML = liTag; //add li tag inside ul tag
    //   return liTag; //return the li tag
    // }

    // totalPages = Math.ceil(moviesIdList.length / perPage);
    // if (totalPages >= 2) {
    //   element.style.display = 'block';
    //   createPagination(totalPages, page);
    // } else {
    //   element.style.display = 'none';
    // }

    // const startIndex = (currentPage - 1) * perPage;
    // const endIndex = startIndex + perPage;
    // const pageItems = moviesIdList.slice(startIndex, endIndex);

    // pageItems.forEach(movieId => {
    //   const urlApi = `https://api.themoviedb.org/3/movie/${movieId}?&api_key=${apiKey}&language=en-US&page=1`;

    //   fetch(urlApi, optionsId)
    //     .then(res => res.json())
    //     .then(res => {
    //       console.log(res);
    //       const movie = res;

    //       renderWatchQueueCards(movie);
    //     })
    //     .catch(err => console.error('error:' + err));
    // });

    // currentPage = 1;

    // addRemPagination();

    moviesIdList.forEach(movieId => {
      const urlApi = `https://api.themoviedb.org/3/movie/${movieId}?&api_key=${apiKey}&language=en-US&page=1`;

      fetch(urlApi, optionsId)
        .then(res => res.json())
        .then(res => {
          console.log(res);
          const movie = res;

          renderWatchQueueCards(movie);
        })
        .catch(err => console.error('error:' + err));
    });
  }

  // clear watched list
  headerClearWatchedButton.classList.toggle('is-hidden');
  headerClearWatchedButton.addEventListener('click', ev => {
    heroList.innerHTML === null;
    remove('watched');
    let emptyListMessage = document.createElement('p');
    emptyListMessage.setAttribute('class', 'empty-list');
    emptyListMessage.textContent = 'Oops ! Your "Watched" library is empty !';

    heroList.append(emptyListMessage);
  });

  // hidding clear queued button
  if (headerClearQueuedButton.classList.contains('is-hidden')) {
    return;
  } else {
    headerClearQueuedButton.classList.toggle('is-hidden');
  }
});

// setting state of to queued button and getting watched page
headerQueuedButton.addEventListener('click', ev => {
  heroList.innerHTML = null;
  const moviesIdList = load('queued');
  // console.log(moviesIdList);
  paginationContainer.style.display = 'none';

  if (moviesIdList === undefined || moviesIdList.length === 0) {
    let emptyListMessage = document.createElement('p');
    emptyListMessage.setAttribute('class', 'empty-list');
    emptyListMessage.textContent = 'Oops ! Your "Queued" library is empty !';

    heroList.append(emptyListMessage);
  } else {
    const optionsId = {
      headers: {
        Accept: 'application/json',
      },
    };

    // page = 1;
    // totalPages = 20;

    // function createPagination(totalPages, page) {
    //   let liTag = '';
    //   let active;
    //   let beforePage = page - 1;
    //   let afterPage = page + 1;
    //   if (page > 1) {
    //     //show the next button if the page value is greater than 1
    //     liTag += `<li class="btn prev" onclick="createPagination(totalPages, ${
    //       page - 1
    //     })"><span><i class="fas fa-angle-left"></i> Prev</span></li>`;
    //   }

    //   if (page > 2) {
    //     //if page value is less than 2 then add 1 after the previous button
    //     liTag += `<li class="first numb" onclick="createPagination(totalPages, 1)"><span>1</span></li>`;
    //     if (page > 3) {
    //       //if page value is greater than 3 then add this (...) after the first li or page
    //       liTag += `<li class="dots"><span>...</span></li>`;
    //     }
    //   }

    //   // how many pages or li show before the current li
    //   if (page == totalPages) {
    //     beforePage = beforePage - 2;
    //   } else if (page == totalPages - 1) {
    //     beforePage = beforePage - 1;
    //   }
    //   // how many pages or li show after the current li
    //   if (page == 1) {
    //     afterPage = afterPage + 2;
    //   } else if (page == 2) {
    //     afterPage = afterPage + 1;
    //   }

    //   for (var plength = beforePage; plength <= afterPage; plength++) {
    //     if (plength > totalPages) {
    //       //if plength is greater than totalPage length then continue
    //       continue;
    //     }
    //     if (plength == 0) {
    //       //if plength is 0 than add +1 in plength value
    //       plength = plength + 1;
    //     }
    //     if (page == plength) {
    //       //if page is equal to plength than assign active string in the active variable
    //       active = 'active';
    //     } else {
    //       //else leave empty to the active variable
    //       active = '';
    //     }
    //     liTag += `<li class="numb ${active}" onclick="createPagination(totalPages, ${plength})"><span>${plength}</span></li>`;
    //   }

    //   if (page < totalPages - 1) {
    //     //if page value is less than totalPage value by -1 then show the last li or page
    //     if (page < totalPages - 2) {
    //       //if page value is less than totalPage value by -2 then add this (...) before the last li or page
    //       liTag += `<li class="dots"><span>...</span></li>`;
    //     }
    //     liTag += `<li class="last numb" onclick="createPagination(totalPages, ${totalPages})"><span>${totalPages}</span></li>`;
    //   }

    //   if (page < totalPages) {
    //     //show the next button if the page value is less than totalPage(20)
    //     liTag += `<li class="btn next" onclick="createPagination(totalPages, ${
    //       page + 1
    //     })"><span>Next <i class="fas fa-angle-right"></i></span></li>`;
    //   }
    //   // console.log(page);
    //   element.innerHTML = liTag; //add li tag inside ul tag
    //   return liTag; //return the li tag
    // }

    // let perPage = 4;

    // totalPages = Math.ceil(moviesIdList.length / perPage);
    // if (totalPages >= 2) {
    //   element.style.display = 'block';
    //   createPagination(totalPages, page);
    // } else {
    //   element.style.display = 'none';
    // }

    // const startIndex = (currentPage - 1) * perPage;
    // const endIndex = startIndex + perPage;
    // const pageItems = moviesIdList.slice(startIndex, endIndex);

    // currentPage = 1;

    // addRemPagination();

    // pageItems.forEach(movieId => {
    //   const urlApi = `https://api.themoviedb.org/3/movie/${movieId}?&api_key=${apiKey}&language=en-US&page=1`;

    //   fetch(urlApi, optionsId)
    //     .then(res => res.json())
    //     .then(res => {
    //       console.log(res);
    //       const movie = res;

    //       renderWatchQueueCards(movie);
    //     })
    //     .catch(err => console.error('error:' + err));
    // });

    moviesIdList.forEach(movieId => {
      const urlApi = `https://api.themoviedb.org/3/movie/${movieId}?&api_key=${apiKey}&language=en-US&page=1`;

      fetch(urlApi, optionsId)
        .then(res => res.json())
        .then(res => {
          console.log(res);
          const movie = res;

          renderWatchQueueCards(movie);
        })
        .catch(err => console.error('error:' + err));
    });
  }

  // clear queued list
  headerClearQueuedButton.classList.toggle('is-hidden');
  headerClearQueuedButton.addEventListener('click', ev => {
    heroList.innerHTML = null;
    remove('queued');
    let emptyListMessage = document.createElement('p');
    emptyListMessage.setAttribute('class', 'empty-list');
    emptyListMessage.textContent = 'Oops ! Your "Queued" library is empty !';

    heroList.append(emptyListMessage);
  });

  // hidding clear watched button
  if (headerClearWatchedButton.classList.contains('is-hidden')) {
    return;
  } else {
    headerClearWatchedButton.classList.toggle('is-hidden');
  }
});

// HERO

fetch(trendingMoviesUrl, options)
  .then(res => res.json())
  .then(res => {
    heroList.innerHTML = null;
    console.log(res);
    // console.log(res.results);
    const movies = res.results;
    console.log(res.total_pages);
    console.log(totalPages);
    // element.innerHTML = createPagination(totalPages, page);

    paginationContainer.style.display = 'block';
    if (res.total_pages <= 1) {
      paginationContainer.style.display = 'none';
    }
    if (2 <= res.total_pages < 20) {
      page = 1;
      totalPages = res.total_pages;
      element.innerHTML = createPagination(totalPages, page);
    }
    page = 1;
    totalPages = 20;
    element.innerHTML = createPagination(totalPages, page);

    heroPagination();

    movies.map(element => {
      renderCards(element);
    });

    linkListener();
  })
  .catch(err => console.error('error:' + err));

// main functions

// link listener and modal dysplay
function linkListener() {
  // select all links
  const heroImagesLink = document.querySelectorAll('.hero-cards-link');
  // console.log(heroImagesLink);

  // listeners for each link
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

      addRemButtons('queued', linkId, modalAddToQueueBtn, modalRemFromQueueBtn);

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
    });
  });
}

// Render cards for hero and search function
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
            if (genres.length <= 3) {
              heroLink.setAttribute('genres', genres);
            } else {
              let redGenres = genres.slice(0, 2);
              heroLink.setAttribute('genres', `${redGenres},Other`);
            }
          }
        });
      })
      .catch(err => console.error('error:' + err));
  });

  // heroLink.setAttribute('genres', genres);

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
    } else {
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

// render cards for watch and queue function
function renderWatchQueueCards(params) {
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

  const genresName = params.genres;
  // console.log(genresName);
  const genresNameLength = genresName.length;
  let genres = [];

  if (genresNameLength <= 2) {
    genresName.map(genre => {
      genres.push(genre.name);
      heroLink.setAttribute('genres', genres);
    });
  } else {
    genres.push(genresName[0].name, genresName[1].name, 'Other');
    heroLink.setAttribute('genres', genres);
  }

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

  let movieGenres = heroLink.getAttribute('genres');
  // console.log(movieGenres);

  const heroMovieGenresListItem = document.createElement('li');
  heroMovieGenresListItem.setAttribute('class', 'hero-movie-genres-list-item');

  heroMovieGenresListItem.textContent = movieGenres;

  heroMovieGenresList.append(heroMovieGenresListItem);

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

  function link() {
    // console.log(heroLink);

    heroLink.addEventListener('click', ev => {
      ev.preventDefault();

      console.log(ev.target);
      const currentLink = ev.currentTarget;
      console.log(currentLink);

      const linkSrc = currentLink.href;
      // console.log(linkSrc);
      modalImage.setAttribute('src', linkSrc);

      const linkId = currentLink.getAttribute('id');
      modalImage.setAttribute('id', linkId);

      addRemButtons('queued', linkId, modalAddToQueueBtn, modalRemFromQueueBtn);

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
    });
  }

  link();
}

// PAGE-CHANGER

function heroPagination() {
  paginationContainer.addEventListener('click', ev => {
    // console.log(ev.currentTarget);
    currentPage = ev.currentTarget.querySelector('.active>span').textContent;
    // console.log(currentPage);
    let trendingMoviesUrl = `https://api.themoviedb.org/3/trending/movie/day?language=en-US&page=${currentPage}`;

    heroList.innerHTML = null;
    // console.log(trendingMoviesUrl);

    fetch(trendingMoviesUrl, options)
      .then(res => res.json())
      .then(res => {
        // console.log(res);
        // console.log(res.total_pages);

        const movies = res.results;
        movies.map(element => {
          renderCards(element);
        });

        // totalPages = 20;
        // if (res.total_pages <= 1) {
        //   paginationContainer.style.display = 'none';
        // }
        // if (2 <= res.total_pages < 20) {
        //   totalPages = res.total_pages;
        //   element.innerHTML = createPagination(totalPages, page);
        // } else {
        //   element.innerHTML = createPagination(totalPages, page);
        // }

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
          });
        });
      })
      .catch(err => console.error('error:' + err));
  });
}

function addRemPagination() {
  paginationContainer.addEventListener('click', ev => {
    totalPages = Math.ceil(moviesIdList.length / perPage);
    console.log(totalPages);

    // console.log(ev.currentTarget);
    currentPage = ev.currentTarget.querySelector('.active>span').textContent;

    pageItems.forEach(movieId => {
      const urlApi = `https://api.themoviedb.org/3/movie/${movieId}?&api_key=${apiKey}&language=en-US&page=1`;

      const optionsId = {
        headers: {
          Accept: 'application/json',
        },
      };

      fetch(urlApi, optionsId)
        .then(res => res.json())
        .then(res => {
          console.log(res);
          const movie = res;

          renderWatchQueueCards(movie);
        })
        .catch(err => console.error('error:' + err));
    });
  });
}

// PAGE-UP
const pageUp = document.querySelector('.page-up');
// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function () {
  scrollFunction();
};
function scrollFunction() {
  if (document.documentElement.scrollTop > 700) {
    // console.log(document.body.scrollTop);
    // console.log(document.documentElement.scrollTop);
    // console.log(document.documentElement);
    pageUp.style.display = 'flex';
  } else {
    pageUp.style.display = 'none';
  }
}

// When the user clicks on the button, scroll to the top of the document
pageUp.addEventListener('click', () => {
  document.documentElement.scrollTop = 0;
});

// FOOTER
// FOOTER MODAL
const footerOpenButton = document.querySelector('.footer-modal-button');
// console.log(footerOpenButton);

const footerCloseButton = document.querySelector('.footer-modal-close-button');
// console.log(footerCloseButton);

const footerModal = document.querySelector('.footer-modal');
footerModal.style.display = 'none';
// console.log(footerModal);

footerOpenButton.addEventListener('click', () => {
  footerModal.style.display = 'flex';
});

footerCloseButton.addEventListener('click', () => {
  footerModal.style.display = 'none';
});

window.addEventListener('click', e => {
  if (e.target == footerModal) {
    footerModal.style.display = 'none';
  }
});

window.addEventListener('keyup', event => {
  if (event.key === 'Escape') {
    footerModal.style.display = 'none';
  }
});
