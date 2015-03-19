var fs = require('fs');
var xlsjs = require('xlsjs');
var sugar = require('sugar');

var workBook = xlsjs.readFile("Footy Ladder - 2015.xls");
var workSheet = workBook.Sheets["Sheet1"];
var result = xlsjs.utils.sheet_to_json(workSheet);

result = result.exclude(function(n) {
  return n['Total'].isBlank();
});

fs.writeFile("tipping_ladder_2015.json", JSON.stringify(result, null, 4), function(err) {
    if (err) {
      console.error("Problem writing file: ", err);
    } else {
      console.log("file saved");
    }
});


