if ('serviceWorker' in navigator) {
  window.addEventListener("load", function () {
    navigator.serviceWorker
      .register('./sw.js')
      .then(function (registration) {
        console.log("Service Worker Registered", registration.scope);
      })
      .catch(function (err) {
        console.log("Service Worker Failed to Register", err);
      })
  })
}

let deferredPrompt;
const promptDialog = document.querySelector("#prompt");
const installBtn = document.querySelector("#prompt-btn");

window.addEventListener("beforeinstallprompt", e => {
	// Prevent Chrome 67 and earlier from automatically showing the prompt
	e.preventDefault();
	// Stash the event so it can be triggered later.
	deferredPrompt = e;
	// Update UI to notify the user they can add to home screen
	promptDialog.style.display = "block";

	installBtn.addEventListener("click", e => {
		// hide our user interface that shows our A2HS button
		promptDialog.style.display = "none";
		// Show the prompt
		deferredPrompt.prompt();
		// Wait for the user to respond to the prompt
		deferredPrompt.userChoice.then(choiceResult => {
			if (choiceResult.outcome === "accepted") {
				console.log("User accepted the A2HS prompt");
			} else {
				console.log("User dismissed the A2HS prompt");
			}
			deferredPrompt = null;
		});
	});
});
