import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import {Button, Text, View, Title, CardItem} from 'native-base';
import {connect} from 'react-redux';
import Inicio from './containers/pantalla/inicio';
import GuiasLista from './containers/guia/guia-lista';
import Carga from './components/despacho/carga';
import Geolocation from '@react-native-community/geolocation';
import API from '../src/api/api';

function mapStateToProps(state) {
  return {
    despacho: state.codigoDespacho,
    operador: state.codigoOperador,
  };
}

class Home extends Component {
  static navigationOptions = () => {
    return {
      title: 'Inicio',
    };
  };

  state = {
    modalCarga: false,
    initialPosition: 'unknown',
    latitud: '',
    longitud: '',
  };

  watchID: ?number = null;

  posicionUsuario = async () => {
    
    await Geolocation.getCurrentPosition(
      position => {
        const initialPosition = JSON.stringify(position);
        this.setState({initialPosition});
      },
      error => console.log('Error', JSON.stringify(error)),
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 5000,
        distanceFilter: 1,
      },
    );
    
    this.watchID = await Geolocation.watchPosition(
      position => {
        const latitud = position.coords.latitude;
        const longitud = position.coords.longitude;
        this.setState({latitud, longitud});
      },
      error => console.log('Error', error),
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 5000,
        distanceFilter: 1,
      },
    );

  };

  async componentDidMount() {
    this.posicionUsuario();

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

  componentWillUnmount = () => {
    Geolocation.clearWatch(this.watchID);
  };

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
            <Text>Cargar despacho</Text>
          </Button>
        </View>
        <Text>{latitud}</Text>
        <Text>{longitud}</Text>
        <CardItem style={{padding: 0, margin: 0, width: '100%'}}>
          <GuiasLista nombreUsuario={nombreUsuario} />
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
    paddingHorizontal: 24,
    marginTop: 12,
    width: '100%',
  },

  button: {
    borderRadius: 100,
    justifyContent: 'center',
    display: 'flex',
  },

  title: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    padding: 6,
    marginBottom: 12,
  },

  description: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },

  colorText: {
    color: '#FFFFFF',
  },
});

export default connect(mapStateToProps)(Home);
