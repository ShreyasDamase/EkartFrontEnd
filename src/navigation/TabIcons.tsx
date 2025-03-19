import Icon from '@components/atoms/Icon';
import React from 'react';
interface TabIconProps {
  focused: boolean;
  size: number;
  color: string;
}
export const HomeIcon: React.FC<TabIconProps> = ({focused, size, color}) => {
  return (
    <Icon
      name={focused ? 'home' : 'home-outline'}
      iconFamily="Ionicons"
      size={size}
      color={color}
    />
  );
};
export const CartIcon: React.FC<TabIconProps> = ({focused, size, color}) => {
  return (
    <Icon
      name={focused ? 'cart' : 'cart-outline'}
      iconFamily="MaterialCommunityIcons"
      size={size}
      color={color}
    />
  );
};
export const CategoriesIcon: React.FC<TabIconProps> = ({
  focused,
  size,
  color,
}) => {
  return (
    <Icon
      name={focused ? 'grid' : 'grid-outline'}
      iconFamily="Ionicons"
      size={size}
      color={color}
    />
  );
};

export const AccountIcon: React.FC<TabIconProps> = ({focused, size, color}) => {
  return (
    <Icon
      name={focused ? 'person' : 'person-outline'}
      iconFamily="Ionicons"
      size={size}
      color={color}
    />
  );
};
