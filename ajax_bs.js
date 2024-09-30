var req = new XMLHttpRequest();
var txtDivID = "", txtLnCnt = 0;

req.onreadystatechange = function() {
  if (req.readyState == 4) {
    if (req.status == 200) {
    	var rawTxt = req.responseText;
    	while (rawTxt.indexOf("\n") >= 0)
      rawTxt = rawTxt.replace("\n", "");
  		var lines = rawTxt.split("~");
 		  lines.splice(0, 1);
  		lines.splice(txtLnCnt, (lines.length - txtLnCnt));
  
  		console.log("File " + txtDivID + ".txt has " + lines.length + " lines");
  		for (var i = 0; i < lines.length; i++) {
      	console.log("Line #" + (i + 1) + " is: '" + lines[i] + "'");
  		}
  		var fill = document.getElementById(txtDivID);
		  fill.innerHTML = "";
		  if (lines.length > 1) {
		    for (var i=0; i<lines.length; i++) 
		      fill.innerHTML += "<p class='bullet'>" +lines[i]+ "</p>";
		    fill.innerHTML += "<p class='bullet'><a href='/updates.txt'>earlier updates...</a></p>";
		  } else {
		    fill.innerHTML += lines[0];
		  }
  	} 
	}
}
req.overrideMimeType("text/plain");

function agex(txt, div, lnCnt) {
	txtDivID = div;
	txtLnCnt = lnCnt;
	req.open('Get', txt+'.txt');
	req.send();
}