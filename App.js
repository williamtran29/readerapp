import * as React from 'react';
import { Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { QueryClient, QueryClientProvider, focusManager } from 'react-query';

import { useAppState } from './hooks/useAppState';
import { ArticlesStack } from './navigation/ArticlesStack';
import { useOnlineManager } from './hooks/useOnlineManager';

function onAppStateChange(status) {
  // React Query already supports in web browser refetch on window focus by default
  if (Platform.OS !== 'web') {
    focusManager.setFocused(status === 'active');
  }
}

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: 2 } },
});

export default function App() {
  useOnlineManager();

  useAppState(onAppStateChange);

  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <ArticlesStack />
      </NavigationContainer>
    </QueryClientProvider>
  );
}
