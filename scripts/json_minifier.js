var AJAX_JSON_Req = function(url) {
  var AJAX_req = new XMLHttpRequest();
  AJAX_req.open('GET', url, true);
  AJAX_req.setRequestHeader('Content-type', 'application/json');

  AJAX_req.onreadystatechange = function(){
    if ( AJAX_req.readyState === 4 && AJAX_req.status === 200 ) {
      var response = JSON.parse(AJAX_req.responseText);
      // this might need to be changed? do I store the response somewhere?
      document.write(response.name);
    }
  };

  AJAX_req.send();

};

AJAX_JSON_Req('../sfCrime.json');



/* script for pairing down the original database */

var minify = function(array) {
  var result = {};
  for ( var i = 0; i < array.length; i++ ) {
    if ( !result[array[i][9]] ) {
      result[array[i][9]] = [];
    }
    if ( result[array[i][9]] ) {
      result[array[i][9]].push({
        crimeType: array[i][9],
        district: array[i][14],
        address: array[i][16],
        lon: array[i][17],
        lat: array[i][18]
      });
    }
  }
  return result;
}

/* script for getting rid of the backslashes in the keys */
var replaceSlash = function(obj) {
  var result = {};
  for ( var key in obj ) {
    result[key.replace(/[\/]/, '-')] = obj[key];
  }
  return result;
}






