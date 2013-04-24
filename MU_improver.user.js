// ==UserScript==
// @name        MangaUpdates.com Improver
// @namespace   http://github.com/MilesWilford
// @author      Miles Wilford
// @description Simple script that destroys existing MangaUpdates.com/releases content and display it better.
// @version     008
// @require     https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @include     *mangaupdates.com/releases.html*
//
// @history
//
// ==/UserScript==


function userScriptAction() {

    function trimSpaces(string) {
        return string.replace(/ /g,'');
    }

    $(document).ready(function() {

        var following = [];
        if (localStorage["following"]) {
            following = JSON.parse(localStorage["following"]);
        }

        following.toggleFollow = function (mangaName) {
            if (this.indexOf(mangaName) == -1) {
                this.push(mangaName);
                console.log('follow: ' + mangaName);
            } else {
                this.splice(this.indexOf(mangaName), 1);
                console.log('unfollow: ' + mangaName);
            }
            localStorage["following"] = JSON.stringify(this);
        }

        // This will add in the new mu-improver div
        var $muImp = $('<div id="mu-improver"/>');
        $muImp.appendTo('body');
        $muImp.append('<div id="mu-improver-controls">\
            <p><a onclick="localStorage.clear(); return false;" href="#">Clear localStorage</a></p>\
            <p><a id="mu-imp-hide" href="#">Toggle Improver Display</a></p>');

        $('#mu-imp-hide').click(function() {
            $('#mu-improver > div').not('#mu-improver-controls').fadeToggle('fast');
            $("html, body").animate({ scrollTop: 0 }, "slow");
            return false;
        });

        // Now scrape the tables for the contents of their cells.
        // First, grab the date boxes
        var dates = $.makeArray($('#main_content div p.titlesmall')).map(function(date) {
            return $(date).text();
        });

        /*
         * Now, grab the content of the release tables using some fancy maps.
         * I'm going to load them all into a 3-dimensional array.  Thank god MU actually ID'd the container in this case... kind of
         *              array[table(day), row, cell]
         */
        var tables = $.makeArray($('#main_content > div > div > table')).map(function(table) {
            return $.makeArray($(table).find('tr')).map(function(tableRow) {
                return $.makeArray($(tableRow).find('td')).map(function(tableCell) {
                    return $(tableCell).html();
                });
            });
        });

        // Remove the table headers, which are the first row of each table.
        // Dear MangaUpdates: Learn to use <thead>
        tables.forEach(function(elem) {
            elem.splice(0,1)
        });

        // There should be an equal number of dates and tables.  God help us if there aren't.
        if (dates.length > tables.length) {
            console.log("For some reason there are more dates than tables.");
        } else if (dates.length < tables.length) {
            console.log("For some reason there are more tables than dates.");
        } else {
            // Note that the rest of the script is contained in this else.

            $releasesBox = $('<div id="mu-imp-release-listing"/>');
            $releasesBox.appendTo($muImp);

            /*
             * Now re-built the tables by iterating through the releases tables.
             * This will create a nice clean template for the data.
             */
            for (var i = 0; i < dates.length; i++) {
                $releasesBox.append('<h2>' + dates[i] + '</h2>');
                $releasesBox.append('<table>'
                    + tables[i].map(function(rows) {
                       return '<tr><td>'
                            + rows.join("</td><td>")
                            + '</td></tr>';
                    }).join("")
                    + '</table>'
                );
            }

            // Add in the contentBox, which will more or less act as an iFrame.
            var $contentBox = $('<div id="mu-imp-content-box"/>');
            $contentBox.appendTo($muImp);

            // First-child tds links represent links to manga pages
            var mangaLinks = $releasesBox.find('td:first-child a');

            /*
             * If a manga page is clicked, populate $contentBox with the manga's page,
             * which will be the contents of the first .series_content_cell in MU's awful semantics.
             */
            mangaLinks.click(function() {
                var target = $(this).attr('href') + ' .series_content_cell';
                $contentBox.empty();
                $contentBox.load(target);

                // Strikeout the link
                $(this).addClass('link-clicked');
                $(this).parent().parent().addClass('tr-clicked');

                // Stop the click from continuing to process
                return false;
            });


            // Preserve the option to open the manga link by adding a (Link) option on the far left
            mangaLinks.each(function() {
                var mangaName = trimSpaces($(this).text());
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

            // If you click on just a table row, toggle on the coloration of that row
            $releasesBox.find('tr').click(function() {
                $(this).addClass('tr-clicked');
            });

            // Last-child td links represent links to group pages
            var groupLinks = $releasesBox.find('td:last-child a');

            groupLinks.each(function() {
                // These links all end in 'id=groupid', so it's easy to snatch it
                var $currentGroup = $(this);
                var groupLink = $currentGroup.attr('href');
                var groupId = groupLink.split('=').pop();
                var groupName = $currentGroup.text();

                // Before starting, preserve the original link
                $currentGroup.before($currentGroup.text() + ':<br />');
                $currentGroup.after('<a href=' + groupLink + '>(MU)</a>')

                // Check if value for this groupId is stored in localStorage
                if (typeof localStorage[groupId] == 'undefined') {
                    // No stored values, so time to ajax and screenscrape
                    $.ajax({
                        url: groupLink,
                        dataType: 'text',
                        success: function(data) {
                            console.log('Scraping data for: ' + groupName);
                            // I like jQuery, so I'm going to drop the content into an anonymous div
                            var scraper = $("<div>").html(data)[0];

                            // GroupMUInfo is the table of data stored on the group's MU page.  What a pain to retrieve
                            var groupMUInfo = $(scraper).find('#main_content table table:first-of-type table');

                            // With some trial and error, I found where the URL and IRC links are stored.  Until this breaks, just trust it works.
                            var groupUrl = groupMUInfo.find('tr:nth-of-type(3) td:nth-of-type(2) a').attr('href');
                            var groupIrc = groupMUInfo.find('tr:nth-of-type(2) td:nth-of-type(2) a').attr('href')

                            // Any time there was no IRC or URL, the above selectors grab the wrong link, but it's easy to spot
                            var badUrl = 'www.mangaupdates.com/groups';
                            if (groupUrl && groupUrl.indexOf(badUrl) == -1) {
                                $currentGroup.after('<a href="' + groupUrl + '">(Website)</a>');
                            } else {
                                groupUrl = "";
                            }
                            if (groupIrc && groupIrc.indexOf(badUrl) == -1) {
                                $currentGroup.after('<a href="' + groupIrc + '">(IRC)</a>');
                            } else {
                                groupIrc = "";
                            }

                            // Delete the original link, it has already been replaced
                            $currentGroup.remove();

                            /*
                             * MU doesn't have an API, but as bad as their site is I don't want to DDoS them with my script.
                             * To avoid triggering too many ajax requests, store groupInfo in localStorage
                             */
                            var groupInfo = [groupUrl, groupIrc];
                            localStorage[groupId] = JSON.stringify(groupInfo);
                         }
                    });
                } else {
                    // localStorage had an entry for groupId, so load that entry.
                    // It was stored as [groupUrl, groupIrc] using JSON.stringify
                    var groupInfo = JSON.parse(localStorage[groupId]);
                    var groupUrl = groupInfo[0];
                    var groupIrc = groupInfo[1];

                    // If either varaible is 0 length, do not add that link
                    if (groupUrl.length > 0) {
                        $currentGroup.after('<a href="' + groupUrl + '">(Website)</a>');
                    }
                    if (groupIrc.length > 0) {
                        $currentGroup.after('<a href="' + groupIrc + '">(IRC)</a>');
                    }

                    // $currentGroup was already replaced, remove it.
                    $currentGroup.remove();
                }
            });
            // Finally, re-add the pagination buttons
            $releasesBox.append('<table>' + $('#main_content > div > table').html() + '</table>');
        }

        // Now append some styles to the document.  Very, very ugly doing this in a userScript
        var cssToAdd = '\
        .link-clicked {\
            text-decoration: line-through !important;\
        }\
        \
        #mu-improver { \
            background-color: #EEE;\
            font-family: Arial;\
            position: absolute;\
                top: 0;\
                left: 0;\
            text-align: left;\
            width: 100%;\
            z-index: 100;\
        }\
        \
        #mu-improver-controls {\
            background-color: inherit;\
            border: 1px #000 solid;\
            border-radius: 8px;\
            margin: 1.4em 1.4em 0 0;\
            padding: 0 1.4em;\
            position: fixed;\
                top: 0;\
                right: 0;\
            z-index: 101;\
        }\
        \
        #mu-imp-release-listing h2 {\
            font-size: 16px;\
            padding: 0\
        }\
        \
        #mu-imp-release-listing .left {\
            clear: both;\
            display: inline-block;\
            float: left;\
            margin: 0;\
            padding: 0;\
            padding-right: 1em;\
        }\
        \
        #mu-imp-release-listing table {\
            font-size: 12px;\
            text-align: center;\
        }\
        \
        #mu-imp-release-listing tr {\
            border-bottom: 1px #000 solid;\
            display: block;\
        }\
        \
        #mu-imp-release-listing tr:hover {\
            background-color: #FFF;\
        }\
        \
            #mu-imp-release-listing tr.tr-clicked {\
                background-color: #CCC;\
            }\
            \
            #mu-imp-release-listing tr.tr-followed {\
                background-color: #FC912F;\
            }\
            \
                #mu-imp-release-listing tr.tr-followed a:hover {\
                    color: #000;\
                }\
                \
        #mu-imp-release-listing td:first-child {\
            text-align: right;\
            width: 200px;\
        }\
        \
        #mu-imp-release-listing td:nth-child(2) {\
            width: 80px;\
        }\
        \
        #mu-imp-release-listing td:last-child {\
            text-align: left;\
            width: 160px;\
        }\
        \
        #mu-imp-release-listing {\
            float: left;\
        }\
        \
        #mu-imp-content-box {\
            border-left: 1px #000 solid;\
            height: 100%;\
            overflow: scroll;\
            position: fixed;\
                top: 0;\
                left: 470px;\
        }\
        \
            #mu-imp-content-box td.series_content_cell {\
                width: auto;\
            }\
            \
            #mu-imp-content-box li {\
                display: inline;\
            }\
            \
            #mu-imp-content-box .series_content_cell table {\
                display: none;\
            }\
            \
            #mu-imp-content-box .releasestitle {\
                clear: both;\
            }\
            \
            #listContainer {\
                display: none;\
            }\
            \
            .sContainer {\
                float: left;\
                width: 250px;\
                clear: none;\
                margin-left: 3em;\
            }\
            \
            .sCat:first-child {\
                text-align: center;\
            }';

        $('body').append('<style type="text/css">' + cssToAdd + '</style>');
    });
}

// The script requires jQuery, but chrome doesn't support @require in userScripts, so this is a polyfill of sorts.
// Hopefully this explains why all the above script was stored in the userScriptAction function
if (typeof localStorage != 'undefined') {
    if (typeof jQuery == 'undefined') {
        (function(callback) {
            var script = document.createElement("script");
            script.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js");
            script.addEventListener('load', function() {
                var script = document.createElement("script");
                script.textContent = "(" + callback.toString() + ")();";
                document.body.appendChild(script);
            }, false);
            document.body.appendChild(script);
        })(userScriptAction);
    } else {
        userScriptAction();
    }
}


