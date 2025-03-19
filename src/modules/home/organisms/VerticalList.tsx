import {FlatList, Image, Pressable, StyleSheet, Text, View} from 'react-native';
import React, {FC} from 'react';
import {FONTS, screenWidth} from '@utils/Constants';
import {RFValue} from 'react-native-responsive-fontsize';
import Icon from '@components/atoms/Icon';
import {navigate} from '@navigation/NavigationUtils';

const VerticalList: FC<{data: any}> = ({data}) => {
  const renderItem = ({item}: any) => {
    return (
      <Pressable
        style={styles.itemContainer}
        onPress={() => navigate('Categories')}>
        <Image source={{uri: item?.image_uri}} style={styles.image} />
        <Text style={styles.productTitle}>{item?.title}</Text>
        <Text style={styles.subTitle}>{item?.subTitle}</Text>
      </Pressable>
    );
  };
  return (
    <View style={styles.container}>
      <View style={[styles.absoluteView, {backgroundColor: data?.bgColor}]} />
      <Text style={styles.heddinText}> {data?.title}</Text>
      <Pressable style={[styles.button, {backgroundColor: data?.btnColor}]}>
        <Text style={styles.buttonText}>Explore More</Text>
        <Icon
          size={16}
          name="arrow-forward-sharp"
          iconFamily="Ionicons"
          color="#fff"
        />
      </Pressable>
      <FlatList
        data={data?.data}
        numColumns={2}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
      />
    </View>
  );
};

export default VerticalList;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    marginTop: 10,
  },
  absoluteView: {
    width: screenWidth,
    height: 180,
    position: 'absolute',
    top: 0,
    zIndex: -1,
  },
  heddinText: {
    fontSize: RFValue(16),
    fontFamily: FONTS.heading,
    color: '#222',
  },
  button: {
    padding: 10,
    paddingHorizontal: 18,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    alignSelf: 'flex-start',
    gap: 10,
    marginVertical: 15,
  },
  buttonText: {
    fontWeight: '400',
    color: '#fff',
    fontSize: RFValue(12),
  },
  itemContainer: {
    width: '48%',
    height: 220,
    margin: 5,
    marginBottom: 20,
    alignSelf: 'flex-start',
  },
  image: {width: '100%', height: 180, resizeMode: 'cover'},
  contentContainer: {
    paddingBottom: 10,
  },
  productTitle: {
    fontSize: RFValue(14),
    fontFamily: FONTS.heading,
    color: '#222',
    marginTop: 4,
  },
  subTitle: {
    fontSize: RFValue(10),
    color: '#222',
    fontWeight: '400',
  },
});
