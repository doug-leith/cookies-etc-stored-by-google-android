17th dec
- flash latest dec 2024 firmware
- phone has Three sim inserted, but data plan is not active (out of credit)
- onboarding with no network.  select defaults (location on, wifi scanning on, usage on, accept software updates).  don't login.
- enable developer mode, side load magisk 27, patch boot.img, flash that and reboot.
- didn't get root, update magisk to v28, patch init_boot.img, flash that and reboot.  get root.
- install trustusercerts and mitmproxy cert, reboot.  check mitmproxy cert installed

wifi access point (tulip) setup:

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

raw mitmdump file: pixel7_17dec2024.mitm
processed using:
mitmdump -s ../addon/decoding_helpers.py -nr pixel7_17dec2024.mitm --set google_only=false> pixel7_17dec2024_full.txt

10.58am connect to wifi (tulip).  leave idle connected to power.

18th dec
13.29 use adb to copy google play services apk off handset, jadx to decompile to find token decryption class (search for string "TokenEncrypted"), then update frida script with class name (ujs).

download mitm file, its pretty big, about 2.6G.  decode to check it looks ok.

13.55 phone had disconnected from wifi, reconnected it.  big burst of connections.  leave idle until connections settle down again.

use adb to copy over frida server to phone, then open shell and start it.
launch frida script to hook token decryption in google play services

14.18 open Google Play store app and login to dougleith23sep@gmail.com, password DougLeith23sep!*
When asked "Keep your account updated with this phone's number" click "Yes, I'm in".  Took screenshot
Shown "Welcome screen". Took screenshot

Note: no /auth connections at this point

wait a few mins, then click "agree" at about 14.24, lots of auth connections start now.  frida script collects decrypted ya29.m tokens corresponding to encrypted intermediate tokens, save into file hook_gmstokens_pixel7_18dec.txt.

google services screen is shown, take screenshot.  Leave "Backup device data" on.  at about 14.28 click "accept".

shows "welcome to google play" screen, take screenshot, at about 14.30 click "Get started".  Shown "Level up your experience" screen, take screenshot, click "Not now".  shows Google Play store home screen with various apps, take screenshot (slight delay before images for all apps are shown).

14.31 leave phone idle, connected to power.

15.32 use adb to copy /data/user/0 folder off handset (copy to /data/local/tmp first, then change permission to allow copy by adb pull). rename folder to 0_18dec

15.55 handset screen blank when open it, v odd.  reboot.  

15.58 open play store app, search "pregnancy app".  take screen shot of results.  click on clue pregnancy app (first on sponsored app list), view app page

search "christian prayer app".  take screen shot of results.  click on "Hallow Prayer & Meditation" (first on sponsored app list), view app page
 
search "gay dating app".   take screen shot of results.  click on "Match" (first on sponsored app list), view app page

16.04 open dialer app, call 087 2618351, get message saying no credit, hang up.

16.05 open messages app, click "continue as Doug" (take screenshot of opening page).  shows "setting up RCS chats" popup, take screenshot.  close popup (press x in corner).  click "start chat", type 087 2618351, click "send", type "test" as message.  get not sent error (no credit)

16.08 open files app.  asks permission to send notifications, click "allow" (take screenshot).  shows "navigate share is now quickshare" popup, click "got it". navigate to downloads folder.

leave idle, connected to power

19th Dec 
07.34  On laptop login to google account using browser.
07.35 open phone, reconnect to wifi (had disconnected)

on laptop, account has web&app history on, timeline paused, youtube history paused.  personalized ads are off, search personalization is off.  make takeout request

07.41 on phone, settings/Doug Leith (account shown at top of settings screen), then click name to open menu and click "Manage your Google account".  scroll down first tab ("home"), click on "data & privacy" tab, scroll down.  close

leave idle, connected to power

09.15 use adb to copy /data/user/0 folder off handset (copy to /data/local/tmp first, then change permission to allow copy by adb pull)

NB: forgot to copy screenshots off phone before factor resetting










