import Login from "../components/login";
import Home    from '../components/pantallas/home';
import Detalle from '../components/guia/detalle';
import Carga   from '../components/despacho/carga';
import Perfil from "../components/perfil/perfil";

export const Sesion = {
  InisioSesion : {
     screen : Login
  }
};

export const Tabs = {
   Home : {
      screen : Home
   },
   Perfil : {
     screen : Perfil
   },
   Detalle : {
      screen : Detalle
   },
   Carga : {
      screen : Carga
   },
};
