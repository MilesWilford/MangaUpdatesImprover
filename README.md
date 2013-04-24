WIP - MangaUpdates Improver

This is a userscript that should be installable in any browser.  Using some simple jQuery, it puts a simplified content overlay over the site at mangaupdates.com/releases.html with a cleaner display.

It will open manga pages pages inline.  It's not a responsive design and is pretty ugly, but it's still more usable than the mangaupdates page.

It will also give you direct access to website and IRC URLs, if they exist.  We screenscrape to get those URLs, but store them in localStorage to reduce the hits to the MU site so you only have to load any group's info once per clearing of the browser's cookies.

Using localStorage, this script will let you mark manga you are following to make them pop in the display more easily.  localStorage isn't necessarily permenent, so don't rely too heavily on this feature.

God MangaUpdates has a bad site.  Uses tables for layouts and has nil semantics.  It's a pain targetting its elements properly.

I will NOT support old browsers (e.g., IE8 or older) with my script.  Use a modern browser.
