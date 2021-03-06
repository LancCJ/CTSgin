package com.cyber.ctsgin;

import android.app.Application;
import android.util.Log;
import com.facebook.react.ReactApplication;
import com.cboy.rn.splashscreen.SplashScreenReactPackage;
import com.rnfs.RNFSPackage;
import com.imagepicker.ImagePickerPackage;
import com.lanccj.reactutil.WterMarkReactPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import org.lovebing.reactnative.baidumap.BaiduMapPackage;
import com.learnium.RNDeviceInfo.RNDeviceInfo;
import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
        protected boolean getUseDeveloperSupport() {
          return BuildConfig.DEBUG;
        }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
      new RNDeviceInfo(),
          new MainReactPackage(),
            new SplashScreenReactPackage(),
            new RNFSPackage(),
            new ImagePickerPackage(),
            new VectorIconsPackage(),
            new WterMarkReactPackage(),
            new BaiduMapPackage(getApplicationContext())
      );
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
