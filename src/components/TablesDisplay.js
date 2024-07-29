import React from 'react';
import format from 'date-fns/format';

const TablesDisplay = ({ tables, mode, closeTable, selectTable, deleteAllTables }) => {
  if (!tables.length) {
    return <p>No hay mesas disponibles.</p>;
  }

  return (
    <>
      <ul className='tablesDisplay'>
        {tables.map(table => (
          <li className='card tableCard' key={table._id}>
            <h4><i className="bi bi-view-list"></i>{table.name}</h4> 
            <div className='tableSubHead'>
              <p><i className="bi bi-calendar-check-fill"></i>{format(new Date(table.openedAt || new Date()), 'MMM do, h:mma')}</p>
              {mode !== 'myTables' && table.user && <p><i className="bi bi-person-vcard-fill"></i>{table.user.username}</p>}
            </div>
            <div className='tableDishes'>
            {table.dishes && table.dishes.length > 0 ? (
              <ul>
                {table.dishes.map(dish => (
                  <li key={dish._id}>{dish.name} - ${dish.price ? dish.price.toFixed(2) : "0.00"}</li>
                ))}
              </ul>
            ) : <p>Sin cargos</p>}
          </div>
            {mode === 'myTables' && <button onClick={() => selectTable(table)}>Agregar Platillos</button>}
            <h4>Total: ${table.total ? table.total.toFixed(2) : "0.00"}</h4>
            {mode === 'myTables' && <button onClick={() => closeTable(table._id)}>Cerrar Mesa</button>}
          </li>
        ))}
      </ul>
      {mode === 'closedTables' && tables.length > 0 && (
        <button className='cancelButton' onClick={deleteAllTables}>BORRAR MESAS CERRADAS</button>
      )}
    </>
  );
};

export default TablesDisplay;
