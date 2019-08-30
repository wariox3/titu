import React, { Component } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Button } from 'react-native';
import Carga from "../despacho/carga";
import Detalle from "../guia/detalle";
import API from "../../api/api";
import { connect } from 'react-redux';

function mapStateToProps(state) {         
   debugger;
   return {
      lista: state.arGuiasGlobal
   }
}
class Home extends Component {
   state = {
      abrirDespacho  : false,
      abrirDetalle   : false,
      cargando       : false,
      error          : false,
      detalleGias    : {},
      arGuias        : [],
      arGuiasLocal   : [],
   };

   async componentDidMount() {
      const response = await API.getGuias('en','701');
      this.props.dispatch({
        type: 'SET_GUIA_LISTA',
        payload: {
         arGuiasGlobal: response,
        }
      })
   }   

   ListaDespachos = async (operador,despacho)=>{
      this.setState({ cargando : true });
      try {
         //const response = await API.getGuias(operador,despacho);
         const response = await API.getGuias('en','700');
         if(response){
            this.setState({
               abrirDespacho : false,
               cargando      : false,
               error         : false,
               arGuias       : response,
            })            
            this.props.dispatch({
               type: 'SET_GUIA_LISTA',
               payload: {
                  arGuiasGlobal: response,
               }
             })            
         }
      }catch (e) {
         this.setState({ error : true, cargando : false, })
         if(this.state.error){
            alert("No se encontro el despacho")
         }
      }
   };

   handleAbrirDespacho = () =>{
      this.setState({
         abrirDespacho : !this.state.abrirDespacho,
      })
   };

   handleAbrirDetalle = () =>{
      this.setState({
         abrirDetalle : !this.state.abrirDetalle
      })
   };

   handleDetalleGuia = (item) =>{
      this.setState({
         detalleGias  : item,
         abrirDetalle : true,
      })
   };

   render() {

      const { arGuias, abrirDespacho, cargando, abrirDetalle, detalleGias } = this.state;
      const textColor = this.props.selected ? 'red' : 'black';
      const { navigation } = this.props;
      const operador = navigation.getParam('operador');

      return (
         <>
            <Button
               onPress  =  {()=>this.handleAbrirDespacho()}
               title    =  {"Cargar Despacho"}
            />

            {arGuias.length === 0
               ? <View>
                     <Text>No hay guias</Text>
                  </View>

               : <FlatList
                  keyExtractor={(item) => item.codigoGuiaPk.toString()}
                  //data={arGuias}
                  data={this.props.lista}
                  renderItem={({item}) =>
                     <View style={styles.listItem}>
                        <TouchableOpacity onPress={()=>this.handleDetalleGuia(item)}>
                           <Text style={{color: textColor}}>{item.codigoGuiaPk}</Text>
                        </TouchableOpacity>
                     </View>
                  }
               />
            }

            <Detalle
               handleAbrirDetalle = {()=>this.handleAbrirDetalle()}  
               onRequestClose     =  {()=>this.handleAbrirDetalle()}
               detalleGias        =  {detalleGias}
               isVisible          =  {abrirDetalle}
               operador           =  {operador}
            />

            <Carga
               ListaDespachos    =  {this.ListaDespachos.bind(this)}
               onRequestClose    =  {()=>this.handleAbrirDespacho()}
               navigation        =  {navigation}
               isVisible         =  {abrirDespacho}
               cargando          =  {cargando}
            />
         </>
      );
   }
}

const styles = StyleSheet.create({
   listItem : {
      paddingHorizontal : 12,
      marginTop         : 8,
      width             : '100%'
   }
});

export default connect(mapStateToProps)(Home);
