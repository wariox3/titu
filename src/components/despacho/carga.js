import React, { Component } from 'react';
import { Text } from 'react-native';
import Modals from "../../commons/Modal";
import FormDespacho from "./FormDespacho";
import PropTypes from 'prop-types';
import { NavigationActions } from 'react-navigation';

class Carga extends Component {

   state = {
      despacho       : "",
      operador       : "",
   };

   handleResetearCampos = () =>{    
      this.props.navigation.navigate('Home', {"operador" : this.state.operador})
      this.setState({
         despacho : "",
         operador : "",
      })
   }

   handleOnchange=(name, value)=>{
      this.setState({
         [name] : value
      })
   };

   render() {

      const { isVisible, onRequestClose, ListaDespachos, cargando } = this.props;
      const { despacho, operador } = this.state;

      return (
         <Modals
            onRequestClose  =  {onRequestClose}
            isVisible       =  {isVisible}
         >
            <Text>Despacho :</Text>
            <FormDespacho
               handlePress = {()=>{ ListaDespachos(operador,despacho); this.handleResetearCampos() }}
               OnChange    = {this.handleOnchange.bind(this)}
               despacho    = {despacho}
               operador    = {operador}
               cargando    = {cargando}
            />
         </Modals>
      )
   }
}

Carga.propTypes = {
   ListaDespachos  : PropTypes.func,
   onRequestClose  : PropTypes.func,
   isVisible       : PropTypes.bool,
   cargando        : PropTypes.bool,
};

export default Carga;
