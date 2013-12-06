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
                            var groupIrc = groupMUInfo.find('tr:nth-of-type(2) td:nth-of-type(2) a').attr('href');

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