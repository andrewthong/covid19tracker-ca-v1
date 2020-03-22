function toShortFormat(dt) {
	var month_names = ["Jan", "Feb", "Mar",
		"Apr", "May", "Jun",
		"Jul", "Aug", "Sep",
		"Oct", "Nov", "Dec"
	];

	var day = dt.getDate();
	var month_index = dt.getMonth();
	var year = dt.getFullYear();

	return "" + month_names[month_index] + " " + day;
}

function lineGraph(data, id, flag) {

	var name = [];
	var marks = [];
	var sum = 0;
	for (var i in data) {
		var ddate = data[i].dte;

		var cdate = toShortFormat(new Date(ddate));

		name.push(cdate);

		if (flag) {
			sum += parseInt(data[i].totalGCase);
			marks.push(sum);
		} else {
			num = parseInt(data[i].totalGCase);
			marks.push(num);
		}
	}

	var chartdata = {
		labels: name,
		datasets: [{
			label: "Cases",
			lineTension: 0.3,
			backgroundColor: "rgba(2,117,216,0.2)",
			borderColor: "rgba(2,117,216,1)",
			pointRadius: 5,
			pointBackgroundColor: "rgba(2,117,216,1)",
			pointBorderColor: "rgba(255,255,255,0.8)",
			pointHoverRadius: 5,
			pointHoverBackgroundColor: "rgba(2,117,216,1)",
			pointHitRadius: 50,
			pointBorderWidth: 2,
			data: marks
		}]
	};

	Chart.defaults.global.defaultFontFamily = '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
	Chart.defaults.global.defaultFontColor = '#292b2c';

	var graphTarget = $(id);

	var barGraph = new Chart(graphTarget, {
		type: 'line',
		data: chartdata,
		options: {
			scales: {
				xAxes: [{
					time: {
						unit: 'date'
					},
					gridLines: {
						display: false
					},
					ticks: {
						maxTicksLimit: 7
					}
				}],
				yAxes: [{
					ticks: {
						min: 0,
						maxTicksLimit: 5
					},
					gridLines: {
						color: "rgba(0, 0, 0, .125)",
					}
				}],
			},
			legend: {
				display: false
			}
		}
	});
}

function barGraph(data, id) {

	var name = [];
	var marks = [];

	for (var i in data) {
		name.push(data[i].province);
		marks.push(data[i].cases);
	}


	var chartdata = {
		labels: name,
		/*labels : ["Ontario", "Quebec", "British Columbia", "Alberta", "Manitoba", "Saskatchewan", "Nova Scotia", "New Brunswick", "Newfoundland and Labrador", "Prince Edward Island", "Northwest Territories", "Nunavut", "Yukon", "Repatriated Canadians"],*/
		datasets: [{
			label: "Cases",
			backgroundColor: "rgba(2,117,216,1)",
			borderColor: "rgba(2,117,216,1)",
			data: marks
		}]
	};

	Chart.defaults.global.defaultFontFamily = '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
	Chart.defaults.global.defaultFontColor = '#292b2c';

	var graphTarget = $(id);

	var barGraph = new Chart(graphTarget, {
		type: 'bar',
		data: chartdata,
		options: {
			scales: {
				xAxes: [{
					time: {
						unit: 'month'
					},
					gridLines: {
						display: false
					},
					ticks: {
						maxTicksLimit: 14
					}
				}],
				yAxes: [{
					ticks: {
						min: 0,
						maxTicksLimit: 10
					},
					gridLines: {
						display: true
					}
				}],
			},
			legend: {
				display: false
			}
		}
	});
}