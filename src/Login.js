import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; /*useNavigate se usa para programar navegaciones declarativas después de que la operación de inicio de sesión se complete con éxito.*/
import FooterDisplay from './components/FooterDisplay';

function Login() {
    const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:3001'; 

    const navigate = useNavigate(); /*para navegar programáticamente a otras rutas.*/
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false); // Estado para controlar la visibilidad

    const [restaurantName, setRestaurantName] = useState('');
    const [errorMsg, setErrorMsg] = useState(''); /*Almacena mensajes de error que pueden surgir durante el proceso de inicio de sesión.*/

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch(`${backendUrl}/api/users/login`, {
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
    console.log(process.env.REACT_APP_BACKEND_URL);

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
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
                        placeholder="Nombre de Usuario"
                        required
                    />
                    <div className='passwordDiv'>
                        <input
                            type={showPassword ? 'text' : 'password'}                        
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                            required
                        />
                        <span className='passwordButton' type="button" onClick={toggleShowPassword}>
                            {showPassword ? '🫣' : '👁️'}
                        </span>
                    </div>
                    <input
                        type="text"
                        value={restaurantName}
                        onChange={(e) => setRestaurantName(e.target.value)}
                        placeholder="Nombre del Restaurante"
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

            <details className='pruebas'>
                <summary>Solo quiero probar</summary>
                <p>~ test-usuario</p>
                <p>~ testpassword</p>
                <p>~ testrestaurant</p>
            </details>

        </div>
    );
}

export default Login;
