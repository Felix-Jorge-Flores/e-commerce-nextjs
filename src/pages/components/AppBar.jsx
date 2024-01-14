import React, { useMemo, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faShoppingCart, faUser, faTags, faEnvelope, faSearch, faBars } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import { useAuthStore } from '@/hooks';
import { useRouter } from 'next/router';
import { useBonillaShopStore } from '@/hooks/useBonillaShopStore';

const AppBar = () => {
  const { status, user, errorMessage } = useSelector(state => state.auth);
  const { startLogout } = useAuthStore();
  const router = useRouter();
  const { startLoadingProductoByName } = useBonillaShopStore();

  const [searchQuery, setSearchQuery] = useState('');
  const [showOptions, setShowOptions] = useState(true);

  const redirectTo = (route) => {
    router.push(`/${route}`);
  };

  useMemo(() => {
    if (searchQuery.length === 0) return;
    startLoadingProductoByName(searchQuery)
  }, [searchQuery])

  const handleToggleOptions = () => {
    setShowOptions(!showOptions);
  };

  return (
    <nav className="bg-blue-900 p-4 text-white w-full">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center mb-4 md:mb-0">
          <p className="text-3xl font-extrabold">Bonilla Shop</p>
        </div> 
        <div className="flex items-center space-x-4 md:space-x-2">
          <div className={`relative md:flex-grow`}>
            <input
              type="text"
              className="text-black border rounded-md py-1 px-2"
              placeholder="Buscar"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button
              className="text-black absolute right-0 top-0 h-full px-2"
              onClick={() => { redirectTo('Search') }}
            >
              <FontAwesomeIcon icon={faSearch} />
            </button>
          </div>
          <div>
          </div>
          <button
            className="md:hidden text-white"
            onClick={handleToggleOptions}
          >
            <FontAwesomeIcon icon={faBars} />

          </button>
          <div className={`${showOptions ? 'block' : 'hidden'}`}>
            <div className="md:flex items-center space-x-4">
              <button onClick={() => redirectTo('')} className="text-white flex items-center space-x-2">
                <FontAwesomeIcon icon={faHome} className="mr-1" />
                <span>Inicio</span>
              </button>
              <button onClick={() => redirectTo('')} className="text-white flex items-center space-x-2">
                <FontAwesomeIcon icon={faTags} className="mr-1" />
                <span>Productos</span>
              </button>
              {/* <button onClick={() => redirectTo('')} className="text-white flex items-center space-x-2">
              <FontAwesomeIcon icon={faTags} className="mr-1" />
              <span>Ofertas</span>
              </button>
              <button onClick={() => redirectTo('')} className="text-white flex items-center space-x-2">
              <FontAwesomeIcon icon={faEnvelope} className="mr-1" />
              <span>Contacto</span>
            </button> */}
              <button onClick={() => redirectTo('')} className="text-white flex items-center space-x-2">
                <FontAwesomeIcon icon={faShoppingCart} className="mr-1" />
                <span>Carrito</span>
              </button>
            </div>
          </div>
          {
            !(status == 'authenticated') ? < button onClick={() => redirectTo('LoginPage')} className="bg-blue-50 text-black px-4 py-2 rounded">
              <FontAwesomeIcon icon={faUser} className="mr-1" />
              <span>Iniciar Sesión</span>
            </button> :
              < button className="bg-blue-50 text-black px-4 py-2 rounded" onClick={startLogout}>
                <FontAwesomeIcon icon={faUser} className="mr-1" />
                <span>Cerrar Sesión</span>
              </button>
          }
        </div>
      </div>
    </nav >
  );
};

export default AppBar;
