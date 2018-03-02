package com.rainmaker.egov.myapplication;

import android.Manifest;
import android.app.Activity;
import android.content.IntentFilter;
import android.content.pm.PackageManager;
import android.support.annotation.NonNull;
import android.support.v4.app.ActivityCompat;
import android.support.v4.content.ContextCompat;
import android.webkit.JavascriptInterface;
import android.widget.Toast;

import java.util.AbstractList;

/**
 * Created by i2india on 2/21/18.
 */

public class AppJavaScriptProxy implements ActivityCompat.OnRequestPermissionsResultCallback {

    private Activity activity = null;
    private SmsReceiver smsReceiver = null;
    private boolean hasSmsReceiverRegistered = false;

    public AppJavaScriptProxy(WebViewActivity activity) {
        this.activity = activity;
    }

    public void requestPermission() {
        int GET_MY_PERMISSION = 1;

        if(!hasSMSAccess()){

            if(ActivityCompat.shouldShowRequestPermissionRationale(activity,
                    Manifest.permission.RECEIVE_SMS)){
            /* do nothing*/
            }
            else{

                 ActivityCompat.requestPermissions(activity,
                        new String[]{Manifest.permission.READ_SMS, Manifest.permission.RECEIVE_SMS},GET_MY_PERMISSION);
            }
        }
    }

    @JavascriptInterface
    public void showMessage(String message) {
       Toast toast = Toast.makeText(this.activity.getApplicationContext(),
                message,
                Toast.LENGTH_SHORT);
        toast.show();
    }

    @JavascriptInterface
    public boolean requestSMS() {
        requestPermission();
        boolean test = hasSMSAccess();
        smsReceiver = new SmsReceiver();
        activity.getApplicationContext().registerReceiver(smsReceiver, new IntentFilter("android.provider.Telephony.SMS_RECEIVED"));
        hasSmsReceiverRegistered = true;
        return true;
    }

    @JavascriptInterface
    public boolean hasSMSAccess() {
        String permission = Manifest.permission.RECEIVE_SMS;
        int res = activity.getApplicationContext().checkCallingOrSelfPermission(permission);
        return (res == PackageManager.PERMISSION_GRANTED);
    }

    @Override
    public void onRequestPermissionsResult(int requestCode, @NonNull String[] permissions, @NonNull int[] grantResults) {
        System.out.print(requestCode);
    }

    public boolean smsReceiverRunning() {
        return hasSmsReceiverRegistered;
    }

    public void stopSMSReceiver() {
        activity.getApplicationContext().unregisterReceiver(smsReceiver);
        hasSmsReceiverRegistered =false;
        smsReceiver = null;
    }
}