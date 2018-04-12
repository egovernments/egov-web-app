package org.egovernment.rainmaker;

import android.app.Activity;
import android.content.IntentFilter;
import android.content.pm.PackageManager;
import android.os.Build;
import android.support.v4.app.ActivityCompat;
import android.support.v4.content.ContextCompat;
import android.util.Log;
import android.webkit.JavascriptInterface;
import android.Manifest;

import org.json.JSONObject;

import java.util.HashMap;
import java.util.Map;

/**
 * Created by varun on 09/04/18.
 */

public class AppJavaScriptProxy  {
	private Activity activity = null;
	private SmsReceiver smsReceiver = null;
	private boolean hasSmsReceiverRegistered = false;

	public AppJavaScriptProxy(MainActivity activity) {
		this.activity = activity;
	}

	@JavascriptInterface
	public boolean hasSMSAccess() {
		String permission = Manifest.permission.RECEIVE_SMS;
		int res = activity.getApplicationContext().checkCallingOrSelfPermission(permission);
		return (res == PackageManager.PERMISSION_GRANTED);
	}

	@JavascriptInterface
	public boolean hasLocationAccess(){
		String permission = Manifest.permission.ACCESS_FINE_LOCATION;
		int res = activity.getApplicationContext().checkCallingOrSelfPermission(permission);
		return (res == PackageManager.PERMISSION_GRANTED);
	}

	public void requestLocationReadPermission() {
		int GET_MY_PERMISSION = 2;
		if (!hasLocationAccess()) {
			if (ActivityCompat.shouldShowRequestPermissionRationale(activity,
					Manifest.permission.ACCESS_FINE_LOCATION)) {
		/* do nothing*/
			} else {
				ActivityCompat.requestPermissions(activity,
						new String[]{Manifest.permission.ACCESS_FINE_LOCATION, Manifest.permission.ACCESS_FINE_LOCATION}, GET_MY_PERMISSION);
			}
		}
	}


	public void requestSMSReadPermission() {
		int GET_MY_PERMISSION = 1;
		if (!hasSMSAccess()) {
			if (ActivityCompat.shouldShowRequestPermissionRationale(activity,
					Manifest.permission.RECEIVE_SMS)) {
		/* do nothing*/
			} else {
				ActivityCompat.requestPermissions(activity,
						new String[]{Manifest.permission.READ_SMS, Manifest.permission.RECEIVE_SMS}, GET_MY_PERMISSION);
			}
		}
	}


    @JavascriptInterface
    public boolean requestSMS() {
	    requestSMSReadPermission();
		smsReceiver = new SmsReceiver();
		activity.getApplicationContext().registerReceiver(smsReceiver, new IntentFilter("android.provider.Telephony.SMS_RECEIVED"));
		hasSmsReceiverRegistered = true;
		return true;
	}

	@JavascriptInterface
	public boolean smsReceiverRunning() {
		return hasSmsReceiverRegistered;
	}

	@JavascriptInterface
	public void stopSMSReceiver() {
		activity.getApplicationContext().unregisterReceiver(smsReceiver);
		hasSmsReceiverRegistered = false;
		smsReceiver = null;
	}


	@JavascriptInterface
	public String requestLocation(){
		requestLocationReadPermission();
		HashMap<String, String> location = new HashMap<>();
		GPSTrack gps;
		gps = new GPSTrack(activity);
		double latitude = gps.getLatitude();
		double longitude = gps.getLongitude();
		if (gps.canGetLocation()) {
			if (latitude != 0 || longitude != 0) {
				location.put("lat" , String.valueOf(latitude));
				location.put("lng",String.valueOf(longitude));
				Log.d("Longitude", "long=" + longitude);
				//Log.w("New Updated Location:", latitude + "," + longitude);
				} else {
					Log.w("New Updated Location:", "NULL");
				}
			} else {
				Log.w("New Updated Location:", "FAIL");
			}

		return new JSONObject(location).toString();
	}

}
