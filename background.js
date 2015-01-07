appAPI.ready(function($) {
    
    function getGroups(msgCallBack) {
        if (appAPI.time.now() > appAPI.db.getExpiration("groups")) {
        	appAPI.request.get({
        		url: 'https://raw.githubusercontent.com/loadletter/mangaupdates-urlfix/master/src/groups.json',
        		onSuccess: function (response, additionalInfo) {
        			groups = JSON.parse(response);
        			appAPI.db.async.set("groups", groups, appAPI.time.daysFromNow(4));
        			return groups;
        		},
        		onFailure: function (httpCode) { 
        			console.log ('Failed to fetch JSON groups list: ' + httpCode); 
        		}
        	});
    	}
    // If browser runs continuiously, check every 2 days.  Also check at browser startup.
    getGroups();
    setInterval(getGroups, 1000*60*60*48); // Every 2 days
	}
});