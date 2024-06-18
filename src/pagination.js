//PAGE CHANGER
// selecting required element
const element = document.querySelector('.pagination ul');
let totalPages = 20;
let page = 1;

//calling function with passing parameters and adding inside element which is ul tag
element.innerHTML = createPagination(totalPages, page);
function createPagination(totalPages, page) {
  let liTag = '';
  let active;
  let beforePage = page - 1;
  let afterPage = page + 1;
  if (page > 1) {
    //show the next button if the page value is greater than 1
    liTag += `<li class="btn prev" onclick="createPagination(totalPages, ${
      page - 1
    })"><span><i class="fas fa-angle-left"></i> Prev</span></li>`;
  }

  if (page > 2) {
    //if page value is less than 2 then add 1 after the previous button
    liTag += `<li class="first numb" onclick="createPagination(totalPages, 1)"><span>1</span></li>`;
    if (page > 3) {
      //if page value is greater than 3 then add this (...) after the first li or page
      liTag += `<li class="dots"><span>...</span></li>`;
    }
  }

  // how many pages or li show before the current li
  if (page == totalPages) {
    beforePage = beforePage - 2;
  } else if (page == totalPages - 1) {
    beforePage = beforePage - 1;
  }
  // how many pages or li show after the current li
  if (page == 1) {
    afterPage = afterPage + 2;
  } else if (page == 2) {
    afterPage = afterPage + 1;
  }

  for (var plength = beforePage; plength <= afterPage; plength++) {
    if (plength > totalPages) {
      //if plength is greater than totalPage length then continue
      continue;
    }
    if (plength == 0) {
      //if plength is 0 than add +1 in plength value
      plength = plength + 1;
    }
    if (page == plength) {
      //if page is equal to plength than assign active string in the active variable
      active = 'active';
    } else {
      //else leave empty to the active variable
      active = '';
    }
    liTag += `<li class="numb ${active}" onclick="createPagination(totalPages, ${plength})"><span>${plength}</span></li>`;
  }

  if (page < totalPages - 1) {
    //if page value is less than totalPage value by -1 then show the last li or page
    if (page < totalPages - 2) {
      //if page value is less than totalPage value by -2 then add this (...) before the last li or page
      liTag += `<li class="dots"><span>...</span></li>`;
    }
    liTag += `<li class="last numb" onclick="createPagination(totalPages, ${totalPages})"><span>${totalPages}</span></li>`;
  }

  if (page < totalPages) {
    //show the next button if the page value is less than totalPage(20)
    liTag += `<li class="btn next" onclick="createPagination(totalPages, ${
      page + 1
    })"><span>Next <i class="fas fa-angle-right"></i></span></li>`;
  }
  // console.log(page);
  element.innerHTML = liTag; //add li tag inside ul tag
  return liTag; //return the li tag
}

let currentPage = 1;

const paginationContainer = document.querySelector('.pagination');
paginationContainer.addEventListener('click', ev => {
  // console.log(ev.currentTarget);
  currentPage = ev.currentTarget.querySelector('.active>span').textContent;
  // console.log(currentPage);
  // return currentPage;
});

// console.log(currentPage);
function searchPagination() {
  paginationContainer.addEventListener('click', ev => {
    // console.log(ev.currentTarget);
    currentPage = ev.currentTarget.querySelector('.active>span').textContent;
    console.log(currentPage);
    findUrl = `https://api.themoviedb.org/3/search/movie?query=${searchText}&include_adult=true&language=en-US&page=${currentPage}`;

    heroList.innerHTML = null;
    console.log(findUrl);

    fetch(findUrl, options)
      .then(res => res.json())
      .then(res => {
        // console.log(findUrl);
        console.log(res.total_pages);

        if (res.total_pages < 20) {
          totalPages = res.total_pages;
        }
        console.log(res.results);
        const movies = res.results;
        if (movies.length === 0) {
          headerFormErrorMessage.style.display = 'block';

          fetch(trendingMoviesUrl, options)
            .then(res => res.json())
            .then(res => {
              // console.log(res);
              // console.log(res.results);
              const movies = res.results;
              movies.map(element => {
                renderCards(element);
              });

              const heroImagesLink =
                document.querySelectorAll('.hero-cards-link');
              // console.log(heroImagesLink);

              heroImagesLink.forEach(link => {
                const linkImage = link.querySelector('.hero-cards-image');
                // console.log(linkImage);

                link.addEventListener('click', ev => {
                  ev.preventDefault();

                  // console.log(ev.target);
                  const currentLink = ev.currentTarget;
                  console.log(currentLink);

                  const linkSrc = currentLink.href;
                  // console.log(linkSrc);
                  modalImage.setAttribute('src', linkSrc);

                  const linkId = currentLink.getAttribute('id');
                  modalImage.setAttribute('id', linkId);

                  // add remove buttons
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

                  // add in link necesary attributes from api's
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

                  const linkOrigTitle =
                    currentLink.getAttribute('original_title');
                  // console.log(linkOrigTitle);
                  modalOrigTitle.textContent = linkOrigTitle;

                  const linkDescription =
                    currentLink.getAttribute('description');
                  // console.log(linkDescription);
                  modalDescription.textContent = linkDescription;

                  const genres = currentLink.getAttribute('genres');
                  // console.log(genres);
                  modalGenre.textContent = genres;

                  modalWindow.classList.toggle('is-hidden');

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
        } else {
          headerFormErrorMessage.style.display = 'none';
        }

        // create movies cards
        movies.map(element => {
          renderCards(element);
        });

        // Create modal for each link
        const heroImagesLink = document.querySelectorAll('.hero-cards-link');
        // console.log(heroImagesLink);

        heroImagesLink.forEach(link => {
          // const linkImage = link.querySelector('.hero-cards-image');
          // console.log(linkImage);

          link.addEventListener('click', ev => {
            ev.preventDefault();

            // console.log(ev.target);
            const currentLink = ev.currentTarget;
            console.log(currentLink);

            const linkId = currentLink.getAttribute('id');
            modalImage.setAttribute('id', linkId);

            // Setting state for each link ad/remove watch/queue button
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

            // condition if link has or not url for image
            if (currentLink.href === noImageUrl) {
              modalImage.setAttribute('src', noImageUrl);
            } else {
              // add in link necesary attribute from api's
              const linkSrc = currentLink.href;
              // console.log(linkSrc);
              modalImage.setAttribute('src', linkSrc);
            }

            // add in link necesary attributes from api's

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

            modalWindow.classList.remove('is-hidden');

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
  });
}

function heroPagination() {
  paginationContainer.addEventListener('click', ev => {
    // console.log(ev.currentTarget);
    currentPage = ev.currentTarget.querySelector('.active>span').textContent;
    console.log(currentPage);
    trendingMoviesUrl = `https://api.themoviedb.org/3/trending/movie/day?language=en-US&page=${currentPage}`;

    heroList.innerHTML = null;
    console.log(trendingMoviesUrl);

    fetch(trendingMoviesUrl, options)
      .then(res => res.json())
      .then(res => {
        // console.log(res);
        console.log(res.totalPages_pages);
        if (res.totalPages_pages < 20) {
          totalPages = res.totalPages_pages;
        }

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
          });
        });
      })
      .catch(err => console.error('error:' + err));
  });
}
