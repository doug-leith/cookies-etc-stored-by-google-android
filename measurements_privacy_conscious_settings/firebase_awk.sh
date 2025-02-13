#!/bin/bash

# list every app making a /register3 firebase connection

# call using: cat pixel7_19dec2024_full.txt | ./firebase_awk.sh | sort | uniq

awk '
BEGIN{on=0;  }
/\/register3/{
	on=1;
} 
/app :/ {
if (on>0) { 
	print $0
	}
} 
/\+\+\+REQUEST/ {
	on = 0
}
#END{}
' <&0