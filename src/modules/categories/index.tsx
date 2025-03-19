import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {FC, useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '@store/reduxHook';
import {getCategory} from './api/actions';
import {SafeAreaView} from 'react-native-safe-area-context';
import {RFValue} from 'react-native-responsive-fontsize';
import {FONTS} from '@utils/Constants';
import {navigate} from '@navigation/NavigationUtils';

const Categories: FC = () => {
  const dispatch = useAppDispatch();
  const {data, loading, error} = useAppSelector(state => state.categories);

  useEffect(() => {
    dispatch(getCategory());
  }, [dispatch]);

  useEffect(() => {
    console.log('Category Data:', data);
  }, [data]);

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <SafeAreaView />
        <Text style={styles.title}>Categories</Text>
        <Text style={styles.subTitle}>
          Explore our wide range of categories
        </Text>
      </View>
      {loading ? (
        <ActivityIndicator size="small" color="black" />
      ) : (
        <FlatList
          data={data}
          numColumns={2}
          keyExtractor={item => item._id.toString()}
          renderItem={({item}) => (
            <TouchableOpacity
              style={styles.itemContainer}
              onPress={() =>
                navigate('Products', {id: item._id, name: item.name})
              }>
              <Image source={{uri: item?.image_uri}} style={styles.image} />
              <Text style={styles.name}>{item?.name}</Text>
            </TouchableOpacity>
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.contentContainer}
          ListFooterComponent={
            <>
              {error && <Text style={styles.subTitle}>There was an error</Text>}
            </>
          }
        />
      )}
    </View>
  );
};

export default Categories;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E7F9EC',
  },
  title: {
    fontSize: RFValue(18),
    fontFamily: FONTS.heading,
    fontWeight: 'bold',
    color: '#333',
  },
  subTitle: {
    fontSize: RFValue(13),
    color: '#666',
    marginTop: 5,
  },
  headerContainer: {
    padding: 20,
    backgroundColor: '#fff',
    alignItems: 'flex-start',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  itemContainer: {
    flex: 1,
    margin: 5,
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  name: {
    marginTop: 10,
    fontSize: RFValue(12),
    fontWeight: '500',
    color: '#333',
  },
  contentContainer: {
    padding: 10,
  },
});
