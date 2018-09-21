import api from '../api';

export const fetchAllBook = () => (dispatch) =>
  api.book.fetch();
