import { useEffect, useRef } from 'react';
import { Linking } from 'react-native';
import type { NavigationContainerRef } from '@react-navigation/native';
import type { RootStackParamList } from '../navigation/types';

type Args = {
  enabled: boolean;
  navRef: React.RefObject<NavigationContainerRef<RootStackParamList>>;
};

// extrai o id de recarga://user/transactions/:id
const extractId = (url: string) => {
  const m = url.match(/^recarga:\/\/user\/transactions\/([^/?#]+)/i);
  return m?.[1] ?? null;
};

export function useDeepLinking({ enabled, navRef }: Args) {
  const pendingUrl = useRef<string | null>(null);

  const navigateWithId = (url: string) => {
    const id = extractId(url);
    if (!id || !navRef.current) return;
    navRef.current.navigate('TransactionDetails', { id });
  };

  const handle = (url: string) => {
    if (url.startsWith('recarga://user/transactions')) {
      if (enabled && navRef.current) {
        navigateWithId(url);
      } else {
        pendingUrl.current = url; // guarda até autenticar
      }
    }
  };

  useEffect(() => {
    const sub = Linking.addEventListener('url', ({ url }) => handle(url));
    Linking.getInitialURL().then(url => url && handle(url));
    return () => sub.remove();
  }, []);

  // quando autenticar, consome link pendente
  useEffect(() => {
    if (enabled && pendingUrl.current && navRef.current) {
      navigateWithId(pendingUrl.current);
      pendingUrl.current = null;
    }
  }, [enabled, navRef]);
}
