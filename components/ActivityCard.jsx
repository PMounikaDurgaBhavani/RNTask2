import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

const ActivityCard = ({ title, value, unit, color, theme }) => {
  const isDark = theme === 'dark';

  const styles = StyleSheet.create({
    card: {
      backgroundColor: isDark ? '#1e1e1e' : '#fff',
      padding: 16,
      borderRadius: 12,
      marginVertical: 10,
      borderLeftWidth: 6,
      borderLeftColor: color,
      elevation: 3,
    },
    title: {
      fontSize: 16,
      color: isDark ? '#ccc' : '#444',
    },
    value: {
      fontSize: 28,
      fontWeight: 'bold',
      color: isDark ? '#fff' : '#222',
    },
    unit: {
      fontSize: 16,
      color: isDark ? '#aaa' : '#888',
    },
  });

  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.value}>
        {value} <Text style={styles.unit}>{unit}</Text>
      </Text>
    </View>
  );
};

export default ActivityCard;
