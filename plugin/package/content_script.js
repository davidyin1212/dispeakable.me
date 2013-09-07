chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
    console.log(request);
  	if (request.method == "getSelection"){
  		// First, Inject new Hidden div into selected area
  		var selection = window.getSelection();
  		var newDOM = document.createElement("span");
  		newDOM.setAttribute("class", "newArea");
  		selection.getRangeAt(0).surroundContents(newDOM);
  		//document.body.appendChild(newDOM);// DELETE THIS
  		// Encryption algorithm here

      sendResponse({data: selection.toString()});
  	}
    else {
      sendResponse({a:"a"}); // Invalid method
  	}
});


var decrypt = function(msg){
  var decrypt = new JSEncrypt();
  decrypt.setPrivateKey(localStorage.get('me').privateKey);
  return decrypt.decrypt(msg);
}

var encrypt = function(uid, msg){
  var flist = localStorage.getItem('friends');
  for (var _i = 0; _i < flist.length; _i++){
    if (flist[_i].uid === uid){
      var encrypt = new JSEncrypt();
      encrypt.setPublicKey(flist[_i].publicKey);
      return encrypt.encrypt(msg);
    }
  }
}