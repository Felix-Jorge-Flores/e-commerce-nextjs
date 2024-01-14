import { useEffect, useMemo, useRef, useState } from 'react';
import Modal from 'react-modal';
import 'sweetalert2/dist/sweetalert2.min.css';
import { useAuthStore, useCalendarStore, useForm, useUiStore } from '../../hooks';
import { useBonillaShopStore } from '../../hooks/useBonillaShopStore';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { useRouter } from 'next/router';


const registerFormFields = {
    productId: 0,
    marca: '',
    modelo: '',
    garantia: 0,
    color: '',
    voltaje: '',
    alto: '',
    ancho: '',
    profundidad: '',
    eficienciaEnergetica: '',
    peso: '',
    imageUrl: "https://www.yiwubazaar.com/resources/assets/images/default-product.jpg",
    category: ''
}
export const UpdateProductModal = () => {

    const { productoSelected, isCreatingProducto } = useSelector(state => state.bonillaShop);

    const { selectedProducto } = useBonillaShopStore();


    const router = useRouter();
    const redirectToHome = () => {
        router.push(`/Home`);
    };

    const {
        productId,
        nombre,
        marca,
        modelo,
        garantia,
        precio,
        color,
        voltaje,
        alto,
        ancho,
        profundidad,
        eficienciaEnergetica,
        peso,
        imageUrl,
        category,
        onInputChange: onRegisterInputChange, setFormState, formState } = useForm(registerFormFields);
    // const { registerFName, registerLName, registerEmail, registerPassword, registerPassword2, onInputChange: onRegisterInputChange } = useForm(registerFormFields);
    useEffect(() => {
        if (productoSelected !== null) {
            setFormState({ ...productoSelected });
        }
    }, [productoSelected])

    const { isDateModalOpen, closeDateModal } = useUiStore();
    const [formSubmitted, setFormSubmitted] = useState(false);

    const fileInputRef = useRef();
    const { startUploadingFiles, startUpdatingProducto, startDeleteProducto } = useBonillaShopStore();
    const customStyles = {
        content: {
            backgroundColor: true ? 'black' : 'white',
            top: '55%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            maxWidth: true ? '65vw' : '80vw',
            height: '90%',
            // width: '100%'
        },
    };


    const onCloseModal = () => {
        // console.log('cerrando Modal');
        closeDateModal();
    }

    const onSubmit = (event) => {

        event.preventDefault();
        setFormSubmitted(true);
        console.log(
            formState
        );
        startUpdatingProducto(formState);
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
            <div className="container mx-auto flex justify-center items-center">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-white p-8 rounded-md shadow-md">
                        <h3 className="text-2xl font-semibold ">Ingreso</h3>
                        <img src={imageUrl} className="EditarProducto-img" alt='Mochila' />
                        <div className="">
                            <button
                                type="submit"
                                className="w-full bg-red-600 text-white p-2 rounded-md hover:bg-red-700"
                                onClick={() => {
                                    startDeleteProducto();
                                    redirectToHome();
                                }}
                            >
                                Eliminar Producto
                            </button>
                        </div>
                    </div>

                    <div className="bg-white p-8 rounded-md shadow-md">
                        <form onSubmit={onSubmit} className="text-black grid grid-cols-2 gap-4">
                            <div className="">
                                <label className="block text-sm font-medium text-gray-600">
                                    Nombre
                                </label>
                                <input
                                    type="text"
                                    className="w-full p-2 border rounded-md"
                                    placeholder="Nombre"
                                    name="nombre"
                                    value={nombre}
                                    onChange={onRegisterInputChange}
                                />
                            </div>
                            <div className="">
                                <label className="block text-sm font-medium text-gray-600">
                                    Marca
                                </label>
                                <input
                                    type="text"
                                    className="w-full p-2 border rounded-md"
                                    placeholder="Marca"
                                    name="marca"
                                    value={marca}
                                    onChange={onRegisterInputChange}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-600">
                                    Modelo
                                </label>
                                <input
                                    type="text"
                                    className="w-full p-2 border rounded-md"
                                    placeholder=""
                                    name="modelo"
                                    value={modelo}
                                    onChange={onRegisterInputChange}
                                />
                            </div>
                            <div className="">
                                <label className="block text-sm font-medium text-gray-600">
                                    Garantia
                                </label>
                                <input
                                    type="number"
                                    className="w-full p-2 border rounded-md"
                                    placeholder="Garantia"
                                    name="garantia"
                                    value={garantia}
                                    onChange={onRegisterInputChange}
                                />
                            </div>
                            <div className="">
                                <label className="block text-sm font-medium text-gray-600">
                                    Precio
                                </label>
                                <input
                                    type="number"
                                    className="w-full p-2 border rounded-md"
                                    placeholder="Precio"
                                    name="precio"
                                    value={precio}
                                    onChange={onRegisterInputChange}
                                />
                            </div>
                            <div className="">
                                <label className="block text-sm font-medium text-gray-600">
                                    Color
                                </label>
                                <input
                                    type="text"
                                    className="w-full p-2 border rounded-md"
                                    placeholder="Color"
                                    name="color"
                                    value={color}
                                    onChange={onRegisterInputChange}
                                />
                            </div>

                            <div className="">
                                <label className="block text-sm font-medium text-gray-600">
                                    Voltaje
                                </label>
                                <input
                                    type="number"
                                    className="w-full p-2 border rounded-md"
                                    placeholder="Voltaje"
                                    name="voltaje"
                                    value={voltaje}
                                    onChange={onRegisterInputChange}
                                />
                            </div>

                            <div className="">
                                <label className="block text-sm font-medium text-gray-600">
                                    Alto
                                </label>
                                <input
                                    type="number"
                                    className="w-full p-2 border rounded-md"
                                    placeholder="Alto"
                                    name="alto"
                                    value={alto}
                                    onChange={onRegisterInputChange}
                                />
                            </div>

                            <div className="">
                                <label className="block text-sm font-medium text-gray-600">
                                    Ancho
                                </label>
                                <input
                                    type="number"
                                    className="w-full p-2 border rounded-md"
                                    placeholder="Ancho"
                                    name="ancho"
                                    value={ancho}
                                    onChange={onRegisterInputChange}
                                />
                            </div>
                            <div className="">
                                <label className="block text-sm font-medium text-gray-600">
                                    Profundidad
                                </label>
                                <input
                                    type="number"
                                    className="w-full p-2 border rounded-md"
                                    placeholder="Profundidad"
                                    name="profundidad"
                                    value={profundidad}
                                    onChange={onRegisterInputChange}
                                />
                            </div>
                            <div className="">
                                <label className="block text-sm font-medium text-gray-600">
                                    Eficiencia Energetica
                                </label>
                                <input
                                    type="text"
                                    className="w-full p-2 border rounded-md"
                                    placeholder="Eficiencia Energetica"
                                    name="eficienciaEnergetica"
                                    value={eficienciaEnergetica}
                                    onChange={onRegisterInputChange}
                                />
                            </div>
                            <div className="">
                                <label className="block text-sm font-medium text-gray-600">
                                    Peso
                                </label>
                                <input
                                    type="number"
                                    className="w-full p-2 border rounded-md"
                                    placeholder="Peso"
                                    name="peso"
                                    value={peso}
                                    onChange={onRegisterInputChange}
                                />
                            </div>
                            <div className="">
                                <label className="block text-sm font-medium text-gray-600">
                                    Imagen Url
                                </label>
                                <input
                                    type="text"
                                    className="w-full p-2 border rounded-md"
                                    placeholder="Imagen Url"
                                    name="imageUrl"
                                    value={imageUrl}
                                    onChange={onRegisterInputChange}
                                />
                            </div>

                            <div className="">
                                <button
                                    type="submit"
                                    className="w-full bg-green-500 text-white p-2 rounded-md hover:bg-green-600"
                                >
                                    Actualizar producto
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        </Modal>
    );
}
