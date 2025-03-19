import {
  ActivityIndicator,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Platform,
  RefreshControl,
  FlatList,
} from 'react-native';
import React, {FC, useRef, useState} from 'react';
import {dynamicDashboardData as fullData} from '@utils/db';
import AdCarousal from '../organisms/AdCarousal';
import Categories from '../organisms/Categories';
import Sponser from '../organisms/Sponser';
import VerticalList from '../organisms/VerticalList';
import HorizontalList from '../organisms/HorizontalList';
import AnimatedHorizontalList from '../organisms/AnimatedHorizontalList';
 
const sectionComponents: {[key: string]: React.ComponentType<any>} = {
  ad_carousal: AdCarousal,
  categories: Categories,
  sponser:Sponser,
  vertical_list:VerticalList,
  horizontal_list:HorizontalList,
  animated_horizontal_list:AnimatedHorizontalList,
};
const PAGE_SIZE = 4;
const MainList: FC<{scrollYGlobal: any}> = ({scrollYGlobal}) => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [data, setData] = useState(fullData.slice(0, PAGE_SIZE));
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoadingMore, setIsLodingMore] = useState(false);

  const prevScrollY = useRef(0);
  const flatListRef = useRef<FlatList>(null);
  const handleScoll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const currentScollY = event?.nativeEvent?.contentOffset.y;
    scrollYGlobal.value = currentScollY;
    prevScrollY.current = currentScollY;
  };
  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setCurrentPage(1);
      setData(fullData?.slice(0, PAGE_SIZE));
      setIsRefreshing(false);
    }, 3000);
  };
  const handleMoreData = () => {
    if (isLoadingMore) return;
    if (data?.length >= fullData?.length) return;

    setIsLodingMore(true);
    setTimeout(() => {
      const nextPage = currentPage + 1;
      const newItems = fullData?.slice(0, nextPage * PAGE_SIZE);
      setData(newItems);
      setCurrentPage(nextPage);
      setIsLodingMore(false);
    }, 4000);
  };

  const renderItem = ({item}: any) => {
    const SectionComponent = sectionComponents[item?.type];
    return SectionComponent ? <SectionComponent data={item} /> : null;
  };
  return (
    <FlatList
      data={data}
      refreshControl={
        <RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh} />
      }
      style={{flex: 1}} // <-- Add this line
      overScrollMode={'always'}
      onScroll={handleScoll}
      ref={flatListRef}
      scrollEventThrottle={16}
      renderItem={renderItem}
      onEndReached={handleMoreData}
      onEndReachedThreshold={0.5}
      nestedScrollEnabled
      contentContainerStyle={{
        paddingBottom: Platform.OS === 'android' ? 200 : 300,
      }}
      showsVerticalScrollIndicator={false}
      keyExtractor={(item, index) => index.toString()}
      ListFooterComponent={
        isLoadingMore ? (
          <ActivityIndicator
            size="small"
            color="#888"
            style={{alignSelf: 'center', margin: 15} }
          />
        ) : null
      }
    />
  );
};

export default MainList;
