import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { ArticlesListScreen } from '../screens/ArticlesListScreen';
import { ArticleDetailScreen } from '../screens/ArticleDetailScreen';

const Stack = createStackNavigator();

export function ArticlesStack() {
  return (
    <Stack.Navigator initialRouteName="ArticlesList">
      <Stack.Screen
        name="ArticlesList"
        component={ArticlesListScreen}
        options={{
          headerTitle: 'Top Articles',
        }}
      />
      <Stack.Screen
        name="ArticleDetail"
        component={ArticleDetailScreen}
        options={{
          headerTitle: '',
        }}
      />
    </Stack.Navigator>
  );
}
