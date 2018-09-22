import api from '../api';

export const fetchAllBook = (page, size) => (dispatch) =>
  api.book.fetch(page, size);

export const searchBook = (query, page, size) => (dispatch) => api.book.search(query, page, size)
