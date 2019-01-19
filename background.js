
chrome.storage.sync.get(['values'], function(items){
    let seconds, timer, currentDay;
    if(items.values && items.values.seconds) {
    	seconds = items.values.seconds;
    } else {
    	seconds = 0;
    }
    if(items.values && items.values.currentDay) {
    	currentDay = items.values.currentDay;
    } else {
    	currentDay = new Date().getDate();
    }

	const addSecond = () => {
		let newCurrentDay = new Date().getDate();
		if(currentDay !== newCurrentDay) {
			currentDay = newCurrentDay;
			seconds = 0;
		}

		seconds ++;
		chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
			if(tabs[0]) {
		  		chrome.tabs.sendMessage(tabs[0].id, {seconds: seconds});
			}
		});
	};

	const setTimer = () => {
		timer = setInterval(addSecond, 1000);
	};

	chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
	    if (request.type === 'ytHidden') {
			chrome.storage.sync.set({ values: { seconds: seconds, currentDay: currentDay } });
	    	clearInterval(timer);
	    }
	    else if (request.type === 'ytShown') {
	      setTimer();
	    }
	});
});
