// Controls the state of the application, sets up correct data information
$(document).ready(() => {

	// on load make GET request to load all info required for index page
	$.ajax({
		url: url + "api/controller/cases.php",
		// url: "http://localhost/Covid19TrackerCA/src/edit/api/controller/cases.php",
		type: "GET",
	}).then(res => {
		console.log(res)

		// override last update times + death & case count
		$('#updateTime')[0].innerHTML = res["lastUpdate"];
		$('#totalCases')[0].innerHTML = res["totalCases"]["cases"] + " ";
		$('#totalCasesCanada')[0].innerHTML = res["totalCases"]["cases"] + " ";
		$('#totalDeath')[0].innerHTML = res["totalCases"]["death"] + " ";

		// get total death sum for canada
		var death_sum = 0;
		res['casesByProvince'].forEach(r => {
			if (r.province in res['deathsByProvince'])
				r['deaths'] = res['deathsByProvince'][r.province];
			else
				r['deaths'] = 0;

			death_sum += (res['deathsByProvince'][r.province]);
		});
		
		// total infected from canada
		$('#infectedPerCanada')[0].innerHTML = Math.round((parseInt(res["totalCases"]["cases"]) / parseInt(res["casePerPopulation"]["Canada"]) * 100)) / 100;


		// setup hash for map
		var mapKeys = {};
		Object.keys(simplemaps_canadamap_mapdata['state_specific']).forEach(key => {
			mapKeys[simplemaps_canadamap_mapdata['state_specific'][key].name] = key;
		})

		// calculate deaths & cases per province
		var casesByProvince = {};
		res["casesByProvince"].forEach(r => {
			if (r.province in casesByProvince) {
				casesByProvince[r.province]["cases"] += parseInt(r.cases);
				casesByProvince[r.province]["deaths"] += parseInt(r.cases);
			} else {
				casesByProvince[r.province] = r;
				casesByProvince[r.province]["cases"] = parseInt(casesByProvince[r.province]["cases"]);
				casesByProvince[r.province]["deaths"] = parseInt(casesByProvince[r.province]["deaths"]);
			}

		})
		
		var deaths_total = 0;
		// update total case by providence per 100,00
		for (var province in casesByProvince) {
			var calc = Math.round((parseInt(casesByProvince[province]["cases"]) / parseInt(res["casePerPopulation"][province]) * 100)) / 100;
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

			deaths_total += parseInt(casesByProvince[province]["deaths"]);

			// update the maps info
			if (province in mapKeys) {
				simplemaps_canadamap_mapdata.state_specific[mapKeys[province]].description = casesByProvince[province]["cases"] + " Cases" + "<br>" + casesByProvince[province]["deaths"] + " deaths";
			}
		}

		simplemaps_canadamap.refresh();

		$('#totalDeath')[0].innerHTML = deaths_total + " ";
		$('.death_total')[0].innerHTML = deaths_total;
		// draw 3 main graphs
		lineGraph(res["cumulativeCases"], "#cumulativeCaseChart", true);
		lineGraph(res["dailyCases"], "#dailyCaseChart", false);
		barGraph(res["totalCaseProvince"], "#provinceCasesChart");

		// update datatable of individual Cases
		$('#individualCaseTable').dataTable({
			"data": res["individualCases"],
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
	})

});

function goAdvanced() {
	window.location.href = url + "advanced.html";
}
