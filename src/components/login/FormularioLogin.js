import React from 'react';
import {View, StyleSheet, KeyboardAvoidingView} from 'react-native';
import {Item, Input, H1, Icon, Button, Text} from 'native-base';
import Spinner from '../../commons/Spinner';
import PropTypes from 'prop-types';

const FormularioLogin = ({
  usuario,
  contraseña,
  OnChange,
  iniciarSesion,
  cargando,
}) => {
  const inhabilitar = usuario === '' || contraseña === '';

  return (
    <View style={styles.root}>
      <KeyboardAvoidingView behavior="padding" style={styles.keyBoard}>
        <View style={{marginBottom: 12}}>
          <H1>Bienvenido</H1>
        </View>

        <Item rounded style={styles.container_input}>
          <Icon name="person" />
          <Input
            autoCapitalize="none"
            keyboardType={'email-address'}
            onChangeText={e => OnChange('usuario', e)}
            placeholder="Usuario"
            autoCorrect={false}
            value={usuario}
            style={styles.input}
            name="usuario"
          />
        </Item>

        <Item rounded style={styles.container_input}>
          <Icon name="lock" />
          <Input
            secureTextEntry
            autoCapitalize="none"
            onChangeText={e => OnChange('contraseña', e)}
            placeholder="Contraseña"
            autoCorrect={false}
            value={contraseña}
            style={styles.input}
            name="contraseña"
          />
        </Item>

        {cargando ? (
          <Spinner />
        ) : (
          <View style={styles.container_button}>
            <Button
              rounded
              success
              onPress={iniciarSesion}
              disabled={inhabilitar}
              style={styles.button}>
              <Text>Iniciar Sesion</Text>
            </Button>
          </View>
        )}
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    flex: 1,
  },

  keyBoard: {
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
  },

  container_input: {
    marginBottom: 12,
    paddingLeft: 12,
  },

  input: {
    fontSize: 14,
  },

  container_button: {
    marginTop: 12,
  },

  button: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

FormularioLogin.propTypes = {
  iniciarSesion: PropTypes.func,
  contraseña: PropTypes.string,
  OnChange: PropTypes.func,
  cargando: PropTypes.bool,
  usuario: PropTypes.string,
};

export default FormularioLogin;
