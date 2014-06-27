function getGroupsFromGit() {
	appAPI.request.get({
		url: "https://github.com/loadletter/mangaupdates-urlfix/raw/master/mangaupdates_group.user.js",
		onSuccess: function(response, additionalInfo){
			var groups = {};
			var groupsString = response.match(/var groups = {((?:.|\n)+?)}/m);
			groupsString[1].replace(/"(\d{1,6})": "(.+?)"/g, function($0, $1, $2) {
				groups[$1] = $2;
			});
			localStorage["groups"] = JSON.stringify(groups);
			return groups;
		},
		onFailure: function(httpCode) {
			console.log('Failed to retrieve groups list:');
        	console.log('GET:: Request failed. HTTP Code: ' + httpCode);
		}
	});
}