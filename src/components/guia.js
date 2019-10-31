import React from 'react';

import {View, Text, TouchableOpacity} from 'react-native';

function Guia(props) {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <View>
        <View>
          <Text>{props.codigoGuiaPk}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default Guia;
