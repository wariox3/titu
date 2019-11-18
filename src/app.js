import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import {Button, Text, View, Title, CardItem} from 'native-base';
import {connect} from 'react-redux';
import Inicio from './containers/pantalla/inicio';
import GuiasLista from './containers/guia/guia-lista';
import Carga from './components/despacho/carga';
import Geolocation from '@react-native-community/geolocation';
import API from '../src/api/api';
import axios from 'axios';
import {PermissionsAndroid} from 'react-native';
import BackgroundTimer from 'react-native-background-timer';

function mapStateToProps(state) {
  return {
    despacho: state.codigoDespacho,
    operador: state.codigoOperador,
  };
}

class Home extends Component {
  state = {
    modalCarga: false,
    latitud: '',
    longitud: '',
    prueba: 0,
  };

  posicionUsuario = async () => {
    const watchID = Geolocation.watchPosition(
      position => {
        const latitud = position.coords.latitude;
        const longitud = position.coords.longitude;
        this.setState({latitud, longitud});
      },
      error => console.log('Error', error),
      {
        enableHighAccuracy: true,
        timeout: 2000,
        maximumAge: 5000,
      },
    );
    return () => Geolocation.clearWatch(watchID);
  };

  setPosicionUsuario = async () => {
    const {latitud, longitud} = this.state;
    const {operador, despacho} = this.props;
    const {
      state: {
        params: {usuario},
      },
    } = this.props.navigation;
    const url =
      'http://165.22.222.162/cesio/public/index.php/api/conductor/despacho/ubicacion';
    await axios.post(url, {
      operador: operador,
      longitud: longitud,
      latitud: latitud,
      despacho: despacho,
      usuario: usuario,
    });
  };

  requestLocationPermission = async () => {
    const chckLocationPermission = PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );
    if (chckLocationPermission === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('Tienes acceso para la ubicación');
    } else {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'La aplicación requiere permiso de ubicación',
            message:
              'Requerimos permiso de ubicación para obtener la ubicación del dispositivo Por favor, concédenos',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('Tienes acceso para la ubicación');
        } else {
          console.log('No tienes acceso a la ubicación');
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  async componentDidMount() {
    this.posicionUsuario();
    this.requestLocationPermission();

    BackgroundTimer.runBackgroundTimer(() => {
      this.setPosicionUsuario();
    }, 60000);

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
  }

  abrirModal = () => {
    this.setState({
      modalCarga: true,
    });
  };

  cerrarModal = () => {
    this.setState({
      modalCarga: false,
    });
  };

  render() {
    const {
      state: {
        params: {usuario},
      },
    } = this.props.navigation;
    const nombreUsuario = usuario;

    return (
      <>
        <Inicio>
          <View style={styles.title}>
            <Title>Informacion</Title>
          </View>
          <View style={styles.description}>
            <Text style={styles.colorText}>Usuario: {nombreUsuario}</Text>
            <Text style={styles.colorText}>
              Despacho: {this.props.despacho}
            </Text>
            <Text style={styles.colorText}>
              Operador: {this.props.operador}
            </Text>
          </View>
        </Inicio>

        <View style={styles.container_button}>
          <Button onPress={() => this.abrirModal()} style={styles.button}>
            <Text>Cargar Despacho</Text>
          </Button>
        </View>
        <CardItem style={{padding: 0, margin: 0, width: '100%'}}>
          <GuiasLista usuario={nombreUsuario} />
        </CardItem>

        <Carga
          isVisible={this.state.modalCarga}
          cerrar={() => this.cerrarModal()}
        />
      </>
    );
  }
}

const styles = StyleSheet.create({
  container_button: {
    width: '100%',
    marginTop: 12,
    paddingHorizontal: 24,
  },

  button: {
    display: 'flex',
    borderRadius: 100,
    justifyContent: 'center',
  },

  title: {
    width: '100%',
    display: 'flex',
    padding: 6,
    alignItems: 'center',
    marginBottom: 12,
  },

  description: {
    width: '100%',
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },

  colorText: {
    color: '#FFFFFF',
  },
});

export default connect(mapStateToProps)(Home);
