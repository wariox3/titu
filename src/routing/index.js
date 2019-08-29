import Login from "../components/login";
import Home    from '../components/pantallas/home';
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
   CerrarSesion: {
     screen : Perfil
   },
};
