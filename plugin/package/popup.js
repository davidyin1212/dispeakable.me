
document.addEventListener('DOMContentLoaded', function () {
  document.querySelector('input').addEventListener('click', clickHandler);
});


// Send message to background script
function clickHandler() {


	// chrome.extension.sendMessage({
	// 	type: "getSelection"
	// });
	alert("test");
}


// $(document).ready(){
// 	$('#button1').on("click", function(){
// 	alert("shit");
// 	});
// };


