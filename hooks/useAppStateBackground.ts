import { useEffect, useState } from 'react';
import { AppState } from 'react-native';

export function useAppStateBackground() {
  const [backgroundKey, setBackgroundKey] = useState(0);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', (nextAppState) => {
      if (nextAppState === 'active') {
        // Force re-render when app becomes active
        setBackgroundKey(prev => prev + 1);
      }
    });

    return () => subscription?.remove();
  }, []);

  return backgroundKey;
}