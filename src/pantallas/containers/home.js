import React, { Component, Fragment, PureComponent } from 'react';
import {
    View,
    Text,
    Button,
    TouchableOpacity,
    FlatList
  } from 'react-native';
import API from '../../api/api';

class Home extends Component {
    keyExtractor = (item) => item.codigoGuiaPk.toString();
    state = {        
        arGuias: []
    }
    async componentDidMount() {
        const arrGuias = await API.getGuias();        
        this.setState({
            arGuias: arrGuias,
        })
    } 
      onPressItem = (id) => {
        this.props.navigation.navigate('Detalle', {
            itemId: id,
            otherParam: 'El otro parametro enviado',
          })
      };
      renderItem = ({item}) => (
        <MyListItem
          id={item.codigoGuiaPk}
          onPressItem={this.onPressItem}          
          title={item.codigoGuiaPk}
        />
      );     
    render() {
        return (                       
            <View>
            <Text>Menu 1</Text>
            <Text>Menu 2</Text>
            <FlatList
                keyExtractor={this.keyExtractor}
                data={this.state.arGuias}                
                renderItem={this.renderItem}
            >
            </FlatList>            
            </View>  
                                                                                                                                            
        )      
    }
}

class MyListItem extends PureComponent {
    onPress = () => {
      this.props.onPressItem(this.props.id);
    };
  
    render() {
      const textColor = this.props.selected ? 'red' : 'black';
      return (
        <TouchableOpacity onPress={this.onPress}>
          <View>
            <Text style={{color: textColor}}>{this.props.title}</Text>
          </View>
        </TouchableOpacity>
      );
    }
  }

export default Home;