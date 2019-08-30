import React, { Component } from 'react';
import {
  View,
  FlatList
} from 'react-native';
import Detalle from '../components/guia/detalle';
import { connect } from 'react-redux';
import Guia from '../components/guia.js';
function mapStateToProps(state) {
  return {
    list: state.arGuias
  }
}

class GuiaLista extends Component {

  state = {
    abriModalDetalle : false
  }


  keyExtractor = item => item.codigoGuiaPk.toString()
  //renderEmtpy = () => <Text>No hay guias</Text>
  //itemSeparator = () => <Text>------------------</Text>
  verDetalle = (item) => {
    this.props.dispatch({
      type: 'SET_GUIA_SELECCIONADA',
      payload: {
        arGuia: item,
      }
    })

  }

  abrirModal=()=>{
    this.setState({
      abriModalDetalle : true
    })
}

cerrarModal=()=>{
    this.setState({
      abriModalDetalle : false
    })
}  

  renderItem = ({item}) => {
    return (
      <Guia {...item}
        onPress={()=> { this.verDetalle(item); this.abrirModal() }}
      />
    )
  }

  render() {

    return (
      <>
        <FlatList
          horizontal
          keyExtractor={this.keyExtractor}
          data={this.props.list}
          //ListEmptyComponent={this.renderEmtpy}
          //ItemSeparatorComponent={this.itemSeparator}
          renderItem={this.renderItem}
        />
        <Detalle
          cerrar = {()=>this.cerrarModal()}
          isVisible = {this.state.abriModalDetalle} 
        />
      </>
    )
  }
}

export default connect(mapStateToProps)(GuiaLista);
