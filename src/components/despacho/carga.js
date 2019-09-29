import React, {Component} from 'react';
import API from '../../api/api';
import Modals from '../../commons/Modal';
import {StyleSheet} from 'react-native';
import {Button, Input, Item, Title, Text, View} from 'native-base';
import {connect} from 'react-redux';

function mapStateToProps(state) {
  return {
    despacho: state.codigoDespacho,
    operador: state.codigoOperador,
  };
}
class Carga extends Component {
  state = {
    des: this.props.despacho,
    ope: this.props.operador,
  };

  handleOnchaGe = (name, vale) => {
    this.setState({
      [name]: vale,
    });
  };

  cargarDespacho = async (operador, despacho) => {
    //debugger;
    this.props.dispatch({
      type: 'SET_PARAMETROS',
      payload: {
        codigoDespacho: despacho,
        codigoOperador: operador,
      },
    });
    const arrGuias = await API.getGuias(operador, despacho);
    this.props.dispatch({
      type: 'SET_GUIA_LISTA',
      payload: {
        arGuias: arrGuias,
      },
    });
    this.props.cerrar();
  };

  render() {
    const {
      operador,
      despacho,
      isVisible,
      onRequestClose,
      ListaDespachos,
      cargando,
      cerrar,
      cargarDespacho,
    } = this.props;

    return (
      <Modals onRequestClose={onRequestClose} isVisible={isVisible}>
        <Text>Despacho :</Text>

        <Item rounded>
          <Input
            autoCapitalize="none"
            placeholder="Operador"
            autoCorrect={false}
            onChangeText={pe => this.handleOnchaGe('ope', pe)}
            maxLength={2}
            value={this.state.ope}
          />
        </Item>

        <Item rounded>
          <Input
            autoCapitalize="none"
            keyboardType={'numeric'}
            placeholder="Despacho"
            autoCorrect={false}
            onChangeText={de => this.handleOnchaGe('des', de)}
            value={this.state.des}
          />
        </Item>

        <View style={styles.container_buttons}>
          <Button
            style={styles.button}
            onPress={() => this.cargarDespacho(this.state.ope, this.state.des)}>
            <Text>Cargar</Text>
          </Button>

          <Button onPress={cerrar} style={styles.button}>
            <Text>Cancelar</Text>
          </Button>
        </View>
      </Modals>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    borderRadius: 100,
    display: 'flex',
    marginVertical: 8,
  },
  container_buttons: {
    paddingHorizontal: 12,
  },
});

export default connect(mapStateToProps)(Carga);
