import React, {Component} from 'react';
import API from '../../api/api';
import Modals from '../../commons/Modal';
import {StyleSheet} from 'react-native';
import {Button, Input, Item, H3, Text, View, Picker, Icon} from 'native-base';
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
    novedad: '',
  };

  handleOnchaGe = (name, vale) => {
    this.setState({
      [name]: vale,
    });
  };

  cargarDespacho = async (operador, despacho) => {
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
    this.setState({
      des: '',
      ope: '',
    });
    this.props.cerrar();
  };

  render() {
    const {isVisible, onRequestClose, cerrar} = this.props;
    const {des, ope, novedad} = this.state;

    const disabled = ope === '' || des === '';

    const opciones = [{name: 'Direccion errada'}, {name: 'Mercancia averiada'}];

    return (
      <Modals onRequestClose={onRequestClose} isVisible={isVisible}>
        <View style={styles.title}>
          <H3>Despacho</H3>
        </View>

        <Item rounded style={{margin: 11}}>
          <Input
            style={{fontSize: 14}}
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
            style={{fontSize: 14}}
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
            disabled={disabled}
            style={styles.button}
            onPress={() => this.cargarDespacho(this.state.ope, this.state.des)}>
            <Text>Cargar</Text>
          </Button>

          <Button onPress={cerrar} style={styles.button}>
            <Text>Cancelar</Text>
          </Button>

          <Button style={styles.button}>
            <Text>Novedad</Text>
          </Button>

          <Item picker>
            <Picker
              mode="dropdown"
              iosIcon={<Icon name="arrow-down" />}
              selectedValue={novedad}
              onValueChange={novedad => this.handleOnchaGe('novedad', novedad)}>
              {opciones.map((item, key) => (
                <Picker.Item key={key} value={item.name} label={item.name} />
              ))}
            </Picker>
          </Item>
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
  title: {
    alignItems: 'center',
    display: 'flex',
    padding: 12,
  },
});

export default connect(mapStateToProps)(Carga);
