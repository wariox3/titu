import React, {Component} from 'react';
import {Body, Header} from 'native-base';

class Inicio extends Component {
  render() {
    return (
      <Header span>
        <Body>{this.props.children}</Body>
      </Header>
    );
  }
}

export default Inicio;
