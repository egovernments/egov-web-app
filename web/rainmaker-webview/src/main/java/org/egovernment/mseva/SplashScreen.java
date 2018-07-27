package org.egovernment.mseva;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.os.Handler;
import android.view.View;
import android.widget.TextView;

import org.egovernment.mseva.R;

public class SplashScreen extends Activity {

	private int count;

	@Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_splash);

        count = 0;

		int SPLASH_TIME_OUT = 5000;
		new Handler().postDelayed(new Runnable() {

            /*
             * Showing splash screen with a timer. This will be useful when you
             * want to show case your app logo / company
             */

            @Override
            public void run() {
                // This method will be executed once the timer is over
                // Start your app main activity
                Intent i = new Intent(SplashScreen.this, MainActivity.class);
                startActivity(i);

                // close this activity
                finish();
            }
        }, SPLASH_TIME_OUT);
    }

	public void onClick(View view) {
		if (++count == 3) {
			TextView tv_url = findViewById(R.id.url_text);
			tv_url.setText(BuildConfig.url);
		}
	}
}
