// toShortFormat: converts dates to short format
// @param dt: str  a date
// @return: str shortDateFormat
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


// lineGraph: configures data for line graphs
// @param data: {} case information
// @param data: str id for the graph
// @param data: boolean differntiate b/w summing vs appending
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

    // used to setup graph that needs to be drawn
    var graphConfig = {
        graphTarget: $(id),
        type: 'line',
        name: name,
        marks: marks,
        sum: sum,
        unit: 'date',
        chartdata: {
            labels: name,
            datasets: [{
                lineTension: 0.3,
                pointRadius: 5,
                backgroundColor: "rgba(2,117,216,0.2)",
                borderColor: "rgba(2,117,216,1)",
                pointBackgroundColor: "rgba(2,117,216,1)",
                pointBorderColor: "rgba(255,255,255,0.8)",
                pointHoverRadius: 5,
                pointHoverBackgroundColor: "rgba(2,117,216,1)",
                pointHitRadius: 50,
                pointBorderWidth: 2,
                data: marks
            }],
        },
        ticks: 7
    }

    // renders the graph
    draw(graphConfig);

}


// barGraph: configures data for bar graphs
// @param data: {} case information
// @param data: str id for the graph
function barGraph(data, id) {

    var name = [];
    var marks = [];

    for (var i in data) {
        name.push(data[i].province);
        marks.push(data[i].cases);
    }

    var graphConfig = {
        graphTarget: $(id),
        type: 'bar',
        unit: 'month',
        chartdata: {
            labels: name,
            datasets: [{
                label: "Cases",
                backgroundColor: "rgba(2,117,216,1)",
                borderColor: "rgba(2,117,216,1)",
                data: marks
            }]
        },
        ticks: 15
    }

    // renders the graph
    draw(graphConfig);

}


// draw: renders the graph to HTML
// @param graphConfig: {} config for graph
function draw(graphConfig) {
    Chart.defaults.global.defaultFontFamily = '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
    Chart.defaults.global.defaultFontColor = '#292b2c';

    var chart = new Chart(graphConfig.graphTarget, {
        type: graphConfig.type,
        data: graphConfig.chartdata,
        options: {
            scales: {
                xAxes: [{
                    time: {
                        unit: graphConfig.unit
                    },
                    gridLines: {
                        display: false
                    },
                    ticks: {
                        maxTicksLimit: graphConfig.ticks
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