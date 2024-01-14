import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { calendarApi } from '../api';
import { convertEventsToDateEvents } from '../helpers';
import { fileUpload } from '../helpers/fileUpload';
import {
    onAddToCarrito, onCreatedProducto,
    onCreateProducto, onLoadProductoByID,
    onLoadProducts, onRemoveToCarrito,
    onSelectProduct, setPhotosToSelectedProducto, onDeleteProduct,
    onAddCantidad, onLessCantidad, onLoadProductsInSearch, onLoadPedidos, onSelectPedido, onLessCantidadPedidoProducto, onAddCantidadPedidoProducto, onRemoveToPedido, onAddToPedidoSelected, onEditPedido, onCreatePedido, onAddToProductos, onChangePageNumber, onLastPage
} from '../store/bonillaShop/bonillaShopSlice';
import { useUiStore } from './useUiStore';
import { useRouter } from 'next/router';
// import { v2 as cloudinary } from 'cloudinary';

// cloudinary.config({
//     //yarn add cloudinary
//     //Extraer del dashboard de cloudinary
//     //yarn add -D setimmediate
//     cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//     api_key: process.env.CLOUDINARY_API_KEY,
//     api_secret: process.env.CLOUDINARY_API_SECRET,
//     secure: true,
// });


export const useBonillaShopStore = () => {

    const dispatch = useDispatch();
    const { isDateModalOpen, closeDateModal } = useUiStore();

    // const { productos } = useSelector(state => state.bonillaShop);
    const { user } = useSelector(state => state.auth);
    const { productoSelected, isSetCantidadProducto, pedidoSelected, productos } = useSelector(state => state.bonillaShop);
    const router = useRouter();

    const redirectTo = (route) => {
        router.push(`/${route}`);
        // selectedProducto(product);
    };

    const selectedProducto = (bonillaProduct) => {
        dispatch(onSelectProduct(bonillaProduct));
    }

    const resetProducts = () => {

        dispatch(onLoadProducts([]));
    }

    const chagePage = (pageNumber) => {
        dispatch(onChangePageNumber(pageNumber));
    }
    const selectedPedido = (bonillaProduct) => {
        dispatch(onSelectPedido(bonillaProduct));
    }


    const addToCarrito = (cantidad) => {

        let nuevoProdCarrito = { ...productoSelected }
        nuevoProdCarrito.cantidad = cantidad;
        // console.log(nuevoProdCarrito);
        dispatch(onAddToCarrito(nuevoProdCarrito));
    }

    const addToPedido = (cantidad) => {

        let nuevoProdPedido = { ...productoSelected }
        nuevoProdPedido.cantidad = cantidad;
        dispatch(onAddToPedidoSelected(nuevoProdPedido));
    }


    const removeToCarrito = (bonillaProduct) => {
        dispatch(onRemoveToCarrito(bonillaProduct));
    }
    const removeToPedido = (bonillaProduct) => {
        dispatch(onRemoveToPedido(bonillaProduct));
    }

    const addCantidad = (bonillaProduct) => {
        dispatch(onAddCantidad(bonillaProduct));
    }
    const lessCantidad = (bonillaProduct) => {
        dispatch(onLessCantidad(bonillaProduct));
    }
    const addCantidadPedidoProducto = (bonillaProduct) => {
        dispatch(onAddCantidadPedidoProducto(bonillaProduct));
    }
    const lessCantidadPedidoProducto = (bonillaProduct) => {
        dispatch(onLessCantidadPedidoProducto(bonillaProduct));
    }

    const startLoadingProductos = async () => {
        try {
            const { data } = await calendarApi.get('/products/view');
            dispatch(onLoadProducts(data));
        } catch (error) {
            console.log('Error cargando productos');
            console.log(error);

        }
    }

    const startLoadingProductosByPageNumber = async (page) => {
        try {
            const { data } = await calendarApi.get(`/products/viewPaged?page=${page}&sortBy=productId`);
            if (data.last) {
                dispatch(onLastPage());
                Swal.fire("Llegaste al último producto", "", "warning")
                return;
            }
            const todosContenidos = data.content.every(item =>
                productos.some(producto => producto.productId === item.productId)
            );
            // Imprimir el resultado
            if (todosContenidos) {
                console.log('Todos los elementos de data.content están en productos.');
            } else {
                console.log('Al menos un elemento de data.content no está en productos.');
                dispatch(onLoadProducts([...productos, ...data.content]));
            }
        } catch (error) {
            console.log('Error cargando productos');
            console.log(error);

        }
    }

    const startLoadingProductoByID = async (productoID) => {
        try {
            const { data } = await calendarApi.get(`/productos/${productoID}`);
            // console.log(data);
            dispatch(onSelectProduct(data.producto));

            // const productos = convertEventsToDateEvents();
            dispatch(onLoadProductoByID());
            // console.log(producto);

        } catch (error) {
            console.log('Error al cargar producto');
            console.log(error);

        }
    }


    const startLoadingProductoByName = async (query) => {
        try {
            const { data } = await calendarApi.get(`/products/search/${query}`);
            dispatch(onLoadProductsInSearch(data));

        } catch (error) {
            console.log('Error al cargar producto');
            console.log(error);
        }
    }

    const startLoadingProductoByProperty = async (propertyQuery) => {
        const { property, query } = propertyQuery;
        try {
            const { data } = await calendarApi.get(`/productos/property?${property}=${query}`);
            // const { data } = await calendarApi.get(`/productos/search/?nombre=mochilas`);

            // console.log(data);
            dispatch(onLoadProductsInSearch(data.productos));

            // const productos = convertEventsToDateEvents();
            // console.log(producto);

        } catch (error) {
            console.log('Error al cargar producto');
            console.log(error);

        }
    }



    const startCreatingProducto = async ({
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
    }) => {
        dispatch(onCreateProducto());
        // { nombre, precio, estado, color, imageUrl, categoria }
        // const imageUrl = productoSelected.imageUrl;
        try {
            const { data } = await calendarApi.post('/products/add', {
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
            });

            dispatch(onAddToProductos(data));
            dispatch(onCreatedProducto());
            Swal.fire('Producto creado exitosamente', '', 'success')
        } catch (error) {
            Swal.fire('Error creando producto', '', 'error');
            dispatch(onCreatedProducto());
            console.log('Error creando producto');
            console.log(error);

        }
    }

    const startCreatingPedido = async (productos, precioTotal, fechaInicial, estado) => {
        dispatch(onCreatePedido());
        // { nombre, precio, estado, color, imageUrl, categoria }
        // const user = productoSelected.imageUrl;
        try {
            const { data } = await calendarApi.post('/pedidos', { productos, precioTotal, fechaInicial, estado });
            // console.log(data);
            // const productos = convertEventsToDateEvents();
            // dispatch(onLoadProducts(data.productos));
            // console.log(productos);

        } catch (error) {
            Swal.fire('Error creando pedido', '', 'error');

            console.log('Error creando pedido');
            console.log(error);

        }
    }

    const startUpdatingProducto = async ({
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
    }) => {
        dispatch(onCreateProducto());
        // { nombre, precio, estado, color, imageUrl, categoria }
        // const imageUrl = productoSelected.imageUrl;
        try {
            const { data } = await calendarApi.put(`/products/update`, {
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
            });
            // console.log(data);
            // const productos = convertEventsToDateEvents();
            // dispatch(onLoadProducts(data.productos));
            // console.log(data);
            dispatch(onCreatedProducto());
            dispatch(onSelectProduct(data));
            Swal.fire('Cambios guardados exitosamente', 'Correcto', 'success');

        } catch (error) {
            Swal.fire('Error actualizando producto', '', 'error');
            dispatch(onCreatedProducto());
            console.log('Error actualizando producto');
            console.log(error);

        }
    }



    const startDeleteProducto = async () => {
        // { nombre, precio, estado, color, imageUrl, categoria }
        try {
            const { data } = await calendarApi.delete(`/products/remove/${productoSelected.productId}`);

            dispatch(onDeleteProduct(data.productId));
            Swal.fire('Producto eliminado exitosamente', '', 'error');
            closeDateModal();
            redirectTo('');


        } catch (error) {
            Swal.fire('Error eliminando producto', '', 'error');
            console.log('Error eliminando producto');
            console.log(error);

        }
    }


    const startUploadingFiles = async (files = []) => {
        try {
            dispatch(onCreateProducto());
            // console.log(files);
            // await fileUpload(files[0]);
            const fileUploadPromises = [];

            for (const file of files) {
                fileUploadPromises.push(fileUpload(file));
            }

            const photosUrls = await Promise.all(fileUploadPromises);

            // console.log(photosUrls);
            dispatch(setPhotosToSelectedProducto(photosUrls));
            dispatch(onCreatedProducto());
        } catch (error) {
            Swal.fire('Error al cargar foto del producto', '', 'error');
            console.log('Error al cargar foto del producto');
            console.log(error);

        }


    }


    const startLoadingPedidos = async () => {
        try {
            const { data } = await calendarApi.get('/pedidos');
            // console.log(data);
            // const productos = convertEventsToDateEvents();
            dispatch(onLoadPedidos(data.pedidos));
            // console.log(productos);

        } catch (error) {
            console.log('Error cargando pedidos');
            console.log(error);

        }
    }

    const startLoadingPedidoByID = async (pedidoID) => {
        try {
            const { data } = await calendarApi.get(`/pedidos/${pedidoID}`);
            // console.log(data);
            dispatch(onSelectPedido(data.pedido));

            // const productos = convertEventsToDateEvents();
            dispatch(onLoadProductoByID());
            // console.log(producto);

        } catch (error) {
            console.log('Error al cargar producto');
            console.log(error);

        }
    }


    const startUpdatingPedido = async ({ productos, precioTotal, fechaInicial, estado }) => {
        dispatch(onCreateProducto());

        try {
            const { data } = await calendarApi.put(`/pedidos/${pedidoSelected.id}`, { productos, precioTotal, fechaInicial, estado });
            dispatch(onCreatedProducto());
            Swal.fire('Cambios guardados exitosamente', 'Correcto', 'success');

        } catch (error) {
            Swal.fire('Error actualizando pedido', '', 'error');
            dispatch(onCreatedProducto());
            console.log('Error actualizando pedido');
            console.log(error);

        }
    }

    const editPedido = async (precioTotal) => {
        dispatch(onEditPedido(precioTotal));
    }


    return {
        //* Properties
        selectedProducto,
        addToCarrito,
        removeToCarrito,
        removeToPedido,
        addCantidad,
        addToPedido,
        lessCantidad,
        addCantidadPedidoProducto,
        lessCantidadPedidoProducto,
        editPedido,
        selectedPedido,
        chagePage,
        resetProducts,
        // activeEvent,
        // events,
        // hasEventSelected: !!activeEvent,
        //* Metodos
        // setActiveEvent,
        // startDeletingEvent,
        startLoadingProductos,
        startLoadingProductosByPageNumber,
        startLoadingProductoByID,
        startCreatingProducto,
        startUploadingFiles,
        startUpdatingProducto,
        startDeleteProducto,
        startLoadingProductoByName,
        startLoadingProductoByProperty,
        startLoadingPedidos,
        startLoadingPedidoByID,
        startUpdatingPedido,
        startCreatingPedido,
        // startSavingEvent,
    }
}
