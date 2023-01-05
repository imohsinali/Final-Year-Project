// import { createStore,applyMiddleware } from "redux";
import reducer from "./reducer";
import { persistStore,persistReducer } from "redux-persist";
import thunk from 'redux-thunk';

import storage from "redux-persist/lib/storage";
import SetTransform from "./SetTransfrom";
import { applyMiddleware, compose, createStore } from 'redux'


const perisitConfig={
    key:'main-root',
    version:1,
    storage,
    transforms: [SetTransform]
}
const persistedReducer=persistReducer(perisitConfig,reducer)
// const store=createStore(composeEnhancers, reducer,applyMiddleware(thunk))
// const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));
const mointer = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()


const middlewareEnhancer = applyMiddleware(thunk)

const composedEnhancers = compose(middlewareEnhancer,mointer )

const store = createStore(persistedReducer, composedEnhancers)

export const persistedStore=persistStore(store)

export default store 

