function getGroupsFromGit() {
    var details = {
        url : 'https://github.com/loadletter/mangaupdates-urlfix/raw/master/mangaupdates_group.user.js',
        method : 'GET',
        async : false,
        contentType : 'text'
    };
    kango.xhr.send(details, function(data) {
        if (data.status == 200 && data.response != null) {
            if (request.status == 200) {
                var groups = {};
                var groupsString = data.response.match(/var groups = {((?:.|\n)+?)}/m);
                if (groupString != null && groupString.length > 0) {
                    groupsString[1].replace(/"(\d{1,6})": "(.+?)"/g, function($0, $1, $2) {
                        groups[$1] = $2;
                    });
                    return groups;
                }
            }
        }
    });
}

setInterval(kango.browser.tabs.getCurrent(function(tab) {
    // tab is KangoBrowserTab object
    tab.dispatchMessage('Background2Content', 'Hello from background');
    alert('alert');
}), 500);