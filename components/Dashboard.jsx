import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Switch,
  ActivityIndicator,
  FlatList,
  Button,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ActivityCard from './ActivityCard';

const Dashboard = () => {
  const [theme, setTheme] = useState(null);
  const isDark = theme === 'dark';
  const navigation = useNavigation();

  const healthyTips = [
    {id: 1, tip: 'Stay hydrated throughout the day'},
    {id: 2, tip: 'Take Regular breaks from screen time'},
    {id: 3, tip: 'Eat more fruits and vegetables'},
    {id: 4, tip: 'Get at least 7-8 hours sleep'},
    {id: 5, tip: 'Walk at least 10,000 steps everyday'},
  ];

  useEffect(() => {
    const loadTheme = async () => {
      try {
        const storedTheme = await AsyncStorage.getItem('appTheme');
        setTheme(storedTheme === 'dark' ? 'dark' : 'light');
      } catch (error) {
        console.log(error);
        setTheme('light');
      }
    };
    loadTheme();
  }, []);

  const toggleTheme = async () => {
    const newTheme = isDark ? 'light' : 'dark';
    setTheme(newTheme);
    await AsyncStorage.setItem('appTheme', newTheme);
  };

  const styles = StyleSheet.create({
    container: {
      padding: 20,
      backgroundColor: isDark ? '#121212' : '#f4f4f4',
      minHeight: '100%',
    },
    headerRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 20,
    },
    header: {
      fontSize: 24,
      fontWeight: 'bold',
      color: isDark ? '#fff' : '#333',
    },
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    listContainer: {
      marginTop: 30,
      padding: 16,
      backgroundColor: isDark ? '#1e1e1e' : '#fff',
      borderRadius: 12,
      elevation: 2,
    },
    listTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: isDark ? '#fff' : '#333',
      marginBottom: 10,
    },
    listItem: {
      fontSize: 18,
      color: isDark ? '#ccc' : '#555',
      marginBottom: 8,
    },
    button:{
        marginTop:25,
    }
  });

  if (theme === null) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.header}>FitTrack Dashboard</Text>
        <Switch
          value={isDark}
          onValueChange={toggleTheme}
          thumbColor={isDark ? '#fff' : '#333'}
          trackColor={{false: '#ccc', true: '#444'}}
        />
      </View>

      <ActivityCard
        title="Steps"
        value="7,300"
        unit="steps"
        color="#4CAF50"
        theme={theme}
      />
      <ActivityCard
        title="Calories"
        value="450"
        unit="kcal"
        color="#FF9800"
        theme={theme}
      />
      <ActivityCard
        title="Heart Rate"
        value="78"
        unit="bpm"
        color="#F44336"
        theme={theme}
      />

      <View style={styles.listContainer}>
        <Text style={styles.listTitle}>Healthy Tips</Text>
        <FlatList
          data={healthyTips}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => (
            <Text style={styles.listItem}>- {item.tip}</Text>
          )}
        />
      </View>

      <Button
        title="View Nutrition Guide"
        onPress={() => navigation.navigate('Nutrition', {theme})}
        color={isDark ? '#4CAF50' : '#2196F3'}
        style={styles.button}
      />
      <Button
        title="Personal Check"
        onPress={() => navigation.navigate('CheckUp', {theme})}
        color={isDark ? '#4CAF50':'#2196F3'}
        style={styles.button}
      />
    </View>
  );
};

export default Dashboard;
