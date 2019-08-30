import {createStore, applyMiddleware} from 'redux';
import {persistStore, persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import reducer from './reducers/guias';

/*const store = createStore(reducer, {
    arGuiasGlobal: [],
    codigoDespacho: null,
    codigoOperador: null
})*/

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducer)


const store = createStore(persistedReducer, {
    arGuias: [],
    codigoDespacho: null,
    codigoOperador: null,
    arGuia: []
})
const persistor = persistStore(store)

export { store, persistor };
