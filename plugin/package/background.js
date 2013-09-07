// // listening for an event / one-time requests
// // coming from the popup
// chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
//     switch(request.type) {
//         case "getSelection":
//         	console.log("shit");
//           getSelection();
//         break;
//     }
//     return true;
// });



// function getSelection() {
// 	chrome.tabs.sendRequest(tab.id, {method: "getSelection"}, function(response){
// 	    showSelected(response.data);
// 	  });
// }



// function showSelected(data) {
// 	var popups = chrome.extension.getViews();
// 	for (var i in popups) {
// 		popups[i].document.write("FUCKOFF");
// 	}
// }