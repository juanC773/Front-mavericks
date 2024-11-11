import './index.css'; //No borrar, es el root de tailwind
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
//import FirstComponent from './components/first';
import { store, persistor } from './store';
import NavBar from './components/Navbar';

//Router
import { RouterProvider } from 'react-router-dom';
import { routes } from './routes/Router';



ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>

      <NavBar />
      <RouterProvider router={routes} />
      

    </PersistGate>
  </Provider>
);
