import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import FooterDisplay from './components/FooterDisplay';

function Register() {
    const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:3001'; 

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false); // Estado para controlar la visibilidad
    const [restaurant, setRestaurant] = useState('');
    const [restaurantCode, setRestaurantCode] = useState('');
    const [message, setMessage] = useState(null); // To store the message to display
    const [isError, setIsError] = useState(false); // To indicate if the message is an error

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Trim input values before submission
        const trimmedUsername = username.trim();
        const trimmedEmail = email.trim();
        const trimmedPassword = password.trim();
        const trimmedRestaurant = restaurant.trim();
        const trimmedRestaurantCode = restaurantCode.trim();

        try {
            const response = await fetch(`${backendUrl}/api/users/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: trimmedUsername,
                    email: trimmedEmail,
                    password: trimmedPassword,
                    restaurantName: trimmedRestaurant,
                    restaurantCode: trimmedRestaurantCode,
                }),
            });
            const data = await response.json();
            if (response.ok) {
                setMessage(data.message); // Assuming data.message exists
                setIsError(false);
            } else {
                setMessage(data.message || 'Something went wrong');
                setIsError(true);
            }
        } catch (error) {
            setMessage('Registration failed: ' + error.message);
            setIsError(true);
        }
    };

    const closeMessage = () => setMessage(null); // Function to clear the message and close it

    const Message = ({ message, onClose, isError }) => (
        <div style={{
            padding: '1vw',
            backgroundColor: isError ? '#f8d7da' : '#d4edda',
            color: isError ? '#721c24' : '#155724',
            marginBottom: '2vw',
            borderRadius: '5px',
            position: 'relative'
        }}>
            {message}
            <button onClick={onClose} style={{ position: 'absolute', bottom: '1vw', right: '0vw' }}>X</button>
        </div>
    );

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
      };

    return (
        <div className='wrapper'>
            <div className='formRegister'>
                <h2>Registro de Usuario</h2>
                <details>
                    <summary>¿Cómo funciona?</summary>
                    <p>Si el restaurante no ha sido registrado, el código creado se ligará al nuevo restaurante. Si el restaurante ya existe, asegúrate de tener el código para poder unirte.</p>
                </details>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Nombre de Usuario"
                        required
                    />
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
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
                        value={restaurant}
                        onChange={(e) => setRestaurant(e.target.value)}
                        placeholder="Nombre del Restaurante"
                        required
                    />
                    <input
                        type="text"
                        value={restaurantCode}
                        onChange={(e) => setRestaurantCode(e.target.value)}
                        placeholder="Código del Restaurante"
                        required
                    />
                    <button type="submit">Registrar</button>
                    {message && <Message message={message} onClose={closeMessage} isError={isError} />}
                    <div>
                        ¿Ya tienes cuenta? <Link to="/">ENTRA AQUÍ</Link>
                    </div>
                </form>
                <FooterDisplay className='outFooter' />
            </div>
        </div>
    );
}

export default Register;
