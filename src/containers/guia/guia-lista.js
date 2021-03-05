import React, {Component} from 'react';
import {FlatList} from 'react-native';
import GuiaListaPresentacion from '../../components/guia/guia-lista-presentacion';
import GuiaListaVacia from '../../components/guia/guia-lista-vacia';
import GuiaListaSeparador from '../../components/guia/guia-lista-separador';
import Guia from '../../components/guia/guia.js';
import Detalle from '../../components/guia/detalle';
import {connect} from 'react-redux';
import ModalNovedad from './modalNovedad';
import axios from 'axios';

function mapStateToProps(state) {
  return {
    list: state.arGuias,
    arrNovedadTipos: state.arrNovedadTipos,
    codigoOperador: state.codigoOperador,
    arGuia: state.arGuia
  };
}

class GuiaLista extends Component {
  state = {
    abriModalDetalle: false,
    abriModalNovedad: false,
    novedad: '',
    novedadDescripcion: '',
    codigoGuia: '',
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

  toggleModalNovedad = () => {
    this.setState({
      abriModalNovedad: !this.state.abriModalNovedad,
    });
  };

  funcionesbuttonNovedad = item => {
    this.handleOnChanges('codigoGuia', item.codigoGuiaPk)
    this.toggleModalNovedad()
  }

  renderItem = ({item}) => {
    return (
      <Guia
        {...item}
        onPress={() => {
          this.verDetalle(item);
          this.abrirModal();

        }}
        buttonNovedad={() => this.funcionesbuttonNovedad(item)}
      />
    );
  };

  handleOnChanges = (name, vale) => {
    this.setState({
      [name]: vale,
    });
  };

  handleNovedad = async () => {
    //creacion de datos para ser enviados para poder crear novedad de un guia
    const url =
    'http://165.22.222.162/cesio/public/index.php/api/localizador/guia/novedad/nueva';

    const {codigoOperador} = this.props;
    const { novedad, novedadDescripcion, codigoGuia } = this.state

    //intentar enviar los datos
    try {
      const response = await axios.post(url, {
        operador: codigoOperador,
        codigoGuia: codigoGuia,
        codigoNovedadTipo: novedad,
        descripcion: novedadDescripcion,
      });
      if (response.status) {
        this.setState({
          abriModalDetalle: false,
          abriModalNovedad: false,
          novedad: '',
          novedadDescripcion: '',
          CodigoGuia: 0,
        });
        alert('La Entrega fue exitosa');

      }
      } catch (e) {
      console.log(e);
    }
  }

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
          usuario={this.props.usuario}
          isVisible={this.state.abriModalDetalle}
        />
        <ModalNovedad
          novedad={this.state.novedad}
          codigoGuia={this.state.codigoGuia}
          onChange={this.handleOnChanges}
          novedadDescripcion={this.state.novedadDescripcion}
          isVisible={this.state.abriModalNovedad}
          toggleModalNovedad={() => this.toggleModalNovedad()}
          arrNovedadTipos={this.props.arrNovedadTipos}
          handleNovedad={this.handleNovedad}
        />
      </GuiaListaPresentacion>
    );
  }
}

export default connect(mapStateToProps)(GuiaLista);
