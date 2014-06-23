// Figure out which group is bigger
var groups1len = Object.keys(groups1).length;
var groups2len = Object.keys(groups2).length;

// Make this a bit more semantic
var bigGroup = (groups1len > groups2len) ? groups1 : groups2;
var smallGroup = (groups1len < groups2len) ? groups1 : groups2;

// Add all the items from the bigger group to the smaller group
for (var groupId in bigGroup) {
  if (!smallGroup[groupId]) {
    smallGroup[groupId] = bigGroup[groupId];
  }
}

// Output the new list into the textarea
$('#groupsoutput').val(function() {
  var output = "";
  for (var groupId in smallGroup) {
    output += '"' + groupId + '": ["' + smallGroup[groupId][0] + '","' + smallGroup[groupId][1] + '"],' + "\n";
  }
  return output;
});