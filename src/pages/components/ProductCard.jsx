import { useBonillaShopStore } from '@/hooks/useBonillaShopStore';
import { useRouter } from 'next/router';
import React from 'react';

const ProductCard = ({ product }) => {
  const router = useRouter();
  const { selectedProducto } = useBonillaShopStore();

  const redirectToDetails = () => {
    router.push(`/${product.productId}`);

    selectedProducto(product);
  };

  return (
    <div onClick={redirectToDetails} className="w-auto bg-white rounded-lg overflow-hidden shadow-lg m-2 transition-transform duration-300 ease-in-out transform hover:scale-105 cursor-pointer">
      <img className="w-full h-48 object-contain" src={product.imageUrl} alt={product.modelo} />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2 text-gray-800">{product.nombre}</div>
        <p className="text-gray-600 text-base">
          <span className="font-semibold">Marca:</span> {product.marca}<br />
          <span className="font-semibold">Modelo:</span> {product.modelo}<br />
          <span className="font-semibold">Color:</span> {product.color}<br />
          <span className="font-semibold">Garantía:</span> {product.garantia}<br />
          <div className="max-w-xs rounded overflow-hidden shadow-lg">
            <div className="bg-red-600 text-white font-extrabold text-center p-2">
              S/. {product.precio}
            </div>
            {/* Otros elementos de la tarjeta, como nombre del producto, imagen, etc. */}
          </div>


        </p>
      </div>
      <div className="px-6 py-4">
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
          {product.garantia} año(s) de garantía
        </span>
      </div>
    </div>
  );
};

export default ProductCard;
