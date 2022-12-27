import { fetchCities } from 'API/citiesAPI/citiesAPI';
import { useEffect, useState } from 'react';

const useCities = () => {
  const [cities, setCities] = useState([]);
  useEffect(() => {
    fetchCities().then(({ data: cities }) => {
      localStorage.setItem(
        'cities',
        JSON.stringify(
          cities.map(({ text, id }) => ({
            id,
            text,
            relation: 'cities',
          }))
        )
      );
      const citiesFromLocalStorage = JSON.parse(localStorage.getItem('cities'));
      citiesFromLocalStorage ? setCities(citiesFromLocalStorage) : setCities([]);
    });
  }, []);
  return [cities, setCities];
};

export default useCities;
