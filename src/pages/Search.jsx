import ProductCard from "./components/ProductCard";
import { useSelector } from "react-redux";
import { ProductoModal } from "./components/ProductoModal";

export default function Search() {
    const { productosInSearch } = useSelector(state => state.bonillaShop);


    return (
        <main className="flex flex-col items-center justify-between px-24 pt-2 bg-black">

            {(productosInSearch.length > 0) ? <div className="flex flex-wrap justify-center">
                {productosInSearch.map((product) => (
                    <ProductCard key={product.productId} product={product} />
                ))}
            </div> : <h1 className="text-white text-2xl">No hay productos para esta búsqueda</h1>}
            <ProductoModal />
        </main >
    );
}
