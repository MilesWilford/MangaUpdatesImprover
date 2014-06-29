appAPI.ready(function($) {
	function getGroups() {
		if (appAPI.time.now() > appAPI.db.getExpiration("groups")) {
			appAPI.request.get({
				url: "https://github.com/loadletter/mangaupdates-urlfix/raw/master/mangaupdates_group.user.js",
				onSuccess: function(response, additionalInfo){
					var groups = {};
					var groupsString = response.match(/var groups = \{((?:.|\n)+?)\}/m);
					groupsString[1].replace(/"(\d{1,6})": "(.+?)"/g, function($0, $1, $2) {
						groups[$1] = $2;
					});
					appAPI.db.async.set("groups", groups, appAPI.time.daysFromNow(4));
					return groups;
				},
				onFailure: function(httpCode) {
					alert('MangaUpdatesImprover failed to retrieve groups list.  HTTP Code: ' + httpCode);
				}
			});
		}
	}
	// If browser runs continuiously, check every 2 days.  Also check at browser startup.
	getGroups();
	setInterval(getGroups, 172800000);
});