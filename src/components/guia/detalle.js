import React, { Component } from 'react';
import { Text, Button, Image } from 'react-native';
import Modals from "../../commons/Modal";
import RNImagePicker from "react-native-image-picker";
import Spinner from '../../commons/Spinner';
import axios from 'axios'

class Detalle extends Component {

   state = {
      imageSource    : null,
      cargarImg      : false
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
      const url = "http://192.168.1.64/cesio/public/index.php/api/conductor/guia/cumplido"
      try{
         const response = await axios.post(url,{
            operador    :"en",
            guia        : 3008897,
            imageString : "http://raulperez.tieneblog.net/wp-content/uploads/2015/09/tux.jpg"
         });
         console.log(response);
      }catch(e){
         console.log(e)
      }
   }

   SelectPhoto= async (op)=>{      
      this.setState({ cargarImg : true })
      await RNImagePicker.showImagePicker(op, (response) => {
          const source = { uri: response.uri };
          if(response.uri){
             this.setState({
                imageSource : source,
                cargarImg   : false
             });
          }
       });
    };

   render() {
      const { isVisible, onRequestClose, detalleGias } = this.props;
      const { cargarImg, imageSource } = this.state

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
            <Button title = "Capturar Imagen" onPress={()=>this.SelectPhoto(options)}/>
            <Button onPress={()=>this.handleEntregarGuia()} title="Entregar"/>

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
