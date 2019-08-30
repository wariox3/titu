function guias(state = {}, action) {
    switch(action.type) {
        case 'SET_GUIA_LISTA': {
            return {...state, ...action.payload}
        }
        case 'SET_PARAMETROS': {
            return {...state, ...action.payload}
        }     
        case 'SET_GUIA_SELECCIONADA': {
            return {...state, ...action.payload}
        }             
        default:
            return state;
    }
}

export default guias;