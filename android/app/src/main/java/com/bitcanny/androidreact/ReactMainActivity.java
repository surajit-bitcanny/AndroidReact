package com.bitcanny.androidreact;

import com.facebook.react.ReactActivity;

/**
 * Created by Surajit Sarkar on 10/8/17.
 * Company : Bitcanny Technologies Pvt. Ltd.
 * Email   : surajit@bitcanny.com
 */

public class ReactMainActivity extends ReactActivity {
    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "ReactAndroid";
    }
}
