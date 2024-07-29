
const headers = {
    'Content-Type': 'application/json'
  };
  
  export const fetchOpenTables = async (userId) => {
    try {
      const response = await fetch(`/api/tables/open/${userId}`, { headers });
      if (!response.ok) {
        throw new Error('Network response was not ok.');
      }
      return await response.json();
    } catch (error) {
      throw error;
    }
  };

  export const fetchOpenTablesForRestaurant = async (userId) => {
    const response = await fetch(`/api/tables/restaurant/open/${userId}`, {
        headers: { 'Content-Type': 'application/json' }
    });
    if (!response.ok) {
        throw new Error('Failed to fetch open tables for the restaurant.');
    }
    return await response.json();
};

  
  export const fetchClosedTables = async (userId) => {
    try {
      const response = await fetch(`/api/tables/restaurant/closed/${userId}`, { headers });
      if (!response.ok) {
        throw new Error('Network response was not ok.');
      }
      return await response.json();
    } catch (error) {
      throw error;
    }
  };
  
  export const createTable = async (tableName, userId, restaurantId) => {
    try {
      const response = await fetch('/api/tables/open', {
        method: 'POST',
        headers,
        body: JSON.stringify({ name: tableName, userId, restaurantId })
      });
      if (!response.ok) {
        throw new Error('Failed to open new table.');
      }
      return await response.json();
    } catch (error) {
      throw error;
    }
  };
  
  export const closeTable = async (tableId) => {
    const response = await fetch(`/api/tables/close/${tableId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' }
    });
    const data = await response.json();  // Ensure it's parsing JSON
    if (!response.ok) {
      throw new Error(data.message || 'Failed to close table');
    }
    return data;
  };
  
  
  export const fetchDishesForRestaurant = async (restaurantId) => {
    try {
      const response = await fetch(`/api/dishes/restaurant/${restaurantId}`, {
        method: 'GET', // Explicitly state the method, even if GET is default
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json' // Ensure the server knows what type of response is acceptable
        }
      });
      if (!response.ok) {
        const errorDetails = await response.text(); // Getting the full error message
        throw new Error('Failed to fetch dishes: ' + errorDetails);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching dishes:', error);
      throw error;
    }
  };
  
  export const createDish = async (dishData) => {
    try {
      const response = await fetch('/api/dishes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(dishData)
      });
      if (!response.ok) {
        const errorDetails = await response.text();
        throw new Error('Failed to fetch dishes: ' + errorDetails);
      }
      return await response.json(); // This should return the newly added dish
    } catch (error) {
      console.error("Error creating dish:", error);
      throw error;
    }
  };
  
  
// In utils/apiService.js
export const deleteDish = async (dishId) => {
  try {
    const response = await fetch(`/api/dishes/${dishId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    if (!response.ok) {
      throw new Error('Failed to delete the dish.');
    }
    // Handle successful deletion here if needed
    return true;
  } catch (error) {
    console.error('Error deleting dish:', error);
    throw error;
  }
};

  

  
  