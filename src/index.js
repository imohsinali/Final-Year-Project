import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

// console.log(StateProvider);
import {TransactionsProvider} from './StateMangement/Admin'
// store.subscribe(()=>console.log(store.getState()))
ReactDOM.render(
  <React.StrictMode>
    {/* <Provider store={store}> */}
      {/* <PersistGate persistor={persistedStore}> */}
      <TransactionsProvider> 

      {/* </PersistGate> */}
      <App/>
      </TransactionsProvider>

   {/* </Provider> */}
  
  </React.StrictMode>,
  document.getElementById('root')
);
