import React, { useRef, useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import { useRoute } from '@react-navigation/native';

const { width } = Dimensions.get('window');

const slides = [
  {
    title: 'Macronutrients',
    points: [
      'Proteins: Help build and repair muscle (e.g. chicken, lentils, eggs)',
      'Carbohydrates: Provide energy (e.g. rice, oats, bread)',
      'Fats: Support hormone production (e.g. avocado, nuts, olive oil)',
    ],
  },
  {
    title: 'Portion Control',
    points: [
      'Use smaller plates to avoid overeating',
      'Half your plate should be vegetables',
      'Balance meals with protein, carbs, and fats',
    ],
  },
  {
    title: 'Healthy Habits',
    points: [
      'Drink 8 glasses of water a day',
      'Avoid sugary drinks and snacks',
      'Eat whole foods over processed ones',
    ],
  },
];


const Nutrition = () => {
  const flatListRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const route = useRoute();
  const theme = route.params?.theme || 'light';
  const isDark = theme === 'dark';

  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (currentIndex + 1) % slides.length;
      flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
      setCurrentIndex(nextIndex);
    }, 3000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDark ? '#1e1e1e' : '#fff',
    },
    header: {
      fontSize: 22,
      fontWeight: 'bold',
      margin: 16,
      color: isDark ? '#fff' : '#000',
    },
    slide: {
      width: width - 32,
      marginHorizontal: 16,
      backgroundColor: isDark ? '#333' : '#f2f2f2',
      borderRadius: 12,
      padding: 20,
      justifyContent: 'center',
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 12,
      color: isDark ? '#fff' : '#000',
    },
    point: {
      fontSize: 14,
      marginBottom: 8,
      color: isDark ? '#ccc' : '#333',
    },
  });

  const Slide = ({ title, points }) => (
  <View style={styles.slide}>
    <Text style={styles.title}>{title}</Text>
    {points.map((point, index) => (
      <Text key={index} style={styles.point}>• {point}</Text>
    ))}
  </View>
);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Nutrition & Diet Guide</Text>
      <FlatList
        data={slides}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => <Slide {...item} />}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        ref={flatListRef}
        onMomentumScrollEnd={(e) => {
          const newIndex = Math.round(e.nativeEvent.contentOffset.x / width);
          setCurrentIndex(newIndex);
        }}
      />
    </SafeAreaView>
  );
};

export default Nutrition;
