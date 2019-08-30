import React, { Component } from 'react';
import {
    Button,
    Text
} from 'react-native';
import { connect } from 'react-redux';
import Inicio from './containers/inicio';
import GuiasLista from './containers/guia-lista';
import Carga from './components/despacho/carga';
import API from '../src/api/api';
function mapStateToProps(state) {
    
    return {
        despacho: state.codigoDespacho,
        operador: state.codigoOperador
    }
  }
class AppLayout extends Component {

    state = {
        modalCarga: false
    }
    async componentDidMount() {        
        const arrGuias = await API.getGuias(this.props.operador,this.props.despacho);                  
        this.props.dispatch({
            type: 'SET_GUIA_LISTA',
            payload: {
                arGuias: arrGuias,
            }
        })                         
    }     
    abrirModal=()=>{
        this.setState({
            modalCarga : true
        })
    }

    cerrarModal=()=>{
        this.setState({
            modalCarga : false
        })
    }

    render() {
        return (
            <Inicio>
                <Text>Informacion</Text>
                <Text>Despacho: {this.props.despacho}</Text>
                <Text>Operador: {this.props.operador}</Text>
                <Button               
                    onPress={()=> { this.abrirModal() }}
                    title    =  {"Cargar despacho"}
                />                
                <GuiasLista/>
                <Carga 
                    isVisible = {this.state.modalCarga} 
                    cerrar={()=>this.cerrarModal()}
                />
            </Inicio>
        )
    }
}

export default connect(mapStateToProps)(AppLayout);