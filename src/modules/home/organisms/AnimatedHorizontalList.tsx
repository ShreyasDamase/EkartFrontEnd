 
import {FlatList, Image, Pressable, StyleSheet, Text, View} from 'react-native';
import React, {FC} from 'react';
import {FONTS, screenWidth} from '@utils/Constants';
import {RFValue} from 'react-native-responsive-fontsize';
import {navigate} from '@navigation/NavigationUtils';

const AnimatedHorizontalList: FC<{data: any}> = ({data}) => {
  const renderItem = ({item}: any) => {
    return (
      <Pressable
        style={styles.imageContainer}
        onPress={() => navigate('Categories')}>
        <Image source={{uri: item?.image_uri}} style={styles.image} />
      </Pressable>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.textStyle}>{data?.title}</Text>
      <FlatList
        data={data?.data}
        keyExtractor={item => item?.id}
        horizontal
        renderItem={renderItem}
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
      />
    </View>
  );
};

export default AnimatedHorizontalList;

const styles = StyleSheet.create({
  container: {
    marginVertical: 15,
    marginHorizontal:15,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  imageContainer: {
    width: screenWidth * 0.45,
    height: screenWidth * 0.6,
    marginRight: 15,
  },
  textStyle: {
    fontSize: RFValue(14),
    fontFamily: FONTS.heading,
    marginHorizontal: 15,
    marginBottom: 15,
  },
});
