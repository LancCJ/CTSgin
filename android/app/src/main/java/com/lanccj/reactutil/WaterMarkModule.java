package com.lanccj.reactutil;

import android.util.Log;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.Promise;


/**
 * Created by lanccj on 16/12/19.
 * 添加简单水印
 */

public class WaterMarkModule extends ReactContextBaseJavaModule{
    private static final String MODULE_NAME="Utils";

    public WaterMarkModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return MODULE_NAME;
    }

    @ReactMethod
    public void addWaterMark(String orignBase64,String waterMark,String waterMark2,String waterMark3,String waterMark4, Callback successBack,Callback errorBack){
        try {
                  Log.d("1",orignBase64);
                       Log.d("2",waterMark);
                       Log.d("3",waterMark2);
                       Log.d("4",waterMark3);
                       Log.d("5",waterMark4);
                successBack.invoke(orignBase64);
            }catch (Exception e){
                errorBack.invoke(e.getMessage());
                e.printStackTrace();
            }
    }
}
