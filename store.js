import {createStore, applyMiddleware} from 'redux';
import {persistStore, persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import getReducer from './reducers';

/*const store = createStore(reducer, {
    arGuiasGlobal: [],
    codigoDespacho: null,
    codigoOperador: null
})*/

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, getReducer());

export default () => {
  let store = createStore(persistedReducer, applyMiddleware());
  let persistor = persistStore(store);
  return {store, persistor};
};
