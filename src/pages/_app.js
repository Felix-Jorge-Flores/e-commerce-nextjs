import '@/styles/globals.css'
import { Provider } from 'react-redux';
import { store } from '../store';


import Modal from 'react-modal';
import { useEffect } from 'react';
import AppBar from './components/AppBar';

export default function App({ Component, pageProps }) {
  useEffect(() => {
    Modal.setAppElement('#__next'); // Define el elemento de la aplicación
  }, []);

  return <Provider store={store}>
    <>
      <AppBar />
      <Component {...pageProps} />
    </>
  </Provider>
}
