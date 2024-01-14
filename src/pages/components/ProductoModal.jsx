import Modal from 'react-modal';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useAuthStore, useCalendarStore, useForm, useUiStore } from '../../hooks';
import { useBonillaShopStore } from '../../hooks/useBonillaShopStore';
import { useDispatch, useSelector } from 'react-redux';


const registerFormFields = {
    registerNombre: '',
    registerMarca: '',
    registerModelo: '',
    registerPrecio: 0,
    registerGarantia: 0,
    registerColor: '',
    registerVoltaje: 0,
    registerAlto: 0,
    registerAncho: 0,
    registerProfundidad: 0,
    registerEficienciaEnergetica: '',
    registerPeso: 0,
    registerImageUrl: "https://www.yiwubazaar.com/resources/assets/images/default-product.jpg",
}

export const ProductoModal = () => {
    const {
        registerNombre,
        registerMarca,
        registerModelo,
        registerGarantia,
        registerPrecio,
        registerColor,
        registerVoltaje,
        registerAlto,
        registerAncho,
        registerProfundidad,
        registerEficienciaEnergetica,
        registerPeso,
        registerImageUrl,
        onInputChange: onRegisterInputChange } = useForm(registerFormFields);

    const { isDateModalOpen, closeDateModal } = useUiStore();
    const [formSubmitted, setFormSubmitted] = useState(false);
    const { startUploadingFiles, startCreatingProducto } = useBonillaShopStore();

    const customStyles = {
        content: {
            backgroundColor: true ? 'black' : 'white',
            top: '55%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            maxWidth: true ? '90vw' : '80vw',
            width: '100%'
        },
    };
    const onCloseModal = () => {
        closeDateModal();
    }

    const onSubmit = (event) => {
        event.preventDefault();
        setFormSubmitted(true);

        startCreatingProducto(
            {
                nombre: registerNombre,
                marca: registerMarca,
                modelo: registerModelo,
                garantia: registerGarantia,
                precio: registerPrecio,
                color: registerColor,
                voltaje: registerVoltaje,
                alto: registerAlto,
                ancho: registerAncho,
                profundidad: registerProfundidad,
                eficienciaEnergetica: registerEficienciaEnergetica,
                peso: registerPeso,
                imageUrl: registerImageUrl,
            }
        );
        closeDateModal();
        setFormSubmitted(false);
    }


    return (
        <Modal
            size="lg"
            isOpen={isDateModalOpen}
            onRequestClose={onCloseModal}
            style={customStyles}
        >
            <div className="container mx-auto flex justify-center items-center h-screen">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-white p-8 rounded-md shadow-md">
                        <h3 className="text-2xl font-semibold mb-1">Ingreso</h3>
                        <img src={registerImageUrl} className="EditarProducto-img" alt='Mochila' />

                    </div>

                    <div className="bg-white p-8 rounded-md shadow-md">
                        <form onSubmit={onSubmit} className="text-black grid grid-cols-2 gap-4">
                            <div className="mb-1">
                                <label className="block text-sm font-medium text-gray-600">
                                    Nombre
                                </label>
                                <input
                                    type="text"
                                    className="w-full p-2 border rounded-md"
                                    placeholder="Nombre"
                                    name="registerNombre"
                                    value={registerNombre}
                                    onChange={onRegisterInputChange}
                                />
                            </div>
                            <div className="mb-1">
                                <label className="block text-sm font-medium text-gray-600">
                                    Marca
                                </label>
                                <input
                                    type="text"
                                    className="w-full p-2 border rounded-md"
                                    placeholder="Marca"
                                    name="registerMarca"
                                    value={registerMarca}
                                    onChange={onRegisterInputChange}
                                />
                            </div>
                            <div className="mb-1">
                                <label className="block text-sm font-medium text-gray-600">
                                    Modelo
                                </label>
                                <input
                                    type="text"
                                    className="w-full p-2 border rounded-md"
                                    placeholder="Modelo"
                                    name="registerModelo"
                                    value={registerModelo}
                                    onChange={onRegisterInputChange}
                                />
                            </div>
                            <div className="mb-1">
                                <label className="block text-sm font-medium text-gray-600">
                                    Garantia
                                </label>
                                <input
                                    type="number"
                                    className="w-full p-2 border rounded-md"
                                    placeholder="Garantia"
                                    name="registerGarantia"
                                    value={registerGarantia}
                                    onChange={onRegisterInputChange}
                                />
                            </div>
                            <div className="mb-1">
                                <label className="block text-sm font-medium text-gray-600">
                                    Precio
                                </label>
                                <input
                                    type="number"
                                    className="w-full p-2 border rounded-md"
                                    placeholder="Precio"
                                    name="registerPrecio"
                                    value={registerPrecio}
                                    onChange={onRegisterInputChange}
                                />
                            </div>
                            <div className="mb-1">
                                <label className="block text-sm font-medium text-gray-600">
                                    Color
                                </label>
                                <input
                                    type="text"
                                    className="w-full p-2 border rounded-md"
                                    placeholder="Color"
                                    name="registerColor"
                                    value={registerColor}
                                    onChange={onRegisterInputChange}
                                />
                            </div>

                            <div className="mb-1">
                                <label className="block text-sm font-medium text-gray-600">
                                    Voltaje
                                </label>
                                <input
                                    type="number"
                                    className="w-full p-2 border rounded-md"
                                    placeholder="Voltaje"
                                    name="registerVoltaje"
                                    value={registerVoltaje}
                                    onChange={onRegisterInputChange}
                                />
                            </div>

                            <div className="mb-1">
                                <label className="block text-sm font-medium text-gray-600">
                                    Alto
                                </label>
                                <input
                                    type="number"
                                    className="w-full p-2 border rounded-md"
                                    placeholder="Alto"
                                    name="registerAlto"
                                    value={registerAlto}
                                    onChange={onRegisterInputChange}
                                />
                            </div>

                            <div className="mb-1">
                                <label className="block text-sm font-medium text-gray-600">
                                    Ancho
                                </label>
                                <input
                                    type="number"
                                    className="w-full p-2 border rounded-md"
                                    placeholder="Ancho"
                                    name="registerAncho"
                                    value={registerAncho}
                                    onChange={onRegisterInputChange}
                                />
                            </div>
                            <div className="mb-1">
                                <label className="block text-sm font-medium text-gray-600">
                                    Profundidad
                                </label>
                                <input
                                    type="number"
                                    className="w-full p-2 border rounded-md"
                                    placeholder="Profundidad"
                                    name="registerProfundidad"
                                    value={registerProfundidad}
                                    onChange={onRegisterInputChange}
                                />
                            </div>
                            <div className="mb-1">
                                <label className="block text-sm font-medium text-gray-600">
                                    Eficiencia Energetica
                                </label>
                                <input
                                    type="text"
                                    className="w-full p-2 border rounded-md"
                                    placeholder="Eficiencia Energetica"
                                    name="registerEficienciaEnergetica"
                                    value={registerEficienciaEnergetica}
                                    onChange={onRegisterInputChange}
                                />
                            </div>
                            <div className="mb-1">
                                <label className="block text-sm font-medium text-gray-600">
                                    Peso
                                </label>
                                <input
                                    type="number"
                                    className="w-full p-2 border rounded-md"
                                    placeholder="Peso"
                                    name="registerPeso"
                                    value={registerPeso}
                                    onChange={onRegisterInputChange}
                                />
                            </div>
                            <div className="mb-1">
                                <label className="block text-sm font-medium text-gray-600">
                                    Imagen Url
                                </label>
                                <input
                                    type="text"
                                    className="w-full p-2 border rounded-md"
                                    placeholder="ImageUrl"
                                    name="registerImageUrl"
                                    value={registerImageUrl}
                                    onChange={onRegisterInputChange}
                                />
                            </div>


                            <div className="mb-1">

                                <button
                                    type="submit"
                                    className="w-full bg-green-500 text-white p-2 rounded-md hover:bg-green-600"
                                >
                                    Agregar al catálogo
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        </Modal>
    );
}
