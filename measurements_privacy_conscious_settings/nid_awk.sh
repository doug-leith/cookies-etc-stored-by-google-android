#!/bin/bash

# list every connection that sends an NID cookie and whether it sets cookie in response

# call using: cat pixel7_19dec2024_full.txt | ./nid_awk.sh > nid_cookies.txt

awk '
BEGIN{on=0; req=0; resp=0; agent=0; found_req=0; found_resp = 0; useragent=""}
/^POST https:/||/^GET https:/{
	split($2, url, "?"); 
	google = (url[1] ~ /goog/) || (url[1] ~ /doubleclick/) || (url[1] ~ /app-measurement/) || (url[1] ~ /firebase/)
	if (google) {
		on=1; count=count+1; 
		#print $1, url[1]
	} else {
		on=0;
	}
}
/^user-agent/||/^User-Agent/{
	useragent=$1 $2 $3; agent=1
}
/Request headers:/ {
	if (on>0) {req=1}
}
/Response headers:/{
	if (on>0) {resp=1}
}
/520=/ {
if ((req>0) && (!found_req)) { 
	if (agent>0) {
		print useragent
	}
	found_req=1; 
	print "req: ", url[1], " ", $0
	}
if ((resp>0) && (!found_resp)) { 
	if (agent>0) {
		print useragent
	}
	found_resp=1; 
	print "resp: ", url[1], " ", $0
	}
}
/\+\+\+REQUEST/ {
	if ((found_req>0) || (found_resp>0)) {
		print "-------------------------"
	}
	on = 0; req=0; resp=0; agent=0; found_req = 0; found_resp = 0; useragent=""
}
' <&0