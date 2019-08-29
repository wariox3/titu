import React from 'react';
import { View, TextInput, StyleSheet, Button } from 'react-native';
import Spinner from "../../commons/Spinner";
import PropTypes from 'prop-types'

const FormularioLogin=({ usuario, contraseña, OnChange, iniciarSesion, cargando })=>{
   const inhabilitar = (usuario === "" || contraseña === "");
   return(
      <View style={styles.root}>
         <View style={styles.form}>
            <TextInput
               underlineColorAndroid   = "black"
               autoCapitalize          = 'none'
               keyboardType            = {"email-address"}
               onChangeText            = {(e)=>OnChange("usuario",e)}
               placeholder             = "Usuario"
               autoCorrect             = {false}
               style                   = {styles.input}
               value                   = {usuario}            
               name                    = "usuario"
            />
            <TextInput
               underlineColorAndroid   = "black"
               secureTextEntry
               autoCapitalize          = 'none'
               onChangeText            = {(e)=>OnChange("contraseña",e)}
               placeholder             = "Contraseña"
               autoCorrect             = {false}
               style                   = {styles.input}
               value                   = {contraseña}
               name                    = "contraseña"
            />
            {cargando
               ? <Spinner />
               : <Button title={"Iniciar Sesion"} onPress={iniciarSesion} disabled={inhabilitar}/>
            }
         </View>
      </View>
   )
};

const styles = StyleSheet.create({
   root : {
      paddingHorizontal : 16,
      paddingVertical   : 20,
      alignItems        : "center",
      display           : "flex",
      flex              : 1,
   },
   form : {
      marginTop : 20,
      width     : '100%',
      flex      : 2,
   },
   input : {
      marginBottom : 28,
   }
});

FormularioLogin.propTypes = {
   iniciarSesion  : PropTypes.func,
   contraseña     : PropTypes.string,
   OnChange       : PropTypes.func,
   cargando       : PropTypes.bool,
   usuario        : PropTypes.string
};

export default FormularioLogin;
