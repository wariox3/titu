import React from 'react'
import {Text, View, Button} from "react-native";

class Perfil extends React.Component {
   static navigationOptions = () => {
      return {          
        title: 'Perfil'
      }
  }
   render() {
      const { pop } = this.props.navigation;
      
      return (
         <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Este es el perfil!</Text>
            <Button onPress = {()=> pop()} title   = "Cerrar Session"
            />
         </View>
      );
   }
}

export default Perfil;
