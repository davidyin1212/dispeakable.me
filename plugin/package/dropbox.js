
/*
      <input type="dropbox-chooser" name="selected-file" id="db-chooser"/>
      <script type="text/javascript">
      // add an event listener to a Chooser button
      document.getElementById("db-chooser").addEventListener("DbxChooserSuccess",
        function(e) {
          alert("Here's the chosen file: " + e.files[0].link)
        }, false);
      </script>
*/

function checkDropbox(){
	window.open("http://192.241.237.107/")
}