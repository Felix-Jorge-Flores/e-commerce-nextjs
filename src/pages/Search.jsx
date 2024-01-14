import { useEffect } from "react";
import ProductCard from "./components/ProductCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd } from '@fortawesome/free-solid-svg-icons';
import { useBonillaShopStore } from "@/hooks/useBonillaShopStore";
import { useSelector } from "react-redux";
import { useAuthStore, useUiStore } from "@/hooks";
import { ProductoModal } from "./components/ProductoModal";

export default function Search() {
    const { startLoadingProductos } = useBonillaShopStore();
    const { productos, productosInSearch } = useSelector(state => state.bonillaShop);
    const { openDateModal } = useUiStore();
    const { user } = useAuthStore();

    // useEffect(() => {
    //     startLoadingProductos();
    // }, []);

    return (
        <main className="flex flex-col items-center justify-between px-24 pt-2 bg-black">
            {/* < button hidden={!(user.role === 'admin')} className="bg-blue-50 text-black px-4 py-2 rounded"
                onClick={() => {
                    openDateModal();
                    console.log('Hola');
                }}
            >
                <FontAwesomeIcon icon={faAdd} className="mr-1" />
                <span>Agregar Producto</span>
            </button> */}

            {(productosInSearch.length > 0) ? <div className="flex flex-wrap justify-center">
                {productosInSearch.map((product) => (
                    <ProductCard key={product.productId} product={product} />
                ))}
            </div> : <h1 className="text-white text-2xl">No hay productos para esta búsqueda</h1>}
            <ProductoModal />
        </main >
    );
}
