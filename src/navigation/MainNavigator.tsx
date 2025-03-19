import { Platform } from 'react-native';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Colors, screenWidth } from '@utils/Constants';
import Home from '@modules/home';
import Categories from '@modules/categories';
import Account from '@modules/account';
import Cart from '@modules/cart';
import { AccountIcon, CartIcon, CategoriesIcon, HomeIcon } from './TabIcons';
import { useAppSelector } from '@store/reduxHook';
import { selectTotalItemsInCart } from '@modules/cart/api/slice';

const Tab = createBottomTabNavigator();
interface TabIconProps {
  focused: boolean;
  size: number;
  color: string;
}

const HomeTabIcon = ({ focused, color, size }: TabIconProps) => (
  <HomeIcon color={color} size={focused ? size + 4 : size} focused={false} />
);

const CategoriesTabIcon = ({ focused, color, size }: TabIconProps) => (
  <CategoriesIcon color={color} size={focused ? size + 4 : size} focused={false} />
);

const AccountTabIcon = ({ focused, color, size }: TabIconProps) => (
  <AccountIcon color={color} size={focused ? size + 4 : size} focused={false} />
);

const CartTabIcon = ({ focused, color, size }: TabIconProps) => (
  <CartIcon color={color} size={focused ? size + 4 : size} focused={false} />
);

const MainNavigator = () => {
  const count = useAppSelector(selectTotalItemsInCart);
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarActiveTintColor: Colors.active,
        tabBarLabelStyle: { color: 'white' },  
        lazy: true,
        tabBarStyle: {
          paddingTop: Platform.OS === 'android' ? 0 : 10,
          position: 'relative',
          bottom: 20,
          marginTop: 15,
          left: '24%',  
          right: '24%',
          height: screenWidth * 0.14,
          borderRadius: 30,
          backgroundColor: '#d657fdff',
          elevation: 0,
          shadowOpacity: 0.1,
          shadowRadius: 10,
          alignItems: 'center',
          justifyContent: 'center',overflow: 'hidden',
        },
        tabBarItemStyle: {
          borderRadius: 30,
          overflow: 'hidden',
          marginHorizontal: 0,
        },
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ focused, size }) => (
            <HomeTabIcon focused={focused} color={focused ? 'orange' : 'white'} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Categories"
        component={Categories}
        options={{
          tabBarIcon: ({ focused, size }) => (
            <CategoriesTabIcon focused={focused} color={focused ? 'orange' : 'white'} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Account"
        component={Account}
        options={{
          tabBarIcon: ({ focused, size }) => (
            <AccountTabIcon focused={focused} color={focused ? 'orange' : 'white'} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Cart"
        component={Cart}
        options={{
          tabBarIcon: ({ focused, size }) => (
            <CartTabIcon focused={focused} color={focused ? 'orange' : 'white'} size={size} />
          ),
          tabBarBadge: count > 0 ? count : undefined,
          tabBarBadgeStyle: {
            height: 16,
            width: 16,
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default MainNavigator;
