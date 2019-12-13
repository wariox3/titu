import React from 'react';
import FormularioLogin from './FormularioLogin';
import * as firebase from 'firebase';

class Login extends React.Component {
  state = {
    contraseña: '',
    cargando: false,
    usuario: '',
  };

  handleOnchange = (name, value) => {
    this.setState({
      [name]: value,
    });
  };

  // iniciarSesion = async () =>{
  //    const { usuario, contraseña } = this.state;
  //    const { navigate } = this.props.navigation;
  //    const url = `http://165.22.222.162/cesio/public/index.php/api/conductor/autenticar/${usuario}/${contraseña}`;
  //    this.setState({ cargando : true });
  //    try{
  //       const response    = await fetch(url);
  //       const res         = await response.json();
  //       const autenticar  =  res.autenticar;

  //       if(autenticar){
  //          navigate("Home",{
  //             usuario : usuario
  //          });
  //          this.setState({
  //             usuario     : "",
  //             cargando    : false,
  //             contraseña  : "",
  //          });
  //       }else{
  //          alert("Usuario Incorrecto");
  //          this.setState({ cargando : false });
  //       }

  //    }catch (e) {
  //       console.log(e)
  //    }
  // };

  iniciarSesion = async () => {
    const {usuario, contraseña} = this.state;
    const {navigate} = this.props.navigation;
    try {
      this.setState({cargando: true});
      await firebase.auth().signInWithEmailAndPassword(usuario, contraseña);
      setTimeout(() => {
        this.setState({
          usuario: '',
          cargando: false,
          contraseña: '',
        });
        navigate('Home', {usuario: usuario});
      }, 1500);
    } catch (error) {
      console.log('error', error);
    } finally {
      this.setState({
        usuario: '',
        cargando: false,
        contraseña: '',
      });
    }
  };

  autenticacion = async () => {
    await firebase.auth().onAuthStateChanged(user => {
      if (user) {
        console.log('If');
      } else {
        console.log('Else');
        this.iniciarSesion();
      }
    });
  };

  render() {
    const {contraseña, usuario, cargando} = this.state;
    return (
      <FormularioLogin
        autenticacion={() => this.autenticacion()}
        contraseña={contraseña}
        cargando={cargando}
        OnChange={this.handleOnchange.bind(this)}
        usuario={usuario}
      />
    );
  }
}

export default Login;
