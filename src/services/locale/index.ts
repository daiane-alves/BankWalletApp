import { NativeModules } from 'react-native';

type LocaleModuleType = { getSystemLocale(): Promise<string> };
const { LocaleModule } = NativeModules as { LocaleModule: LocaleModuleType };

export async function getDeviceLocale(): Promise<string> {
  try {
    return await LocaleModule.getSystemLocale(); // "pt-BR", "en-US", etc.
  } catch {
    return 'en-US';
  }
}