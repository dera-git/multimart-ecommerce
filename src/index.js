import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle'
import './assets/css/style.css'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'

import App from './App';
import { BrowserRouter } from 'react-router-dom';
import store from './redux/store';
import { Provider } from 'react-redux';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <ToastContainer
          theme="dark"
          position="top-left"
          autoClose={2000}
          closeOnClick
          pauseOnHover={false}
        />
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);

// https://www.youtube.com/watch?v=4GMljXR1h78 vita
//https://www.youtube.com/watch?v=mB8ajdvRnC0 part2 vita
//https://www.youtube.com/watch?v=yZDo5IPATOE part3 vita
// https://www.youtube.com/watch?v=s8sp3KhBrGI part4 FIN

// Framer motion (npm install framer-motion) > animation
// npm install @reduxjs/toolkit react-redux
// npm install --save react-toastify > bulle de message

// Firebase > Create > enable google anlitycs > continue > Ajouter une applie pour demarrer </> > nom (enregistrer) > npm install firebase >
// firebase.confing.js > acceder à la console > créer > authentification > commencer > Adresse email/mdp > activer > enregistrer



//https://redux-toolkit.js.org/rtk-query/overview
// https://www.youtube.com/watch?v=u3KlatzB7GM&list=PL0Zuz27SZ-6M1J5I1w2-uZx36Qp6qhjKo > tuto