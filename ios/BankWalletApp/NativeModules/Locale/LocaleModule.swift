
import Foundation
import React

@objc(LocaleModule)
class LocaleModule: NSObject {
  @objc static func requiresMainQueueSetup() -> Bool { false }

  @objc func getSystemLocale(_ resolve: RCTPromiseResolveBlock,
                             rejecter reject: RCTPromiseRejectBlock) {
    let tag = Locale.preferredLanguages.first ?? "en-US"
    resolve(tag)
  }
}
