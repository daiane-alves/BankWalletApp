import { NativeModules } from 'react-native';

const { LocaleModule } = NativeModules;

export async function getDeviceLocale(): Promise<string> {
  return 'en-US';
}
