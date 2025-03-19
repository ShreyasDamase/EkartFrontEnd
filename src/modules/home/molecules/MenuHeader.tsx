import {StyleSheet, Text, View} from 'react-native';
import React, {FC, useState} from 'react';
import Animated, {interpolate, useAnimatedStyle} from 'react-native-reanimated';
import {SafeAreaView} from 'react-native-safe-area-context';
import {menuData} from '@utils/db';
import MenuItem from '../atoms/MenuItem';
import Icon from '@components/atoms/Icon';
import {RFValue} from 'react-native-responsive-fontsize';
import {Colors} from '@utils/Constants';

const MenuHeader: FC<{scrollY: any}> = ({scrollY}) => {
  console.log('MenuHeader rendered');
  const [focusedIndex, setFocusIndex] = useState(0);
  const opacityFadingStyle = useAnimatedStyle(() => {
    const opacity = interpolate(scrollY.value, [0, 80], [1, 0]);
    return {
      opacity,
    };
  });
  return (
    <Animated.View style={[styles.container, opacityFadingStyle]}>
      <SafeAreaView />
      <View style={styles.felxRow}>
        {menuData.map((item, index) => (
          <MenuItem
            key={index}
            item={item}
            isFocused={focusedIndex === index}
            onSelect={() => setFocusIndex(index)}
          />
        ))}
      </View>
      <View style={styles.addressContainer}>
        <Icon size={16} name="home" color="black" iconFamily="Ionicons" />
        <Text style={styles.homText}>HOME</Text>
        <Text numberOfLines={1} style={styles.addressText}>
          221B Baker Street, London, UK
        </Text>
        <Icon
          size={16}
          name="chevron-forward-sharp"
          color="black"
          iconFamily="Ionicons"
        />
      </View>
    </Animated.View>
  );
};

export default MenuHeader;

const styles = StyleSheet.create({
  container: {padding: 10},
  felxRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 5,
  },
  addressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  homText: {
    marginHorizontal: 5,
    fontWeight: 'bold',
    color: Colors.text,
    fontSize: RFValue(11),
  },
  addressText: {
    flex: 1,
    fontSize: RFValue(10),
    color: Colors.text,
  },
});
