import Notiflix from 'notiflix';
import ApiService from './api';

const apiService = new ApiService();

const searchFormEl = document.getElementById('search-form');
const btnLoadMore = document.getElementById('load-more');
const btnEl = document.querySelector('button');
const galleryEl = document.querySelector('.gallery');
let totalHits = '';

searchFormEl.addEventListener('submit', onFormSubmit);
btnLoadMore.addEventListener('click', onLoadMore);

function onFormSubmit(evt) {
  evt.preventDefault();
  clearImagesContainer();
  apiService.resetPage();
  apiService.query = evt.currentTarget.elements.searchQuery.value;
  apiService
    .fetchImages()
    .then(array => {
      console.log('full array', array);
      if (array.length === 0) {
        onError();
      }
      appendImagesMarkup(array);
    })
    .catch(err => console.log(err));
}

function onLoadMore() {
  apiService
    .fetchImages()
    .then(array => {
      appendImagesMarkup(array);
    })
    .catch(onError);
}

function createMarkup(array) {
  return array
    .map(image => {
      return `<div class="photo-card">
  <img src="${image.webformatURL}" alt="${image.tags}" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes</b>${image.likes}
    </p>
    <p class="info-item">
      <b>Views</b>${image.views}
    </p>
    <p class="info-item">
      <b>Comments</b>${image.comments}
    </p>
    <p class="info-item">
      <b>Downloads</b>${image.downloads}
    </p>
  </div>
</div>`;
    })
    .join('');
}

function appendImagesMarkup(images) {
  galleryEl.insertAdjacentHTML('beforeend', createMarkup(images));
}

function clearImagesContainer() {
  galleryEl.innerHTML = '';
}

function onError() {
  Notiflix.Notify.failure(
    'Sorry, there are no images matching your search query. Please try again.'
  );
}
