/* eslint-disable react-hooks/exhaustive-deps */
import {FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useRoute} from '@react-navigation/native';
import {getProductsByCategory} from './api/getProducts';
import {screenHeight} from '@utils/Constants';
import {RFValue} from 'react-native-responsive-fontsize';
import {SafeAreaView} from 'react-native-safe-area-context';
import SearchBar from './atoms/SearchBar';
import ProductItem from './atoms/ProductItem';
import { useAppSelector } from '@store/reduxHook';
import { selectTotalItemsInCart } from '@modules/cart/api/slice';

const Products = () => {
  const routs = useRoute();
  const catagory = routs?.params as any;
    const count = useAppSelector(selectTotalItemsInCart)
  
  const [products, setProducts] = useState<any[]>([]);
  const fetchProduct = async () => {
    const data = await getProductsByCategory(catagory?.id);
    setProducts(data);
  };
  console.log('here is id', catagory.id);
  useEffect(() => {
    if (catagory?.id) {
      fetchProduct();
    }
  }, [catagory?.id]);
  console.log('boki', products);

  const renderItems = ({item, index}: any) => {
    const isOdd = index % 2 !== 0;

    return <ProductItem isOdd={isOdd} item={item} />;
  };
  return (
    <View style={styles.container}>
      <SafeAreaView />
      <SearchBar cartLength={count} />

      <FlatList
        bounces={false}
        data={products}
        renderItem={renderItems}
        keyExtractor={item => item._id.toString()}
        numColumns={2}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
              Oops! no items in this category
            </Text>
          </View>
        }
        contentContainerStyle={styles.listContainer}
        removeClippedSubviews={false}
      />
    </View>
  );
};

export default Products;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E0E0E0',
  },
  listContainer: {
    paddingBottom: 30,
    backgroundColor: '#fff',
  },
  emptyContainer: {
    height: screenHeight - 80,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  emptyText: {
    fontSize: RFValue(14),
    color: '#666',
    marginBottom: 16,
  },
});
