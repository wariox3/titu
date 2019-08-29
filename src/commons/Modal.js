import React from 'react';
import Modal from 'react-native-modal';
import { StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';

const Modals=({ children, isVisible, onBackdropPress, onRequestClose })=>(
   <Modal
         onBackdropPress   =  {onBackdropPress}
         onRequestClose    =  {onRequestClose}
         propagateSwipe    =  {true}
         isVisible         =  {isVisible}
         style             =  {styles.root}
   >
      <View style={{flex : 1}}>
         {children}
      </View>
   </Modal>
);

const styles = StyleSheet.create({
   root : {
      backgroundColor   : '#FFF',
      justifyContent    : 'flex-start',
      borderRadius      : 16,
      padding           : 12,
      display           : 'flex'
   }
});

Modals.defaultProps = {
   onBackdropPress   : null,
   onRequestClose    : null,
   isVisible         : false,
};

Modals.propTypes = {
   onBackdropPress   : PropTypes.func,
   onRequestClose    : PropTypes.func,
   isVisible         : PropTypes.bool,
};

export default Modals;
