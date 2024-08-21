import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import useTables from './hooks/useTables';
import useDishes from './hooks/useDishes';
import TablesDisplay from './components/TablesDisplay';
import DishesDisplay from './components/DishesDisplay';
import FooterDisplay from './components/FooterDisplay';
import { handleNewTable, closeTable } from './utils/tableUtils';

function HomePage() {
  const location = useLocation();
  const { userId, restaurantId, username, restaurantName } = location.state || {};
  const [tableName, setTableName] = useState('');
  const [selectedTable, setSelectedTable] = useState(null);
  const [toBeAddedDishes, setToBeAddedDishes] = useState([]);
  const [viewMode, setViewMode] = useState('myTables');

  const { openTables, setOpenTables, closedTables, setClosedTables, isLoading: isLoadingTables, error: errorTables } = useTables(userId, viewMode);
  const { dishes, addDish, removeDish, isLoading: isLoadingDishes, error: errorDishes } = useDishes(restaurantId);

  const handleAddDishToTable = (dish) => {
    setToBeAddedDishes(prevDishes => [...prevDishes, dish]);
  };

  const onCreateNewTable = async (event) => {
    event.preventDefault();
    if (!tableName.trim()) {
      alert('Please enter a valid table name.');
      return;
    }
    await handleNewTable(tableName, userId, restaurantId, (newTable) => {
      setOpenTables(prevTables => Array.isArray(prevTables) ? [...prevTables, newTable] : [newTable]);
      setTableName('');
    });
  };

  const onCloseTable = async (tableId) => {
    await closeTable(tableId, openTables, setOpenTables);
  };

  const selectTable = (table) => {
    setSelectedTable(table);
    setViewMode('dishes');  
    setToBeAddedDishes([]);
  };

  const clearSelectedTable = () => {
    setSelectedTable(null);  // Deselect the table
    setToBeAddedDishes([]);  // Clear any dishes staged for addition
  };

  const confirmDishes = async () => {
    const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:3001'; 

    if (!selectedTable || toBeAddedDishes.length === 0) {
      alert('No table selected or no dishes to add.');
      return;
    }
    try {
      for (const dish of toBeAddedDishes) {
        const response = await fetch(`${backendUrl}/api/tables/add-dish/${selectedTable._id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ dishId: dish._id })
        });
        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.message || 'Failed to add dish');
        }
      };
      setToBeAddedDishes([]); // Clear the temporary dishes list
      // Fetch the updated table data
      const updatedTableResponse = await fetch(`${backendUrl}/api/tables/${selectedTable._id}`);
      if (!updatedTableResponse.ok) {
        throw new Error('Failed to fetch updated table data.');
      }
      const updatedTable = await updatedTableResponse.json();
      setSelectedTable(updatedTable); // Update the selected table with new data
      setViewMode('myTables'); // Optionally switch view back to the tables view
    } catch (error) {
      console.error('Error confirming dishes:', error);
      alert(`Error: ${error.message}`);
    }
  };

  const deleteAllTables = async () => {
    if (window.confirm('¿Está seguro de que desea eliminar todas las mesas cerradas?')) {
      try {
        const closedTableIds = closedTables.map(table => table._id);
        await fetch('http://localhost:3001/api/tables/bulk-delete', {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ tableIds: closedTableIds })
        });
        // Update the local state to reflect the deletion
        setClosedTables([]);
      } catch (error) {
        alert('Error deleting tables: ' + error.message);
      }
    }
  };

  return (
    <div className='homePage'>
      <header>
        <h4><img src='https://client-mi-comedor.vercel.app/images/smallogo.png' alt='logo'></img></h4>
        <h3><span>{restaurantName}</span></h3>
        <h5><i className="bi bi-person-bounding-box"></i> <span>{username}</span></h5>
        <section><Link to="/"><i className="bi bi-box-arrow-left"></i> Cerrar Sesión</Link></section>
      </header>
      <nav>
        <div onClick={() => setViewMode('myTables')} className={viewMode === 'myTables' ? 'active' : ''} >MIS MESAS</div>
        <div onClick={() => setViewMode('dishes')} className={viewMode === 'dishes' ? 'active' : ''} >PLATILLOS</div>
        <div onClick={() => setViewMode('openTables')} className={viewMode === 'openTables' ? 'active' : ''} >MESAS ABIERTAS</div>
        <div onClick={() => setViewMode('closedTables')} className={viewMode === 'closedTables' ? 'active' : ''} >MESAS CERRADAS</div>
      </nav>
      <aside>
        <h4>Mesa seleccionada:</h4>
        {selectedTable ? (
          <div>
            <button className='cancelButton' onClick={clearSelectedTable} style={{ float: 'right' }}>QUITAR</button>
            <h4><i className="bi bi-view-list"></i>{selectedTable.name}</h4>
            <ul>
              {selectedTable.dishes.map(dish => (
                <li key={dish._id}>{dish.name} - ${dish.price.toFixed(2)}</li>
              ))}
            </ul>
            <p>Total: ${selectedTable.total.toFixed(2)}</p>
            <h5>Nuevos Platillos:</h5>
            <ul className='toBeAdded'>
              {toBeAddedDishes.map((dish, index) => (
                <li key={index}>{dish.name} - ${dish.price.toFixed(2)}</li>
              ))}
            </ul>
            <button className='confirmButton' onClick={confirmDishes}>CONFIRMAR NUEVOS ARTÍCULOS</button>
          </div>
        ) : (
          <p className='asideMessage'>*Sin mesa seleccionada.</p>
        )}
      </aside>
      <main>
        {viewMode === 'myTables' && (
          <form onSubmit={onCreateNewTable}>
            <input
              type="text"
              value={tableName}
              onChange={e => setTableName(e.target.value)}
              placeholder="Nombre de la nueva mesa"
              required
            />
            <button type="submit">CREAR NUEVA MESA</button>
          </form>
        )}
        {viewMode === 'dishes' && (
          <DishesDisplay dishes={dishes} addDish={addDish} removeDish={removeDish} restaurantId={restaurantId} addDishToTable={handleAddDishToTable}/>
        )}
        {(viewMode === 'myTables' || viewMode === 'openTables' || viewMode === 'closedTables') && !isLoadingTables ? (
          <TablesDisplay tables={viewMode === 'closedTables' ? closedTables : openTables} mode={viewMode} closeTable={onCloseTable} selectTable={selectTable} deleteAllTables={deleteAllTables} />
        ) : null}

        {isLoadingTables && <i className=" fa-solid fa-spinner fa-spin"></i>}
        {errorTables && <p>{errorTables}</p>}
        {isLoadingDishes && <p>Cargando artículos...</p>}
        {errorDishes && <p>{errorDishes}</p>}
      </main>
      <footer>
        <FooterDisplay />
        <img src='/images/smallogo.png' alt='logo'></img>
      </footer>
    </div>
  );
}

export default HomePage;
