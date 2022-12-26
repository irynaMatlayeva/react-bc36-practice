import axios from 'axios';
import { useState, useEffect } from 'react';

const BASE_URL = 'https://63a99dbd594f75dc1dbb0bc9.mockapi.io';

axios.defaults.baseURL = BASE_URL;

const useCities = () => {
  const [cities, setCities] = useState([]);
  useEffect(() => {
    axios.get('/cities').then(({ data: cities }) => {
      localStorage.setItem(
        'cities',
        JSON.stringify(
          cities.map(({ text }) => ({
            text,
            relation: 'cities',
          }))
        )
      );
      const citiesFromLocalStorage = JSON.parse(localStorage.getItem('cities'));
      citiesFromLocalStorage
        ? setCities(citiesFromLocalStorage)
        : setCities([]);
    });
  }, []);
  return [cities, setCities];
};

export default useCities;
