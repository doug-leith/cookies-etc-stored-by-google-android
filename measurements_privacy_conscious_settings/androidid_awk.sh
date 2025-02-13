#!/bin/bash

# list every connection plus whether it sends android ID, long but v useful

# call using: cat pixel7_19dec2024_full.txt | ./androidid_awk.sh 

awk '
BEGIN{on=0; found=0; androidIdcount=0; count=0; androidIdbytes=0; bytes=0}
/^POST https:/||/^GET https:/{
#/^POST https:/{
	split($2, url, "?"); 
	google = (url[1] ~ /goog/) || (url[1] ~ /doubleclick/) || (url[1] ~ /app-measurement/) || (url[1] ~ /firebase/)
	#google = google && ! ( (url[1] ~ /youtube/) || (url[1] ~ /googlevideo.com/) || (url[1] ~ /safebrowsing/) || (url[1] ~ /mobilemaps/) )
	#print google, url[1]
	if (google) {
		on=1; count=count+1; 
		#print $1, url[1]
	} else {
		on=0;
	}
} 
# these match the android ID in pixel7_19dec2024_full.txt
/4337343581573270621/ {if ((on>0) && (!found)) {androidIdcount=androidIdcount+1; 
	found=1; #print androidIdcount, count, androidIdbytes, bytes
	print url[1]
	}} 
/3c315701d87ecc5d/ {if ((on>0) && (!found)) {androidIdcount=androidIdcount+1;
	 found=1; #print androidIdcount, count, androidIdbytes, bytes
	 print url[1]
	 }}
/\+\+\+REQUEST/ {
	bytes=bytes+$3
	if (on>0) {
		androidIdbytes = androidIdbytes+$3
	}
	on = 0
	found = 0
}
#END{print androidIdcount, count, androidIdbytes, bytes}
' <&0