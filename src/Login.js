import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; /*useNavigate se usa para programar navegaciones declarativas después de que la operación de inicio de sesión se complete con éxito.*/
import FooterDisplay from './components/FooterDisplay';

function Login() {
    const navigate = useNavigate(); /*para navegar programáticamente a otras rutas.*/
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [restaurantName, setRestaurantName] = useState('');
    const [errorMsg, setErrorMsg] = useState(''); /*Almacena mensajes de error que pueden surgir durante el proceso de inicio de sesión.*/

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch('/api/users/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password, restaurantName }),
            });

            const data = await response.json();
            if (response.ok) {
                console.log("Navigating with state:", data);  // Logging the state being passed
                navigate('/home', { 
                    state: { 
                        userId: data.userId, 
                        username: data.username, 
                        restaurantId: data.restaurantId, 
                        restaurantName: data.restaurantName 
                    }
                });
            } else {
                throw new Error(data.message || 'Error al iniciar sesión');
            }
        } catch (error) {
            console.error('Error de inicio de sesión:', error);
            setErrorMsg(error.message);
        }
    };

    return (
        <div className='wrapper'>
            <div className="formRegister">
                <h2>Iniciar Sesión</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Nombre de usuario"
                        required
                    />
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Contraseña"
                        required
                    />
                    <input
                        type="text"
                        value={restaurantName}
                        onChange={(e) => setRestaurantName(e.target.value)}
                        placeholder="Nombre del restaurante"
                        required
                    />
                    <button type="submit">ENTRAR</button>
                    {errorMsg && <div className="error">{errorMsg}</div>}
                    <div>
                        ¿No tienes cuenta? <Link to="/register">REGÍSTRATE AQUÍ</Link>
                    </div>
                </form>
                <FooterDisplay className='outFooter' />
            </div>
        
        </div>
    );
}

export default Login;
