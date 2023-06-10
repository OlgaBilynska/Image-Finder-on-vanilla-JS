import axios from 'axios';

const axios = require('axios');
const API_KEY = '6725923-1edca42cf91687372f6490452';
const BASE_URL = 'https://pixabay.com/api/';
const IMAGE_TYPE = 'photo';
const ORIENTATION = 'horizontal';
const SAFESEARCH = 'true';

export default class ApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  async fetchImages() {
    const response = await axios(
      `${BASE_URL}?key=${API_KEY}&q=${this.searchQuery}&image_type=${IMAGE_TYPE}&orientation=${ORIENTATION}&safesearch=${SAFESEARCH}&per_page=40&page=${this.page}`
    ).catch(function (error) {
      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log('Error', error.message);
      }
      console.log(error.config);
    });

    this.incrementPage();
    return response;
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
