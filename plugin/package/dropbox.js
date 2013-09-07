function chooser(){
  // add an event listener to a Chooser button
  document.getElementById("db-chooser").addEventListener("DbxChooserSuccess",
  	function(e) {
  	  alert("Here's the chosen file: " + e.files[0].link)
  	}, false);
}

