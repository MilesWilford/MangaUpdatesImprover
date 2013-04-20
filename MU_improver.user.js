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
        // var removeThese = [
            // '.left_content' ,
            // '.right_content' ,
            // '#page_title' ,
            // '#banner' ,
            // '#login' ,
            // '#main_content > table:first-child' ,
            // '#main_content > div > div:first-of-type' ,
            // '#maintitle' ,
            // '#signupbutton' ,
            // '#center_row1' ,
            // 'img[src="images/footer_new.jpg"]'
        // ];
//
        // removeThese.forEach(function(elem) {
           // $(elem).hide();
        // });

        // This stuff will all add in our new mu-improver div
        var $muImp = $('<div id="mu-improver"/>');
        $muImp.appendTo('body');

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

        if (dates.length > tables.length) {
            console.log("For some reason we have more dates than tables.");
        } else if (dates.length < tables.length) {
            console.log("For some reason we have more tables than dates.");
        } else {
            for (var i = 0; i < dates.length; i++) {
                $muImp.append('<h2>' + dates[i] + '</h2>');
                var tableContents =
                $muImp.append('<table>'
                    + tables[i].map(function(rows) {
                       return '<tr><td>'
                            + rows.join("</td><td>")
                            + '</td></tr>';
                    }).join("")
                    + '</table>'
                );
            }
        }

        // Now append some styles to the document
        var cssToAdd = '\
        #mu-improver { \
            position: absolute;\
                top: 0;\
                left: 0;\
            z-index: 100;\
            background-color: #EEE;\
            width: 100%;\
            text-align: center;\
            font-family: Arial;\
        }\
        \
        #mu-improver h2 {\
            font-size: 16px;\
            padding: 0\
        }\
        \
        #mu-improver table {\
            max-width: 960px;\
            margin: 0 auto;\
            font-size: 12px;\
        }\
        \
        #mu-improver tr {\
            border-bottom: 1px #000 solid;\
            display: block;\
        }\
        \
        #mu-improver tr:hover {\
            background-color: #FFF;\
        }\
        \
        #mu-improver td:first-child {\
            text-align: right;\
            width: 300px;\
        }\
        \
        #mu-improver td:nth-child(2) {\
            width: 80px;\
        }\
        \
        #mu-improver td:last-child {\
            text-align: left;\
            width: 300px;\
        }';

        $('body').append('<style type="text/css">' + cssToAdd + '</style>');
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