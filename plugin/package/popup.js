
document.addEventListener('DOMContentLoaded', function () {
  document.getElementById("getSelectionBtn").addEventListener('click', getSelectionHandler);
  document.getElementById('lead').addEventListener('click', openPage);
});


// Send message to background script
function getSelectionHandler() {
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
	  chrome.tabs.sendMessage(tabs[0].id, {method: "getSelection"}, function(response){
	  	console.log(JSON.stringify(response));
	  });
	});
}

function openPage(){
  // chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
  //   chrome.tabs.sendMessage(tabs[0].id, {method: "openLink"}, function(response){
  //     console.log(JSON.stringify(response));
  //   });
  // });
chrome.runtime.sendMessage({greeting: "hello"}, function(response) {
  console.log(response.farewell);
});
}

