// ==UserScript==
// @name        MangaUpdates.com Improver
// @namespace   http://github.com/MilesWilford
// @author      Miles Wilford
// @description Simple script that destroys existing MangaUpdates.com/releases content and display it better.
// @version     005
// @require     https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @include     *mangaupdates.com/releases.html
//
// @history
//
// ==/UserScript==

function userScriptAction() {
    $(document).ready(function() {
        // This will add in our new mu-improver div
        var $muImp = $('<div id="mu-improver"/>');
        $muImp.appendTo('body');
        $muImp.append('<div id="mu-improver-clear-storage"><a onclick="localStorage.clear(); return false;" href="#">Clear localStorage</a>');

        // Now we are going to scrape the tables for the contents of their cells.
        // First, grab the date boxes
        var dates = $.makeArray($('#main_content div p.titlesmall')).map(function(date) {
            return $(date).text();
        });

        // Now, grab the content of the release tables
        var tables = $.makeArray($('#main_content > div > div > table')).map(function(table) {
            return $.makeArray($(table).find('tr')).map(function(tableRow) {
                return $.makeArray($(tableRow).find('td')).map(function(tableCell) {
                    return $(tableCell).html();
                });
            });
        });

        // Remove the table headers, which are the first row of each table.
        // Dear MangaUpdates: Learn to use proper semantics.  This is such a cludge.
        tables.forEach(function(elem) {
            elem.splice(0,1)
        });

        // If MU fucks something up, well, then it'll be fucked up
        if (dates.length > tables.length) {
            console.log("For some reason we have more dates than tables.");
        } else if (dates.length < tables.length) {
            console.log("For some reason we have more tables than dates.");
        } else {
            $releasesBox = $('<div id="mu-imp-release-listing"/>');
            $releasesBox.appendTo($muImp);
            for (var i = 0; i < dates.length; i++) {
                $releasesBox.append('<h2>' + dates[i] + '</h2>');
                var tableContents =
                $releasesBox.append('<table>'
                    + tables[i].map(function(rows) {
                       return '<tr><td>'
                            + rows.join("</td><td>")
                            + '</td></tr>';
                    }).join("")
                    + '</table>'
                );
            }

            // Add in the box where we will display content
            var $contentBox = $('<div id="mu-imp-content-box"/>');
            $contentBox.appendTo($muImp);

            // First-child tds links represent links to manga pages
            var mangaLinks = $releasesBox.find('td:first-child a');
            mangaLinks.click(function() {
                var target = $(this).attr('href') + ' .series_content_cell';
                $contentBox.empty();
                $contentBox.load(target);
                $(this).addClass('link-clicked');

                return false;
            });

            // Preserve the option to open link not inline
            mangaLinks.each(function() {
                $(this).before(' <a style="float: left;" href=' + $(this).attr('href') + '>(Link)</a>')
            });

            // Last-child td links represent links to group pages
            var groupLinks = $releasesBox.find('td:last-child a');

            // Preserve the option to open link not inline
            groupLinks.each(function() {
                // These links all end in id=groupid, so we can just pop the group id
                var $currentGroup = $(this);
                var groupLink = $currentGroup.attr('href');
                var groupId = groupLink.split('=').pop();
                var groupName = $currentGroup.text();

                // Before we start, preserve the original link
                $currentGroup.before($currentGroup.text() + ':<br />');
                $currentGroup.after('<a href=' + groupLink + '>(MU)</a>')

                // Check if we stored this in localStorage to reduce load times
                if (typeof localStorage[groupId] == 'undefined') {
                    $.ajax({
                        url: groupLink,
                        dataType: 'text',
                        success: function(data) {
                            // This is our screenscraper
                            var scraper = $("<div>").html(data)[0]

                            // GroupMUInfo is the table of data stored on the group's MU page.  What a pain to retrieve
                            var groupMUInfo = $(scraper).find('#main_content table table:first-of-type table');

                            // With some trial and error, I found where the URL and IRC links are stored.  Just trust me, unless it breaks.
                            var groupUrl = groupMUInfo.find('tr:nth-of-type(3) td:nth-of-type(2) a').attr('href');
                            var groupIrc = groupMUInfo.find('tr:nth-of-type(2) td:nth-of-type(2) a').attr('href')
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
                            //Double-check that both have a length else we'll not want to include it.
                            $currentGroup.remove();

                            // So we aren't hitting MU with too many HTTP requests, we will store these data points.
                            // this would be easier if they provided an API, but whatever.
                            var groupInfo = [groupUrl, groupIrc];
                            localStorage[groupId] = JSON.stringify(groupInfo);
                         }
                    });
                } else {
                    // We previously stored the data, so just get it from localStorage and skip screenscraping.
                    // Was stored as [groupUrl, groupIrc] using JSON.stringify
                    var groupInfo = JSON.parse(localStorage[groupId]);
                    var groupIrc = groupInfo[1];
                    var groupUrl = groupInfo[0];

                    //Double-check that both have a length else we'll not want to include it.
                    if (groupUrl.length > 0) {
                        $currentGroup.after('<a href="' + groupUrl + '">(Website)</a>');
                    }
                    if (groupIrc.length > 0) {
                        $currentGroup.after('<a href="' + groupIrc + '">(IRC)</a>');
                    }
                    //Double-check that both have a length else we'll not want to include it.
                    $currentGroup.remove();
                    $currentGroup.remove();
                }

            });
        }

        // Now append some styles to the document
        var cssToAdd = '\
        .link-clicked {\
            text-decoration: line-through !important;\
        }\
        \
        #mu-improver { \
            position: absolute;\
                top: 0;\
                left: 0;\
            z-index: 100;\
            background-color: #EEE;\
            width: 100%;\
            font-family: Arial;\
            text-align: left;\
        }\
        \
        #mu-imp-release-listing h2 {\
            font-size: 16px;\
            padding: 0\
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

// Make sure we have jQuery to deal with Chrome not accepting @require
if ( typeof localStorage != 'undefined') {
    if ( typeof jQuery == 'undefined') {
        function addJQuery(callback) {
            var script = document.createElement("script");
            script.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js");
            script.addEventListener('load', function() {
                var script = document.createElement("script");
                script.textContent = "(" + callback.toString() + ")();";
                document.body.appendChild(script);
            }, false);
            document.body.appendChild(script);
        }

        addJQuery(userScriptAction);
    } else {
        userScriptAction();
    }
}