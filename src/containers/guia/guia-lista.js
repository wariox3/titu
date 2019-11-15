import React, {Component} from 'react';
import {FlatList} from 'react-native';
import GuiaListaPresentacion from '../../components/guia/guia-lista-presentacion';
import GuiaListaVacia from '../../components/guia/guia-lista-vacia';
import GuiaListaSeparador from '../../components/guia/guia-lista-separador';
import Guia from '../../components/guia/guia.js';
import Detalle from '../../components/guia/detalle';
import {connect} from 'react-redux';

function mapStateToProps(state) {
  return {
    list: state.arGuias,
  };
}

class GuiaLista extends Component {
  state = {
    abriModalDetalle: false,
  };

  keyExtractor = item => item.codigoGuiaPk.toString();
  renderListaVacia = () => <GuiaListaVacia text="No hay guias" />;
  renderListaReparador = () => <GuiaListaSeparador />;
  verDetalle = item => {
    this.props.dispatch({
      type: 'SET_GUIA_SELECCIONADA',
      payload: {
        arGuia: item,
      },
    });
  };

  abrirModal = () => {
    this.setState({
      abriModalDetalle: true,
    });
  };

  cerrarModal = () => {
    this.setState({
      abriModalDetalle: false,
    });
  };

  renderItem = ({item}) => {
    return (
      <Guia
        {...item}
        onPress={() => {
          this.verDetalle(item);
          this.abrirModal();
        }}
      />
    );
  };

  render() {
    return (
      <GuiaListaPresentacion title="Lista guias">
        <FlatList
          style={{marginBottom: 20}}
          keyExtractor={this.keyExtractor}
          data={this.props.list}
          ListEmptyComponent={this.renderListaVacia}
          ItemSeparatorComponent={this.renderListaReparador}
          renderItem={this.renderItem}
        />
        <Detalle
          cerrar={this.cerrarModal}
          isVisible={this.state.abriModalDetalle}
        />
      </GuiaListaPresentacion>
    );
  }
}

export default connect(mapStateToProps)(GuiaLista);
