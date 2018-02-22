package com.rainmaker.egov.myapplication;

import android.content.Intent;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.util.Log;
import android.webkit.WebSettings;
import android.webkit.WebView;

public class WebViewActivity extends AppCompatActivity {

    private WebView webView;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_web_view);
        webView = (WebView) findViewById(R.id.webview);
        webView.addJavascriptInterface(new AppJavaScriptProxy(this), "androidAppProxy");

//        webView.setWebViewClient(new WebViewClient() {
//
//            public void onPageFinished(WebView view, String url)
//            {
//               super.onPageFinished(view,url);
//            }
//        });

        WebSettings webSettings = webView.getSettings();
        webSettings.setJavaScriptEnabled(true);

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
}
