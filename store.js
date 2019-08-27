import { createStore } from 'redux';
import reducer from './reducers/guias';
const store = createStore(reducer, {})

export default store;