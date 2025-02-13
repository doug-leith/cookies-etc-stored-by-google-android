import frida
import sys
import threading
import time

def on_detached(*args):
	print("detached: ", args)

def on_message(message, data):
	if (message['type']=='send'):
		print(message['payload'])
	else:
		print(message)

def token_decrypt_script():
	#load script
	with open("hook_gmstokens.js", 'r') as f:
		jscode = f.read()
	return jscode

def hook(app, jscode):
	try:
		process_details = device.get_process(app)
		print(process_details)
		session = device.attach(app)
		session.on('detached',on_detached)
		script = session.create_script(jscode)
		script.on('message', on_message)
		script.load()
		return True
	except Exception as e:
		print("WARNING: "+str(e))
		return False

def get_running_apps(apps):
	# return the sublist of apps which is currently running
	running_apps=[]
	for p in device.enumerate_processes():
		running_apps.append(p.name.lower())
	return running_apps

def watch(apps,prev_hooked_apps):
	# keep an eye on list of apps, if any start then hook them
	# to do: watch xamarin apps too
	print("Starting watcher for: "+str(apps))
	jscode = token_decrypt_script()
	while (True):
		time.sleep(5)
		running_apps = get_running_apps(apps)
		hooked_apps = set()
		for app in apps:
			if (running_apps.count(app)>0) and (app in prev_hooked_apps):
				hooked_apps.add(app)
		for app in apps:
			if (running_apps.count(app)>0) and (app not in hooked_apps):
				# new app has started, or previously failed to be hooked
				print("Watcher: "+app+" started or not hooked, hooking it")
				if hook(app,jscode):
					hooked_apps.add(app)
		prev_hooked_apps = hooked_apps

device = frida.get_usb_device()
#list of apps to watch, and hook if/when they become active

failed_apps=[];
jscode = token_decrypt_script()
apps=["com.google.android.gms","com.google.android.gms.persistent"] #,"com.google.android.gms.unstable"]
hooked_apps=set()
for app in apps:
	if hook(app, jscode):
		hooked_apps.add(app)

# start app watcher, if new apps on watch list start then hook them
watcher = threading.Thread(target=watch, args=(apps,hooked_apps))
watcher.start()
sys.stdin.read()
