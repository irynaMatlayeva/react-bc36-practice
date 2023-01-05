import {
  deleteData,
  fetchData,
  postData,
  updateData,
  URL,
} from 'API/defaultAPI';

export const fetchCities = () => {
  return fetchData(URL.CITIES);
};
export const createCity = data => {
  return postData(URL.CITIES, data);
};
export const deleteCity = id => {
  return deleteData(`${URL.CITIES}/${id}`);
};
export const updateCity = (id, data) => {
  return updateData(`${URL.CITIES}/${id}`, data);
};
