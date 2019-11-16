import React from 'react';
import Modal from '../../commons/Modal';
import {StyleSheet} from 'react-native';
import {Button, View, Text, Item, Picker, Icon} from 'native-base';
import PropTypes from 'prop-types';

const opciones = [{name: 'Direccion errada'}, {name: 'Mercancia averiada'}];

const ModalNovedad = ({isVisible, novedad, onChange, toggleModalNovedad}) => (
  <Modal isVisible={isVisible}>
    <View style={styles.content_title}>
      <Text style={styles.title}>Novedad</Text>
    </View>
    <Item picker>
      <Picker
        mode="dropdown"
        iosIcon={<Icon name="arrow-down" />}
        selectedValue={novedad}
        onValueChange={novedad => onChange('novedad', novedad)}>
        <Picker.Item
          value={null}
          color="#bcbcbc"
          label="Seleccione la novedad"
        />
        {opciones.map((item, key) => (
          <Picker.Item
            key={key}
            color="#000000"
            value={item.name}
            label={item.name}
          />
        ))}
      </Picker>
    </Item>
    <Button onPress={toggleModalNovedad} style={styles.button}>
      <Text>Cerrar</Text>
    </Button>
  </Modal>
);

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    borderRadius: 100,
    display: 'flex',
    marginVertical: 8,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
  },
  content_title: {
    margin: 12,
    alignItems: 'center',
  },
});

ModalNovedad.defaultProps = {
  novedad: '',
  onChange: () => null,
  isVisible: false,
  toggleModalNovedad: () => null,
};

ModalNovedad.propTypes = {
  novedad: PropTypes.string,
  onChange: PropTypes.func,
  isVisible: PropTypes.bool,
  toggleModalNovedad: PropTypes.func,
};

export default ModalNovedad;
