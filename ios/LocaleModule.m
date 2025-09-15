// ios/LocaleModule.m
#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(LocaleModule, NSObject)
RCT_EXTERN_METHOD(getSystemLocale:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
@end
