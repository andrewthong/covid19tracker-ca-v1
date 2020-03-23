$(document).ready(() => {
	$.ajax({
		url: "http://localhost/edit/api/controller/cases.php",
		type: "GET",
	}).then(res => {
		console.log(res)

		$('#updateTime')[0].innerHTML = res["lastUpdate"];
		$('#totalCases')[0].innerHTML = res["totalCases"]["cases"] + " ";
		$('#totalCasesCanada')[0].innerHTML = res["totalCases"]["cases"] + " ";

		$('#totalDeath')[0].innerHTML = res["totalCases"]["death"] + " ";

		var death_sum = 0;
		res['casesByProvince'].forEach(r => {
			if (r.province in res['deathsByProvince'])
				r['deaths'] = res['deathsByProvince'][r.province];
			else
				r['deaths'] = 0;

			death_sum += res['deathsByProvince'][r.province];
		});

		$('#infectedPerCanada')[0].innerHTML = Math.round((parseInt(res["totalCases"]["cases"]) / parseInt(res["casePerPopulation"]["Canada"]) * 100)) / 100;

		var mapKeys = {};

		Object.keys(simplemaps_canadamap_mapdata['state_specific']).forEach(key => {
			mapKeys[simplemaps_canadamap_mapdata['state_specific'][key].name] = key;
		})



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

		for (var province in casesByProvince) {

			var calc = Math.round((parseInt(casesByProvince[province]["cases"]) / parseInt(res["casePerPopulation"][province]) * 100)) / 100;
			if (isNaN(calc))
				calc = 0;

			if (province == "Northwest Territories")
				calc = 2.44;

			$('#totalCasesProvinceTable').append(
				"<tr>" +
				"<td>" + province + "</td>" +
				"<td><b><i>" + casesByProvince[province]["cases"] + "</i></b></td>" +
				"<td>" + calc + "</td>" +
				"<td>" + casesByProvince[province]["deaths"] + "</td>" +
				"<td><a href='" + casesByProvince[province]["source"] + "'>Source</a></td>" +
				"</tr>"
			)

			if (province in mapKeys) {
				simplemaps_canadamap_mapdata.state_specific[mapKeys[province]].description = casesByProvince[province]["cases"] + " Cases" + "<br>" + casesByProvince[province]["deaths"] + " deaths";
			}
		}

		simplemaps_canadamap.refresh();

		lineGraph(res["cumulativeCases"], "#cumulativeCaseChart", true);
		lineGraph(res["dailyCases"], "#dailyCaseChart", false);
		barGraph(res["totalCaseProvince"], "#provinceCasesChart");

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