#!/bin/bash

# list every connection that sends a spatula header 

# call using: cat pixel7_17dec2024_full.txt | ./spatula_awk.sh | sort | uniq > spatula_connections.txt

awk '
BEGIN{on=0; found=0}
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
/x-goog-spatula :/ {
	#print url[1], " ", $0
	print url[1]
	found=1
}
/\+\+\+REQUEST/ {
	if (found>0) {
		#print "-------------------------"
	}
	on = 0; found=0
}
' <&0