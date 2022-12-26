import { useState, useEffect } from 'react';
import universityData from '../constants/universityData.json';
const useCities = () => {
  const [cities, setCities] = useState([]);
  useEffect(() => {
    localStorage.setItem(
      'cities',
      JSON.stringify(
        universityData?.cities.map(city => ({
          text: city,
          relation: 'cities',
        }))
      )
    );
    const citiesFromLocalStorage = JSON.parse(localStorage.getItem('cities'));
    citiesFromLocalStorage ? setCities(citiesFromLocalStorage) : setCities([]);
  }, []);
  return [cities, setCities];
};

export default useCities;
