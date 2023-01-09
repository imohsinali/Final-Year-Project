import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

// console.log(StateProvider);
import {TransactionsProvider} from './StateMangement/Admin'
import { createRoot } from 'react-dom/client';
const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <React.StrictMode>
    {/* <Provider store={store}> */}
      {/* <PersistGate persistor={persistedStore}> */}
      <TransactionsProvider> 

      {/* </PersistGate> */}
      <App/>
      </TransactionsProvider>

   {/* </Provider> */}
  
  </React.StrictMode>,
  // document.getElementById('root')
);
