chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {

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
      sendResponse({}); // Invalid method
  	}
});


