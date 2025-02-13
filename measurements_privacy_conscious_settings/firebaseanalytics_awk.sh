#!/bin/bash

# list every app sending firebase analytics data

# call using: cat pixel7_19dec2024_full.txt | ./firebaseanalytics_awk.sh | sort | uniq

awk '
BEGIN{on=0;}
/POST https:\/\/region1.app-measurement.com\/a/{
	on=1;
} 
/package_name:/||/google_ad_id:/||/cookie:/||/firebase_instance_id:/ {
if (on>0) { 
	print $0
	}
} 
/\+\+\+REQUEST/ {
	on = 0
}
#END{}
' <&0