package com.rainmaker.egov.myapplication;

import android.app.PendingIntent;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.telephony.SmsMessage;

/**
 * Created by varun hegde on 2/21/18.
 */

public class SmsReceiver extends BroadcastReceiver {

    // signature could vary; here looking for Way2Online
    final private String messageSignature = "Way2Online";

    private String getMessageOTP(String smsMessage){
        String[] messageParts = smsMessage.split(":");
        String messagePayload = messageParts[1].split("-")[0].trim();
        return messagePayload;
    }

    private boolean shouldBroadcastSMS(String smsMessage){

        String[] messageParts = smsMessage.split(":");
        String phoneNumber = messageParts[0].trim();
        String messagePayload = messageParts[1].split("-")[0].trim();
        String messageSender = messageParts[1].split("-")[1].trim();
        return messageSender.indexOf(messageSignature) > -1;
    }

    @Override
    public void onReceive(Context context, Intent intent) {

        final Bundle bundle = intent.getExtras();
        try {
            if (bundle != null) {
                final Object[] pdusObj = (Object[]) bundle.get("pdus");
                for (int i = 0; i < pdusObj.length; i++) {
                    SmsMessage currentMessage = SmsMessage.createFromPdu((byte[]) pdusObj[i]);
                    String phoneNumber = currentMessage.getDisplayOriginatingAddress();
                    String senderNum = phoneNumber;
                    String message = currentMessage.getDisplayMessageBody();
                    try {
                        String messagePayload = currentMessage.getMessageBody();
                        if(shouldBroadcastSMS(messagePayload)){
                            // Pass the message
                            String otp = getMessageOTP(messagePayload);
                            Intent intentCall = new Intent(context, WebViewActivity.class);
                            intentCall.putExtra("message",otp);
                            PendingIntent pendingIntent = PendingIntent.getActivity(context, 0, intentCall, PendingIntent.FLAG_UPDATE_CURRENT);
                            pendingIntent.send();
                        }

                     } catch (Exception e) {
                    }
                }
            }
        } catch (Exception e) {
        }
    }


}
