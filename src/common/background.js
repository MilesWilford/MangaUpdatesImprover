/************************************************************************************
  This is your background code.
  For more information please visit our wiki site:
  http://docs.crossrider.com/#!/guide/scopes_background
*************************************************************************************/

appAPI.ready(function($) {

	// Runs a quick update of the groups list any time the browser is opened
	appAPI.resources.includeJS('js/getGroupsFromGit.js');
	periodicGroupsUpdate();
	// Updates weekly if the browser is left on long-term
	function periodicGroupsUpdate() {
	    getGroupsFromGit();
	    setTimeout(function() {
	        backgroundTimer();
	    }, 604800000);
	}
});
