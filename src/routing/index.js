import Login from "../components/login";

import Aplicacion from '../app';
import Inicio from '../containers/pantalla/inicio';
import Perfil from "../components/perfil/perfil";

export const Sesion = {
  InisioSesion : {
     screen : Login,
     screen : Aplicacion
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
