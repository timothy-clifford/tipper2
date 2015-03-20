var fs = require('fs');
var phantom = require('phantom');
var extend = require('util')._extend;

var url = "http://www.theroar.com.au/rugby-league/nrl-fixtures/";

var scrap = function() {
	var currentRound = '';
	var draw = [];
	var roundIndex = 0;
	var gameHeaders = ['date', 'home', 'away', 'venue', 'tv', 'time']; // game obj attributes
	//construct the rounds...
	$('table').first().find('tr').each(function(index) {
		var game = {'date':'', 'home':'', 'away':'', 'venue':'', 'tv':'', 'time':''};
		if ($(this).hasClass('header')) {
			//skip this row
		} else {
			if ($(this).has('th').length > 0) {
				//set the current round
				currentRound = roundIndex;
				var roundTitle = $(this).first('th div').text().toLowerCase().trim();
				draw[roundIndex] = {'round': roundTitle, 'order': roundIndex, 'startDate': '', 'games': []};
				console.log(draw[roundIndex]);
				roundIndex++;
			} else {
				
				$(this).find('td').each(function(index) {
					// a game ...
					var gameAttr = gameHeaders[index];
					if($(this).find('a')) {
						// process a link
						game[gameAttr] = $(this).first('a').text();
					} else {
						game[gameAttr] = $(this).text();
					}
					if (gameAttr == 'date' && draw[currentRound].startDate.isBlank()) {
						draw[currentRound].startDate = game[gameAttr];
					}
				});
				draw[currentRound].games.push($.extend({}, game));
			}
		}
	});
	return draw;
};

var saveJson = function(result) {						
	fs.writeFile("draw_2015.json", JSON.stringify(result, null, 4), function(err) {
		if (err) {
			console.error("Problem writing file: ", errorr);
		} else {
			console.log("file saved");
		}
	});
};

phantom.create(function(ph) {
	return ph.createPage(function(page) {

		page.set('onConsoleMessage', function (msg) {
    		console.log("Phantom Console: " + msg)
		});

		return page.open(url, function(status) {

			console.log("opened site? ", status);

			if (status != "success") {
				ph.exit()
				return null;
			}

			page.injectJs('http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js', function() {
				setTimeout(function() {
					return page.evaluate(function() {
						var currentRound = '';
						var draw = [];
						var roundIndex = 0;
						var gameHeaders = ['date', 'home', 'away', 'venue', 'tv', 'time']; // game obj attributes
						//construct the rounds...
						$('table').first().find('tr').each(function(index) {
							var game = {'date':'', 'home':'', 'away':'', 'venue':'', 'tv':'', 'time':''};
							if ($(this).hasClass('header')) {
								//skip this row
							} else {
								if ($(this).has('th').length > 0) {
									//set the current round
									currentRound = roundIndex;
									var roundTitle = $(this).first('th div').text().toLowerCase().trim();
									draw[roundIndex] = {'round': roundTitle, 'order': roundIndex, 'startDate': '', 'games': []};
									console.log(draw[roundIndex]);
									roundIndex++;
								} else {
									
									$(this).find('td').each(function(index) {
										// a game ...
										var gameAttr = gameHeaders[index];
										if($(this).find('a')) {
											// process a link
											game[gameAttr] = $(this).first('a').text();
										} else {
											game[gameAttr] = $(this).text();
										}
										if (gameAttr == 'date' && !draw[currentRound].startDate) {
											draw[currentRound].startDate = game[gameAttr];
										}
									});
									draw[currentRound].games.push($.extend({}, game));
								}
							}
						});
						return draw;

					}, function(result) {
						ph.exit();
						saveJson(result);
					});

				}, 5000);
			});
		});
	});
});
