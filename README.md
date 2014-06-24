https://github.com/MilesWilford/MangaUpdatesImprover

# MangaUpdates Improver v1.3.0

I've redeveloped my userscript as a standalone browser extension using Crossrider.  I'm pretty hamfisted with my coding abilities, but this suits me well.

Using some simple jQuery, this extension puts a simplified content overlay over the site at mangaupdates.com/releases.html with a cleaner display.

It will open series pages pages inline. It's not a responsive design and is pretty ugly, but it's still more usable than the mangaupdates page.  I do plan to make this more beautiful, but decided to rush to put out feature parity.  NOTE: the extension doesn't include IRC links right now!  I'll need to screenscrape those from MangaUpdates at some point.  I plan to eventually set up this script to gather its own groups/series info, and when I get around to it, that's when I'll restore IRC links.

Using localStorage, this script will let you mark manga you are following to make them pop in the display more easily. localStorage isn't necessarily permenent, so don't rely too heavily on this feature to track your series or blame me if you lose it because of something either I or you do.

God MangaUpdates has a bad site. Uses tables for layouts and has nil semantics. It's a pain targetting its elements properly.

## To Install

Visit the link provided by Crossrider: http://crossrider.com/install/59928

Chrome users can get it on the Chrome Web Store: https://chrome.google.com/webstore/detail/mangaupdates-improver/ckllegcgfalmkmpijokkehikljjejdbh

## To Update

If you're having trouble updating, remove the extension and re-install.  Your Following lists are stored in localStorage, so removing the extension shouldn't affect them  a lick.

## "Group X is a bad link/broken!"

For this release, I copied and pasted from https://github.com/loadletter/mangaupdates-urlfix .  Thanks to the maintainers of that place.  At the time I grabbed, it was v1.6.38, so it's probably fallen out of date.  I'll try to release an update any time a commit is made there.

## This source code is all what the heck. Make it not suck

When I release a new version, I will download the project from crossrider and commit it to GitHub.  You can fiddle with it in Crossrider or take a look yourself.

## You are terrible at coding.  I'm going to take your code and do something better.

I know.  Go for it.  Send me a message if you actually publish anything and I'll switch to using it too.

### Credit

Big thanks to everyone maintaining the urlfix groups list.  I directly access it in my script to maintain my groups.  Check out https://github.com/loadletter/mangaupdates-urlfix if you haven't - my extension will work in conjunction with this script without issue.