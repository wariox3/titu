import React from 'react';
import {connect} from 'react-redux';

import FormularioLogin from "./FormularioLogin";

function mapStateToProps(state) {
   return {
     codigoOperador: state.codigoOperador
   };
 }
class Login extends React.Component{

   state = {
      contraseña  : "",
      cargando    : false,
      usuario     : ""
   };

   handleOnchange = (name,value) =>{
      this.setState({
         [name] : value
      })
   };

   iniciarSesion = async () =>{
      const { usuario, contraseña } = this.state;
      const { navigate } = this.props.navigation;
      const url = `http://165.22.222.162/cesio/public/index.php/api/conductor/autenticar/${usuario}/${contraseña}`;
      this.setState({ cargando : true });
      try{
         const response    = await fetch(url);
         const res         = await response.json();
         const autenticar  =  res.autenticar;
         const operador  =  res.operador;

         if(autenticar){
            this.props.dispatch({
               type: 'SET_CODIGO_OPERADOR',
               payload: {
                  codigoOperador: operador,
               },
             });
            navigate("Home",{
               usuario : usuario
            });
            this.setState({
               usuario     : "",
               cargando    : false,
               contraseña  : "",
            });
         }else{
            alert("Usuario Incorrecto");
            this.setState({ cargando : false });
         }

      }catch (e) {
         console.log(e)
      }
   };

   render(){
      const { contraseña, usuario, cargando } = this.state;
      return(
         <FormularioLogin
            iniciarSesion  =  {()=>this.iniciarSesion()}
            contraseña     =  {contraseña}
            cargando       =  {cargando}
            OnChange       =  {this.handleOnchange.bind(this)}
            usuario        =  {usuario}
         />
      )
   }
}

export default connect(mapStateToProps)(Login);
