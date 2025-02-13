/*
 * Copyright Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * For more information on setting up and running this sample code, see
 * https://firebase.google.com/docs/analytics/android
 */

package com.google.firebase.quickstart.analytics_notset.java;


import android.os.Bundle;
import androidx.appcompat.app.AppCompatActivity;
import com.google.firebase.analytics.FirebaseAnalytics;
import com.google.firebase.quickstart.analytics_notset.databinding.ActivityMainBinding;
import java.util.EnumMap;
import java.util.Map;

public class MainActivity extends AppCompatActivity {

    private ActivityMainBinding binding;

    /**
     * The {@code FirebaseAnalytics} used to record screen views.
     */
    // [START declare_analytics]
    private FirebaseAnalytics mFirebaseAnalytics;
    // [END declare_analytics]

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        binding = ActivityMainBinding.inflate(getLayoutInflater());
        setContentView(binding.getRoot());

        // [START shared_app_measurement]
        // Obtain the FirebaseAnalytics instance.
        mFirebaseAnalytics = FirebaseAnalytics.getInstance(this);
        // [END shared_app_measurement]

        // from https://developers.google.com/tag-platform/devguides/app-consent?platform=android
        // Set consent types.
        Map<FirebaseAnalytics.ConsentType, FirebaseAnalytics.ConsentStatus> consentMap = new EnumMap<>(FirebaseAnalytics.ConsentType.class);
        //consentMap.put(FirebaseAnalytics.ConsentType.ANALYTICS_STORAGE, FirebaseAnalytics.ConsentStatus.GRANTED);
        //consentMap.put(FirebaseAnalytics.ConsentType.AD_STORAGE, FirebaseAnalytics.ConsentStatus.GRANTED);
        //mFirebaseAnalytics.setConsent(consentMap);
        //mFirebaseAnalytics.setUserProperty("allow_personalized_ads", "true");
        mFirebaseAnalytics.setAnalyticsCollectionEnabled(true);
        consentMap.put(FirebaseAnalytics.ConsentType.AD_USER_DATA, FirebaseAnalytics.ConsentStatus.GRANTED);
        consentMap.put(FirebaseAnalytics.ConsentType.AD_PERSONALIZATION, FirebaseAnalytics.ConsentStatus.GRANTED);
        mFirebaseAnalytics.setConsent(consentMap);

        Bundle bundle = new Bundle();
        //bundle.putString("settings","defaults");
        //bundle.putString("ANALYTICS_STORAGE", "not set");
        //bundle.putString("AD_STORAGE", "not set");
        //bundle.putString("allow_personalized_ads", "true");
        //bundle.putString("AnalyticsCollectionEnabled", "true");
        mFirebaseAnalytics.logEvent("settings", bundle);
    }

    @Override
    public void onResume() {
        super.onResume();
        recordScreenView();
    }

    private void recordScreenView() {
        // [START set_current_screen]
        Bundle bundle = new Bundle();
        bundle.putString(FirebaseAnalytics.Param.SCREEN_CLASS, "MainActivity_manual");
        mFirebaseAnalytics.logEvent(FirebaseAnalytics.Event.SCREEN_VIEW, bundle);
        // [END set_current_screen]
    }
}
