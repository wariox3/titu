import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import {Button, Text, View, H2, Title, Card, CardItem} from 'native-base';
import {connect} from 'react-redux';
import Inicio from './containers/pantalla/inicio';
import GuiasLista from './containers/guia/guia-lista';
import Carga from './components/despacho/carga';
import API from '../src/api/api';

function mapStateToProps(state) {
  return {
    despacho: state.codigoDespacho,
    operador: state.codigoOperador,
  };
}

class AppLayout extends Component {
  static navigationOptions = () => {
    return {
      title: 'Inicio',
    };
  };
  state = {
    modalCarga: true,
  };
  async componentDidMount() {
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

        <Card>
          <View style={styles.container_button}>
            <Button onPress={() => this.abrirModal()} style={styles.button}>
              <Text>Cargar despacho</Text>
            </Button>
          </View>
          <CardItem>
            <GuiasLista />
          </CardItem>
        </Card>

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

export default connect(mapStateToProps)(AppLayout);
