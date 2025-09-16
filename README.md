# BankWalletApp

React Native application with authentication via **biometrics (fingerprint/Face ID)**, **PIN**, and a native module to get the **system language** (Android/iOS).

---

## Tech Stack

* **React Native**
* **TypeScript**
* **React Navigation**
* **Biometrics**: `react-native-biometrics` (or equivalent)
* **Native Modules**:

  * Android: `LocaleModule.kt` (Kotlin)
  * iOS: `LocaleModule.swift` + bridge `.m`

---

## Scripts (package.json)

```json
{
  "scripts": {
    "start": "react-native start --reset-cache ",
    "android": "react-native run-android",
    "android:clean": "cd android && ./gradlew clean",
    "android:reinstall": "adb uninstall com.bankwalletapp || true && cd android && ./gradlew clean && cd .. && npx react-native run-android",
    "ios": "react-native run-ios",
    "ios:pods": "cd ios && pod install && cd ..",
    "ios:run": "react-native run-ios --simulator='iPhone 16 Pro'",
    "mock": "json-server --watch db.json --port 3000"
  }
}
```

---

## Prerequisites

* **Node** LTS and **npm**/**yarn**
* **Java 17** (JDK 17)
* **Android Studio** (SDK + Emulator)
* **Xcode** (13+), CocoaPods (`gem install cocoapods`)

---

## Environment Setup (Step by Step)

### 1) Install basic tools

1. Install **Node LTS** and **npm**/**yarn**.
2. Install **Java 17 (JDK 17)**.
3. Install **Android Studio** with **SDK**, **Platform-Tools** and **Emulator**.
4. On macOS, install **Xcode** (13+) and **CocoaPods**: `sudo gem install cocoapods`.

### 2) Configure Android (macOS)

1. Export environment variables (adjust the path for your user):

   ```bash
   export ANDROID_HOME="$HOME/Library/Android/sdk"
   export PATH="$ANDROID_HOME/platform-tools:$ANDROID_HOME/emulator:$PATH"
   ```
2. Check that `adb` is available: `which adb`.
3. Create/edit `android/local.properties`:

   ```
   sdk.dir=/Users/<your-username>/Library/Android/sdk
   ```
4. Open **Android Studio**, download a **System Image** (e.g., Pixel / Android 14) and create an **AVD**.

### 3) Configure iOS (macOS)

1. From the project root, install native dependencies:

   ```bash
   npx pod-install ios
   ```
2. Confirm that `ios/BankWalletApp.xcworkspace` opens in Xcode without errors.

### 4) Quick verification

* Run `node -v`, `java -version`, `adb --version`.
* Start an AVD in Android Studio.
* Start iOS Simulator in Xcode.

---

## Project Dependencies

```bash
npm install
# or
yarn
```

---

## Running the App

### Android

1. Start an AVD in Android Studio.
2. In one terminal, start Metro:

   ```bash
   npm run start
   ```
3. In another terminal, reinstall and run:

   ```bash
   npm run android:reinstall
   ```

### iOS

1. Start Metro if not running.
2. Run:

   ```bash
   npm run ios:pods
   npm run ios:run
   ```

   > Alternatively, open `ios/BankWalletApp.xcworkspace` in Xcode and run (⌘R).

---

## Mock API

For offline development, you can run a fake API with **json-server**.

### Setup

1. Install as a dev dependency:

   ```bash
   npm i -D json-server
   ```
2. In the **project root**, create `db.json` (or reuse your existing one). Example:

   ```json
   {
     "balance": { "amount": 1520.34, "currency": "BRL" },
     "transactions": [
       { "id": "tx_1", "type": "debit", "title": "Groceries", "amount": 89.90, "date": "2025-09-13" },
       { "id": "tx_2", "type": "credit", "title": "Salary", "amount": 5800.00, "date": "2025-09-10" }
     ]
   }
   ```
3. The script `mock` is already defined in `package.json`:

   ```json
   { "mock": "json-server --watch db.json --port 3000" }
   ```

### Run mock server

```bash
npm run mock
```

* iOS Simulator: `http://localhost:3000`
* Android Emulator: `http://10.0.2.2:3000`
* Real devices: use your machine’s IP (e.g., `http://192.168.0.10:3000`).

> Tip: use an `.env` variable (e.g., `API_BASE_URL`) and switch depending on platform.

---

## Biometrics

### Android (emulator)

* **Permissions** in `AndroidManifest.xml`:

  ```xml
  <uses-permission android:name="android.permission.USE_BIOMETRIC" />
  <uses-permission android:name="android.permission.USE_FINGERPRINT" />
  ```
* **Register fingerprint in AVD**:

  1. Settings → **Security & privacy** → **Device unlock**.
  2. Set a **PIN**.
  3. Open **Pixel Imprint / Fingerprint** → **Add fingerprint**.
  4. Keep the “Touch the sensor” screen open and use **… → Fingerprint → Touch sensor** repeatedly until complete.
* **Test in app**: trigger biometric prompt and use **Touch sensor** again.

### iOS (simulator/device)

* In Simulator, configure language in *Settings → General → Language & Region*.
* For **Face ID**, add in `Info.plist`:

  ```xml
  <key>NSFaceIDUsageDescription</key>
  <string>We use Face ID for secure authentication.</string>
  ```

---

## Native Module — System Language

### Android

* Main file: `android/app/src/main/java/com/bankwalletapp/locale/LocaleModule.kt`
* Register `LocalePackage()` in `MainApplication.kt`.
* Returns the **system language tag** (e.g., `pt-BR`, `en-US`), ignoring per-app language overrides.

### iOS

* Files:

  * `ios/BankWalletApp/NativeModules/Locale/LocaleModule.swift`
  * `ios/BankWalletApp/NativeModules/Locale/LocaleModule.m`
* **Important**: add these files to the **target** in Xcode (File → Add Files → *Add to targets*).

---

## Project Structure

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
      index.ts    # TS wrapper for native locale module
App.tsx
index.js
```

---

## Troubleshooting

* **`spawnSync adb ENOENT`**
  `adb` not in `PATH`. Install **Platform-Tools** and export:

  ```bash
  export ANDROID_HOME="$HOME/Library/Android/sdk"
  export PATH="$ANDROID_HOME/platform-tools:$ANDROID_HOME/emulator:$PATH"
  ```

* **Manifest changes not applied**
  Ensure you edited `android/app/src/main/AndroidManifest.xml` (not only `debug`) and reinstall:

  ```bash
  npm run android:reinstall
  ```

* **Biometrics `available: false` on Android**
  Register a fingerprint in AVD and perform **Cold Boot** if needed.

* **iOS: `cannot find type 'RCTPromiseResolveBlock' in scope`**
  Missing `import React` in Swift **or** files not added to target in Xcode.

* **Clear Android data/“keychain”**

  ```bash
  adb uninstall com.bankwalletapp
  ```

  (also removes app keystore keys)

---

## Suggested Dev Flow (with mock)

1. Terminal A: `npm run mock` (fake API on `:3000`).
2. Terminal B: `npm run start` (Metro bundler with cache reset).
3. Terminal C:

   * Android: `npm run android:reinstall`
   * iOS: `npm run ios:pods && npm run ios:run`
4. In the app, test login via **PIN** and **Biometrics**; navigate to **Home** and **TransactionDetails** screens consuming mock endpoints.

Perfeito 🙌 Aqui vai a seção de **Deep Link** já preparada para incluir no seu README. Mantive no mesmo estilo das outras partes, descrevendo só Android implementado e iOS como pendente:

---

Here’s the section translated into English:

---

## Deep Link

### Android

The app is configured to open via **deep link** using the scheme `recarga://`.
In `AndroidManifest.xml`, the following `intent-filter` was added to `MainActivity`:

### Testing in the emulator

With the Android emulator running, execute:

```bash
adb shell am start -W -a android.intent.action.VIEW \
  -d "recarga://user/transactions/txn_003" com.bankwalletapp
```

> Replace `com.bankwalletapp` with your actual `applicationId` (defined in `android/app/build.gradle`).

This will open the **TransactionDetails** screen with the parameter `id = "txn_003"`.

---

### iOS

Deep link support has **not been implemented yet**.

