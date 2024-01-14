import { useEffect, useState } from "react";
import ProductCard from "./components/ProductCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd } from "@fortawesome/free-solid-svg-icons";
import { useBonillaShopStore } from "@/hooks/useBonillaShopStore";
import { useSelector } from "react-redux";
import { useAuthStore, useUiStore } from "@/hooks";
import { ProductoModal } from "./components/ProductoModal";

export default function HomeBonilla() {
  const { startLoadingProductosByPageNumber } = useBonillaShopStore();
  const { productos, isLastPage } = useSelector((state) => state.bonillaShop);
  const { openDateModal } = useUiStore();
  const { user, status } = useAuthStore();
  const [pageNumber, setPageNumber] = useState(0);

  useEffect(() => {
    startLoadingProductosByPageNumber(pageNumber);
  }, [pageNumber, productos]);

  const handleLoadMore = () => {
    setPageNumber((prevPageNumber) => prevPageNumber + 1);
  };



  return (
    <main className="flex flex-col items-center justify-between px-4 md:px-24 pt-2 bg-black">
      {(status === 'authenticated') && (
        <div className={`dashboard-card ${status === 'authenticated' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'} border border-gray-300 rounded-md p-4 m-4`}>
          <div>
            <h1 className="text-4xl font-bold">
              {(user.role==="admin")?'ADMINISTRADOR':'CLIENTE'}
            </h1>
            <h1 className="text-2xl font-bold">
              Autenticado
            </h1>
          </div>
        </div>
      )}
      <button
        hidden={!(user.role === "admin")}
        className="bg-blue-50 text-black px-4 py-2 rounded"
        onClick={() => {
          openDateModal();
        }}
      >
        <FontAwesomeIcon icon={faAdd} className="mr-1" />
        <span>Agregar Producto</span>
      </button>
      {productos && (
        <div className="flex flex-wrap justify-center">
          {productos.map((product) => (
            <ProductCard key={product.productId} product={product} />
          ))}
        </div>
      )}
      <ProductoModal />
      <div className="flex justify-center m-4">
        <button
          className="bg-blue-900 text-white px-4 py-2 rounded"
          hidden={isLastPage}
          onClick={handleLoadMore}
        >
          Cargar más productos
        </button>
      </div>
    </main>
  );
}
