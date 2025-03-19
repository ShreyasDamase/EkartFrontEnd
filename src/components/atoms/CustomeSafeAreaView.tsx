/* eslint-disable react/react-in-jsx-scope */
import {Colors} from '@utils/Constants';
import {FC, ReactNode} from 'react';
import {SafeAreaView, StyleSheet, View, ViewStyle} from 'react-native';

interface CustomSafeAreaViewProps {
  children: ReactNode;
  style?: ViewStyle;
}

const CustomeSafeAreaView :FC<CustomSafeAreaViewProps>= ({children,style}) => {
  return (
    <View style={[styles.container, style]}>
      <SafeAreaView /> {children}
    </View>
  );
};

export default CustomeSafeAreaView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
});
