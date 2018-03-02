package com.rainmaker.egov.myapplication;

import android.content.Intent;
import android.graphics.Bitmap;
import android.os.Bundle;
import android.support.annotation.NonNull;
import android.support.v4.app.ActivityCompat;
import android.support.v4.app.ActivityCompat.OnRequestPermissionsResultCallback;
import android.support.v7.app.AppCompatActivity;
import android.util.Log;
import android.view.KeyEvent;
import android.webkit.WebResourceRequest;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;

public class WebViewActivity extends AppCompatActivity implements OnRequestPermissionsResultCallback {

    private WebView webView;

    final WebViewActivity parent = this;
    final AppJavaScriptProxy proxy = new AppJavaScriptProxy(this);

    @Override
    public void onRequestPermissionsResult(int requestCode, @NonNull String[] permissions, @NonNull int[] grantResults) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults);
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_web_view);
        webView = (WebView) findViewById(R.id.webview);
        MyWebViewClient client = new MyWebViewClient();
        webView.setWebViewClient(client);
        ;

        webView.addJavascriptInterface(proxy, "androidAppProxy");

        WebSettings webSettings = webView.getSettings();
        webSettings.setJavaScriptEnabled(true);
        webSettings.setDomStorageEnabled(true);
        
        webView.loadUrl("file:///android_asset/index.html");

    }

    @Override
    protected void onNewIntent(Intent intent) {
        super.onNewIntent(intent);
        String message = intent.getStringExtra("message");
        Log.d("sms","OTP " + message);

        // call the javascript page
        this.webView.loadUrl("javascript:messageReceieved('" + message + "')");
   }



   // for the back button to work
    @Override
    public boolean onKeyDown(int keyCode, KeyEvent event) {
        if ((keyCode == KeyEvent.KEYCODE_BACK) && this.webView.canGoBack()) {
            this.webView.goBack();
            return true;
        }

        return super.onKeyDown(keyCode, event);
    }

    private class MyWebViewClient extends WebViewClient {

        @Override
        public void onPageStarted(WebView view, String url, Bitmap favicon) {
            if (proxy.smsReceiverRunning()) {
                proxy.stopSMSReceiver();
            }
            super.onPageStarted(view, url, favicon);

        }

        @Override
        public boolean shouldOverrideUrlLoading(WebView view, WebResourceRequest request) {
            parent.shouldOverrideUrlLoading(view, request);
            return super.shouldOverrideUrlLoading(view, request);
        }
    }

    private boolean shouldOverrideUrlLoading(WebView view, WebResourceRequest request) {
        if (proxy.smsReceiverRunning()) {
            proxy.stopSMSReceiver();
        }
        return true;
    }
}
