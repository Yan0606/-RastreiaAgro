import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, IconButton, Text } from 'react-native-paper';

const CardSafra = ({ talhao, cultura, onDelete }) => {
  return (
    <Card style={styles.card}>
      <Card.Title
        title={`Talhão ${talhao}`}
        subtitle={cultura}
        titleStyle={styles.title}
        subtitleStyle={styles.subtitle}
        right={(props) => (
          <IconButton
            {...props}
            icon="delete"
            color="red" // Define a cor do ícone como vermelha
            onPress={onDelete}
            style={styles.deleteIcon}
          />
        )}
      />
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 5,
    backgroundColor: 'white',
    borderRadius: 15,
    elevation: 4,
    width: 350
  },
  title: {
    fontSize: 14,
    color: '#000',
  },
  subtitle: {
    fontSize: 20,
    color: '#18603A',
    fontWeight: 'bold',
  },
  deleteIcon: {
    marginRight: 8,
  },
});

export default CardSafra;
