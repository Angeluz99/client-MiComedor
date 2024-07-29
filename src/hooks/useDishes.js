// In useDishes.js
import { useState, useEffect } from 'react';
import { fetchDishesForRestaurant, createDish, deleteDish } from '../utils/apiService';

const useDishes = (restaurantId) => {
  const [dishes, setDishes] = useState([]);
  const [isLoadingDishes, setIsLoadingDishes] = useState(false);
  const [errorDishes, setErrorDishes] = useState('');

  useEffect(() => {
    fetchDishes();
  }, [restaurantId]);

  const fetchDishes = async () => {
    setIsLoadingDishes(true);
    setErrorDishes('');
    try {
      const fetchedDishes = await fetchDishesForRestaurant(restaurantId);
      setDishes(fetchedDishes);
    } catch (error) {
      setErrorDishes('Failed to fetch dishes: ' + error.message);
      console.error('Error fetching dishes:', error);
    } finally {
      setIsLoadingDishes(false);
    }
  };

  const addDish = async (dishData) => {
    try {
      const newDish = await createDish(dishData);
      setDishes([...dishes, newDish]); // Add the new dish to the current list
    } catch (error) {
      console.error('Error añadiendo nuevo artículo:', error);
      throw error;
    }
  };

  const removeDish = async (dishId) => {
    try {
      await deleteDish(dishId);  // Delete the dish from the backend
      setDishes(dishes.filter(dish => dish._id !== dishId));  // Remove the dish from the local state
    } catch (error) {
      console.error('Error borrando artículo:', error);
      throw error;
    }
  };

  return { dishes, addDish, removeDish, isLoading: isLoadingDishes, error: errorDishes };
};

export default useDishes;
