function trim( s ) {
	return s.replace(/ /g, '');
}

function makeFollowing() {
	var following = localStorage.followingIds ? JSON.parse(localStorage.followingIds) : [];
	
	// Attach a function to following to toggle entries
	following.toggleFollow = function( seriesId ) {
		seriesId = parseInt(seriesId, 10);
		this[seriesId] = !this[seriesId] ? true : false;
		localStorage.followingIds = JSON.stringify(this);
	};
	
	following.isFollowed = function( seriesId ) {
		seriesId = parseInt(seriesId, 10);
		return this[seriesId] ? true : false;
	};
	
	return following;
}

appAPI.ready(function( $ ) {
	// This script will only run on the releases.html page
    if (!appAPI.isMatchPages("*mangaupdates.com/releases.html*")) {return;}
    
    // Load up groups list
    appAPI.resources.includeJS('js/getGroupsFromGit.js');
    var groups = {};
    // Check for locally-stored groups array first
    if (localStorage.groups) {
    	groups = JSON.parse(localStorage.groups);
    } else {
    	// Download from git if no local array was found
    	groups = getGroupsFromGit();
    }
    
    // Make our following list
    var following = makeFollowing();
    
    /* 
    	Releases will contain an array of objects, each representing one table (including the header above that table).
    	Along with the header, we will store an array containing each row of the table.
    	For each row of the table, we will store the series ID, series name, color filter settings if any,
    		and an array of all scanlation groups (each group stored as an object that includes the group ID and group name).
    		
    	Prototype for releases object
		{
			"dateString" : date string from <h2> element or better still a properly-formed Date object,
			"content" : [{
				"seriesId" : series id,
				"seriesName" : series name,
				"isFollowed" : retrieve from following list
				"seriesChapter" : series chapter,
				"colorFilter" : colorFilter,
				"scanlationGroups" : [{
					groupId: group ID,
					groupName: group name,
					"groupUrl: retrieved from groups[] array
				}]
			}]
		}
    	
    	This full array of releases objects will be passed to the display.html template where it will be iterated through to provide info.
     */
    var releases = [];
	// Begin the screenscrape by grabbing #main_content and turning it into a more useful array
	$('#main_content').html().replace(/class="titlesmall".+?<i>(.+?)<\/i>(?:.|\n)+?<table.+?>((?:.|\n)+?)<\/table>/g, function($0, $1, $2) {
		var contentColumns = [];
		$2.replace(/<tr>((?:.|\n)+?)<\/tr>/g, function( $0, $1 ) {
			var columnScrapeRegEx = /series\.html\?id=(\d{1,9}).+?>(.+?)<\/a>(?:.|\n)+?<td.*?>(.+?)<\/td>(?:.|\n)+?>(.+?)<\/td>/
			if (!columnScrapeRegEx.test($1)) {
				// Our first regex failed.  Maybe there is no series page?  Try a second regex
				columnScrapeRegEx = /()class="pad".*?>(.+?)<\/td>(?:\n|.)+?<td.*?>(.*)<\/td>(?:\n|.)+?(?:.|\n)+?>(.+?)<\/td>/
			}
			var thisColumn = $1.match(columnScrapeRegEx);
			// These defaults protect us from a failure if the regex doesn't work
			var seriesId = "-1";
			var seriesName = "junk entry";
			var seriesChapter = "junk entry";
			var colorFilter = "junk entry";
			var scanlationGroups = ["none"];
			if (thisColumn !== null) {
				seriesId = thisColumn[1];
				seriesName = thisColumn[2];
				seriesChapter = thisColumn[3];
				colorFilter = thisColumn[0].match(/background-color:#(\w{6})/);
				scanlationGroups = [];
				thisColumn[4].replace(/id=(\d{1,9}).+?>(.+?)<\/a>/g, function($0, $1, $2) {
					scanlationGroups.push({
						"groupId" : $1,
						"groupName" : $2,
						"groupUrl" : groups[$1]
					});
				});
			}
			contentColumns.push({
				"seriesId" : seriesId,
				"seriesName" : seriesName,
				"seriesChapter" : seriesChapter,
				"isFollowed" : following.isFollowed(seriesId),
				"colorFilter" : colorFilter ? colorFilter[1] : false,
				"scanlationGroups" : scanlationGroups
			});
		});
		
		// First column was a garbage entry, so kill it
		contentColumns.shift();
		
		releases.push({
			"dateString" : $1,
			"content" : contentColumns
			
		});
	});	
	
    $('body').empty();
    appAPI.resources.includeCSS('css/styles.css');
    $(appAPI.resources.parseTemplate('display.html', { data : releases })).prependTo('body');
    
    $('.follow-series').click(function() {
    	var $this = $(this);
		$this.parent().parent().parent().toggleClass('tr-followed');
		following.toggleFollow($this.attr('name'));
    });
    
    
	var $contentBox = $('#mu-improver-content-box');
    $('.series-link').click(function( event ) {
    	event.preventDefault();
    	
    	var target = $(this).attr('href') + ' .series_content_cell';
    	$contentBox.empty();
    	$contentBox.load(target);
    	
    	// Strikeout the link
        $(this).addClass('link-clicked');
        $(this).parent().parent().addClass('tr-clicked');
    });
});