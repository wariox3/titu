import React, { Component } from 'react';
import { Text, Button, Image } from 'react-native';
import Modals from "../../commons/Modal";
import RNImagePicker from "react-native-image-picker";
import Spinner from '../../commons/Spinner';
import axios from 'axios';
import API from '../../api/api';
import { connect } from 'react-redux';

function mapStateToProps(state) {   
   return {
      arGuia : state.arGuia,
      operador : state.codigoOperador,
      despacho: state.codigoDespacho
   }
}

class Detalle extends Component {

   state = {
      imageSource    : null,
      imgBase        : null,
      cargarImg      : false,
      cargando       : false,
      
   }


   handleEntregarGuia = async ()=>{
      const { operador, handleAbrirDetalle } = this.props
      const { codigoGuiaPk } = this.props.arGuia
      const { imgBase } = this.state;      
      const url = "http://159.65.52.53/cesio/public/index.php/api/conductor/guia/cumplido";      
      this.setState({ cargando : true })
      try{
         const response = await axios.post(url,{
            operador    : operador,
            guia        : codigoGuiaPk,
            imageString : imgBase
         });
         if(response.status){
            this.setState({ 
               cargando    : false,
               imageSource : null,
             });
            alert("La Entrega fue exitosa");
            const arrGuias = await API.getGuias(this.props.operador,this.props.despacho);                  
            this.props.dispatch({
                type: 'SET_GUIA_LISTA',
                payload: {
                    arGuias: arrGuias,
                }
            })             
            this.props.cerrar();
         }
      }catch(e){
         console.log(e)
      }
   }

   SelectPhoto= async (op)=>{      
      this.setState({ cargarImg : true })
      await RNImagePicker.showImagePicker(op, (response) => {
         if (response.didCancel) {
            this.setState({ cargarImg : false })
          } else if (response.error) {
            this.setState({ cargarImg : false })
          } else if (response.customButton) {
            console.log('User tapped custom button: ', response.customButton);
          } else {
            const source = { uri: response.uri };
            const base64 = response.data;
            if(response.uri){
               this.setState({
                  imageSource : source,
                  imgBase     : base64,
                  cargarImg   : false
               });
            } 
          }
       });
    };

   render() {
      const { isVisible, onRequestClose, detalleGias, cerrar, arGuia } = this.props;
      const { cargarImg, imageSource, cargando } = this.state

      console.log(this.props);

      const options = {
         title: 'Seleccionar Foto',
         takePhotoButtonTitle : 'Tomar foto',
         chooseFromLibraryButtonTitle : 'Abrir galeria',
         quality : 1,
      };

      return (
         <Modals onRequestClose = {onRequestClose} isVisible = {isVisible}>
            <Text>Detalle </Text>
            <Text>Guia: {arGuia.codigoGuiaPk} </Text>
            <Text>Destinatario: {arGuia.destinatario} </Text>
            <Text>Destino: {arGuia.destino} </Text>

            <Button title = "Capturar Imagen" onPress={()=>this.SelectPhoto(options)} disabled={cargando || cargarImg}/>
            <Text></Text>
            {cargando
               ? <Spinner/>
               : <Button onPress={()=>this.handleEntregarGuia()} title="Entregar" disabled={cargarImg}/>
            }

            {cargarImg
               ? <Spinner/>
               : <Image style={{ height : 250, width : 300, marginTop : 22}} source={imageSource} /> 

            }
            <Button title='Cancelar' onPress={cerrar}/>
         </Modals>
      )
   }
}

Detalle.defaultProp = {
   navigation : null,
};

export default connect(mapStateToProps)(Detalle);
