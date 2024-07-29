import * as apiService from './apiService';

export const fetchTables = async (userId, viewMode) => {
  try {
    if (viewMode === 'openTables') {
      // Correctly calling fetchOpenTablesForRestaurant
      return await apiService.fetchOpenTablesForRestaurant(userId);
    } else if (viewMode === 'closedTables') {
      return await apiService.fetchClosedTables(userId);
    } else {
      return await apiService.fetchOpenTables(userId); // For myTables view
    }
  } catch (error) {
    console.error('Error fetching tables:', error);
    throw error;
  }
};

export const handleNewTable = async (tableName, userId, restaurantId, updateTables) => {
  try {
    const newTable = await apiService.createTable(tableName, userId, restaurantId);
    updateTables(newTable); // Call the callback with the new table
  } catch (error) {
    console.error('Failed to open new table:', error);
    throw error; // Re-throw the error to be handled by the caller
  }
};

export const closeTable = async (tableId, openTables, setOpenTables) => {
  try {
    const response = await apiService.closeTable(tableId);
    if (response.message === 'Table closed successfully.') {
      const updatedTables = openTables.filter(table => table._id !== tableId);
      setOpenTables(updatedTables);
    } else {
      throw new Error('Failed to close the table');
    }
  } catch (error) {
    console.error('Error closing table:', error);
  }
};

