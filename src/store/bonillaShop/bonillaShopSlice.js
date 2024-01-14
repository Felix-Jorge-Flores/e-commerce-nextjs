import { createSlice } from '@reduxjs/toolkit';
import { convertEventsToDateEvents } from '../../helpers';

export const bonillaShopSlice = createSlice({
    name: 'bonillaShop',
    initialState: {
        isLoadingProductos: true,
        isLoadingProductosInSearch: true,
        isLoadingProductoByID: true,
        isLoadingPedidoByID: true,
        isCreatingProducto: false,
        isSetCantidadProducto: true,
        isLastPage: false,
        productos: [
            // tempEvent
        ],
        pedidos: [

        ],
        productosInSearch: [
            // tempEvent
        ],
        productoSelected: {
            imageUrl: '/assets/productos/Mochila.jpg',
            cantidad: 1,
        },
        pedidoSelected: {
            productos: []
        },
        carrito: [],
        // isSavingProducto: false,
        // activeEvent: null
    },
    reducers: {
        onLoadProducts: (state, { payload = [] }) => {
            state.isLoadingProductos = false;
            state.productos = payload;
            // payload.forEach(event => {
            //     const exists = state.events.some(dbEvent => dbEvent.id === event.id);
            //     if (!exists) {
            //         state.events.push(event);
            //     }
            // });
        },

        onLastPage: (state, { payload }) => {
            state.isLastPage = true;
        },
        onDeleteProduct: (state, { payload }) => {
            state.productos = state.productos.filter(producto => producto.productId !== payload);
        },

        onUpdateProduct: (state, { payload }) => {
            const index = state.productos.findIndex(producto => producto.productId === payload.productId);
            if (index !== -1) {
                state.productos[index] = payload;
            }
        },
        onLoadPedidos: (state, { payload = [] }) => {
            state.isLoadingProductos = false;
            state.pedidos = payload;
        },

        onLoadProductsInSearch: (state, { payload = [] }) => {
            state.isLoadingProductosInSearch = false;
            state.productosInSearch = payload;

        },
        onSelectProduct: (state, { payload }) => {
            state.productoSelected = payload;
        },
        onSelectPedido: (state, { payload }) => {
            state.pedidoSelected = payload;
            state.isLoadingPedidoByID = false;
        },

        onAddToCarrito: (state, { payload }) => {
            state.carrito.push(payload);
        },
        onAddToProductos: (state, { payload }) => {
            // state.productos.push(payload);
            state.productos.unshift(payload);

        },
        onAddToPedidoSelected: (state, { payload }) => {
            state.pedidoSelected.productos.push(payload);
        },
        onRemoveToCarrito: (state, { payload }) => {
            // state.carrito.push(payload);
            const index = state.carrito.findIndex(producto => {

                return producto.id === payload.id;
            }
            );
            if (index > -1) {
                state.carrito.splice(index, 1);
            }
            // console.log(index);

        },
        onFilterproductosInSearch: (state, { payload }) => {
            // state.carrito.push(payload);
            const index = state.productosInSearch.findIndex(producto => {

                return producto.id === payload;
            }
            );
            if (index > -1) {
                state.productosInSearch.splice(index, 1);
            }
            // console.log(index);

        },

        onRemoveToPedido: (state, { payload }) => {
            // state.carrito.push(payload);
            const index = state.pedidoSelected.productos.findIndex(producto => {

                return producto.id === payload.id;
            }
            );
            if (index > -1) {
                state.pedidoSelected.productos.splice(index, 1);
            }
            // console.log(index);

        },

        onLoadProductoByID: (state, { payload }) => {
            state.isLoadingProductoByID = false;
        },
        onLoadPedidoByID: (state, { payload }) => {
            state.isLoadingPedidoByID = false;
        },
        onCreateProducto: (state, { payload }) => {
            state.isCreatingProducto = true;
        },
        onCreatePedido: (state, { payload }) => {
            // state.isCreatingProducto = true;
            state.carrito = [];
        },
        setPhotosToSelectedProducto: (state, action) => {
            state.productoSelected.imageUrl = action.payload[0];
            state.isCreatingProducto = false;

        },
        setCantidadProductos: (state, action) => {
            state.productoSelected.cantidad = action.payload;
            state.isSetCantidadProducto = false;

            // state.isCreatingProducto = false;

        },
        onCreatedProducto: (state, { payload }) => {
            // state.isLoadingProductos = true;
            // state.isLoadingProductoByID = true;
            state.isCreatingProducto = false;
            // state.productos = [];
        },
        onAddCantidad: (state, { payload }) => {
            const index = state.carrito.findIndex(producto => {

                return producto.id === payload.id;
            }
            );
            if (index > -1) {
                state.carrito[index].cantidad = state.carrito[index].cantidad + 1;
            }
            // console.log(index);

        },
        onLessCantidad: (state, { payload }) => {

            const index = state.carrito.findIndex(producto => {

                return producto.id === payload.id;
            }
            );
            if (state.carrito[index].cantidad === 1) return;

            if (index > -1) {
                state.carrito[index].cantidad = state.carrito[index].cantidad - 1;
            }
            // console.log(index);

        },
        onAddCantidadPedidoProducto: (state, { payload }) => {
            const index = state.pedidoSelected.productos.findIndex(producto => {

                return producto.id === payload.id;
            }
            );
            if (index > -1) {
                state.pedidoSelected.productos[index].cantidad = state.pedidoSelected.productos[index].cantidad + 1;
            }
            // console.log(index);

        },
        onLessCantidadPedidoProducto: (state, { payload }) => {

            const index = state.pedidoSelected.productos.findIndex(producto => {

                return producto.id === payload.id;
            }
            );
            if (state.pedidoSelected.productos[index].cantidad === 1) return;

            if (index > -1) {
                state.pedidoSelected.productos[index].cantidad = state.pedidoSelected.productos[index].cantidad - 1;
            }
            // console.log(index);

        },
        onEditPedido: (state, { payload }) => {
            state.pedidoSelected.precioTotal = payload;
            // state.pedidoSelected.precioTotal = payload.precioTotal;

        },

        onChangePageNumber: (state, { payload }) => {
            state.numberPage = payload;
        },
        onChangeEstadoPedido: (state) => {
            if (state.pedidoSelected.estado === 'Pendiente') {
                state.pedidoSelected.estado = 'Entregado';
            } else {
                state.pedidoSelected.estado = 'Pendiente';
            }
            // state.pedidoSelected.precioTotal = payload.precioTotal;
        },

        onLogoutBonillaShop: (state) => {
            // state.isLoadingProductos = true;
            // state.isLoadingProductosInSearch = true;
            // state.isLoadingProductoByID = true;
            // state.isCreatingProducto = false;
            // state.isSetCantidadProducto = true;           
            state.carrito = [];
        }


    }
});


// Action creators are generated for each case reducer function
export const { onLoadProducts, onSelectProduct, onAddToCarrito, onLoadProductoByID, onCreateProducto,
    setPhotosToSelectedProducto, onCreatedProducto, onRemoveToCarrito, setCantidadProductos, onChangePageNumber, onUpdateProduct,
    onAddCantidad, onLessCantidad, onLoadProductsInSearch, onLogoutBonillaShop, onLoadPedidos, onSelectPedido, onLastPage,
    onRemoveToPedido, onAddToPedidoSelected, onEditPedido, onCreatePedido, onAddToProductos, onChangeEstadoPedido, onDeleteProduct,
    onAddCantidadPedidoProducto, onLessCantidadPedidoProducto, onFilterproductosInSearch } = bonillaShopSlice.actions;