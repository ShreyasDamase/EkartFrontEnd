import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {FC} from 'react';
import {useAppSelector} from '@store/reduxHook';
import {
  addItem,
  removeItem,
  selectItemCountById,
} from '@modules/cart/api/slice';
import {useDispatch} from 'react-redux';
import {RFValue} from 'react-native-responsive-fontsize';
import {Colors} from '@utils/Constants';
import Icon from '@components/atoms/Icon';

const UniversalAdd: FC<{item: any}> = ({item}) => {
  const count = useAppSelector(selectItemCountById(item._id));
  const dispatch = useDispatch();
  return (
    <View
      style={[
        styles.container,
        {backgroundColor: count === 0 ? '#fff' : Colors.active},
      ]}>
      {count === 0 ? (
        <TouchableOpacity
          onPress={() => dispatch(addItem(item))}
          style={styles.add}>
          <Text style={styles.addText}>ADD</Text>
        </TouchableOpacity>
      ) : (
        <View style={styles.counterContainer}>
          <TouchableOpacity onPress={() => dispatch(removeItem(item))}>
            <Icon
              name="minus"
              color="#fff"
              size={RFValue(14)}
              iconFamily="MaterialCommunityIcons"
            />
          </TouchableOpacity>
          <Text style={styles.text}>{count}</Text>
          <TouchableOpacity onPress={() => dispatch(addItem(item))}>
            <Icon
              name="plus"
              color="#fff"
              size={RFValue(14)}
              iconFamily="MaterialCommunityIcons"
            />
          </TouchableOpacity>
          
        </View>
      )}
    </View>
  );
};

export default UniversalAdd;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.active,
    width: 65,
  },
  add: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
    paddingVertical: 4,
  },
  addText: {
    color: Colors.active,
  },
  counterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 4,
    paddingVertical: 4,
    justifyContent: 'space-between',
  },
  text: {
    color: '#fff',
    fontWeight: '500',
    fontSize: RFValue(12),
  },
});
