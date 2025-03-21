import {Image, Pressable, StyleSheet, View} from 'react-native';
import React, {FC, useState} from 'react';
import {screenWidth} from '@utils/Constants';
import Carousel from 'react-native-reanimated-carousel';
import FilmSlip from '../molecules/FilmSlip';
import Dots from '../atoms/Dots';
const AdCarousal: FC<{data: any}> = ({data}) => {
  const [active, setActive] = useState(0);
  const baseOptoins = {
    vertical: false,
    width: screenWidth,
    height: screenWidth * 0.8,
  };
  return (
    <View>
      <FilmSlip />
      <Carousel
        {...baseOptoins}
        loop
        pagingEnabled
        snapEnabled
        autoPlay
        autoPlayInterval={3500}
        onSnapToItem={(index: any) => {
          setActive(index);
        }}
        data={data.data}
        renderItem={({item}: any) => (
          <Pressable style={styles.imageContainer}>
            <Image source={item?.image_uri} style={styles.img} />
          </Pressable>
        )}
      />
      {active != null && (
        <View style={styles.dots}>
          {data?.data?.map((item: any, index: any) => {
            return <Dots active={active} index={index} key={index} />;
          })}
        </View>
      )}
    </View>
  );
};

export default AdCarousal;

const styles = StyleSheet.create({
  dots: {
    flexDirection: 'row',
    width: 100,
    alignSelf: 'center',
    marginTop: 10,
    justifyContent: 'center',
  },
  imageContainer: {
    width: '100%',
    height: '100%',
  },
  img: {width: '100%', height: '100%', resizeMode: 'cover'},
});
