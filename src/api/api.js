const BASE_API = 'http://159.65.52.53/cesio/public/index.php';
class Api {
    async getGuias(operador, despacho) {
        if(operador && despacho) {
            const query = await fetch(BASE_API+`/api/conductor/despacho/guias/${operador}/${despacho}`);
            const datos = await query.json();
            return datos;
        } else {
            return [];
        }
    }    
}

export default new Api();
