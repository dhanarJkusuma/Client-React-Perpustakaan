import api from '../api';

export const fetchAllBook = (page, size) => (dispatch) =>
  api.book.fetch(page, size);
