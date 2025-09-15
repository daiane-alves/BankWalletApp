package com.bankwalletapp.locale

import android.app.LocaleManager
import android.content.Context
import android.content.res.Resources
import android.os.Build
import com.facebook.react.bridge.*

class LocaleModule(private val reactCtx: ReactApplicationContext)
  : ReactContextBaseJavaModule(reactCtx) {

  override fun getName() = "LocaleModule"

  /** Retorna o idioma do SISTEMA (ex.: "pt-BR") */
  @ReactMethod
  fun getSystemLocale(promise: Promise) {
    try {
      val tag =
        if (Build.VERSION.SDK_INT >= 33) {
          val lm = reactCtx.getSystemService(Context.LOCALE_SERVICE) as LocaleManager
          lm.systemLocales[0].toLanguageTag()
        } else if (Build.VERSION.SDK_INT >= 24) {
          Resources.getSystem().configuration.locales[0].toLanguageTag()
        } else {
          @Suppress("DEPRECATION")
          Resources.getSystem().configuration.locale.toLanguageTag()
        }
      promise.resolve(tag)
    } catch (e: Exception) {
      promise.reject("ERR_SYS_LOCALE", e)
    }
  }
}