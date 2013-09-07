var client = new Dropbox.Client({key: "j2q6r6vvd5g8ulm"});





function checkDropbox(){
	// Try to finish OAuth authorization.
	client.authenticate({interactive: false}, function (error) {
    if (error) {
        alert('Authentication error: ' + error);
    }
	});

	if (client.isAuthenticated()) {
    	// Client is authenticated. Display UI.
    	alert("I am an authenticated user!");
	}
}
