function guias(state = {}, action) {
    switch(action.type) {
        case 'SET_GUIA_LISTA': {
            return {...state, ...action.payload}
        }
        default:
             return state;
    }
}

export default guias;