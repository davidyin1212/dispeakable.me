
function injectNewDOM() {
	var originalDOM = $('.newArea');
	var newDOM = $('<span class="enryptedMessage">Bitch</span>');
	
	// Append to html
	originalDOM.parent().append(newDOM);

	// Set up overlay
	newDOM.css("width", originalDOM.width());
	newDOM.css("height", originalDOM.height());
	newDOM.offset(originalDOM.offset());
	newDOM.css("position", "relative");
	newDOM.css("z-index", 100);
}


function hideOriginalMessage() {
	$('.newArea').css("color", $('.newArea').css("backgroundColor"));
}
function resetArea() {
	$('.newArea').removeClass("newArea");
}


chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
    console.log(request);
  	if (request.method == "getSelection"){
  		rangy.init();
			var newAreaApplier = rangy.createCssClassApplier("newArea", true);

  		// First, Inject new Hidden div into selected area
  		var selection = window.getSelection();

  		// newAreaApplier.applyToSelection();

  		// injectNewDOM();
  		// hideOriginalMessage();
    //   sendResponse({data: selection.toString()});
  	}

  	else if(request.method == "encrypt") {
  		var selectionString = window.getSelection().toString();
  		request.uids // <-- This is list of uids
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
