import React, {Component} from 'react';
import {Container, Body, Header} from 'native-base';

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
