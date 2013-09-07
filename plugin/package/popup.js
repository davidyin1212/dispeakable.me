  
function getSelection() {
  chrome.tabs.sendRequest(tab.id, {method: "getSelection"}, function(response){
     alert(response.data);
  });	
}
