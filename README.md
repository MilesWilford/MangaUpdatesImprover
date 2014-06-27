https://github.com/MilesWilford/MangaUpdatesImprover

# MangaUpdates Improver v2.0.1

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

Please check out https://github.com/loadletter/mangaupdates-urlfix . From this project is where I pull my groups list.  They maintain and provide updates to the script regularly, so you probably should be contributing to it instead of complaining to me.

## You are terrible at coding.  I'm going to take your code and do something better.

I know.  Go for it.  Send me a message if you actually publish anything and I'll switch to using it too.

## This is a pretty ugly display.  I can do better

Take a look in the resources folder.  display.html shows the current HTML template and /css/styles.css the stylesheet for the extension.  Make anything you want, so long as it follows that template (assume all classes and IDs in the template are essential since they are).  If you need to use jQuery for any kind of beautiful animations, make a separate .js file for your stuff.  Submit it all back to me and I'll be happy to use it.

### Credit

Big thanks to everyone maintaining the urlfix groups list.  I directly access it in my script to maintain my groups.  Check out https://github.com/loadletter/mangaupdates-urlfix if you haven't - my extension will work in conjunction with this script without issue.