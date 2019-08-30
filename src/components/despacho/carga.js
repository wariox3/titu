import React, { Component } from 'react';
import { Text, Button, TextInput } from 'react-native';
import Modals from "../../commons/Modal";
import API from '../../api/api';
import { connect } from 'react-redux';

function mapStateToProps(state) {   
   return {
       despacho: state.codigoDespacho,
       operador: state.codigoOperador
   }
 }
class Carga extends Component {

   state = {
      des: this.props.despacho,
      ope: this.props.operador
   }

   handleOnchaGe=(name, vale)=>{
      this.setState({
         [name] : vale
      })
   }

   cargarDespacho = async (operador, despacho) => {
      //debugger;
      this.props.dispatch({
          type: 'SET_PARAMETROS',
          payload: {
              codigoDespacho: despacho,
              codigoOperador: operador            
          }
      })        
      const arrGuias = await API.getGuias(operador,despacho);                  
      this.props.dispatch({
          type: 'SET_GUIA_LISTA',
          payload: {
              arGuias: arrGuias,
          }
      })
      this.props.cerrar();
  }  

   render() {

      const { operador, despacho, isVisible, onRequestClose, ListaDespachos, cargando, cerrar, cargarDespacho } = this.props;

      return (
         <Modals
            onRequestClose  =  {onRequestClose}
            isVisible       =  {isVisible}
         >
            <Text>Despacho :</Text>
            <TextInput
            underlineColorAndroid   = "black"
            autoCapitalize          = 'none'            
            placeholder             = "Operador"
            autoCorrect             = {false}
            onChangeText            = {(pe)=>this.handleOnchaGe("ope", pe)}
            maxLength               = {2}
            value                   = {this.state.ope}
         />

         <TextInput
            underlineColorAndroid   = "black"
            autoCapitalize          = 'none'
            keyboardType            = {"numeric"}           
            placeholder             = "Despacho"
            autoCorrect             = {false}
            onChangeText            = {(de)=>this.handleOnchaGe("des", de)}
            value                   = {this.state.des}
         />
         
            <Button               
               onPress  =  {()=>this.cargarDespacho(this.state.ope,this.state.des)}
               title    =  "Cargar"
            />

            <Button title='Cancelar' onPress={cerrar}/>
         </Modals>
      )
   }
}

export default connect(mapStateToProps)(Carga);
