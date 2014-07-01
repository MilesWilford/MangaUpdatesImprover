# MangaUpdates Improver v2.2.5

I've redeveloped my userscript as a standalone browser extension using Crossrider.  I'm pretty hamfisted with my coding abilities, but this suits me well.

This extension puts a simplified content overlay over the site at mangaupdates.com/releases.html with a cleaner display.

Using localStorage, this script will let you mark manga you are following to make them pop in the display more easily. localStorage isn't necessarily permenent, so don't rely too heavily on this feature to track your series or blame me if you lose it because of something either you or I does.

God MangaUpdates has a bad site. Uses tables for layouts and has nil semantics. It's a pain targetting its elements properly.  Lots of complex regexes herein.

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

Take a look in the resources folder.  display.html shows the current HTML template and /css/styles.css the stylesheet for the extension.  Make anything you want, so long as it follows that template (assume all classes and IDs in the template are essential since they are).  If you need to use jQuery for any kind of beautiful animations, make a separate .js file for your stuff.  Submit it all back to me and I'll incorporate it.  You could also just send me some flats, I'm good at png to html.

### Credit

Big thanks to everyone maintaining the urlfix groups list.  I directly access it in my script to maintain my groups.  Check out https://github.com/loadletter/mangaupdates-urlfix if you haven't - my extension will work in conjunction with this script without issue.

I use -prefix-free in the script to help let me forget about fringe browser issues with flexboxes and the like.  It may not even be doing anything, but whatever, they still rock.  https://leaverou.github.io/prefixfree/