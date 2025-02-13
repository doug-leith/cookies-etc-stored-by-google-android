#!/bin/bash

# list every /auth connection, extracts granted scopes and groups them by app

# call using: cat pixel7_19dec2024_full.txt | ./grantedscopes_awk.sh 

awk '
BEGIN{on=0}
/^POST https:\/\/android.googleapis.com\/auth$/{
	on=1
	#print $0
}
/^app :/{
	if (on==1) {
		app = $3;
		appList[app] = 1
		#print $3, app
	}
}
/^grantedScopes=/{
	if (on==1) {
		split($0,parts,"=")
		#print $0, parts[2]
		split(parts[2],scopeList," ")
		for (s in scopeList) {
			scopes[app "@" scopeList[s]]=1
		}		
		#print $0, app, parts[2]
	}
}
/\+\+\+REQUEST/ { on = 0; }

END{
	#PROCINFO["sorted_in"] = "@val_str_desc" # sort array keys  
	for (app in appList) {
		grantedScopes=""
		for (appscope in scopes) { 
			split(appscope, parts, "@"); 
			if (parts[1] == app) {
				grantedScopes = grantedScopes " " parts[2]
			}
		}
		print app ": " grantedScopes
		print "\n"
	}
}
' <&0