import React from 'react';
import { View, Modal, StyleSheet, TouchableOpacity } from 'react-native';
import { IconButton } from 'react-native-paper';

const BottomModal = ({ visible, onClose, children }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <TouchableOpacity 
        style={styles.modalOverlay} 
        activeOpacity={1} 
        onPressOut={onClose} 
      >
        <TouchableOpacity activeOpacity={1} style={styles.modalContent}>
          <IconButton 
            icon="close" 
            size={24} 
            color="black" 
            onPress={onClose} 
            style={styles.closeButton} 
          />
          {children}
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fundo transparente escuro
  },
  modalContent: {
    height: 550,
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 60,
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    left: 10,
    zIndex: 1,
  },
});

export default BottomModal;
