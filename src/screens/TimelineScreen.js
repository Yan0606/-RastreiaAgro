import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import TimelineEvent from './TimelineEvent';
import BtnVoltar from '../components/btnVoltar';

const TimelineScreen = () => {
  const events = [
    { id: 1, type: 'Irrigação', date: '23/04' },
    { id: 2, type: 'Irrigação', date: '25/04' },
    { id: 3, type: 'Adubação', date: '23/04' },
    { id: 4, type: 'Irrigação', date: '25/04' },
    { id: 5, type: 'Adubação', date: '23/04' },
   
    
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity style={styles.backButton}>
        <Icon name="arrow-back" size={24} color="#fff" />
      </TouchableOpacity>
      <Text style={styles.title}>SUA LINHA DO TEMPO</Text>
      <View style={styles.timelineContainer}>
      <BtnVoltar route="Menu" />
        {events.map((event, index) => (
          <TimelineEvent 
            key={event.id} 
            index={index} 
            type={event.type} 
            date={event.date} 
          />
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
  },
  backButton: {
    padding: 10,
    position: 'absolute',
    top: 10,
    left: 10,
    zIndex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  timelineContainer: {
    width: '100%',
    alignItems: 'center',
  },
});

export default TimelineScreen;