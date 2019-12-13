import React from 'react';
import {Text, View, Button} from 'native-base';
import * as firebase from 'firebase';

class Perfil extends React.Component {
  cerrarSesión = async () => {
    const {pop} = this.props.navigation;
    await firebase.auth().signOut();
    pop();
  };

  render() {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Este es el perfil!</Text>
        <Button onPress={() => this.cerrarSesión()}>
          <Text>Cerrar Session</Text>
        </Button>
      </View>
    );
  }
}

export default Perfil;
