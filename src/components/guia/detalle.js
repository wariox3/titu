import React, { Component } from 'react';
import { Text, Button, Image } from 'react-native';
import Modals from "../../commons/Modal";
import RNImagePicker from "react-native-image-picker";
import Spinner from '../../commons/Spinner';
import axios from 'axios'

class Detalle extends Component {

   state = {
      imageSource    : null,
      imgBase        : null,
      cargarImg      : false,
      cargando       : false,
   }

   handlePress = () => {
      fetch('http://192.168.0.102/cesio/public/index.php/api/conductor/guia/prueba/en/1', {
         method: 'GET'
      })
         .then( res => res.json())
         .then( (responseJson) => {
            console.log(responseJson)
            this.props.navigation.navigate('Home')
         })
         .catch((error) => {
            console.error(error);
         });
   };

   handleEntregarGuia= async ()=>{
      const { detalleGias:{codigoGuiaPk}, operador, handleAbrirDetalle } = this.props
      const { imgBase } = this.state;
      const url = "http://192.168.1.64/cesio/public/index.php/api/conductor/guia/cumplido"
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
            handleAbrirDetalle()
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
      const { isVisible, onRequestClose, detalleGias } = this.props;
      const { cargarImg, imageSource, cargando } = this.state

      const options = {
         title: 'Seleccionar Foto',
         takePhotoButtonTitle : 'Tomar foto',
         chooseFromLibraryButtonTitle : 'Abrir galeria',
         quality : 1,
      };

      return (
         <Modals onRequestClose = {onRequestClose} isVisible = {isVisible}>
            <Text>Detalle </Text>
            <Text>itemId : {detalleGias.codigoGuiaPk} </Text>
            <Text>itemDestinatario : {detalleGias.destinatario} </Text>
            <Text>itemDestino : {detalleGias.destino} </Text>
            <Button title = "Capturar Imagen" onPress={()=>this.SelectPhoto(options)} disabled={cargando || cargarImg}/>

            {cargando
               ? <Spinner/>
               : <Button onPress={()=>this.handleEntregarGuia()} title="Entregar" disabled={cargarImg}/>
            }

            {cargarImg
               ? <Spinner/>
               : <Image style={{ height : 250, width : 300, marginTop : 22}} source={imageSource} /> 

            }
         </Modals>
      )
   }
}

Detalle.defaultProp = {
   navigation : null,
};

export default Detalle;
