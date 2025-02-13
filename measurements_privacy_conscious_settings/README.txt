19th dec
- 09.20 factory reset handset (after use in default test)
- phone has Three sim inserted, but data plan is not active (out of credit)
- onboarding with no network.  
- turn off all defaults.  location is off, wifi scanning off, usage off.  accept software updates (no other choice).  don't login.
- enable developer mode, side load magisk, reboot when asked.  
- install trustusercerts and mitmproxy cert, reboot.  check mitmproxy cert installed

wifi (tulip) setup:

(venv) pi@tulip:~/pixel7_dec2024 $ mitmdump --version
Mitmproxy: 11.0.0.dev (+26, commit fa8b899)
Python:    3.11.2
OpenSSL:   OpenSSL 3.0.15 3 Sep 2024
Platform:  Linux-6.1.21-v8+-aarch64-with-glibc2.36

(venv) pi@tulip:~/pixel7_dec2024 $ sudo iptables -S
-P INPUT ACCEPT
-P FORWARD ACCEPT
-P OUTPUT ACCEPT
-A FORWARD -p udp -m udp --dport 443 -j REJECT --reject-with icmp-port-unreachable

(venv) pi@tulip:~/pixel7_dec2024 $ sudo iptables -S -t nat
sP PREROUTING ACCEPT
-P INPUT ACCEPT
-P OUTPUT ACCEPT
-P POSTROUTING ACCEPT
-A PREROUTING -i wlan0 -p tcp -m tcp --dport 80 -j REDIRECT --to-ports 8080
-A PREROUTING -i wlan0 -p tcp -m tcp --dport 443 -j REDIRECT --to-ports 8080
-A POSTROUTING -p udp -m udp --dport 53 -j MASQUERADE

raw mitmdump file: pixel7_19dec2024.mitm
processed using:
mitmdump -s ../addon/decoding_helpers.py -nr pixel7_19dec2024.mitm --set google_only=false> pixel7_19dec2024_full.txt

09.28am connect to wifi (tulip).  leave idle connected to power.

20th dec
10.18 use adb to copy over frida server to phone, then open shell and start it.
launch frida script to hook token decryption in google play services, save in file hook_gmstokens_pixel7_20dec.txt

10.52 open Google Play store app and login to dougleith23sep@gmail.com, password DougLeith23sep!*
At "welcome" screen click "I agree" (only option), take screenshot.

NB: didn't ask if I wanted to opt in to sharing phone number

- see many auth tokens at this point

google services screen is shown, take screenshot.  Set "Backup device data" off (defailts to on).  at about 10.56 click "accept".

shows "welcome to google play" screen, take screenshot, at about 10.57 click "Get started".  Shown "Level up your experience" screen, take screenshot, click "Not now".  shows Google Play store home screen with various apps, take screenshot (slight delay before images for all apps are shown).

10.57 leave phone idle, connected to power.

11.04 open play store app, search "pregnancy app".  take screen shot of results.  click on huckleberry sleep baby tracker app (first on sponsored app list), view app page

search "christian prayer app".  take screen shot of results.  click on "Hallow Prayer & Meditation" (first on sponsored app list), view app page
 
search "gay dating app".   take screen shot of results.  click on "Match" (first on sponsored app list), view app page.  click bumble (second on sponsored list)

11.08 open dialer app, call 087 2618351, get message saying no credit, hang up.

11.09 open messages app, click "continue as Doug" (take screenshot of opening page).  shows "setting up RCS chats" popup, take screenshot.  close popup (press x in corner).  click "start chat", type 087 2618351, click "send", type "test" as message.  get not sent error (no credit)

11.10 open files app.  asks permission to send notifications, click "allow" (take screenshot).  shows "navigate share is now quickshare" popup, click "got it". navigate to downloads folder.

11.11 use adb to copy screenshots from phone

11.14 on phone, settings/Doug Leith (account shown at top of settings screen), then click name to open menu and click "Manage your Google account".  scroll down first tab ("home"), click on "data & privacy" tab, scroll down.  close

leave idle, connected to power

16.43 use adb to install firebase analytics test app app-debug_notset.apk

16.45 restart phone - mitmproxy cert has become removed from trusted certs list so mitmproxy breaks network connections.  works fine after reboot.  lots of connections made, leave for a few mins until calms down

16.48 open firebase app - doesn't set dsid

16.49 open play store, install shein app from home page, then open.  accept cookies when asked.  search pregnancy test.  click on first result, add to cart.  close app.

16.53 use adb to copy /data/user/0 folder off handset (copy to /data/local/tmp first, then change permission to allow copy by adb pull)

21.07 recompiled firebase app to use new settings, install using adb, open app.  new version of app sends dsid

21.18  On laptop login to google account using browser. make takeout request (selected all 68 out of 68 options)

22.02 shut phone down











