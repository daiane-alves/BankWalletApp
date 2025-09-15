# BankWalletApp

Aplicativo **React Native** com autenticação por **biometria (fingerprint/Face ID)**, **PIN**, e módulo nativo para obter o **idioma do sistema** (Android/iOS).

---

## Stack

* **React Native**
* **TypeScript**
* **React Navigation**
* **Biometria**: `react-native-biometrics` (ou equivalente)
* **Módulos nativos**:

  * Android: `LocaleModule.kt` (Kotlin)
  * iOS: `LocaleModule.swift` + bridge `.m`

---

## Pré-requisitos

* **Node** LTS e **npm**/**yarn**
* **Java 17** (JDK 17)
* **Android Studio** (SDK + Emulador)
* **Xcode** (13+), CocoaPods (`gem install cocoapods`)

---

## Configuração do ambiente

### ANDROID

Configure as variáveis (ajuste o caminho conforme seu SO):

**macOS**

```bash
export ANDROID_HOME="$HOME/Library/Android/sdk"
export PATH="$ANDROID_HOME/platform-tools:$ANDROID_HOME/emulator:$PATH"
```

Crie/edite `android/local.properties` se necessário:

```
sdk.dir=/Users/<seu-usuario>/Library/Android/sdk
```

### iOS

Instale as dependências nativas:

```bash
npx pod-install ios
```

---

## Instalação

```bash
npm i
# ou
yarn
```
---

## Executando

### Android

1. Inicie um dispositivo (AVD) no Android Studio.
2. Em um terminal:

   ```bash
   npx react-native start --reset-cache
   ```
3. Em outro terminal:

   ```bash
   npm run android:reinstall
   ```

### iOS

1. Inicie o Metro (se não estiver rodando).
2. Rode:

   ```bash
   npm run ios:pods
   npm run ios:run
   ```

   > Se preferir, abra `ios/BankWalletApp.xcworkspace` no Xcode e rode (⌘R).

---

## Biometria

### Android (emulador)

* **Permissões** no `AndroidManifest.xml`:

  ```xml
  <uses-permission android:name="android.permission.USE_BIOMETRIC" />
  <uses-permission android:name="android.permission.USE_FINGERPRINT" />
  ```
* **Cadastrar digital no AVD**:

  1. Settings → **Security & privacy** → **Device unlock**.
  2. Defina um **PIN**.
  3. Abra **Pixel Imprint / Fingerprint** → **Add fingerprint**.
  4. Deixe a tela “Touch the sensor” aberta e use os **três pontinhos → Fingerprint → Touch sensor** várias vezes até concluir.
* **Testar no app**: chame o prompt biométrico e use **Touch sensor** novamente.

### iOS (simulador/dispositivo)

* No **simulador**, configure o idioma em *Settings → General → Language & Region*.
* Para **Face ID**, adicione em `Info.plist`:

  ```xml
  <key>NSFaceIDUsageDescription</key>
  <string>Usamos o Face ID para autenticar você com segurança.</string>
  ```

---

## Módulo nativo — Idioma do sistema

### Android

Arquivo principal: `android/app/src/main/java/com/bankwalletapp/locale/LocaleModule.kt`
Registre o pacote `LocalePackage()` no `MainApplication.kt`.

Retorna a *language tag* do **idioma do sistema** (ex.: `pt-BR`), ignorando “idioma por app”:


### iOS

Arquivos:

* `ios/BankWalletApp/NativeModules/Locale/LocaleModule.swift`
* `ios/BankWalletApp/NativeModules/Locale/LocaleModule.m`

> **Importante:** adicione os arquivos ao **target** do app no Xcode (File → Add Files… → marque *Add to targets*).

---

## Estrutura do projeto

```
/android
/ios
/src
  /app
  /features
    /auth
    /wallet
  /lib
  /navigation
  /screens
    BiometricLoginScreen/
    HomeScreen/
    PinLoginScreen/
    SetPinScreen/
    TransactionDetailsScreen/
  /services
    /locale
      index.ts    # wrapper TS do módulo nativo de locale
App.tsx
index.js
```

---

## Troubleshooting

* **`spawnSync adb ENOENT`**
  `adb` não está no `PATH`. Instale **Platform-Tools** e exporte:

  ```bash
  export ANDROID_HOME="$HOME/Library/Android/sdk"
  export PATH="$ANDROID_HOME/platform-tools:$ANDROID_HOME/emulator:$PATH"
  ```

* **Manifest não aplicado / permissões não entram**
  Garanta que editou `android/app/src/main/AndroidManifest.xml` (não só `debug`) e reinstale:

  ```bash
  npm run android:reinstall
  ```

* **Biometria `available: false` no Android**
  Cadastre uma digital no AVD (passo de “Touch sensor”) e faça **Cold Boot** se necessário.

* **iOS: `cannot find type 'RCTPromiseResolveBlock' in scope`**
  Falta `import React` no Swift **ou** os arquivos não estão no **target** do app no Xcode.

* **Limpar dados/“keychain” no Android**

  ```bash
  adb uninstall com.bankwalletapp
  ```

  (remove também as chaves do Keystore do app)

---