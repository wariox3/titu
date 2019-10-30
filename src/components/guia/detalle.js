import React, {Component} from 'react';
import {Image, StyleSheet} from 'react-native';
import {Button, View, Text} from 'native-base';
import Modals from '../../commons/Modal';
import RNImagePicker from 'react-native-image-picker';
import Spinner from '../../commons/Spinner';
import axios from 'axios';
import API from '../../api/api';
import {connect} from 'react-redux';

function mapStateToProps(state) {
  return {
    arGuia: state.arGuia,
    operador: state.codigoOperador,
    despacho: state.codigoDespacho,
  };
}

class Detalle extends Component {
  state = {
    imageSource: null,
    imgBase: null,
    cargarImg: false,
    cargando: false,
  };

  handleEntregarGuia = async () => {
    const {operador, handleAbrirDetalle} = this.props;
    const {codigoGuiaPk} = this.props.arGuia;
    const {imgBase} = this.state;
    const url =
      'http://165.22.222.162/cesio/public/index.php/api/conductor/guia/cumplido';
    this.setState({cargando: true});
    try {
      const response = await axios.post(url, {
        operador: operador,
        guia: codigoGuiaPk,
        imageString: imgBase,
      });
      if (response.status) {
        this.setState({
          cargando: false,
          imageSource: null,
        });
        alert('La Entrega fue exitosa');
        const arrGuias = await API.getGuias(
          this.props.operador,
          this.props.despacho,
        );
        this.props.dispatch({
          type: 'SET_GUIA_LISTA',
          payload: {
            arGuias: arrGuias,
          },
        });
        this.props.cerrar();
      }
    } catch (e) {
      console.log(e);
    }
  };

  SelectPhoto = async op => {
    this.setState({cargarImg: true});
    await RNImagePicker.showImagePicker(op, response => {
      if (response.didCancel) {
        this.setState({cargarImg: false});
      } else if (response.error) {
        this.setState({cargarImg: false});
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = {uri: response.uri};
        const base64 = response.data;
        if (response.uri) {
          this.setState({
            imageSource: source,
            imgBase: base64,
            cargarImg: false,
          });
        }
      }
    });
  };

  clearImag = () => {
    this.setState({
      imageSource: null,
      imgBase: null,
    });
  };

  render() {
    const {isVisible, onRequestClose, cerrar, arGuia} = this.props;
    const {cargarImg, imageSource, cargando} = this.state;

    const options = {
      title: 'Seleccionar Foto',
      takePhotoButtonTitle: 'Tomar foto',
      chooseFromLibraryButtonTitle: 'Abrir galeria',
      quality: 1,
    };

    return (
      <Modals onRequestClose={onRequestClose} isVisible={isVisible}>
        <Text>Detalle </Text>
        <View style={{display: 'flex', flexDirection: 'row'}}>
          <Text style={{fontWeight: 'bold'}}>Guia: </Text>
          <Text>{arGuia.codigoGuiaPk}</Text>
        </View>
        <View style={{display: 'flex', flexDirection: 'row'}}>
          <Text style={{fontWeight: 'bold'}}>Destinatario: </Text>
          <Text>{arGuia.destinatario}</Text>
        </View>
        <View style={{display: 'flex', flexDirection: 'row'}}>
          <Text style={{fontWeight: 'bold'}}>Destino: </Text>
          <Text>{arGuia.destino}</Text>
        </View>

        <View style={{marginVertical: 22}}>
          <Button
            style={styles.button}
            onPress={() => this.SelectPhoto(options)}
            disabled={cargando || cargarImg}>
            <Text>Capturar Imagen</Text>
          </Button>
        </View>

        {cargando ? (
          <Spinner />
        ) : (
          <Button
            style={styles.button}
            onPress={() => this.handleEntregarGuia()}
            disabled={cargarImg}>
            <Text>Entregar</Text>
          </Button>
        )}

        {cargarImg ? (
          <Spinner />
        ) : (
          <Image
            style={{
              height: imageSource ? 215 : 0,
              width: 300,
              marginVertical: imageSource ? 22 : 15,
            }}
            source={imageSource}
          />
        )}
        <Button
          style={styles.button}
          title="Cancelar"
          onPress={() => {
            cerrar();
            this.clearImag();
          }}>
          <Text>Cancelar</Text>
        </Button>
      </Modals>
    );
  }
}

Detalle.defaultProp = {
  navigation: null,
};

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    borderRadius: 100,
    display: 'flex',
  },
});

export default connect(mapStateToProps)(Detalle);
