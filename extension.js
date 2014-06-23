// Build following list
function makeFollowing() {
    var following = [];
    
    // Load in from localStorage if anything is there
    if (localStorage["following"]) {
        following = JSON.parse(localStorage["following"]);
    }
    
    // Attach a function to following to allow toggling entries
    following.toggleFollow = function(mangaName) {
        if (this.indexOf(mangaName) == -1) {
            this.push(mangaName);
            console.log('follow: ' + mangaName);
        } else {
            this.splice(this.indexOf(mangaName), 1);
            console.log('unfollow: ' + mangaName);
        }
        
        // Save changes
        localStorage["following"] = JSON.stringify(this);
    }
    return following;
}

appAPI.ready(function($) {
    if (!appAPI.isMatchPages("*mangaupdates.com/releases.html*")) return;
    
    // Load up groups list
    appAPI.resources.includeJS('js/groups.js');
    
    // Get the Following list ready
    var following = makeFollowing();
        
    // Begin screenscraping of the releases page here
    // First, grab the date boxes
    var dates = $.makeArray($('#main_content div p.titlesmall')).map(function(date) {
        return $(date).text();
    });
    
    // This very fancy map will grab the full contents of the releases table into a 3-dim array
    var tables = $.makeArray($('#main_content > div > div > table')).map(function(table) {
        return $.makeArray($(table).find('tr')).map(function(tableRow) {
            return $.makeArray($(tableRow).find('td')).map(function(tableCell) {
                return $(tableCell).html();
            });
        });
    });
    
    // Each table's first row is a useless header
    tables.forEach(function(element) { element.splice(0,1); });
    
    // Preserve pagniation buttons
    var pagination = $('#main_content > div > table').html()
    
    if (dates.length != tables.length) {
        console.log('Something catastrophic happened.  Ending script');
    } else {
        // Since the screenscrape didn't return something useless, continue...
        // Load CSS
        $('body').empty();
        appAPI.resources.includeCSS('css/styles.css');
        $(appAPI.resources.parseTemplate('display.html', {
            content: {
                "tables" : tables,
                "dates" : dates
            }
        })).prependTo('body');
        
        // Now that we have our clean tables, add in features
        // Grab some stuff 
        var $releasesBox = $('#mu-improver-release-listing');
        var $contentBox = $('#mu-improver-content-box');
        
        // Links in first-child tds represent links to series pages
        var $mangaLinks = $releasesBox.find('td:first-child a');
        
        // Restore pagination buttons
        $releasesBox.append('<table>' + pagination + '</table>');
        
        // Load series page in content box if a manga page is clicked
        $mangaLinks.click(function( event ) {
            event.preventDefault();
            var target = $(this).attr('href') + ' .series_content_cell';
            $contentBox.empty();
            $contentBox.load(target);

            // Strikeout the link
            $(this).addClass('link-clicked');
            $(this).parent().parent().addClass('tr-clicked');
        });
        
        $mangaLinks.each(function() {
           var mangaName = $(this).text().replace(/ /g, '');
            var checked = "";
            if (following.indexOf(mangaName) != -1) {
                checked = " checked"; // leading space is needed
                $(this).parent().parent().addClass('tr-followed');
            }
            var $followBox = $('<p class="left">Follow: <input type="checkbox" name="' + mangaName + '"' + checked +' /></p>');

            $(this).before('<a class="left" href=' + $(this).attr('href') + '>(Link)</a>');
            $(this).before($followBox);

            $followBox.find('input').click(function() {
                following.toggleFollow(mangaName);
                $(this).parent().parent().parent().toggleClass('tr-followed');
            });
        });
        
        // Click on a table row, toggle coloration of that row
        $releasesBox.find('tr').click(function( event ) {
            $(this).addClass('tr-clicked');
        });
        
        // Links in last-child tds represent links to group pages
        var $groupLinks = $releasesBox.find('td:last-child a');
        
        $groupLinks.each(function() {
            var $currentGroup = $(this);
            var groupLink = $currentGroup.attr('href');
            var groupId = groupLink.split('=').pop();
            var groupName = $currentGroup.text();
            
            // Preserve the original link
            $currentGroup.before($currentGroup.text() + ':<br />');
            $currentGroup.after('<a href="' + groupLink + '">(MU)</a>');
            
            // The important part: adding group website links
            $currentGroup.after('<a target="_blank" href="' + groups[groupId] + '">(Website)</a>');
            
            // Finished with $currentGroup
            $currentGroup.remove();
        });
    }
});