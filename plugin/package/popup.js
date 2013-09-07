
document.addEventListener('DOMContentLoaded', function () {
  document.getElementById("getSelectionBtn").addEventListener('click', getSelectionHandler);
});


// Send message to background script
function getSelectionHandler() {
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
	  chrome.tabs.sendMessage(tabs[0].id, {method: "getSelection"}, function(response){
	  	console.log(JSON.stringify(response));
	  });
	});


	
}
