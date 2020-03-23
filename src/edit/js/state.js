// The current state of the application
let currentState = null;
// Controls the state of the application, sets up correct data information
$(document).ready(() => {

	// on load make GET request to load all info required for index page
	$.ajax({
		url: "api/controller/cases.php",
		type: "GET",
	}).then(res => {
		console.log(res)
		currentState = res;
		refreshFromCurrentState();

		// update datatable of individual Cases
		$('#individualCaseTable').dataTable({
			"data": currentState["individualCases"],
			"columns": [{
				"data": "id"
			}, {
				"data": "dte"
			}, {
				"data": "province"
			}, {
				"data": "city"
			}, {
				"data": "age"
			}, {
				"data": "travel_history"
			}, {
				"data": "confirmed_presumptive"
			},
			{
				"data": "source",
				"render": (data, type, row, meta) => {
					if (type === 'display')
						data = '<a href="' + data + '">Source</a>';

					return data;
				}
			}
			]
		});
	}, err => {
		console.log(err)
	});

});
function refreshFromCurrentState() {
	// override last update times + death & case count
	$('#updateTime')[0].innerHTML = currentState["lastUpdate"];
	$('#totalCases')[0].innerHTML = currentState["totalCases"]["cases"] + " ";
	$('#totalCasesCanada')[0].innerHTML = currentState["totalCases"]["cases"] + " ";
	$('#totalDeath')[0].innerHTML = currentState["totalCases"]["death"] + " ";

	// get total death sum for canada
	var death_sum = 0;
	currentState['casesByProvince'].forEach(r => {
		if (r.province in currentState['deathsByProvince'])
			r['deaths'] = currentState['deathsByProvince'][r.province];
		else
			r['deaths'] = 0;

		death_sum += currentState['deathsByProvince'][r.province];
	});

	// total infected from canada
	$('#infectedPerCanada')[0].innerHTML = Math.round((parseInt(currentState["totalCases"]["cases"]) / parseInt(currentState["casePerPopulation"]["Canada"]) * 100)) / 100;


	// setup hash for map
	var mapKeys = {};
	Object.keys(simplemaps_canadamap_mapdata['state_specific']).forEach(key => {
		mapKeys[simplemaps_canadamap_mapdata['state_specific'][key].name] = key;
	})

	// calculate deaths & cases per province
	var casesByProvince = {};
	currentState["casesByProvince"].forEach(r => {
		if (r.province in casesByProvince) {
			casesByProvince[r.province]["cases"] += parseInt(r.cases);
			casesByProvince[r.province]["deaths"] += parseInt(r.cases);
		} else {
			casesByProvince[r.province] = r;
			casesByProvince[r.province]["cases"] = parseInt(casesByProvince[r.province]["cases"]);
			casesByProvince[r.province]["deaths"] = parseInt(casesByProvince[r.province]["deaths"]);
		}

	})

	// update total case by providence per 100,00
	for (var province in casesByProvince) {
		var calc = Math.round((parseInt(casesByProvince[province]["cases"]) / parseInt(currentState["casePerPopulation"][province]) * 100)) / 100;
		if (isNaN(calc))
			calc = 0;

		// TODO: this one errors out, we need to fix
		if (province == "Northwest Territories")
			calc = 2.44;

		// append data to row
		$('#totalCasesProvinceTable').append(
			"<tr>" +
			"<td>" + province + "</td>" +
			"<td><b><i>" + casesByProvince[province]["cases"] + "</i></b></td>" +
			"<td>" + calc + "</td>" +
			"<td>" + casesByProvince[province]["deaths"] + "</td>" +
			"<td><a href='" + casesByProvince[province]["source"] + "'>Source</a></td>" +
			"</tr>"
		)

		// update the maps info
		if (province in mapKeys) {
			simplemaps_canadamap_mapdata.state_specific[mapKeys[province]].description = casesByProvince[province]["cases"] + " Cases" + "<br>" + casesByProvince[province]["deaths"] + " deaths";
		}
	}

	simplemaps_canadamap.refresh();

	// draw 3 main graphs
	lineGraph(currentState["cumulativeCases"], "#cumulativeCaseChart", true, document.getElementById("displayCumulativeLog").checked);
	lineGraph(currentState["dailyCases"], "#dailyCaseChart", false, document.getElementById("newCasesByDayLog").checked);
	barGraph(currentState["totalCaseProvince"], "#provinceCasesChart");

}


// function loadProvinceData(province) {
// 	$.ajax({
// 		url: "http://localhost/edit/api/controller/province.php",
// 		type: "POST",
// 		data: JSON.stringify({
// 			province: province
// 		})
// 	}).then(res => {
// 		console.log(res)
//
// 		$('#displayCumulative').remove()
// 		$('#displayMap').remove()
//
// 		$('#newCasesByDay')[0].innerHTML = province + " New Cases by Day";
// 		$('#newCasesByProvince')[0].innerHTML = province + " Cumulative Cases";
//
// 		$('#dailyCaseChart').remove();
// 		$('#provinceCasesChart').remove();
//
// 		$('#dailyCaseChartDiv').append("<canvas id=\"dailyCaseChart\" width=\"100%\" height=\"40\"></canvas>")
// 		$('#provinceCasesChartDiv').append("<canvas id=\"provinceCasesChart\" width=\"100%\" height=\"40\"></canvas>")
//
// 		lineGraph(res["dailyCases"], "#dailyCaseChart", false);
// 		lineGraph(res["cumulativeCases"], "#provinceCasesChart", true);
//
// 	}, err => {
// 		console.log(err)
// 	})
// }
