package com.rainmaker.egov.myapplication;

import android.app.Activity;
import android.webkit.WebView;
import android.webkit.WebViewClient;

/**
 * Created by varun hegde on 2/21/18.
 */

public class WebViewClientImpl extends WebViewClient {
    private Activity activity = null;

    public WebViewClientImpl(WebViewActivity activity) {
        this.activity = activity;
    }
    @Override
    public void onPageFinished(WebView view, String url) {
        view.loadUrl("javascript:messageReceieved()");
    }


}
