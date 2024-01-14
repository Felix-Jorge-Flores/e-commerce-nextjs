import { useSelector } from "react-redux";


export const getProductoByID = (id) => {
    const { productos } = useSelector(state => state.bonillaShop);

    return productos.find(producto => producto._id === id);

}