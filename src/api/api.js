const BASE_API = 'http://159.65.52.53/cesio/public/index.php';
class Api {
    async getGuias() {
        const query = await fetch(BASE_API+'/api/conductor/despacho/guias/en/615');
        const datos = await query.json();        
        console.log(datos);
        return datos;   
    }    
}

export default new Api();