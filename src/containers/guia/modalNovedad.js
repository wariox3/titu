import React from 'react';
import Modal from '../../commons/Modal';
import { StyleSheet } from 'react-native';

import { Button, View, Text, Item, Picker, Icon, Label, Textarea } from 'native-base';
import PropTypes from 'prop-types';


const ModalNovedad = ({ isVisible, codigoGuia, novedad, novedadDescripcion, onChange, toggleModalNovedad, arrNovedadTipos, handleNovedad }) => {


  return (
    <Modal isVisible={isVisible}>
      <View style={styles.content_title}>
        <Text style={styles.title}>Novedad para la guía: {codigoGuia}</Text>
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
          {arrNovedadTipos.map((item, key) => (
            <Picker.Item
              key={key}
              color="#000000"
              value={item.id}
              label={item.name}
            />
          ))}
        </Picker>
      </Item>
      <Text>Descripción (opcional)</Text>
      <Textarea
        rowSpan={5}
        bordered
        placeholder="Opcional descripción de la novedad"
        onChangeText= {novedadDescripcion => onChange('novedadDescripcion', novedadDescripcion)}
      />

      <Button onPress={ () => { handleNovedad()} } style={styles.button}>
        <Text>Guardar</Text>
      </Button>
      <Button onPress={toggleModalNovedad} style={styles.button}>
        <Text>Cerrar</Text>
      </Button>
    </Modal>);
};

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
  novedadDescripcion: '',
  onChange: () => null,
  isVisible: false,
  toggleModalNovedad: () => null,
  arrNovedadTipos: [],
  handleNovedad: () => null,
};

ModalNovedad.propTypes = {
  novedad: PropTypes.string,
  novedadDescripcion: PropTypes.string,
  onChange: PropTypes.func,
  isVisible: PropTypes.bool,
  toggleModalNovedad: PropTypes.func,
  arrNovedadTipos: PropTypes.array,
  handleNovedad: PropTypes.func,
};

export default ModalNovedad;