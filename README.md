## Supporting Measurement Data & Software For "Cookies, Identifiers and Other Data That Google Silently Stores on Android Handsets"

Files:

- In folder `firebase_test_app`:  
    - `app-debug.apk`   
    The compiled Firebase Analytics test app.
    - `firebase_analytics_notset`   
    App source code, open in Android Studio.
- In folder `frida_auth_script`:  
    - `hook_gmstokens.js`    
    Frida javascript code for dumping decrypted Google Play Services auth tokens.  Since class names are obfuscated, this only works for the exact version of Google Play Services used in this work (the obfuscated class names change with the Google Play Services version)
    - `hook_gmstokens.py`    
    Python wrapper for installing hook_gmstokens.js.  To use, connect phone to laptop using a USB cable, enable developer options and USB debugging.  Download frida server from https://github.com/frida/frida/releases, copy it to phone and set it running.  On the laptop use ```pip install frida-tools``` to install Frida, then run `python3 hook_gmstokens.py`.
- In folder ```measurements_default_settings```:  
    - `pixel7_17dec2024_full.txt.zip`   
    The decrypted/decoded network connections for the test with default settings.  
    - `0.zip`  
    A copy of /data/data from the Pixel handset used (this contains all the app data)
- In folder`measurements_privacy_conscious_settings`:  
    - `pixel7_19dec2024_full.txt.zip`  
    The decrypted/decoded network connections for the test with privacy conscious settings.  
    - `0.zip`    
    A copy of /data/data from the Pixel handset used (this contains all the app data)
- In folder `saved_web_pages`:  
    Copies of web pages cited in report.

The raw recorded network transmissions are available on dropbox at:

https://www.dropbox.com/scl/fo/nx44nijamytww6buegu93/AB2kWJuFlCMbkNYEX5HCag4?rlkey=g2hxsdgoq0jv103kacriubf04&st=x2y0kvzr&dl=0

They include downloaded data (apps etc) and so are about 13GB, too big for github.  These were recorded using mitmdump https://mitmproxy.org/ (see https://github.com/doug-leith/cydia for details) and can be replayed using `mitmdump -nr <data_file>`.   The content of the Google network connections was decoded using the https://github.com/doug-leith/android-protobuf-decoding mitmproxy addon. 


