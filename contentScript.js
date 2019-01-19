(() => {

	let counterDiv = document.createElement('div');
	counterDiv.id = 'website-timer';
	counterDiv.style.cssText = 'position: fixed; bottom: 10px; right: 10px; display; inline-block; background-color: white; padding: 10px; z-index: 10000; font-size: 12px; border-radius: 50px;'
	let counterSpan = document.createElement('span');
	counterDiv.appendChild(document.createTextNode("Time spent today : "));
	counterDiv.appendChild(counterSpan);
	document.body.appendChild(counterDiv);

	document.addEventListener("fullscreenchange", function( event ) {
	    if ( document.fullscreenElement !== null ) {
	        counterDiv.style.visibility = 'hidden';
	    } else {
	        counterDiv.style.visibility = 'visible';
	    }

	});

	const convertSeconds = (sec) => {
        const hrs = Math.floor(sec / 3600);
        const min = Math.floor((sec - (hrs * 3600)) / 60);
        let seconds = sec - (hrs * 3600) - (min * 60);
        seconds = Math.round(seconds * 100) / 100
       
        const result = (hrs < 10 ? "0" + hrs : hrs)
        + ":" + (min < 10 ? "0" + min : min)
        + ":" + (seconds < 10 ? "0" + seconds : seconds);
        return result;
     }

	chrome.runtime.sendMessage({type: 'ytShown'});

	document.addEventListener('visibilitychange', () => {
		if(document.hidden) {
			chrome.runtime.sendMessage({type: 'ytHidden'});
		} else {
			chrome.runtime.sendMessage({type: 'ytShown'});
		}
	});

	chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
	    if (request.seconds) {
	    	counterSpan.innerHTML = convertSeconds(request.seconds);
	    }
	});

})();