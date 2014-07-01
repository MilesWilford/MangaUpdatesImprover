# v2.2.0

* Re-introduced missing pagination at bottom of list
* significantly re-built the UI to be more attractive.

# v2.1.0
* Improved the way groups are retrieved and fixed code that was not doing anything.  GetGroupsFromGit.js() now does nothing and is slated for removal

# v2.0.1

* Fixed a slightly broken regex causing junk entries

# v2.0.0

* In this version, I will start maintaining an informal changelog.

* ** THIS VERSION WILL BREAK YOUR OLD FOLLOWING LISTS.**  
In this version, the following list switches from following based on series names (clumsy and subject to change) to MU series IDs.  This is a better solution, but there's no good way to preserve your old list.  So buh-bye to them, remake it.

* This version includes a nearly full rewrite of the script, hence the full version increase.  The screenscrape is much more elegant, producing an array of releases objects that is much clearer and easier to understand.  Gone are my fancy maps, as cool as they were.