function trim( s ) {
    return s.replace(/ /g, '');
}

function makeFollowing() {
    var following = localStorage.followingIds ? JSON.parse(localStorage.followingIds) : [];
    
    // Attach a function to following to toggle entries
    following.toggleFollow = function( seriesId ) {
        seriesId = parseInt(seriesId, 10);
        
        // Simple bang hack to avoid issues with undefined/null
        this[seriesId] = !this[seriesId] ? true : false;
        localStorage.followingIds = JSON.stringify(this);
    };
    
    following.isFollowed = function( seriesId ) {
        seriesId = parseInt(seriesId, 10);
        
        // Never return null/undefined, only true or false
        return this[seriesId] ? true : false;
    };
    
    return following;
}

appAPI.ready(function( $ ) {
    // Only run on releases.html, do not run on series releases pages
    if (!appAPI.isMatchPages("*mangaupdates.com/releases.html*") || appAPI.isMatchPages("*type=series*")) {return;}
    
    // Load up groups list from extension db.  
    // Since the extension gets and sets it in the background script, cases where it wasn't set before this script runs are highly fringe.
    // The rest of the script takes place in this callback since it relies on data from groups
    appAPI.db.async.get("groups", function(value) {
        var groups = value;
    
        
        // Make our following list
        var following = makeFollowing();
        
        /* 
            Releases will contain an array of objects, each representing one header + <table> from the releases page, for as many tables as are present
            We will store it as a dateString from the header plus an array of objects for the tables representing the content
            For each row of the table, we will store the series ID, name, chapter, color filter settings if any, if that series is set to be followed,
                and an array of all scanlation groups (each group stored as an object that includes the group ID, name, and URL from our groups list).
                
            Prototype for releases object
            {
                "dateString" : string from <h2> header on tables
                "content" : [{
                    "seriesId" : int series id (but actually strings, js doesn't care), 
                    "seriesName" : string series name,
                    "isFollowed" : boolean if series is followed
                    "seriesChapter" : string series chapter,
                    "colorFilter" : string colorFilter,
                    "scanlationGroups" : [{
                        "groupId" : string group ID,
                        "groupName" : string group name,
                        "groupUrl" : string retrieved from groups[]
                    }]
                }]
            }
            
            This full array of releases objects will be passed to the display.html template where it will be iterated through to provide info.
         */
        var releases = [];
        // Begin the screenscrape by grabbing #main_content and scanning it for our <h2>s and <tables>s
        // Capture group 1 will be the date headers, capture group 2 will be the contents *inside* the tables
        $('#main_content').html().replace(/class="titlesmall".+?<i>(.+?)<\/i>(?:.|\n)+?<table.+?>((?:.|\n)+?)<\/table>/g, function($0, $1, $2) {
            var contentColumns = [];
            // Grab the inside of each table row as a capture group.  I suppose jQuery would also work for this.  TODO: is jQuery or regex better performance?
            $2.replace(/<tr>((?:.|\n)+?)<\/tr>/g, function( $0, $1 ) {
            	// $1 = seriesId, $2 = seriesName, $3 = seriesChapter, $4 = scanlationGroups
                var columnScrapeRegEx = /series\.html\?id=(\d{1,9}).+?>(.+?)<\/a>(?:.|\n)+?<td.*?>(.*?)<\/td>(?:.|\n)+?>(.+?)<\/td>/;
                if (!columnScrapeRegEx.test($1)) {
                    // Our first regex failed.  Probably no series page, modify the regex to not look for ID but follow same capture order
                    columnScrapeRegEx = /()class="pad".*?>(.+?)<\/td>(?:\n|.)+?<td.*?>(.*)<\/td>(?:\n|.)+?(?:.|\n)+?>(.+?)<\/td>/;
                }
                var thisColumn = $1.match(columnScrapeRegEx);
                // These defaults protect us from a failure if the regex doesn't work
                var seriesId = "-1";
                var seriesName = "junk entry";
                var seriesChapter = "junk entry";
                var colorFilter = "junk entry";
                var scanlationGroups = ["none"];
                
                // Protects from errors if thisColumn wasn't made, which happens on the header rows of each table
                if (thisColumn !== null) {
                    seriesId = thisColumn[1];
                    seriesName = thisColumn[2];
                    seriesChapter = thisColumn[3];
                    
                    // TODO: include this in the main capture groups instead of making another regex call
                    colorFilter = thisColumn[0].match(/background-color:#(\w{6})/);
                    scanlationGroups = [];
                    
                    // Each group will be a link, so break that up into useful parts
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
            
            // First row was a garbage entry (headers), so kill it
            contentColumns.shift();
            
            releases.push({
                "dateString" : $1,
                "content" : contentColumns
                
            });
        }); 
        
        $('body').empty();
        appAPI.resources.includeCSS('css/styles.css');
        appAPI.resources.includeJS('js/prefixfree.min.js');
        $(appAPI.resources.parseTemplate('display.html', { data : releases })).prependTo('body');
        
        // See display.html.  The whole presentation layer was just built minus the paginator links
        
        $('.follow-series').click(function() {
            var $this = $(this);
            $this.parent().parent().parent().parent().toggleClass('release-followed');
            following.toggleFollow($this.attr('name'));
        });
        
        
        var $contentBox = $('#mu-imp-content-box');
        $('.mu-imp-series-link').click(function( event ) {
            event.preventDefault();
            
            // .series_content_cell acts as a rare example of a semantic identifier for content!  Huzzah, mangaupdates, you almost did semantics!
            // Sadly, the content will still be in a <td> when we get it, but this isn't really harmful so just leave it that way.
            var target = $(this).attr('href') + ' .series_content_cell';
            $contentBox.empty();
            $contentBox.load(target);
            
            // Strikeout the link
            $(this).addClass('link-clicked');
            $(this).parent().parent().parent().addClass('release-clicked');
        });     
        
        var $paginator = $('#mu-imp-paginator');
        
        // No need to beware XSS attacks since it's only accepting digits
        var currentPage = window.location.search.match(/page=(\d{1,9}?)&/); 
        currentPage = (currentPage === null) ? 1 : parseInt(currentPage[1], 10);
        
        // Avoid namespace issues
        (function() {
	        var pagesAdded = 0;
	        var currentPageModifier = -3;
	        // Always want 5 links, even if current page is 1/none
	        while (pagesAdded < 5) {
	        	currentPageModifier++;
	        	var workingPage = currentPageModifier + currentPage;
	        	// Negative pages/page 0 cannot be.
	        	if (workingPage < 1) { continue; }
	        	var thisPageUrl = 'http://www.mangaupdates.com/releases.html?page=' + workingPage + '&';
	        	var listOpener = (currentPageModifier === 0) ? '<li class="mu-imp-current-page">' : '<li>';
	        	$paginator.append($(listOpener + '<a href="' + thisPageUrl + '">' + workingPage + '</a></li>'));
	        	pagesAdded++;
	        }
        })();
    });
});