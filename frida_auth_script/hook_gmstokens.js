Java.perform(function() {

	try {
		var targetClass="ujs";
		var targetMethod="a";
		var hook = Java.use(targetClass);
		hook[targetMethod].implementation = function(keysetHandle,encryptedToken) {
			console.warn("\n*** encryptedToken="+encryptedToken+" keysetHandleClass=");
			var retval = this[targetMethod].apply(this, arguments);
			console.warn("\n*** decrypted plaintext="+retval);
			send("***encryptedToken="+encryptedToken+", ***decrypted plaintext="+retval);
			//console.warn(emfg.b) // force error, for testing
			return retval;
		}
	} catch(err) {
		console.log(err);
	}

})