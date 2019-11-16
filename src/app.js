import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import {Button, Text, View, Title, CardItem, Icon, Badge} from 'native-base';
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
  state = {
    modalCarga: false,
    latitud: '',
    longitud: '',
  };

  posicionUsuario = () => {
    const watchID = Geolocation.watchPosition(
      position => {
        const latitud = position.coords.latitude;
        const longitud = position.coords.longitude;
        setInterval(() => {
          this.setState({latitud, longitud});
        }, 10000);
      },
      error => console.log('Error', error),
      {
        enableHighAccuracy: true,
        timeout: 1000,
        maximumAge: 10000,
      },
    );
    return () => Geolocation.clearWatch(watchID);
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

    // const {latitud, longitud} = this.state;

    // console.log(latitud, longitud);

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
            <Icon name="add" />
          </Button>
        </View>
        <CardItem style={{padding: 0, margin: 0, width: '100%'}}>
          <GuiasLista />
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
    position: 'absolute',
    bottom: '0%',
    left: '42%',
    paddingHorizontal: 24,
  },

  button: {
    borderRadius: 100,
    justifyContent: 'center',
    alignSelf: 'center',
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
