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

		res["casesByProvince"].forEach(r => {
			var calc = Math.round((parseInt(r.cases) / parseInt(res["casePerPopulation"][r.province]) * 100)) / 100;
			if (isNaN(calc))
				calc = 0;

			if (r.province == "Northwest Territories")
				calc = 2.44;

			$('#totalCasesProvinceTable').append(
				"<tr>" +
				"<td>" + r.province + "</td>" +
				"<td><b><i>" + r.cases + "</i></b></td>" +
				"<td>" + calc + "</td>" +
				"<td>" + r.deaths + "</td>" +
				"<td><a href='" + r.source + "'>Source</a></td>" +
				"</tr>"
			)
		})




		lineGraph(res["cumulativeCases"], "#cumulativeCaseChart", true);
		lineGraph(res["dailyCases"], "#dailyCaseChart", false);
		barGraph(res["casesByProvince"], "#provinceCasesChart");

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