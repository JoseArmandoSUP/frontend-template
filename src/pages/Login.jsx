import { useState } from 'react';
import { api } from '../services/api';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [cargando, setCargando] = useState(false);
    const [error, setError] = useState(null);

    const navigate = useNavigate();    // <----- empuja una pagina hacia afuera y arroja otra hacia adentro

    const iniciarSesion = async (e) => {
        
        e.preventDefault(); // <----- Evita que la pagina se recargue
        setError(null);
        setCargando(true);
        
        try{
            const datos = await api.post('/auth/login', {email, password});
            localStorage.setItem('token', datos.token); // El token se almacena en el localStorage, sirve para verificar s estamos autentuficados
            navigate('/dashboard'); // <---- Redirecciona al dashboard
        } catch (error){
            setError("Credenciales Invalidas");
        }finally{
            setCargando(false);
        }
    };

    return (
        <div className="flex justify-center items-center h-[70vh]">
            <form 
                onSubmit={iniciarSesion}
                className="bg-white p-8 rounded shadow-md w-96"
            >
                <h2 className="text-2xl font-bold mb-6 text-center">
                    Iniciar Sesión
                </h2>

                {error && (
                    <p className="text-red-500 text-sm mb-4">
                        {error}
                    </p>
                )}

                <input
                    type="email"
                    placeholder="Correo"
                    className="w-full p-2 border rounded mb-4"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <input
                    placeholder="Contraseña"
                    className="w-full p-2 border rounded mb-4"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                    disabled={cargando}
                >
                    {cargando ? "Ingresando..." : "Entrar"}
                </button>
            </form>
        </div>
    );
};

export default Login;