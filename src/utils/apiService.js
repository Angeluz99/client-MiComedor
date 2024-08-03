const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:3001'; // Use environment variable or fallback to local

const headers = {
  'Content-Type': 'application/json'
};

export const fetchOpenTables = async (userId) => {
  try {
    const response = await fetch(`${backendUrl}/api/tables/open/${userId}`, { headers });
    if (!response.ok) {
      throw new Error('Network response was not ok.');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching open tables:', error);
    throw error;
  }
};

export const fetchOpenTablesForRestaurant = async (userId) => {
  try {
    const response = await fetch(`${backendUrl}/api/tables/restaurant/open/${userId}`, { headers });
    if (!response.ok) {
      throw new Error('Failed to fetch open tables for the restaurant.');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching open tables for restaurant:', error);
    throw error;
  }
};

export const fetchClosedTables = async (userId) => {
  try {
    const response = await fetch(`${backendUrl}/api/tables/restaurant/closed/${userId}`, { headers });
    if (!response.ok) {
      throw new Error('Network response was not ok.');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching closed tables:', error);
    throw error;
  }
};

export const createTable = async (tableName, userId, restaurantId) => {
  try {
    const response = await fetch(`${backendUrl}/api/tables/open`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ name: tableName, userId, restaurantId })
    });
    if (!response.ok) {
      throw new Error('Failed to open new table.');
    }
    return await response.json();
  } catch (error) {
    console.error('Error creating table:', error);
    throw error;
  }
};

export const closeTable = async (tableId) => {
  try {
    const response = await fetch(`${backendUrl}/api/tables/close/${tableId}`, {
      method: 'PUT',
      headers
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Failed to close table');
    }
    return data;
  } catch (error) {
    console.error('Error closing table:', error);
    throw error;
  }
};

export const fetchDishesForRestaurant = async (restaurantId) => {
  try {
    const response = await fetch(`${backendUrl}/api/dishes/restaurant/${restaurantId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });
    if (!response.ok) {
      const errorDetails = await response.text();
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
    const response = await fetch(`${backendUrl}/api/dishes`, {
      method: 'POST',
      headers,
      body: JSON.stringify(dishData)
    });
    if (!response.ok) {
      const errorDetails = await response.text();
      throw new Error('Failed to create dish: ' + errorDetails);
    }
    return await response.json();
  } catch (error) {
    console.error('Error creating dish:', error);
    throw error;
  }
};

export const deleteDish = async (dishId) => {
  try {
    const response = await fetch(`${backendUrl}/api/dishes/${dishId}`, {
      method: 'DELETE',
      headers
    });
    if (!response.ok) {
      throw new Error('Failed to delete the dish.');
    }
    return true;
  } catch (error) {
    console.error('Error deleting dish:', error);
    throw error;
  }
};
