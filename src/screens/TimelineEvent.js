import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const TimelineEvent = ({ index, type, date, total }) => {
  return (
    <View style={styles.eventContainer}>
       <View style={styles.circleContainer}>
        <View style={styles.circle}>
          <Text style={styles.circleText}>{ index }</Text>
        </View>
        {index != total ? <Text style={styles.line} > </Text> : <Text> </Text>} 
      </View>
      <View style={styles.eventDetails}>
        <Text style={styles.eventType}>{type}</Text>
        <Text style={styles.eventDate}>{date}</Text>
      </View> 
    </View>
  );
};

const styles = StyleSheet.create({
  eventContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  circleContainer: {
    alignItems: 'center',
  },
  circle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
  },
  circleText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  line: {
    width: 2,
    height: 30,
    backgroundColor: '#4CAF50',
    marginTop: 5,
  },
  eventDetails: {
    marginLeft: 20,
  },
  eventType: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  eventDate: {
    fontSize: 14,
    color: '#777',
  },
});

export default TimelineEvent;