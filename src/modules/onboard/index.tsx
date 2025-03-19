import {View, StyleSheet, Image} from 'react-native';
import React, {FC, useEffect} from 'react';
import {Colors, screenHeight, screenWidth} from '@utils/Constants';
import {resetAndNavigate} from '@navigation/NavigationUtils';

const Splash: FC = () => {
  useEffect(() => {
    const timeOutId = setTimeout(() => {
      resetAndNavigate('MainNavigator');
    }, 1000);
    return () => clearTimeout(timeOutId);
  }, []);
  return (
    <View style={styles.container}>
      <Image
        source={require('@assets/images/logo_t.png.png')}
        style={styles.image}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primary,
  },
  image: {
    width: screenWidth * 0.3,
    height: screenHeight * 0.3,
    resizeMode: 'contain',
  },
});

export default Splash;
