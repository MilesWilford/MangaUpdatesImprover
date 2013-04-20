// ==UserScript==
// @name        MangaUpdates.com Improver
// @namespace   http://github.com/MilesWilford
// @author      Miles Wilford
// @description Simple script that destroys existing MangaUpdates.com/releases content and display it better.
// @version     001
// @require     https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @include     *mangaupdates.com/releases.html*
//
// @history
//
// ==/UserScript==

function userScriptAction() {
    $(document).ready(function() {
        var removeThese = [
            '.left_content' ,
            '.right_content' ,
            '#page_title' ,
            '#banner' ,
            '#login' ,
            '#main_content > table:first-child' ,
            '#main_content > div > div:first-of-type' ,
            '#maintitle' ,
            '#signupbutton' ,
            '#center_row1' ,
            'img[src="images/footer_new.jpg"]'
        ];

        removeThese.forEach(function(elem) {
           $(elem).fadeOut('fast');
        });

        // Now we are going to scrape the tables for the contents of their cells.

        // First, grab the date boxes
        var dates = $.makeArray($('#main_content div p.titlesmall')).map(function(date) {
            return $(date).text();
        });

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

        console.log(dates[0]);
        console.log(tables[0][0][0]);
    });
}

// Make sure we have jQuery to deal with Chrome not accepting @require
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