import React, { useState } from 'react';

const DishesDisplay = ({ dishes, addDish, restaurantId, addDishToTable, removeDish }) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('Cocina');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await addDish({ name, price, category, restaurantId });
      setName('');
      setPrice('');
      setCategory('Cocina');  // Reset the form to default values after submission
    } catch (error) {
      console.error('El artículo no pudo ser agregado:', error);
    }
  };

  const filterDishesByCategory = (category) => {
    return dishes.filter(dish => dish.category === category);
  };

  const handleDeleteDish = async (dishId) => {
    if (window.confirm('Seguro de borrar este artículo?')) {
        try {
            await removeDish(dishId);
            // alert('Artículo ha sido borrado');
        } catch (error) {
            alert(`Error: ${error.message}`);
        }
    }
  };

  return (
    <div className='dishesContainer'>
      <form onSubmit={handleSubmit}>
        <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Nombre del platillo" required />
        <input type="number" value={price} onChange={e => setPrice(parseFloat(e.target.value))} placeholder="Precio" required />
        <select value={category} onChange={e => setCategory(e.target.value)}>
          <option value="Cocina">Cocina</option>
          <option value="Bebida">Bebida</option>
          <option value="Otros">Otros</option>
        </select>
        <button type="submit">Crear Artículo</button>
      </form>

      <div className='dishesDisplay'>
        {dishes.length > 0 ? ['Cocina', 'Bebida', 'Otros'].map(cat => (
          <div key={cat}>
            <h2 className='categoryHead'>{cat}</h2>
            <div className='categoryGrid'>
              <ul>
                {filterDishesByCategory(cat).map(dish => (
                  <li key={dish._id} className='card dishCard'>
                    <button onClick={() => handleDeleteDish(dish._id)} style={{ float: 'right' }}>X</button>
                    <div onClick={() => addDishToTable(dish)}>
                      <h5>{dish.name}</h5>
                      <p>${dish.price.toFixed(2)}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )) : <p>No se encontraron platillos.</p>}
      </div>
    </div>
  );
};

export default DishesDisplay;
