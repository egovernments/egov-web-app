package com.rainmaker.egov.myapplication;

import android.app.Activity;
import android.webkit.JavascriptInterface;
import android.widget.Toast;

/**
 * Created by i2india on 2/21/18.
 */

public class AppJavaScriptProxy {

    private Activity activity = null;

    public AppJavaScriptProxy(WebViewActivity activity) {
        this.activity = activity;
    }

    @JavascriptInterface
    public void showMessage(String message) {
       Toast toast = Toast.makeText(this.activity.getApplicationContext(),
                message,
                Toast.LENGTH_SHORT);
        toast.show();
    }

}