var fs = require('fs');
var xlsjs = require('xlsjs');
var sugar = require('sugar');

var workBook = xlsjs.readFile("Footy Ladder - 2015.xls");
var workSheet = workBook.Sheets["Sheet1"];
var rawImport = xlsjs.utils.sheet_to_json(workSheet);

rawImport = rawImport.exclude(function(n) {
  return n['Total'].isBlank();
});

// need to massage the data a little...
// format we are after is 
/*
	{
		name: '',
		results:[
			{ round: '', score: '', rank: '', cumulativeTotal: ''}
		]
		Total: <int>
	}
*/
// rank is cumulative for each round 

var comp = [];

// loop over the players
rawImport.forEach(function(a) {
	var player = Object.select(a, ['Name', 'Total']);
	player.name = player.Name;
	player.total = new Number(player.Total);
	delete player.Name;
	delete player.Total;

	// should be left with the rounds
	var results = Object.reject(a, ['Name', 'Total']);
	var rounds = [];
	var cumulativeTotal = 0;
	Object.each(results, function(key, value) {
		cumulativeTotal += new Number(value);
		rounds.push({round: key, score: new Number(value), 'cumulativeTotal': cumulativeTotal });
	});
	player.results = rounds;
	comp.push(player);
});

fs.writeFile("tipping_ladder_2015.json", JSON.stringify(comp, null, 4), function(err) {
    if (err) {
      console.error("Problem writing file: ", err);
    } else {
      console.log("file saved");
    }
});


