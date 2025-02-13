#!/bin/bash

# given intermediate token bytes, list every connection that uses them in auth/bearer header

# call using: cat pixel7_17dec2024_full.txt | ./connections_for_scope_awk.sh
# with target token bytes in file temp.txt and encrypted token in file encryptedtemp.txt

awk '
BEGIN{
	encryptedon=0; 
	on=0; found=0; 
	getline tokenbytes< "temp.txt"; # read target token from temp.txt
	#print tokenbytes
	getline encryptedtokenbytes< "encryptedtemp.txt"; # read encrypted token
	print encryptedtokenbytes

}
# find grantedScopes corresponding to encrypted token
/^POST https:\/\/android.googleapis.com\/auth$/{
	encryptedon=1
	#print $0
}
/^app :/{
	if (encryptedon==1) {
		app = $3;
	}
}
/^grantedScopes=/{
	if (encryptedon==1) {
		split($0,parts,"=")
		scopes = parts[2]
	}
}
/^it=/{
	if (encryptedon==1) {
		if (encryptedtokenbytes==$0) {
			print "app: " app
			print "grantedScopes: " scopes
		}
	}
}
# find connections using decrypted token in auth/bearer header
/Decoded Auth Bearer header/{
	on=1
	#print $0
}
/tokenBytes/{
	if (on==1) {
		bytes = $0;
		if (bytes == tokenbytes) {
			found=1
		}
	}
}
/\+\+\+REQUEST/ {
	if (found==1) {
		print $2 # print URL
	}
 	on = 0; found=0;
 	encryptedon=0; 
}

END{}
' <&0