import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faPlus, faMinus, faShop, faEdit, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { UpdateProductModal } from './components/UpdateProductModal';
import { useAuthStore, useUiStore } from '@/hooks';
import { useSelector } from 'react-redux';
import { useBonillaShopStore } from '@/hooks/useBonillaShopStore';

const ProductDetailsPage = () => {
  const router = useRouter();
  const { productId } = router.query;
  const { productoSelected } = useSelector(state => state.bonillaShop);
  const { startLoadingProductoByID } = useBonillaShopStore();
  const [quantity, setQuantity] = useState(1);
  const { openDateModal } = useUiStore();
  const { user } = useAuthStore();


  const volt = 'V';
  const size = 'cm';
  const weight = 'Kg';
  const warranty = 'año(s)';

  useEffect(() => {
    startLoadingProductoByID(productId);
  }, []); // Dependencia vacía para ejecutar el efecto solo una vez al montar el componente

  const handleIncreaseQuantity = () => {
    setQuantity(prevQuantity => prevQuantity + 1);
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(prevQuantity => prevQuantity - 1);
    }
  };

  if (!productoSelected) {
    return <p className="text-center">Cargando...</p>;
  }

  return (
    <div className="max-w-full px-24 xl:px-24 py-10 bg-black overflow-hidden relative">
      <div
        className="absolute inset-0 bg-cover bg-center filter blur-3xl opacity-60"
        style={{ backgroundImage: `url(${productoSelected.imageUrl})` }}
      ></div>
      <h1 className="text-white text-4xl font-bold mb-4 z-1 relative text-center">{productoSelected.nombre}</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 z-1 relative mx-auto max-w-6xl">
        {/* Columna Izquierda */}
        <div className="text-white text-center">
          <p className="mb-4 text-xl">
            <span className="font-bold">Marca:</span> {productoSelected.marca}<br />
            <span className="font-bold">Modelo:</span> {productoSelected.modelo}<br />
            <span className="font-bold">Color:</span> {productoSelected.color}<br />
            <span className="font-bold">Garantía:</span> {productoSelected.garantia} {warranty} <br />
            <span className="font-bold">Precio:</span> S/.{productoSelected.precio}<br />
          </p>
        </div>

        {/* Columna Central - Imagen */}
        <div className="md:col-span-1 text-center">
          <img className="w-full h-auto mb-4 rounded-lg shadow-lg mx-auto" src={productoSelected.imageUrl} alt={productoSelected.nombre} />
        </div>

        {/* Columna Derecha */}
        <div className="text-white text-center">
          <p className="mb-4 text-xl">
            <span className="font-bold">Voltaje:</span> {productoSelected.voltaje} {volt}<br />
            <span className="font-bold">Alto:</span> {productoSelected.alto} {size}<br />
            <span className="font-bold">Ancho:</span> {productoSelected.ancho} {size}<br />
            <span className="font-bold">Profundidad:</span> {productoSelected.profundidad} {size}<br />
            <span className="font-bold">Eficiencia Energética:</span> {productoSelected.eficienciaEnergetica}<br />
            <span className="font-bold">Peso:</span> {productoSelected.peso} {weight}<br />
          </p>
          <div className="flex items-center mb-4 justify-center">
            <button
              className="bg-blue-900 text-white px-4 py-2 rounded-l"
              onClick={handleDecreaseQuantity}
            >
              <FontAwesomeIcon icon={faMinus} />
            </button>
            <input
              type="text"
              className="text-black text-center w-12 mx-2"
              value={quantity}
              readOnly
            />
            <button
              className="bg-blue-900 text-white px-4 py-2 rounded-r"
              onClick={handleIncreaseQuantity}
            >
              <FontAwesomeIcon icon={faPlus} />
            </button>
          </div>
          <div className="flex flex-col gap-4">
            <button className="bg-blue-900 text-white px-4 py-2 rounded" onClick={() => { }}>
              <FontAwesomeIcon icon={faShop} className="mr-1" />
              <span>Agregar al carrito</span>
            </button>
            {user.role === 'admin' && (
              <button className="bg-blue-900 text-white px-4 py-2 rounded" onClick={() => {
                openDateModal();
                // selectedProducto(productoBase);
                console.log('HolaDesdeProductPage');
              }}>
                <FontAwesomeIcon icon={faEdit} className="mr-1" />
                <span>Editar</span>
              </button>
            )}
          </div>
        </div>
      </div>
      <UpdateProductModal />
    </div>


  );
};

export default ProductDetailsPage;
