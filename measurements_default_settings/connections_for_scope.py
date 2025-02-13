import re
import base64
import subprocess
import tempfile
import subprocess
import os

mypath = os.path.dirname(os.path.realpath(__file__))

# for each encrypted token in file fname: (i) scan mitm_fname to find grantedScopes, (ii) use fname to get the decrypted 
# token (expanding it as protobuf so can see tokenBytes) then scan mitm_fname to find all connections with auth/bearer 
# headers using that token.

# usage: python3 connections_for_scope.py > connections_for_scope.txt

def base64padding(header):
    if len(header) % 4 == 2:
        extras="=="
    elif len(header) % 4 == 3:
        extras="="
    else:
        extras=""
    return extras

def urlsafe_decodeBase64(header):
    return base64.urlsafe_b64decode(header + base64padding(header))

def decodeAuthBearerHeader(header, debug=False):
    # example: ya29.m.CqkEASf-AWiMjE32vF2w15AemCtG9oEVKMmZb0nTui52upWAWK5BdGGWTH56eclQbzl7z_3WJQo-B7a8MvQUpKT3mFenAl_P8Sj87WZG74IA6D7VHv77c2D998XR3h3GusC_Z1r87prVJPvZYcknxec8BsJZteObEGtb3zoUu-7_3w87SyynzLFM852uVKkOi5EO60Xtqg9ti6Cdo1hyHOECiDk6j6_dgTkZzhnzHPsMJsd9F9Db-oLuk2ffF6Y4Q924wzLA_6ZTqiGbJZrIt7FOVMCOwwzVsRfsqclRAx-ICGqAl-GvUbVP5TxQdiLdVzwI5-HIk00G_Ap4MgD7X-XbTFjTL5eaWtbbR9YJ4HX6xchgraf1fEqDOYVzHC3kHLXWdttPh1pvMrCGHs9n7wYCzVjR_jr5KeoP2RK066lqDcdCSg-RfT08qxWDLmFeNJur8gBC6HiqqzrDgdU01TxwI9xUAiK5Lm2zS-eCFUISo4NK421xUHdNe_eFY4WrDij6-TXkyzZN4LZ0mvz91ec9b0vL19frdJq9pl2riuxrixlb2ZxMv0WuE9jL0vj3aiVLRvuQxtScmn8XN0O8EYZVTPjIbu9cnghV4UEqMunY5fHpmhfMUDSfURG_mvR8AWMuqP5IC9BeWmDrgTbEuOnIsQGvGhB53XLO3mKN2tanptCj2BWuj6oN0k7wSUus9hLrhC6vFuyHMnYdf4nxwjmuuN4f6pJhCY460xIMCAESBgoBMxDRHBgFGiBAuva1FdbuSY0ohuHtc0CktKXibIqksqQO1SGn9r24eiICCAEqK2FDZ1lLQVlrU0FSSVNGUUhHWDJNaVl6X3ZTdDVKTmdINURHY0FfYm8tdlE
    buf = urlsafe_decodeBase64(header[7:])
    if debug:
        fname='/tmp/intermediatetoken_bytes'
        f = open(fname, 'wb')
    else:
        f = tempfile.NamedTemporaryFile(delete=False)
        fname=f.name
    f.write(buf)
    f.close()
    decoded = subprocess.check_output("protoc --decode=\"IntermediateToken\" -I='../addon/' intermediatetoken.proto  <"+fname, shell=True, stderr=subprocess.STDOUT, text=True)
    return("Decoded Auth Bearer header:\n"+decoded)

fname="hook_gmstokens_pixel7_18dec.txt"
mitm_fname="pixel7_17dec2024_full.txt"
with open(fname,"r") as f:
    for line in f:
        s = re.findall('(ya29\.m\..+)$', line)
        #print(s)
        if len(s)>0:
            #print(line)
            encrypted = line.split(',')
            encrypted = encrypted[0].split("=")[1]
            with open("encryptedtemp.txt","w") as ff:
                ff.write("it="+encrypted) 
            #print(encrypted)
            token=s[0]
            decoded=decodeAuthBearerHeader(token)
            l=decoded.split("\n")[1]
            tokenBytes=l.split(' ')[1]
            #print(tokenBytes)
            with open("temp.txt","w") as ff:
                ff.write("tokenBytes: "+tokenBytes)
            res=subprocess.check_output("'"+mypath+"/connections_for_scope_awk.sh' < '"+mypath+"/"+mitm_fname+"'",
                       shell=True, stderr=subprocess.STDOUT, text=True)
            #print("encrypted token:", encrypted)
            #print("connections using it:")
            print(res)
            print()


