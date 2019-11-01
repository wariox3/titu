import React from 'react';
import {Text, View, Button} from 'native-base';

class Perfil extends React.Component {
  render() {
    const {pop} = this.props.navigation;

    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Este es el perfil!</Text>
        <Button onPress={() => pop()}>
          <Text>Cerrar Session</Text>
        </Button>
      </View>
    );
  }
}

export default Perfil;
