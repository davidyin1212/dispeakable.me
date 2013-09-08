
document.addEventListener('DOMContentLoaded', function () {
  document.getElementById("getSelectionBtn").addEventListener('click', getSelectionHandler);
  //document.getElementById('lead').addEventListener('click', openPage);
  //document.getElementById('decryptBtn').addEventListener('click', decryptPage);
});


// Send message to background script
function getSelectionHandler() {
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
		var uids = [];
		var selectedElements = $('#friendSelect option:selected');
		
		for (var i in selectedElements) {
			var current = selectedElements[i];
			uids.push(current.attr("data-uid"));
		}

	  chrome.tabs.sendMessage(tabs[0].id, {method: "getSelection", uids: "uids"}, function(response){
	  	console.log(JSON.stringify(response));
	  });
	});
}

// function openPage(url){
//   chrome.tabs.create({ "url": url });
// }

function decryptPage(){
  
}

//WILS AREA, STAY THE FUCK OUT!!!
(function($){
  pageInitialized = false;
  $(function() {
    if(pageInitialized) return;
    pageInitialized = true;
    // Handler for .ready() called.
    var $goggles = $('#goggles');
    var mouseleft = false;
    $(document).on('mouseup', function(e){
      $goggles.css({
        'top': 33,
        'left': 29
      });
      if(e.pageX<0 || e.pageX>300 || e.pageY < 0 || e.pageY > 626){
        //TODO send message to background
        $goggles.hide();
        chrome.runtime.sendMessage({greeting: "hello"}, function(response) {
          console.log(response.farewell);
        });
      }
      return false;
    });
    $goggles.draggable();
  });
})(jQuery);

//END OF WILS AREA
