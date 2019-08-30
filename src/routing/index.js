import Login from "../components/login";
import Home    from '../components/pantallas/home';
import Aplicacion from '../app';
import Inicio from '../containers/inicio';
import Perfil from "../components/perfil/perfil";


export const Sesion = {
  InisioSesion : {
     screen : Login
  }
};

export const Tabs = {
   Home : {
      screen : Aplicacion
   },
   CerrarSesion: {
     screen : Perfil
   },
};
