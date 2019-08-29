import React from 'react'
import {Button, TextInput, Text } from "react-native";
import {isValidNumber} from "../../utils/functions";
import Spinner from "../../commons/Spinner";
import PropTypes from 'prop-types';

const FormDespacho=({ despacho, operador, OnChange, handlePress, cargando })=>{

   const inhabilitado       = (despacho === "" || operador === "");
   const validacionNumeros  = isValidNumber(despacho);

   return(
      <>
         <TextInput
            underlineColorAndroid   = "black"
            autoCapitalize          = 'none'
            onChangeText            = {(e)=>OnChange("operador",e)}
            placeholder             = "Operador"
            autoCorrect             = {false}
            maxLength               = {2}
            value                   = {operador}
         />

         <TextInput
            underlineColorAndroid   = "black"
            autoCapitalize          = 'none'
            keyboardType            = {"numeric"}
            onChangeText            = {(e)=>OnChange("despacho",e)}
            placeholder             = "Despacho"
            autoCorrect             = {false}
            value                   = {despacho}
         />
         <Text>{!validacionNumeros ? "Solo números" : ""}</Text>

         {cargando
            ? <Spinner />
            : <Button
               disabled =  {(inhabilitado) || (!validacionNumeros)}
               onPress  =  {handlePress}
               title    =  "Cargar"
            />
         }
      </>
   )
};

FormDespacho.defaultProps = {
   handlePress : null,
   despacho    : "",
   operador    : "",
   OnChange    : null,
   cargando    : false,
};

FormDespacho.propTypes = {
   handlePress : PropTypes.func,
   despacho    : PropTypes.string,
   operador    : PropTypes.string,
   OnChange    : PropTypes.func,
   cargando    : PropTypes.bool,
};

export default FormDespacho
