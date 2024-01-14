import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { useAuthStore, useForm } from '../hooks/index';

const loginFormFields = {
    loginEmail: '',
    loginPassword: ''
}

const registerFormFields = {
    registerFName: '',
    registerLName: '',
    registerEmail: '',
    registerPassword: '',
    registerPassword2: ''
}


const LoginPage = () => {
    const { startLogin, startRegister, errorMessage } = useAuthStore();

    const { loginEmail, loginPassword, onInputChange: onLoginInputChange } = useForm(loginFormFields);
    const { registerFName, registerLName, registerEmail, registerPassword, registerPassword2, onInputChange: onRegisterInputChange } = useForm(registerFormFields);
    const [selectedOption, setSelectedOption] = useState("Customer");
    const handleSelectChange = (e) => {
        setSelectedOption(e.target.value);
    };

    const loginSubmit = (event) => {
        event.preventDefault();
        startLogin({ email: loginEmail, password: loginPassword, role: selectedOption.toLowerCase() });
        console.log({ email: loginEmail, password: loginPassword, role: selectedOption.toLowerCase() });
    }


    const registerSubmit = (event) => {
        event.preventDefault();
        // console.log({ registerFName, registerLName, registerEmail, registerPassword, registerPassword2, });
        if (registerPassword != registerPassword2) {
            Swal.fire('Error de registro', 'Contreseña no son iguales', 'error');
            return;
        }
        startRegister({ email: registerEmail, password: registerPassword, fname: registerFName, lname: registerLName, })
    }

    useEffect(() => {
        if (errorMessage !== undefined) {
            Swal.fire('Error en la autenticación', errorMessage, 'error');
        }

    }, [errorMessage])


    return (
        <div className="container mx-auto flex justify-center items-center h-screen">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white p-8 rounded-md shadow-md">
                    <h3 className="text-2xl font-semibold mb-4">Ingreso</h3>
                    <form onSubmit={loginSubmit} className="space-y-4 text-black">
                        <div className="mb-4">
                            <input
                                type="text"
                                className="w-full p-2 border rounded-md"
                                placeholder="Correo"
                                name="loginEmail"
                                value={loginEmail}
                                onChange={onLoginInputChange}
                            />
                        </div>
                        <div className="mb-4">
                            <input
                                type="password"
                                className="w-full p-2 border rounded-md"
                                placeholder="Contraseña"
                                name="loginPassword"
                                value={loginPassword}
                                onChange={onLoginInputChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="userType">Tipo de usuario:</label>
                            <select id="userType" value={selectedOption} onChange={handleSelectChange}>
                                <option value="customer">Customer</option>
                                <option value="admin">Admin</option>
                            </select>

                            {/* {selectedOption && (
                                <p>Tipo de usuario seleccionado: {selectedOption}</p>
                            )} */}
                        </div>
                        <div className="mb-4">
                            <button
                                type="submit"
                                className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
                            >
                                Ingresar
                            </button>
                        </div>
                    </form>
                </div>

                <div className="bg-white p-8 rounded-md shadow-md">
                    <h3 className="text-2xl font-semibold mb-4">Registro</h3>
                    <form onSubmit={registerSubmit} className="space-y-4 text-black">
                        <div className="mb-4">
                            <input
                                type="text"
                                className="w-full p-2 border rounded-md"
                                placeholder="Nombre"
                                name="registerFName"
                                value={registerFName}
                                onChange={onRegisterInputChange}
                            />
                        </div>
                        <div className="mb-4">
                            <input
                                type="text"
                                className="w-full p-2 border rounded-md"
                                placeholder="Apellido"
                                name="registerLName"
                                value={registerLName}
                                onChange={onRegisterInputChange}
                            />
                        </div>
                        <div className="mb-4">
                            <input
                                type="email"
                                className="w-full p-2 border rounded-md"
                                placeholder="Correo"
                                name="registerEmail"
                                value={registerEmail}
                                onChange={onRegisterInputChange}
                            />
                        </div>
                        <div className="mb-4">
                            <input
                                type="password"
                                className="w-full p-2 border rounded-md"
                                placeholder="Contraseña"
                                name="registerPassword"
                                value={registerPassword}
                                onChange={onRegisterInputChange}
                            />
                        </div>
                        <div className="mb-4">
                            <input
                                type="password"
                                className="w-full p-2 border rounded-md"
                                placeholder="Repita la contraseña"
                                name="registerPassword2"
                                value={registerPassword2}
                                onChange={onRegisterInputChange}
                            />
                        </div>
                        <div className="mb-4">
                            <button
                                type="submit"
                                className="w-full bg-green-500 text-white p-2 rounded-md hover:bg-green-600"
                            >
                                Crear cuenta
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

    )
}

export default LoginPage;