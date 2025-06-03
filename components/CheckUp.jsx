import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useRoute} from '@react-navigation/native';

const CheckUp = () => {
  const route = useRoute();
  const theme = route.params?.theme || 'light';
  const isDark = theme === 'dark';

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDark ? '#1e1e1e' : '#fff',
      textAlign: 'center',
    },
    title: {
      color: isDark ? '#fff' : '#1e1e1e',
      fontSize: 30,
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>CheckUp</Text>
    </View>
  );
};

export default CheckUp;
