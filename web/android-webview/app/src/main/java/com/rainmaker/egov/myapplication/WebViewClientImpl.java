package com.rainmaker.egov.myapplication;

import android.app.Activity;
import android.content.Intent;
import android.net.Uri;
import android.webkit.WebResourceRequest;
import android.webkit.WebView;
import android.webkit.WebViewClient;


/**
 * Created by varun hegde on 2/21/18.
 */

public class WebViewClientImpl extends WebViewClient {
    private Activity activity = null;
    private final String domain = "egov";

    public WebViewClientImpl(WebViewActivity activity) {
        this.activity = activity;
    }
    @Override
    public boolean shouldOverrideUrlLoading(WebView view, WebResourceRequest request) {
    //    String url = request.getUrl().toString();
         // prevent links of our domain to be opened in the browser
//        if(url.indexOf(domain) > -1 ) return false;

        //Intent intent = new Intent(Intent.ACTION_VIEW, Uri.parse(url));
        //activity.startActivity(intent);
        return true;

    }
    @Override
    public void onPageFinished(WebView view, String url) {

        super.onPageFinished(view,url);
        // dispatch an event once page is loaded
        // javascript function should store the result in the localstorage
    }


}
