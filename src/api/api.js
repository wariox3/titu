const BASE_API = 'http://159.65.52.53/cesio/public/index.php';
class Api {
    async getGuias(operador, despacho) {
        const query = await fetch(BASE_API+`/api/conductor/despacho/guias/${operador}/${despacho}`);
        const datos = await query.json();
        return datos;
    }    
}

export default new Api();
